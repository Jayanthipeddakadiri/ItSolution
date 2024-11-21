import mongoose, { Document, Schema } from "mongoose";

export interface IPTeamMember extends Document {
  name: string;
  position: string;
}

const TeamMemberSchema: Schema<IPTeamMember> = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
});

const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model<IPTeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
