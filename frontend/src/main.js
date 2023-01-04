const { app, BrowserWindow } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();
// const remote = require("remote");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        center: true,
        // frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, "js/preload.js"),
        },
    });
    win.once("ready-to-show", () => {
        win.show();
    });
    win.loadFile("src/index.html");
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});