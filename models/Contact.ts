import mongoose, { Document, Schema } from "mongoose";

interface ContactType extends Document {
  name: string;
  email: string;
  contactnumber: number;
  message: string;
}

const ContactSchema: Schema<ContactType> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
const Contact =
  mongoose.models.Contact ||
  mongoose.model<ContactType>("Contact", ContactSchema);

export default Contact;
