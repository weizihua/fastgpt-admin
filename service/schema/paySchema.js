// 新增: 定义 pays 模型
import mongoose from "mongoose";

export const paySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  price: Number,
  orderId: String,
  status: String,
  createTime: Date,
  __v: Number
});
