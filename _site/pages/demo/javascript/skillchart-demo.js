/**
 * Created by davide on 01/03/16.
 */

var skillJson = [
    {
        "skill": "PHP",
        "name": "PHP",
        "profency": 3
    },
    {
        "skill": "Embedded C",
        "name": "Embedded-C",
        "profency": 3
    },
    {
        "skill": "Nodejs",
        "name": "Nodejs",
        "profency": 3
    },
    {
        "skill": "Expressjs",
        "name": "Expressjs",
        "profency": 3
    },
    {
        "skill": "MongoDB",
        "name": "MongoDB",
        "profency": 5
    },
    {
        "skill": "HTML",
        "name": "HTML",
        "profency": 6
    },
    {
        "skill": "CSS3",
        "name": "CSS3",
        "profency": 10
    }
]
var text_value = '';
var this_bar;
var this_value;
var num;
var width = document.getElementById('skillchart').offsetWidth;
var add = $('#skill-btn');

console.log(width);
var xscale = d3.scale.linear()
    .domain([0, 10])
    .range([0, width * 0.55]);
var barHeight = 30;

var dragable = d3.behavior.drag()
    .on('dragstart', function (d) {
        console.log(text_value);
        text_value = d.name;
        this_bar = d3.select('rect[name=' + text_value + ']');
        this_value = d3.select('.value-text[value=' + text_value + ']');
        console.log(this_bar);
    })
    .on('drag', function (d) {
        var x = d3.event.x;
        num = (x - 0.25 * width) / (width * 0.055);
        num = Math.round(num)>10?10:Math.round(num);
        d3.select(this).attr("x", function () {
            if (x < width * 0.26) {
                return 0.25 * width;
            }
            else if (x > width * 0.80) {
                return 0.80 * width-5+'px';
            }
            else
                return num * width * 0.055 + 0.25 * width
        });
        this_value.text(function (d) {
            return num + '/10';
        })
        this_bar.attr('width', function () {
            if (x < width * 0.26)
                return 0;
            else if (x > width * 0.80)
                return width * 0.55;
            else {
                return num * width * 0.055;
            }
        })
    })
    .on('dragend', function (d, i) {
        skillJson[i].profency = num;
        console.log(skillJson[i]);
    })
draw();
function draw() {
    d3.selectAll('svg').remove();
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
        .attr('class', 'bar')
        .attr('name', function (d) {
            return d.name;
        })

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
            return xscale(d.profency) + 'px';
        })
        .style('opacity', 1)


    var drag = barchart.selectAll('.drag')
        .data(skillJson)
        .enter()
        .append("rect")
        .attr('class', 'drag')
        .style("width", function (d) {
            return 8 + 'px';
        })
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        })
        .attr('x', function (d) {
            return xscale(d.profency) + 0.25 * width - 8 + 'px';
        })
        .style("height", 25 + "px")
        .style('rx', '5')
        .style('ry', '5')
        .style("fill", "#6c6c6c")
        .call(dragable)

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
        .style('font-size', '1em')
        .style('fill', '#6c6c6c')

    var value = g.append('text')
        .text(function (d) {
            return d.profency + '/10';
        })
        .attr('value', function (d) {
            return d.name;
        })
        .attr('class', 'value-text')
        .attr('y', barHeight / 1.5)
        .attr('x', '87%')
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        })
        .style('font-size', '1em')
        .style('fill', '#6c6c6c')
}
//
d3.select(window)
    .on('resize', function () {
        width = document.getElementById('skillchart').offsetWidth;
        xscale = d3.scale.linear()
            .domain([0, 10])
            .range([0, width * 0.55]);
        bars.style("width", function (d) {
            return xscale(d.profency) + 'px';
        })
        greybars.style("width", function (d) {
            return width * 0.55 + 'px';
        })
    })

/*Utility Functions*/
/*Add function*/
add.click(function(){
    var newskill = $('input').val();
    console.log(newskill);
    var length = skillJson.length;
    item = {
        "skill": newskill,
        "name": newskill,
        "profency": 1
    };
    skillJson.push(item);
    draw();
})
/*************************************************************/
