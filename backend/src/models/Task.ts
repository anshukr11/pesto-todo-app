import { Document, Schema, model } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate?: Date;
  createdAt?: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  dueDate: { type: Date },
  createdAt: { type: Date, default: new Date() },
});

export default model<ITask>('Task', TaskSchema);