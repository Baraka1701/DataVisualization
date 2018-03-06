var bardata = [
    { state: 'CA', value: 2704659 },
    { state: 'TX', value: 2027307 },
    { state: 'NY', value: 1208495 },
    { state: 'FL', value: 1140516 },
    { state: 'IL', value: 894368 },
    { state: 'PA', value: 737462 },
    ];

var margin = {top: 20, right: 20, bottom: 70, left: 150},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
// No queremos fecha tenemos ahora nombre de estado
//var	parseDate = d3.time.format("%Y-%m").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    //.tickFormat(d3.time.format("%Y-%m")); // Nos lo cargamos es un string normal y corriente

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("bar-data.csv", function(error, data) {

    data.forEach(function(d) {
        d.state = d.state; // parseDate(d.date); // cambiar por nombre estado
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.state; })); // actualizar a estado
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.state); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

AppendLegend()

});



function AppendLegend() {
    // building a legend is as simple as binding
    // more elements to the same data. in this case,
    // <text> tags
    svg.append('g')
      .attr('class', 'legend')
        .selectAll('text')  // TENGO QUE AÑADIR TIP. 
        .data(bardata)
          .enter()
            .append('text')
              .text(function(d) { return '• ' + d.state; })
              .attr('fill', function(d) { return color(d.state); })
              .attr('y', function(d, i) { return 20 * (i + 1); }) 
              .attr('width', "200")
}