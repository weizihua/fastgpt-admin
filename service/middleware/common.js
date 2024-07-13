import {User} from "../schema/index.js";
import {logger} from "../utils/winston.js";

export const validateUserCreation = async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: '需要用户名和密码'});
  }

  // 检查用户名是否已存在
  try {
    const existingUser = await User.findOne({username});
    if (existingUser) {
      console.log(`已存在的用户: ${existingUser}`);
      return res.status(400).json({error: '用户名已存在'});
    }
    next();
  } catch (err) {
    console.log(`检查用户名存在时出错: ${err}`);
    res.status(500).json({error: '服务器错误，无法检查用户名是否存在'});
  }
};

export const logMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    const message = `${req.method} ${req.url} - Status Code: ${res.statusCode} - ${duration}ms `;
    logger[logLevel](message);
  });
  next();
};


