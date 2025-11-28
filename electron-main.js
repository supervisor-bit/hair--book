const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let phpServer;
const PHP_PORT = 8765;

function startPHPServer() {
    return new Promise((resolve, reject) => {
        // Najít PHP - zkusit různé cesty
        const phpPaths = [
            '/Applications/MAMP/bin/php/php8.4.1/bin/php', // MAMP PHP 8.4
            '/Applications/MAMP/bin/php/php8.3.14/bin/php', // MAMP PHP 8.3
            '/Applications/MAMP/bin/php/php8.2.26/bin/php', // MAMP PHP 8.2
            '/usr/bin/php', // macOS default
            '/usr/local/bin/php', // Homebrew
            'C:\\xampp\\php\\php.exe', // Windows XAMPP
            'php' // PATH
        ];
        
        let phpPath = 'php';
        const fs = require('fs');
        for (const path of phpPaths) {
            if (fs.existsSync(path)) {
                phpPath = path;
                break;
            }
        }
        
        console.log('Using PHP:', phpPath);
        
        // Spustit PHP vestavěný server
        phpServer = spawn(phpPath, ['-S', `localhost:${PHP_PORT}`, '-t', __dirname]);
        
        phpServer.stdout.on('data', (data) => {
            console.log(`PHP Server: ${data}`);
        });
        
        phpServer.stderr.on('data', (data) => {
            console.error(`PHP Server Error: ${data}`);
            if (data.toString().includes('started')) {
                resolve();
            }
        });
        
        phpServer.on('error', (err) => {
            console.error('Failed to start PHP server:', err);
            
            // Na Windows zobrazit chybovou hlášku s návodem
            if (process.platform === 'win32') {
                const { dialog } = require('electron');
                dialog.showErrorBox(
                    'PHP není nainstalované',
                    'HairBook potřebuje PHP pro svůj běh.\n\n' +
                    '📥 Stáhněte a nainstalujte XAMPP:\n' +
                    'https://www.apachefriends.org/download.html\n\n' +
                    'Po instalaci restartujte HairBook.\n\n' +
                    'Podrobný návod najdete v souboru WINDOWS-INSTALACE.md'
                );
            }
            reject(err);
        });
        
        // Počkat na start serveru
        setTimeout(resolve, 2000);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        },
        backgroundColor: '#1a1a2e',
        show: false
    });

    // Vytvořit jednoduché menu
    const template = [
        {
            label: 'Soubor',
            submenu: [
                {
                    label: 'Obnovit',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => mainWindow.reload()
                },
                {
                    label: 'Vývojářské nástroje',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => mainWindow.webContents.toggleDevTools()
                },
                { type: 'separator' },
                {
                    label: 'Ukončit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Nápověda',
            submenu: [
                {
                    label: 'O aplikaci',
                    click: () => {
                        const { dialog } = require('electron');
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'O aplikaci HairBook',
                            message: 'HairBook v1.0.0',
                            detail: 'Profesionální systém pro správu kadeřnictví.\n\n© 2025 HairBook. Všechna práva vyhrazena.',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Načíst aplikaci
    mainWindow.loadURL(`http://localhost:${PHP_PORT}/index.html`);

    // Zobrazit okno až je načteno
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    try {
        await startPHPServer();
        console.log('PHP server started');
        createWindow();
    } catch (error) {
        console.error('Failed to start application:', error);
        app.quit();
    }
});

app.on('window-all-closed', () => {
    if (phpServer) {
        phpServer.kill();
    }
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    if (phpServer) {
        phpServer.kill();
    }
});
