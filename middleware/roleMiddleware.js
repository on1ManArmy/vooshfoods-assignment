const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const { role } = req.user; 
  
      if (!roles.includes(role)) {
        return res.status(403).json({
          status: 403,
          data: null,
          message: 'Forbidden Access',
          error: null,
        });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  