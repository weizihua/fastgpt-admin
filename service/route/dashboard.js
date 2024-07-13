import {App} from "../schema/index.js";

export const useDashboardRoute = (app) => {
  // 获取应用数量
  app.get('/apps/count', async (req, res) => {
    try {
      const totalAppsCount = await App.countDocuments();
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count', totalAppsCount);
      res.json({totalApps: totalAppsCount});
    } catch (err) {
      console.log(`Error getting app count: ${err}`);
      res.status(500).json({error: 'Error getting app count', details: err.message});
    }
  });
}
