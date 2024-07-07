import mongoose, { ConnectOptions } from 'mongoose';

const uri = 'mongodb+srv://anshukr96:anshusai11@cluster0.d3nmncn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;