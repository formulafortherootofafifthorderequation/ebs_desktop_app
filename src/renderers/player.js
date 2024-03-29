var { ipcRenderer } = require('electron');
const PLAYER = require('../events/player');
const $ = require('jquery');

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    const { classUrlPath, lessonSeq, subLessonSeq } = params;
    console.log(params);
    ipcRenderer.send(PLAYER.PLAYER, params);
});

ipcRenderer.on(PLAYER.PLAYER, (event, args) => {
    console.log(args);
    Player = args.player;
    FileObject = Player.lectureDetailInfo.lectureContentsDto.lectureContentsMvpDto.mvpFileDto;
    FilePath = Player.lectureDetailInfo.lectureContentsDto.lectureContentsMvpDto.mvpFileUrlPath;
    $('#player').append(`<video src="${FileObject?.fileStoragePath || FilePath}" controls muted autoplay></video>`);
    $('#player').append(`<progress value="" max="100"></progress>`)
});