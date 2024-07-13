import mongoose from "mongoose";
import {hashPassword} from "../route/user.js";

export const userCollectionName = 'users';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // 唯一
  },
  email: {
    type: String
  },
  phonePrefix: {
    type: Number
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    set: (val) => hashPassword(val),
    get: (val) => hashPassword(val),
    select: false
  },
  createTime: {
    type: Date,
    default: () => new Date()
  },
  avatar: {
    type: String,
    default: '/icon/human.svg'
  },
  status: {
    type: String,
    default: 'active'
  },
  promotionRate: {
    type: Number,
    default: 15
  },
  openaiAccount: {
    type: {
      key: String,
      baseUrl: String
    }
  },
  timezone: {
    type: String,
    default: 'Asia/Shanghai'
  },
  lastLoginTmbId: {
    type: mongoose.Types.ObjectId
  }
});
