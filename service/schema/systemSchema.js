import mongoose from "mongoose";

export const SystemSchema = new mongoose.Schema({
  vectorMaxProcess: {
    type: Number,
    default: 10
  },
  qaMaxProcess: {
    type: Number,
    default: 10
  },
  pgIvfflatProbe: {
    type: Number,
    default: 10
  },
  sensitiveCheck: {
    type: Boolean,
    default: false
  }
});
