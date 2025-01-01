import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
   
  var bearerToken = req.headers['authorization'];
  if (!bearerToken)
    return res.status(201).send({ status: false,data:{}, message: 'Auth token not provided.' });
  var getArrToken=bearerToken.split(" ");
  let token=getArrToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(201).send({ status: false,data:{},account_status:400, message: 'Unauthorized! Access Token was expired!' });
    }
    if (err instanceof jwt.NotBeforeError) {
      return res.status(201).send({ status: false,data:{},account_status:401, message: 'Unauthorized! Access Token not active' });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(201).send({ status: false,data:{},account_status:402, message: 'Unauthorized! Access Token Invalid ' });
    }
    req.userId = decoded._id;
    req.auth_token = token;
    next();
  });
}

export {verifyToken};