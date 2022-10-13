const { User, Thought } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((result) => res.json(result))
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
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((result) =>
        !result
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
