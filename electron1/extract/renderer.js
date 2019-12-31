// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
console.log(1111);
let btn = document.getElementById('btn');
btn.onclick = function () {
    // window.location.href = 'https://www.baidu.com/'
    // window.location.href = './pp.html'
    if (isWindow()) {
        console.log('window');
    } else {
        console.log('electron');
    }
}

function isWindow() {
    return typeof global === 'undefined' ? true : false
}