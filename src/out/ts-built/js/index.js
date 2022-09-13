import { Board } from './Board.js';
window.onload = function () {
    let canvas = document.getElementById('canvas');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        canvas.style.visibility = 'hidden';
        let div = document.createElement('div');
        div.innerHTML += 'Mobile version not available';
        div.className = 'text';
        document.body.appendChild(div);
    }
    else {
        let ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let board = new Board(ctx);
        board.run();
    }
};
