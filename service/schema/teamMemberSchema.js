import mongoose from "mongoose";
import {TeamCollectionName, TeamMemberRoleMap, TeamMemberStatusMap} from "../constant/constant.js";
import {userCollectionName} from "./userSchema.js";

export const TeamMemberSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Types.ObjectId,
    ref: TeamCollectionName,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: userCollectionName,
    required: true
  },
  name: {
    type: String,
    default: 'Member'
  },
  role: {
    type: String,
    enum: Object.keys(TeamMemberRoleMap)
  },
  status: {
    type: String,
    enum: Object.keys(TeamMemberStatusMap)
  },
  createTime: {
    type: Date,
    default: () => new Date()
  },
  defaultTeam: {
    type: Boolean,
    default: false
  }
});
