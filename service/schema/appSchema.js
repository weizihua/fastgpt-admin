import mongoose from "mongoose";
import {AppTypeMap, PermissionTypeMap, TeamCollectionName, TeamMemberCollectionName} from "../constant/constant.js";

export const appSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TeamCollectionName,
    required: true
  },
  tmbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TeamMemberCollectionName,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'advanced',
    enum: Object.keys(AppTypeMap)
  },
  version: {
    type: String,
    enum: ['v1', 'v2']
  },
  avatar: {
    type: String,
    default: '/icon/logo.ico'
  },
  intro: {
    type: String,
    default: ''
  },
  updateTime: {
    type: Date,
    default: () => new Date()
  },

  // tmp store
  modules: {
    type: Array,
    default: []
  },
  edges: {
    type: Array,
    default: []
  },

  scheduledTriggerConfig: {
    cronString: {
      type: String
    },
    timezone: {
      type: String
    },
    defaultPrompt: {
      type: String
    }
  },
  scheduledTriggerNextTime: {
    type: Date
  },

  inited: {
    type: Boolean
  },
  permission: {
    type: String,
    enum: Object.keys(PermissionTypeMap),
    default: 'private'
  },
  teamTags: {
    type: [String]
  }
});
