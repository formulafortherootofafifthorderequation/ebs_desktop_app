const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const ebs = require('ebsoc');

app.on('ready', () => {
    console.log(`ready`);

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1280,
        height: 720,
        show: false
    })
    win.loadURL(`file://${__dirname}/login.html`)

    win.on('ready-to-show', () => {
        win.show();
    });
})

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
})

ipcMain.on('login', async (event, args) => {
    let { id, pwd } = args;
    try {
        let data = await ebs.Auth.login(id, pwd);
        event.reply('login-complete');
    }
    catch (err) {
        event.reply('login-failure', err)
    }
});