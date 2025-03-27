const express = require('express');
const app = express();


var {NodeAdapter} = require("ef-keycloak-connect");
const config = {
        "realm": "projekt-realm",
        "auth-server-url": "http://localhost:8180:port/auth/",
        "ssl-required": "external",
        "resource": "keycloak_resource_name",
        "verify-token-audience": false,
        "credentials": {
          "secret": "dRoI794oild4nYxUKMjv1aQL1aqmwSGj"
        },
        "use-resource-role-mappings": true,
        "confidential-port": 0,
        "policy-enforcer": {},
        "CLIENT_ID": "angular-app",
        "CLIENT_DB_ID": "461d914e-4b22-4978-8c67-7fe0dfe45d86",
        "GRANT_TYPE": "password",
        "GRANT_TYPE_PAT": "client_credentials",
        "USERNAME_ADMIN": "admin_name",
        "PASSWORD_ADMIN": "admin_password",
        "SCOPE_NAME": "Any default scope",
        "bearer-only": true
      }
const keycloak = new NodeAdapter(config)

app.get('/api', keycloak.protect(), (req, res) => {
  res.json({message: 'Hello from API'});
});

app.get('/hello', (req, res) => {
    res.json({message: 'Hello!'});
});

app.listen(5000, () => {
  console.log('Backend: http://localhost:5000');
});