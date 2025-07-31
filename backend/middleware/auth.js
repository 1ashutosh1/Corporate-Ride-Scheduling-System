const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
 const authHeader = req.headers.authorization;
 if(!authHeader || !authHeader.startsWith('Bearer '))
  return res.status(401).json({error: 'No Token, cannot be authorized'});

 const token = authHeader.split(' ')[1];
 try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;  // {id, role}
   next();
 } catch (error) {
   error.statusCode = 401;
   error.message = 'Token is not valid';
   next(error);
 }
}

module.exports = auth;