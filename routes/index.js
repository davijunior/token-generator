var express = require('express');
var router = express.Router();
var multer = require('../tools/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nova-imagem', (req, res, next) => {
  res.send(`
      <html>
          <head> 
              <title> Nova imagem </title>
          </head>
          </body>
              <!-- O enctype é de extrema importância! Não funciona sem! -->
              <form action="/nova-imagem"  method="POST" enctype="multipart/form-data">
                  <!-- O NAME do input deve ser exatamente igual ao especificado na rota -->
                  <input type="file" name="image"><br>
                  Nome: <input type="text" name="name"><br>
                  Tipo: <input type="text" name="type" placeholder="Ex: Criatura - Elfo"> <br>
                  Poder:<input type="text" name="power"><br>
                  Resistência: <input type="text" name="thoughness"><br>
                  Quantidade: <input type="number" name="times" min="1"><br>
                  <button type="submit"> Enviar </button>
              </form>
          </body>
      </html>
  `);
});
router.post('/nova-imagem', multer.single('image'), (req, res, next) => {
  var str = `<div class="card">
          <p class="title-card">${req.body.name}</p>
          <img src='/images/${req.file.filename}'>
          <p class="type">${req.body.type}</p>
          <div class="label">${req.body.power}/${req.body.thoughness}</div>
        </div>`;

  if (req.file) {
      return res.send(`
        <html>
          <head>
            <link rel="stylesheet" href="/stylesheets/style.css">
          </head>
          <body>
            ${str.repeat(req.body.times)}
            <input type="button" name="imprimir" value="Imprimir" onclick="window.print();" id="imprimir">
          </body>
        </html>
      `);
  }
  return res.send('Houve erro no upload!');

});
module.exports = router;
