// const MongoClient = require("mongodb").MongoClient;

// Configurações do servidor MongoDB
// const url = "mongodb://localhost:27017"; // URL do servidor MongoDB
// const dbName = "mydatabase"; // Nome do banco de dados

// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// // });

// const { performCRUDOperations } = require("./orders");

import { MongoClient, ServerApiVersion } from "mongodb";

import UserRepository from "./user.js";
import ProductRepository from "./products.js";

const uri =
  "mongodb+srv://fiap:fiap123@cluster0.umje6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const Product = new ProductRepository({ client });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     client = await client.connect();
//     // Send a ping to confirm a successful connection
//     // let mongoClient = await
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//     console.log(client);
//     await performCRUDOperations(client.db("fiap"));
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

(async () => {
  await client.connect();
  const db = client.db("fiap");
  console.log("Connected correctly to server");

  // User
  //   const userRepositry = new UserRepository({ client: db });

  //   await userRepositry.createUser({
  //     fullName: "Adalberto Alves",
  //     email: "adalbertoAlves@teste.com",
  //     password: "123456",
  //     cpf: "12345678909",
  //   });
  //   await userRepositry.editUser("651e0c1d3ea065a3d15fe43a", {
  //     fullName: "Ababababaa",
  //     email: "Ababababaa@teste.com",
  //     password: "123456",
  //     cpf: "12345678909",
  //   });

  //  await userRepositry.getAll();

  // Product

  // Orders

  // Finalizando conexão
  setTimeout(async () => {
    await client.close();
  }, 1500);
  console.log("Disconnected correctly to server");
})();

// run().catch(console.dir);
