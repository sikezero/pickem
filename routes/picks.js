var request = require('request');

module.exports = (app) => {
  app.get('/:league/:year/:weekNo', (req, res) => {
    const url = 'http://127.0.0.1:' + process.env.PORT + '/api/' + req.params.league + '/' + req.params.year + '/' + req.params.weekNo;
    request({
        url: url,
        method: 'GET'
    }, function(error, response, body) {
        if(error){
          console.log(error);
          res.send(error);
        } else {
          res.render('testing', { picks: JSON.parse(body) });          
        }
    });
  });
  
  app.post('/picks', (req, res) => {
    const url = 'http://127.0.0.1:' + process.env.PORT + '/api/picks';
    request({
      url: url,
      method: 'POST',
      form: req.body
    }, function(error, response, body) {
        if(error){
          console.log(error);
          res.send(error);
        } else {
          res.render('testing2', { picks: JSON.parse(body) });          
        }
    });
  });
  
}