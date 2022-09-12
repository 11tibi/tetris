window.onload = window.onresize = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#fff";
    ctx.fillRect(window.innerWidth / 2 - 125, window.innerHeight / 2 - 225, 250, 450);
    var x = window.innerWidth / 2 - 125;
    var y = window.innerHeight / 2 - 225;
    var x_end = window.innerWidth / 2 - 125 + 250;
    ctx.fillStyle = "#000";
    ctx.lineWidth = 0.5;
    for (var i = 0; i < 19; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(x_end, y);
        ctx.stroke();
        y += 25;
    }
    x = window.innerWidth / 2 - 125;
    y = window.innerHeight / 2 - 225;
    var y_end = window.innerHeight / 2 - 225 + 450;
    for (var i = 0; i < 11; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y_end);
        ctx.stroke();
        x += 25;
    }
};
