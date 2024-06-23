const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => { // metodo para crear la ventana inicial
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') // cargamos el preload.js
        },
    })
    win.loadFile('index.html')
}

app.whenReady().then(()=> { // si esta cargado todo creamos la ventana
    createWindow()

    app.on('active', () => { // crear ventana en macOS
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => { // escuhamos el evento para cerrar la ventana
    if (process.platform !== 'darwin') app.quit()
})