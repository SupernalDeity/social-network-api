const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;