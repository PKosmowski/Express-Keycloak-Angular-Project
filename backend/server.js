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
      res.status(403).send('Acces denied: no permission for this role');
    }
  };
}

app.get('/public', (req, res) => {
  res.send('Endpoint without authentication');
});

app.get('/protected', checkJwt, (req, res) => {
  res.send('Succsess! You accessed a protected endpoint.');
});

app.get('/admin', requireRole('admin'), checkJwt, (req, res) => {
  res.send('Welcome, admin!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});