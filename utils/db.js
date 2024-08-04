import MongoClient from 'mongodb/lib/mongo_client.js';

class DBClient {
  constructor() {
    this.url = process.env.DB_HOST || 'mongodb://localhost:27017';
    this.dbName = process.env.DB_DATABASE || 'files_manager';
    MongoClient.connect(this.url, (err, client) => {
      console.log('Connected successfully to server');

      client.db(this.dbName);

      client.close();
    });
  }
}

const dbClient = new DBClient();
export default dbClient;
