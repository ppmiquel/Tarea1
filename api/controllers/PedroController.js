/**
 * PedroController
 *
 * @description :: Server-side logic for managing pedroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `PedroController.pedro()`
   */

  validarFirma: function (req, res) {
  	var mensaje = req.body.mensaje;
  	var hash = req.body.hash;
  	if(!mensaje)
  		return res.badRequest('Falta el valor de mensaje');
  	if(!hash)
  		return res.badRequest('Falta el valor del hash');
  	var crypto = require("crypto-js/sha256");


  	try {
  		var hashear = crypto(mensaje);
  	}
  	catch(e) {
  		return res.serverError(e);
  	}

  	if(hash.toLowerCase() == hashear.toString().toLowerCase()){
  		return res.json({valido: true, mensaje: mensaje});
  	}
  	else {
  		return res.json({valido: false, mensaje: mensaje});
  	}


    
  },
  status: function(req, res) {
  	res.send(201,'');
  },
  texto: function(req, res) {
  	var request = require('request');
  	request('https://s3.amazonaws.com/files.principal/texto.txt', function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	    var crypto = require("crypto-js/sha256");


	  	try {
	  		var hashear = crypto(body);
	  		 return res.json({text: body, hash: hashear.toString()});
	  	}
	  	catch(e) {
	  		return res.serverError(e);
	  	}
	  }
	  else {
	  	res.serverError();
	  }
	});
  }
};

