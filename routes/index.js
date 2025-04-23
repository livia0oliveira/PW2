var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/confirmar', function(req, res){
  const cep = req.body.fcep;

  axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function(response){
      // Verifica se o CEP retornou um erro
      if (response.data.erro) {
        return res.status(400).json({ erro: true });
      }
      
      // Envia a resposta com os dados do endereço
      res.json(response.data);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).send('Erro ao buscar o CEP. Tente novamente.');
    });
});


module.exports = router;
