const express = require('express');
const app = express();


var {NodeAdapter} = require("ef-keycloak-connect");
const config = require(`${Path_To_Config_File}`);
const keycloak = new NodeAdapter(config)

app.use(keycloak.middleware());

app.get('/api', keycloak.protect(), (req, res) => {
  res.json({message: 'Hello from API'});
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});