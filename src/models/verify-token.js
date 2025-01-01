import jwt from 'jsonwebtoken'
import Blacklist from './blacklist/index.js';

const JWT_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const authenticateJWT=(req, res, next)=> {
  const token = req.header('Authorization')?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(201).json({success:false, message: 'Unauthorized' });
  }

  // Check if token is blacklisted
  Blacklist.findOne({ token })
    .then((blacklistedToken) => {
      if (blacklistedToken) {
        return res.status(201).json({success:false, message: 'Token is blacklisted' });
      }

      // Verify the JWT token
      jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(201).json({success:false, message: 'Forbidden' });
        }
        req.user = user;
        next();
      });
    })
    .catch((err) => {
      res.status(201).json({success:fals, message: 'Server error' });
    });
}

export default authenticateJWT;