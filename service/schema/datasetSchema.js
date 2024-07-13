// 新增: 定义 kb 模型
import mongoose from "mongoose";

export const datasetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tmbId: mongoose.Schema.Types.ObjectId,
  avatar: String,
  name: String,
  updateTime: Date,
  permission: String,
  __v: Number
});
