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
};
