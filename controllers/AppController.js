// eslint-disable-next-line import/extensions
import db from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AppController {
  async getStats(req, res) {
    const stats = {
      users: await db.nbUsers(),
      files: await db.nbFiles(),
    };
    res.status(200).send(stats);
  }

  getStatus(req, res) {
    if (db.isAlive() && redisClient.isAlive()) {
      return res.status(200).send({ redis: true, db: true });
    }
    return res.status(500).send({ db: false });
  }
}
const appController = new AppController();
export default appController;

