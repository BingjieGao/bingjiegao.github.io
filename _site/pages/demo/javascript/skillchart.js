/**
 * Created by davide on 01/03/16.
 */

var skillJson = [
    {
        "skill": "PHP",
        "profency": 3
    },
    {
        "skill": "Embedded C",
        "profency": 3
    },
    {
        "skill": "Nodejs",
        "profency": 3
    },
    {
        "skill": "Expressjs",
        "profency": 3
    },
    {
        "skill": "MongoDB",
        "profency": 5
    },
    {
        "skill": "HTML",
        "profency": 6
    },
    {
        "skill": "CSS3",
        "profency": 10
    }
]

var width = document.getElementById('skillchart').offsetWidth;
var dragable = d3.behavior.drag()
    .on("drag", function() {
        var x = d3.event.x;

        d3.select(this).attr("x",x);
    });
var dragwidth = d3.behavior.drag()
    .on("drag", function() {
        var x = d3.event.x;
        d3.select(this).attr("width",function(d,i){
           return  x+0.25*width;
        })

    });

console.log(width);
var x = d3.scale.linear()
    .domain([0, 10])
    .range([0, width * 0.4]);
var barHeight = 30;
var barchart = d3.select(".skill-chart")
    .append('svg')
    .attr("width", '100%')
    .attr("height", barHeight * skillJson.length)
var g = barchart.selectAll('g')
    .data(skillJson)
    .enter()
    .append('g')


var bars = barchart.selectAll('.bar')
    .data(skillJson)
    .enter()
    .append("rect")
    .attr('class','bar')

bars.style("fill", "#77BA9B")
    .style("height", 25 + "px")
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .attr('x', '25%')
    .call(dragwidth)
    .attr("width", '0px')
    .style('opacity', 0)
    .transition()
    .delay(function (d, i) {
        return i * 200
    })
    .duration(1000)
    .attr("width", function (d) {
        return x(d.profency) + 'px';
    })
    .style('opacity', 1)


var drag = barchart.selectAll('.drag')
    .data(skillJson)
    .enter()
    .append("rect")
    .attr('class','drag')
    .style("width", function (d) {
        return 10 + 'px';
    })
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .style("height", 30 + "px")
    .attr('x', function(d){
        return x(d.profency)+0.25*width-10+'px';
    })
    .attr('y', function(d){
        return -2.5+'px';
    })
    .style("fill", "red")
    .call(dragable)

var greybars = g.append("rect")
    .style("width", function (d) {
        return width * 0.4 + 'px';
    })
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .style("height", 25 + "px")
    .attr('x', '25%')
    .style("fill", "#dfdfdf")

var text = g.append('text')
    .text(function (d) {
        return d.skill;
    })
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .attr('y', barHeight / 1.5)
    .style('font-size','1em')
    .style('fill','#6c6c6c')

var value = g.append('text')
    .text(function (d) {
        return d.profency + '/10';
    })
    .attr('y', barHeight / 1.5)
    .attr('x', '87%')
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .style('font-size','1em')
    .style('fill','#6c6c6c')

//
d3.select(window)
    .on('resize', function () {
        var width = document.getElementById('skillchart').offsetWidth;
        var x = d3.scale.linear()
            .domain([0, 10])
            .range([0, width * 0.55]);
        bars.style("width", function (d) {
            return x(d.profency) + 'px';
        })
        greybars.style("width", function (d) {
            return width*0.55 + 'px';
        })
    })
