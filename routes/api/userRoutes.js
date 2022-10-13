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

router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;