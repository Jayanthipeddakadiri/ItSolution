import mongoose, { Document, Schema } from "mongoose";

interface ServicesType extends Document {
  title: string;
  description: string;
  learnMore: string;
}

const ServiceSchema: Schema<ServicesType> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  learnMore: {
    type: String,
  },
});

const Service =
  mongoose.models.Service ||
  mongoose.model<ServicesType>("Service", ServiceSchema);

export default Service;
