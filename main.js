let plot = document.getElementById("graphDiv");
let plot2 = document.getElementById("graphDiv2");

let indices = [ "MCFTRR", "MEBCTRR", "MESMTRR"];
let indices2 = [ "MEOGTRR", "MEEUTR", "METLTRR", "MEMMTR", "MEFNTR", "MECNTR", "MECHTR", "METNTR"];
// let names2 = [ "Нефть/Газ", "Э/Э", "Телеком", "Металлы/Добыча", "Финансы", "Потребительский", "Хим/Нефтехим", "Транспорт"];
let startDate = "2013-12-30";
            //   2010-12-30
// let indices = ["MCFTRR", "RGBITR", "RUGBITR10Y", "RUGBITR5Y", "RUGBITR3Y", "RUGBITR1Y"];
//               2003-02-26  2002-12-30 2
// let indices = ["RTSSTDTRR", "RUGBITR5+"];
// let startDate = "2010-12-30";
// let indices = ["MCFTRR", "RGBITR"];
// let startDate = "2003-02-26";
// let indices = ["MCFTRR", "RUGBITR5+", "RGBITR"];
// let startDate = "2010-12-30";

addBlankPlot(plot);
addTracesToPlot(plot, indices);
updateAllTracesLoop(plot, indices, startDate);

plot.layout = {
    showlegend: true, 
    legend: {"orientation": "h", x: 0.5, y: -0.1},
    hovermode:'x',
    margin: {
        t: 10, //top margin
        l: 20, //left margin
        r: 20, //right margin
        b: 10 //bottom margin
        }
 };

addBlankPlot(plot2);
addTracesToPlot(plot2, indices2);
updateAllTracesLoop(plot2, indices2, startDate);

plot2.layout = {
    showlegend: true, 
    legend: {"orientation": "h", x: 0.5, y: -0.1},
    hovermode:'x',
    margin: {
        t: 10, //top margin
        l: 20, //left margin
        r: 20, //right margin
        b: 10 //bottom margin
        }
 };

window.onresize = function() {
    Plotly.Plots.resize(plot);
    Plotly.Plots.resize(plot2);
};
