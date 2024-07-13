import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {appSchema} from "./appSchema.js";
import {datasetSchema} from "./datasetSchema.js";
import {UserSchema} from "./userSchema.js";
import {paySchema} from "./paySchema.js";
import {SystemSchema} from "./systemSchema.js";
import {TeamMemberSchema} from "./teamMemberSchema.js";
import {TeamSchema} from "./teamSchema.js";

dotenv.config({path: '.env.local'});

const mongoUrl = process.env.MONGODB_URI;
const mongoDBName = process.env.MONGODB_NAME;

if (!mongoUrl || !mongoDBName) {
  throw new Error('db error');
}

// 连接数据库
mongoose
  .connect(mongoUrl, {
    dbName: mongoDBName,
    bufferCommands: true,
    maxPoolSize: 5,
    minPoolSize: 1,
    maxConnecting: 5
  })
  .then(() => console.log('成功连接MongoDB!'))
  .catch((err) => console.log(`连接到MongoDB时出错: ${err}`));

// 表结构
export const App = mongoose.models['apps'] || mongoose.model('apps', appSchema);
export const DataSet = mongoose.models['dataset'] || mongoose.model('dataset', datasetSchema);
export const User = mongoose.models['user'] || mongoose.model('user', UserSchema);
export const Pay = mongoose.models['pay'] || mongoose.model('pay', paySchema);
export const System = mongoose.models['system'] || mongoose.model('system', SystemSchema);
export const Team = mongoose.models['teams'] || mongoose.model('teams', TeamSchema);
export const TeamMember = mongoose.models['team_members'] || mongoose.model('team_members', TeamMemberSchema);
