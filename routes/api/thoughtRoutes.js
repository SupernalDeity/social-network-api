const router = require('express').Router();

const {
  getAllThoughts,
  getaThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

module.exports = router;