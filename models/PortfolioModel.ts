import mongoose, { Document, Schema } from "mongoose";

interface IPortFolio extends Document {
  title: string;
  description: string;
  learnMore: string;
}

const PortfolioSchema: Schema<IPortFolio> = new Schema({
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

const PortFolio =
  mongoose.models.Portfolio ||
  mongoose.model<IPortFolio>("Portfolio", PortfolioSchema);

export default PortFolio;
