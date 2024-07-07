import express from 'express';
import { sortTasks } from '../helpers/helpers';
import Task from '../models/Task';

const router = express.Router();

// Get all tasks with optional sorting and searching
router.get('/', async (req, res) => {
  try {
    const { sortBy, search } = req.query;
    let query: any = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    let tasksQuery = Task.find(query);

    if (sortBy) {
      const [field, order] = (sortBy as string).split(':');
      const sortCriteria: any = {};
      sortCriteria[field] = order === 'desc' ? -1 : 1;
      tasksQuery = tasksQuery.sort(sortCriteria);
    } else {
      // Default sorting by createdAt in descending order if no sortBy parameter is provided
      tasksQuery = tasksQuery.sort({ createdAt: -1 });
    }

    const tasks = await tasksQuery.exec();
    
    // Sort tasks array to ensure latest created task is on top
    const sortedTasks = sortTasks(tasks)

    res.json(sortedTasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = new Task({ title, description, status, dueDate, createdAtP: new Date() });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(400).json({ message: err.message });
    } else {
        res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
      task.dueDate = dueDate;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
});

export default router;