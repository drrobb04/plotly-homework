//make sample function
function makeSampleData(sample) {
    d3.json("samples.json").then((data) => {
        // data set up
        var sampleData = data.metadata;
        var sampleArray = sampleData.filter(sampleObj => sampleObj.id == sample);
        var sampleSet = sampleArray[0];
        // dropdown set up
        var dropDown = d3.select("#sample-metadata");
        dropDown.html("");
        Object.entries(sampleSet).forEach(([key, value]) => {
            dropDown.append("h4").text(`${key}: ${value}`);
          });
    });
}

// create charts function
function makeCharts(sample) {
    d3.json("samples.json").then((data) => {
        // data set up
        var graphData = data.samples;
        var graphArray = graphData.filter(sampleObj => sampleObj.id == sample);
        var graphSet = graphArray[0];

        //var set up
        var sampleValues = graphSet.sample_values;
        var otuIds = graphSet.otu_ids;
        var otuLabels = graphSet.otu_labels;

        // create horizontal bar chart
        var barData = [
            {
                x: sampleValues.slice(0,10),
                y: otuIds.slice(0,10).map(otuID => `OTU ${otuID}`),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" },
          };
      
        Plotly.newPlot("bar", barData, barLayout);

        // create bubble chart 
        var bubbleData = [
            {
                x: otuIds,
                y: sampleValues,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIds,
                }
            }
        ];

        var bubbleLayout = [
            {
                title: "otu prevelance",
                xaxis: "OTU ID"
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    }); 
}

// init function - event listener
function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleTitle = data.names;
        var chartTitle = sampleTitle[0];

        makeCharts(chartTitle);
        makeSampleData(chartTitle);

    });
}

init();



