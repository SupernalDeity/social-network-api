const router = require('express').Router();

const {
  getAllThoughts,
  getThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions/').post(addReaction);
;
router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;