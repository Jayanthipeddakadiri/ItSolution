import mongoose, { Document, Schema } from "mongoose";

interface IJob extends Document {
  title: string;
  description: string;
  experience: number;
}

const jobSchema: Schema<IJob> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

// Check if the model already exists before defining it
const Job = mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);

export default Job;
