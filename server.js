require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

// Express app
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Health check route (prevents Railway from stopping container)
app.get('/health', (req, res) => {
  res.send('OK')
})

// PORT (Railway sets process.env.PORT)
const PORT = process.env.PORT || 4000

// Connect to MongoDB & start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('DB connection error:', error)
  })
