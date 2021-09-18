var { ipcRenderer } = require('electron');
const CLASS = require('../events/class.js');
const $ = require('jquery');

$(() => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});

ipcRenderer.on(CLASS.CLASS_LIST_RESPONSE, (event, data) => {
    console.log(data);
    $("div.panel").empty();
    for (let item of data.data.list) {
        $("div.panel").append(`
            <a href="./course.html?classUrlPath=${encodeURI(item.classUrlPath)}" class="obj">
                <p class="obj_text">${item.className}</p>
            </a>
        `);
    }
    $("div.panel").append(`<div class="empty"></div>`);
});

ipcRenderer.on(CLASS.CLASS_LIST_FAILURE, () => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});