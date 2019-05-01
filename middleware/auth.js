const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if(!authHeader) {
    req.isAuth = false;
    return next();
  }

  const [_, token] = authHeader.split(' ');
  if(!token) {
    req.isAuth = false;
    return next();
  }
 try {
   const decodedToken = jwt.verify(token, config.get('jwtSecret'));
   req.isAuth = true;
   req.userId = decodedToken.userId;
   return next();
   
 } catch (err) {
  req.isAuth = false;
  return next();
 }
}