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
        "profency": 6
    },
    {
        "skill": "Nodejs",
        "profency": 4
    },
    {
        "skill": "Expressjs",
        "profency": 4
    },
    {
        "skill": "MongoDB",
        "profency": 4
    },
    {
        "skill": "HTML",
        "profency": 7
    },
    {
        "skill": "CSS3",
        "profency": 7
    },
    {
        "skill": "JQuery",
        "profency": 4
    },
    {
        "skill": "Circuit Design& PCB",
        "profency": 8
    }
]

var width = document.getElementById('skillchart').offsetWidth;
console.log(width);
var x = d3.scale.linear()
    .domain([0, 10])
    .range([0, width * 0.55]);
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
var greybars = g.append("rect")
    .style("width", function (d) {
        return width * 0.55 + 'px';
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
    .attr('x', '89%')
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    })
    .style('font-size','1em')
    .style('fill','#6c6c6c')

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
