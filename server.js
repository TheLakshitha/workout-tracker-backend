require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

//express app
const app = express();

//connet to DB & listen for requests

// PORT (must support Railway)
const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listeneing on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })


//middleware
app.use(express.json()); //looks for any body in the reqest and passes it req object

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


