// utils/db.js
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${host}:${port}`;
    this.dbName = database;
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    if (!this.connection) {
      try {
        await this.client.connect();
        this.connection = this.client.db(this.dbName);
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        this.connection = null;
      }
    }
    return this.connection;
  }

  async isAlive() {
    try {
      const connection = await this.connect();
      if (connection) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    try {
      const connection = await this.connect();
      const usersCollection = connection.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Failed to get number of users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const connection = await this.connect();
      const filesCollection = connection.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Failed to get number of files:', error);
      return 0;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = { dbClient };
