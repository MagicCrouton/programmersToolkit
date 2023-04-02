const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTool);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

// Need a route with toolId to delete or update
module.exports = router;