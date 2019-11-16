const express = require('express');
var path = require("path");
const app = express();

app.use( '/app', express.static( __dirname + '/app' ));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080! _dirname =' + __dirname));

