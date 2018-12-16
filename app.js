function buildMetadata(sample) {

  console.log("I'm insde buildMetadata");

  d3.json(`/metadata/${sample}`).then(function(data) {
    // console.log(d);
    // mdata = Object.entries(d);
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");

    // console.log(mdata);
    // console.log(PANEL);

    // PANEL.selectAll("h6").data(mdata).enter().append("h6")
     
    // .text(function(d) { return;  `${d[0]}:  ${d[1]}`; });
    Object.entries(data).forEach(([key, value]) => {
      PANEL
          .append("div").text(`${key}: ${value}`);
       })
      })
    }


  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  console.log("I'm inside buildChart");
  d3.json(`/samples/${sample}`).then(function(data) {
  // Building Pie Chart
  let pie_ids = data.otu_ids.slice(0, 10);
  let pie_values = data.sample_values.slice(0, 10);
  let pie_labels = data.otu_labels.slice(0, 10);
  let trace = [{
    values : pie_values,
    labels : pie_ids,
    hovertext : pie_labels,
    type : "pie",
    textposition: "inside",
  }];
  let layout = {
    title: "Belly Button Biodiversity Pie Chart",
  };
  
  Plotly.newPlot('pie', trace, layout, {responsive: true});
    // Building Bubble Chart
  let bubble_ids = data.otu_ids;
  let bubble_values = data.sample_values;
  let bubble_markers = data.sample_values;
  let bubble_marker_colors= data.otu_ids;
  let bubble_text = data.otu_labels
  let trace_2 = [{
    x : bubble_ids,
    y : bubble_values,
    mode : "markers",
    marker: {
      size : bubble_markers,
      color : bubble_marker_colors,
    },
    text: bubble_text
    }];
    let layout_2 = {
      title: "Belly Button Biodiversity Bubble Chart",
      xaxis: {
        title: "OTU ID",
      },
      yaxis: {
        title: "Sample Value"
      },
      width:1000,
    };
    Plotly.newPlot("bubble", trace_2, layout_2, {responsive: true});
  })
}



  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {

  console.log("I'm inside INIT");

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {

  console.log("I'm inside optionChanged");

  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
