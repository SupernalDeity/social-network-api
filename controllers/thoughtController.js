const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
      })
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No user found with that name" })
          : res.json(result)
      );
  },
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ message: "Thought deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {_id: req.params.reactionsId} } },
      { new: true }
    )
      .then((result) =>
        !result
          ? res.status(404).json({ message: "No thought or reaction found with that ID" })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
};
