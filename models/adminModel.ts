// adminModel.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define an interface for the Admin document
export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the Admin schema
const adminSchema: Schema<IAdmin> = new Schema({
  username: {
    type: String,
    required: [true, "Provide a username"],
  },
  email: {
    type: String,
    required: [true, "Provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
  },
});

// Pre-save hook to hash the password
adminSchema.pre<IAdmin>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Create the Admin model if not already created
const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
