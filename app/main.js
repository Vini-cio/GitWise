const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')

const createWindow = () => { // metodo para crear la ventana inicial
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, './assets/git.png'), // ruta del archivo icono
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // cargamos el preload.js
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    win.loadFile(path.join(__dirname, './views/index.html'))
    // Configuración del menú
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'New repository',
                    click() {
                        console.log('New repository - selected');
                        AssistantNewRepoWindow();
                    }
                },
                {
                    label: 'Open repository',
                    click() {
                        console.log('Open repository - selected');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Salir',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
    ]);

    Menu.setApplicationMenu(menu);
}

let assistantNewRepoWindow;

const AssistantNewRepoWindow = () => { // ventana nuevo repositorio
    assistantNewRepoWindow = new BrowserWindow({
        width: 400,
        height: 300,
        icon: path.join(__dirname, './assets/git.png'),
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    assistantNewRepoWindow.loadFile(path.join(__dirname, './views/new_repo.html'));

    assistantNewRepoWindow.on('closed', () => {
        assistantNewRepoWindow = null;
    });
}

app.whenReady().then(() => { // si esta cargado todo creamos la ventana
    createWindow()

    app.on('active', () => { // crear ventana en macOS
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => { // escuhamos el evento para cerrar la ventana
    if (process.platform !== 'darwin') app.quit()
})