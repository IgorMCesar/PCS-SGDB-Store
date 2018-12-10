import { app, ipcMain, BrowserWindow } from 'electron' // eslint-disable-line
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
const pg = require('pg');
pg.defaults.ssl = true;
const connectionString = 'postgres://mdlrcnyglculdy:5a012486c2a356fbd62c217b540801571279daf25e1b0b9cae08d3940df3ffda@ec2-50-17-203-51.compute-1.amazonaws.com:5432/d13d9v3les18jq';

const client = new pg.Client({
  connectionString,
});
client.connect();

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false,
    minHeight: 560,
    minWidth: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    client.end();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('/test', (event) => {
  client.query('SELECT * FROM Cliente;', (err, res) => {
    console.log(res);
    const test = res;
    event.sender.send('/tested', test);
  });
});

ipcMain.on('/get/product-list', (event) => {
  client.query('SELECT nome, foto, descricao, categoria, valor, id FROM Artigo WHERE NOT EXISTS (SELECT id FROM Transacao WHERE id = Artigo.id);', (err, res) => {
    event.sender.send('/got/product-list', res);
  });
});

ipcMain.on('/get/auction-list', (event) => {
  client.query('SELECT foto, nome, descricao, categoria, (SELECT nome FROM Cliente WHERE Cliente.id = idUsuarioVendedor) AS nomeUsuarioVendedor, dataInicio, dataFim, lanceMinimo, id FROM Leilao;', (err, res) => {
    event.sender.send('/got/auction-list', res);
  });
});

ipcMain.on('/get/historySale', (event) => {
  client.query('SELECT Transacao.id, (SELECT nome FROM Cliente WHERE Cliente.id = Transacao.idUsuarioComprador) AS nomeUsuarioComprador, (SELECT nome FROM Cliente WHERE Cliente.id = Transacao.idUsuarioVendedor) AS nomeUsuarioVendedor, Artigo.nome AS nomeArtigo, dataTransacao, valor FROM Transacao JOIN Artigo ON idArtigo = Artigo.id WHERE NOT EXISTS (SELECT idTransacao FROM LeilaoEncerrado WHERE idTransacao = Transacao.id);', (err, res) => {
    event.sender.send('/got/historySale', res);
  });
});

ipcMain.on('/get/historyAuction', (event) => {
  client.query('SELECT Transacao.id, (SELECT nome FROM Cliente WHERE Cliente.id = Transacao.idUsuarioComprador) AS nomeUsuarioComprador, (SELECT nome FROM Cliente WHERE Cliente.id = Leilao.idUsuarioVendedor) AS nomeUsuarioVendedor, Artigo.nome AS nomeArtigo, dataInicio, dataFim, valor FROM Leilao JOIN LeilaoEncerrado ON Leilao.id = LeilaoEncerrado.idLeilao JOIN Artigo ON idArtigo = Artigo.id JOIN Transacao ON LeilaoEncerrado.idTransacao = Transacao.id;', (err, res) => {
    console.log(res);
    event.sender.send('/got/historyAuction', res);
  });
});

ipcMain.on('/post/new-product', (event, params) => {
  const values = [params.produto, params.image, params.desc, params.categoria, '1', params.valor];
  const text = 'INSERT INTO Artigo(nome, foto, descricao, categoria, idUsuarioVendedor, valor) VALUES($1,$2,$3,$4,$5,$6);';
  client.query(text, values)
    .then((res) => {
      event.sender.send('/posted/new-product', res);
    })
    .catch(e => console.error(e.stack));
});

ipcMain.on('/post/new-purchase', (event, params) => {
  const values = ['2', '1', params.idArtigo, new Date().toISOString()];
  const text = 'INSERT INTO Transacao(idUsuarioComprador, idUsuarioVendedor, idArtigo, dataTransacao) VALUES($1,$2,$3,$4);';
  client.query(text, values)
    .then((res) => {
      event.sender.send('/posted/new-purchase', res);
    })
    .catch(e => console.error(e.stack));
});

ipcMain.on('/post/new-auction', (event, params) => {
  const values = [params.produto, params.image, params.desc, params.categoria, '1', new Date().toISOString(), params.data, params.valor];
  const text = 'INSERT INTO Leilao(nome, foto, descricao, categoria, idUsuarioVendedor, dataInicio, dataFim, lanceMinimo) VALUES($1,$2,$3,$4,$5,$6,$7,$8);';
  client.query(text, values)
    .then((res) => {
      event.sender.send('/posted/new-auction', res);
    })
    .catch(e => console.error(e.stack));
});
