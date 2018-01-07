let stressors = {
  "stress": "too much work at job",
  "activity": "meditate",
  "duration": 5,
  "preHeartRate": 80,
  "postHeartRate": 70
};

let stressArr = [
  {typeHR: "preHeartRate", heartRate: 80},
  {typeHR: "postHeartRate", heartRate: 70}
];

/******************/

let margin = {top: 50, right: 50, bottom: 50, left: 50};
// let width = 600 - margin.left - margin.right;
// let height = 400 - margin.top - margin.bottom;
let width = parseInt(d3.select(".chart").style("width"))
            - margin.left - margin.right;
let height = parseInt(d3.select(".chart").style("height"))
            - margin.top - margin.bottom;


// Set the Scale, domain, and range
let xScale = d3.scaleBand()
              //.domain(["pre-HR", "post-HR"])
              .domain(stressArr.map(d => d.typeHR))
              .range([0, width])
              .padding(.2); // padding between the discreet bands

let greaterHR = stressArr.map(d => d.heartRate); console.log(greaterHR);
let scaledGreaterHR = d3.max(greaterHR) * 1.2; console.log(scaledGreaterHR);

let yScale = d3.scaleLinear()
              //.domain([0, 100])
              .domain([0, scaledGreaterHR])
              .range([height, 0]);

/*************************/

// Set the X-axis and Y-axis
let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

// Select svg
let svg = d3.select("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

// append outer most <g> element
let parent = svg.append("g")
                .attr("class", "parent-group")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

// X-axis label
parent.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

// Y-axis label
parent.append("g")
      .attr("class", "y-axis")
      .call(yAxis)

/***************************/

// Add label for x axis
parent.append("text")
  .attr("transform",
        `translate(${width / 2}, ${height + margin.top + 10})`)
  .style("text-anchor", "middle")
  .text("heart rates before and after relaxation activity");

// Add label for y axis
parent.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("beats per minute");

  parent.append("text")
  .attr("transform",
        `translate(${width / 2}, ${height + margin.top + 10})`)
  .style("text-anchor", "middle")
  .text("heart rates before and after relaxation activity");

/**********************/

// Add rectangle bar chart
parent.selectAll(".bar")
    .data(stressArr)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.typeHR))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.heartRate))
    .attr("height", d => height - yScale(d.heartRate));






/*
suggestion, have width and height depend on innerHeight and innerWidth
of the Window , Kristen Coates

LeBeck
d3.select(window).on('resize', resize);

*/


function resize() {
  let width = parseInt(d3.select(".chart").style("width"))
              - margin.left - margin.right;
  let height = parseInt(d3.select(".chart").style("width"))
              - margin.top - margin.bottom;


  xScale.range([0, width])
              .padding(.2); // padding between the discreet bands

  parent.select(".x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
}

d3.select(window).on("resize", resize);
resize();