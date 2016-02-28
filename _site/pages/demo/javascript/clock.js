initLocalClocks();
function initLocalClocks() {
    // Get the local time using JS
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    console.log(hours);
    var beijing = (hours+8)>24?(hours+8-24):(hours+8);
    var newyork = (hours-5)>0?(hours-5):(hours-5+24);


    var hands = [
        {
            hand: 'london',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand:'beijing',
            angle: (beijing * 30) + (minutes /2)
        },
        {
            hand: 'newyork',
            angle: (newyork * 30) + (minutes /2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        console.log(elements);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
            elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
            // If this is a minute hand, note the seconds position (to calculate minute position later)
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}