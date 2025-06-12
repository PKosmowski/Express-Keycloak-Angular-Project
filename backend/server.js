// const express = require('express');
// const app = express();


// var {NodeAdapter} = require("ef-keycloak-connect");
// const config = {
//         "realm": "projekt-realm",
//         "auth-server-url": "http://localhost:8180/realms/projekt-realm/protocol/openid-connect/auth",
//         "ssl-required": "external",
//         "verify-token-audience": false,
//         "credentials": {
//           "secret": "dRoI794oild4nYxUKMjv1aQL1aqmwSGj"
//         },
//         "use-resource-role-mappings": true,
//         "confidential-port": 0,
//         "policy-enforcer": {},
//         "CLIENT_ID": "angular-app",
//         "CLIENT_DB_ID": "461d914e-4b22-4978-8c67-7fe0dfe45d86",
//         "GRANT_TYPE": "password",
//         "GRANT_TYPE_PAT": "client_credentials",
//         "USERNAME_ADMIN": "admin_name",
//         "PASSWORD_ADMIN": "admin_password",
//         "SCOPE_NAME": "Any default scope",
//         "bearer-only": true
//       }
// const keycloak = new NodeAdapter(config)

// app.get('/api', keycloak.protect(), (req, res) => {
//   res.json({message: 'Hello from API'});
// });

// app.get('/hello', (req, res) => {
//     res.json({message: 'Hello!'});
// });

// app.get("/admin-only", keycloak.protect('realm:admin'), (req, res) => {
//   res.json({ message: "Tylko dla adminów!" });
// });

// app.listen(5000, () => {
//   console.log('Backend: http://localhost:5000');
// });

// ------------------------ new test
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();

const checkJwt = auth({
  issuerBaseURL: 'http://localhost:8180/realms/projekt-realm',
  audience: 'account',
  tokenSigningAlg: 'RS256'
});

function requireRole(roleName) {
  return function (req, res, next) {
    const roles = req.auth?.payload?.realm_access?.roles || [];
    if (roles.includes(roleName)) {
      next();
    } else {
      res.status(403).send('Forbidden – insufficient role');
    }
  };
}

app.get('/public', (req, res) => {
  res.send('Public no token required');
});

app.get('/protected', checkJwt, (req, res) => {
  res.send('Succsess! You accessed a protected endpoint.');
});

app.get('/admin', checkJwt, requireRole('admin'), (req, res) => {
  res.send('Welcome, admin!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});