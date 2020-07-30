const yearStart = 2005;
const yearEnd = 2020;
const totalNoOfCountriesToLoad = 400;
const margin = {top: 20, right: 120, bottom: 50, left: 50},
    svgWidth = 900,
    svgHeight = 600,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
var parseTime = d3.timeParse("%Y");
var formatValue = d3.format(",");
var floatFormatValue = d3.format(".3n");
// WDI call type 
const type = {
    TOTAL: 0,
    MAILE: 1,
    FEMAILE: 2
}
const colors = ["blue","red","yellow","green","black","blue","gray", "lightgray", "orange"];
const chart = d3.select('#chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
const innerChart = chart.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// x,y values
var xScale = d3.scaleLinear().range([0,width]);
var yScale = d3.scaleLinear().range([height, 0]);    
// x,y axis
var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft().scale(yScale);
// line chart related
var valueline = d3.line()
    .x(function(d){ return xScale(d.date);})
    .y(function(d){ return yScale(d.value);})
    .curve(d3.curveLinear);
// Adds the svg canvas
var g = innerChart
    // .call(zoom)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);    
$('.close').click(function() {
    $('.alert').hide();
})
$('.alert').hide();
$("#to_step2").click(function() {
    //d3.selectAll("path").remove();
    innerChart.selectAll("g").remove();
    hide('#step1');
    show('#step2');    
    draw("USA", false, 0);
    draw("USA", false, 1);
    draw("USA", false, 2);
})
$("#to_step3").click(function() {
    //d3.selectAll("path").remove();
    innerChart.selectAll("g").remove();
    hide('#step2');
    show('#step3');
    draw("CHN", false, 0);
    draw("CHN", false, 1);
    draw("CHN", false, 2);
 })

 $("#to_step4").click(function() {
     //d3.selectAll("path").remove();
     innerChart.selectAll("g").remove();
     hide('#step3');
     show('#step4');
     draw("RUS", false, 0);
     draw("RUS", false, 1);
     draw("RUS", false, 2);
 })

 $("#to_step5").click(function() {
     //d3.selectAll("path").remove();
     innerChart.selectAll("g").remove();
     hide('#step4');
 $("#to_step5").click(function() {
     draw("WLD", true, 0);
     draw("USA", true, 0);
     draw("CHN", true, 0);
     draw("RUS", true, 0);

 })

$("#startover").click(function() {
    innerChart.selectAll("g").remove();
    hide("#step5");
    hide("#country");
    //d3.selectAll("path").remove();
    show("#step1");
    draw("WLD", false, 0);
    draw("WLD", false, 1);
    draw("WLD", false, 2);
})
$("input[name='type']").click(function() {
    draw('WLD', $('input:radio[name=type]:checked').val());
})
function load(){
    d3.json("https://api.worldbank.org/v2/country/all/indicator/SL.EMP.WORK.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd).then(function(d){
        console.log(d);
    });
}
// get all countries ( total 304 countries so far so setting it to 400 items per page to get all the countries information. #TODO fix it so get page meta first to get "total" and send 2nd query to dynamically change the per_pages number to have "total" values)
// provide a callback function to execute with loaded data.
function loadCountries(callback){
    if (typeof callback !== "function") throw new Error("Wrong callback in loadCountries");
    d3.json("https://api.worldbank.org/v2/country?format=json&per_page=" + totalNoOfCountriesToLoad).then(callback);
}
// get a given country's data
// provide a callback function to execute with loaded data. World total.
function loadTotalEmploymentByCountryCode(countryCode, callback){
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SL.EMP.WORK.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
        .then(callback);
}
function loadFemaleEmploymentByCountryCode(countryCode, callback){
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SL.EMP.WORK.FE.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
        .then(callback);
}
