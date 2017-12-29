const app       = require('./app');

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running...");
});