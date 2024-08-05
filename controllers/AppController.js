// eslint-disable-next-line import/extensions
import db from '../utils/db.js';

export function getStats(req, res) {
  const stats = {
    users: db.nbUsers(),
    files: db.nbFiles(),
  };
  res.status(200).send(stats);
}

export function getStatus(req, res) {
  if (db.isAlive()) {
    return res.status(200).send({ db: true });
  }
  return res.status(500).send({ db: false });
}
