const express = require('express');
const {
    create_workout,
    getWorkouts,
    getWorkout,
    delete_workout,
    update_workout
} = require('../controller/workoutController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)


//get all workouts
router.get('/', getWorkouts);

//get a single workout
router.get('/:id', getWorkout);

//post a new workout
router.post('/', create_workout);

//Delete a workout
router.delete('/:id', delete_workout);

//Update a workout
router.patch('/:id', update_workout);

module.exports = router;