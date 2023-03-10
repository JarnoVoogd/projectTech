// // const { MongoClient } = require('mongodb');

// // async function main() {
// //     /**
// //      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
// //      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
// //      */
// //     const uri = "mongodb+srv://jarnovoogd:q3Xm4QeZpctmyzhu@clustertech.jw7brlz.mongodb.net/?retryWrites=true&w=majority";

// //     /**
// //      * The Mongo Client you will use to interact with your database
// //      * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
// //      * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
// //      * pass option { useUnifiedTopology: true } to the MongoClient constructor.
// //      * const client =  new MongoClient(uri, {useUnifiedTopology: true})
// //      */
// //     const client = new MongoClient(uri);

// //     try {
// //         // Connect to the MongoDB cluster
// //         await client.connect();

// //         await findOneListingByName(client, "Jarno Voogd");

// //         // Make the appropriate DB calls
// //         // await listDatabases(client);

// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         // Close the connection to the MongoDB cluster
// //         await client.close();
// //     }
// // }

// // main().catch(console.error);

// // // /**
// // //  * Print the names of all available databases
// // //  * @param {MongoClient} client A MongoClient that is connected to a cluster
// // //  */
// // // async function listDatabases(client) {
// // //     const databasesList = await client.db().admin().listDatabases();

// // //     console.log("Databases:");
// // //     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// // // }

// // async function findOneListingByName(client, nameOfListing) {
// //     // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
// //     const result = await client.db("bloktech").collection("profiles_bloktech").findOne({ name: nameOfListing });

// //     if (result) {
// //         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
// //         console.log(result);
// //     } else {
// //         console.log(`No listings found with the name '${nameOfListing}'`);
// //     }
// // }



// const app = express();

// require('dotenv'). config({ path: '‚env' });
// const PORT = process.env.PORT || 1337;

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.DB_CONNECTION_STRING;

// const client = new MongoClient(
//     uri,
//     { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiversion.v1 }
// )

// client.connect ()
//     .then((res) = console.log('@@-- connection established', res)) 
//     .catch( (err) => console.log('@@-- error', err))

// app.listen (PORT, () => {
// console.log('Server listenting to port: PORT')

// app.get('/', (req, res) => {
//     res.json({
//         succes: true, 
//         message: 'connected'
//     })
// });

