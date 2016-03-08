var data = [4, 8, 15, 16, 23, 42];
var chart = d3.select(".skill-chart")
   .append("svg")




chart.selectAll("rect")
     .data(data)
   .enter()
    .append("rect")
     .style("width", function(d) { return d * 10 + "px"; })
     .text(function(d) { return d; })
    .style("fill","blue");