import pkg from 'mongodb';
import { equal } from 'assert';

const { MongoClient } = pkg;

class DBClient {
  constructor() {
    this.port = process.env.DB_PORT || '27017';
    this.dbName = 'files_manager';
    this.url = process.env.DB_HOST || `mongodb://localhost:${this.port}`;
    MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
      equal(null, err);
      this.db = client.db(this.dbName);
    });
  }

  isAlive() {
    return this.db !== undefined;
  }

  async nbUsers() {
    // const usersInsert = await this.db.collection('users').insertOne({username:'test',email:'test1@gmail', password:"12345"});
    // console.log(usersInsert);
    
    return await this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
