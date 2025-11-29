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
        console.log('Working directory:', __dirname);
        console.log('App path:', app.getAppPath());
        console.log('Resources path:', process.resourcesPath);
        

        // Nastavit root pouze na api složku
        let apiPath;
        if (app.isPackaged) {
            apiPath = path.join(process.resourcesPath, 'app', 'api');
        } else {
            apiPath = path.join(__dirname, 'api');
        }
        console.log('Serving API from:', apiPath);
        phpServer = spawn(phpPath, ['-S', `localhost:${PHP_PORT}`, '-t', apiPath]);
        
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
    const appUrl = `http://localhost:${PHP_PORT}/index.html`;
    console.log('Loading URL:', appUrl);
    mainWindow.loadURL(appUrl);

    // Zobrazit okno okamžitě (ne až po načtení)
    mainWindow.show();
    
    // Debug - otevřít DevTools automaticky
    mainWindow.webContents.openDevTools();
    
    // Poslouchat chyby načítání
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorCode, errorDescription);
        mainWindow.loadURL(`data:text/html,
            <html>
            <head><title>Chyba</title></head>
            <body style="font-family: Arial; padding: 40px; background: #1a1a2e; color: white;">
                <h1 style="color: #ef4444;">❌ Chyba načítání aplikace</h1>
                <p><strong>URL:</strong> ${appUrl}</p>
                <p><strong>Chyba:</strong> ${errorCode} - ${errorDescription}</p>
                <hr>
                <h3>Řešení:</h3>
                <ol>
                    <li>Zkontrolujte, že je nainstalovaný XAMPP</li>
                    <li>PHP musí být v PATH</li>
                    <li>Restartujte aplikaci</li>
                </ol>
                <p style="margin-top: 40px; color: #888;">
                    PHP Port: ${PHP_PORT}<br>
                    App Path: ${appPath}<br>
                    PHP Path: ${phpPath}
                </p>
            </body>
            </html>
        `);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    try {
        console.log('=== Starting HairBook ===');
        console.log('Platform:', process.platform);
        console.log('__dirname:', __dirname);
        console.log('app.getAppPath():', app.getAppPath());
        console.log('process.resourcesPath:', process.resourcesPath);
        
        await startPHPServer();
        console.log('PHP server started');
        
        // Počkat chvíli, než se server nabootuje
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        createWindow();
    } catch (error) {
        console.error('Failed to start application:', error);
        
        // Zobrazit error okno místo zavření
        const { dialog } = require('electron');
        dialog.showErrorBox(
            'Chyba při spuštění',
            `HairBook se nepodařilo spustit.\n\nChyba: ${error.message}\n\nPodrobnosti najdete v konzoli (F12).`
        );
        
        // Nezavírat, dát uživateli šanci na debug
        // app.quit();
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
