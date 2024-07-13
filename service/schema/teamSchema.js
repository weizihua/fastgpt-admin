import mongoose from "mongoose";
import {userCollectionName} from "./userSchema.js";
import {FullPermission} from "../constant/permisson.js";

export const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userCollectionName
  },
  defaultPermission: {
    type: Number,
    default: FullPermission
  },
  avatar: {
    type: String,
    default: '/icon/logo.ico'
  },
  createTime: {
    type: Date,
    default: () => Date.now()
  },
  balance: {
    type: Number,
    default: 0
  },
  teamDomain: {
    type: String
  },
  limit: {
    lastExportDatasetTime: {
      type: Date
    },
    lastWebsiteSyncTime: {
      type: Date
    }
  },
  lafAccount: {
    token: {
      type: String
    },
    appid: {
      type: String
    },
    pat: {
      type: String
    }
  }
});

try {
  TeamSchema.index({name: 1});
  TeamSchema.index({ownerId: 1});
} catch (error) {
  console.log(error);
}

