import cors from "cors";
import express from 'express';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';

const app = express()
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 4500;

connectDB();

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


