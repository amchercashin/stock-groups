async function updateAllTracesLoop (plot, indices, startDate) {
    indices.forEach(async index => {
        let dataUpdate = {};
        dataUpdate = await maybeGetFromStore(index);
        if (dataUpdate) {
            Plotly.extendTraces(plot, {x: [dataUpdate.x], y: [dataUpdate.y]}, [traceIndexByName(indices, index)]);
            console.log("Index: " + index + "loaded frome storage.");
        } else {
            console.log("start to build: " + index);
            let promises = [];
            promises.push(updateTraceLoop(plot, index, startDate, engine = "stock", indices));

            Promise.all(promises).then(val => {
                return Promise.all(val.flat()); 
            }).then(val => {
                maybeStore(index, plot.data[traceIndexByName(indices, index)]);
                console.log(index + " put to storage.");
                return true;
            }).catch((err) => {
                throw new Error('Error in maybeStore promise chain' + err.message);
            });
        }
    });
    return true;
}

async function updateTraceLoop (plot, index, startDate, engine, indices) {
    let lastRecord = getLastRecord(index, startDate, engine);
    let firstValue = getFirstValue(index, startDate);
    [lastRecord, firstValue] = await Promise.all([lastRecord, firstValue]);
    
    let promises = [];
    for (let i = 0; i < lastRecord; i += 100) {
        let promise = updateTraceData(plot, index, startDate, i, firstValue, engine, indices);
        promises.push(promise);
    }
    return promises;
}

async function updateTraceData (plot, index, startDate, fromIndex, firstValue, engine, indices) {
    let traceDataChunk = await axios.get("https://iss.moex.com/iss/history/engines/"+engine+"/markets/index/securities/"+index+".json?start="+fromIndex+"&from="+startDate);
    let dataUpdate = await extract(traceDataChunk.data.history.data);
    dataUpdate.y = await normalize(dataUpdate.y, firstValue);
    Plotly.extendTraces(plot, {x: [dataUpdate.x], y: [dataUpdate.y]}, [traceIndexByName(indices, index)]);
    return true;
}