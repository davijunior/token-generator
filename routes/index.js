var express = require('express');
var router = express.Router();
var multer = require('../tools/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/nova-imagem', multer.single('image'), (req, res, next) => {
  if(req.body.text.length > 0){
        var str = `<div class="card">
          <p class="title-card">${req.body.name}</p>
          <img src='/images/${req.file.filename}'>
          <p class="text-card">${req.body.text}</p>
          <p class="type with-text">${req.body.type}</p>
          <div class="label">${req.body.power}/${req.body.thoughness}</div>
        </div>`;
      }else{
        var str = `<div class="card">
          <p class="title-card">${req.body.name}</p>
          <img src='/images/${req.file.filename}'>
          <p class="type">${req.body.type}</p>
          <div class="label">${req.body.power}/${req.body.thoughness}</div>
        </div>`;
      }
  

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
