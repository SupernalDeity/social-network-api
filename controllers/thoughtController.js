const { Thought, Reaction } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
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
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((result) =>
        !result
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(result)
      )
      .catch((err) => res.status(500).json(err));
  },
};

