import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

const connectToDatabase = async () => {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    return client.db(dbName);
  } catch (error) {
    console.error('Connection failed:', error.message);
    await client.close();
    console.log('Connection closed.');
    process.exit(1); // Exit process with failure
  }
};

const database = await connectToDatabase();

export default database;
