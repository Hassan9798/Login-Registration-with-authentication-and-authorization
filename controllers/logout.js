function logout(req, res, next) {
    if(req.user) {
    
      req.logout();
      next();
    }else{
      next();
    }
  }
  
  module.exports = logout;