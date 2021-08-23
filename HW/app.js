//make sample function
function makeSampleData(sample) {
    d3.json("/data/samples.json").then(function(data) {
        var sampleData = data.metadata;
        var sampleArray = sampleData.filter(sampleObj => sampleObj.id == sample);
        var sample = sampleArray[0];



    }) 
}





// create charts function
function makeCharts(sample) {
    d3.json("/data/samples.json").then(function(data) {

    // data
    var 
    // create horizontal bar chart

    // create bubble chart 

    }) 
}







// init function - event listener
function init() {


}




