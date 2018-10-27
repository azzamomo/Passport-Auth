/*
var connection = mysql.createConnection({
  host     : 'localhost',
  port	   : '3310',
  user     : 'root',
  password : 'password',
  database : 'AMB'
});
*/

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/thankyou', function(req, res) {
	res.render('thankyou');
});

app.post('/submitted', function(req, res) {
	//console.log(req.body);

	var prenom = req.body.prenom;
	var nom = req.body.nom;
	var doti = req.body.doti;
	var comment = req.body.comment;

	console.log(prenom + ' ' + nom + ' ' + doti);

	req.checkBody('prenom', 'Le prenom est necessaire').notEmpty();
	req.checkBody('nom', 'Le nom est necessaire').notEmpty();
	req.checkBody('doti', 'Le doti est necessaire').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('index', {
			errors: errors
		});
	} else {
		/*connection.query('INSERT INTO PROFESSEUR (ID, NOM, PRENOM, DOTI, COMMENT) VALUES(?, ?, ?, ?, ?);', [1, nom, prenom, doti, comment], function (error, results, fields) {
 		if (error) throw error;

 		connection.release();

	});*/
	}
	
	res.render('thankyou');
});

/*
connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('Connection to DB successful');
	}
});*/