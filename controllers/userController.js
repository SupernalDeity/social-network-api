const { User } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    User.find()
    then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
  User.create(req.body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
}
