import mongoose, { Schema, Document, Model } from "mongoose";

interface JobApplication extends Document {
  firstname: string;
  lastname: string;
  role: string;
  availableDate: Date;
  experience: number;
  place: string;
}

const JobApplicationSchema: Schema<JobApplication> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  availableDate: { type: Date, required: true },
  experience: { type: Number, required: true },
  place: { type: String, required: true },
});

const JobApplication: Model<JobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<JobApplication>("JobApplication", JobApplicationSchema);

export default JobApplication;
