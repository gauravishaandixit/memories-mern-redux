import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express();
app.use(express.json());
app.use(cors())
dotenv.config()

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(app.listen(PORT, () => (console.log("Backend Server is listening on Port:: " + PORT))))
    .catch((error) => console.log(error))


app.use('/posts', postRoutes);