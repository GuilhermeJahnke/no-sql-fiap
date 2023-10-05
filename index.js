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
import productRepositry from "./products.js";

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

  await userCRUD(db);

  // Product

  // Orders

  // Finalizando conexão
  setTimeout(async () => {
    await client.close();
  }, 1500);
  console.log("Disconnected correctly to server");
})();

// run().catch(console.dir);

async function userCRUD(db) {
  // ConnectDB
  const userRepositry = new UserRepository({ client: db });

  console.log("\nConectado a tabela usuario com sucesso\n");

  // CREATE
  console.log("\nIniciando a criacao do Usuario com o metodo createUser\n");
  await userRepositry.createUser({
    fullName: "Adalberto Alves",
    email: "adalbertoAlves@teste.com",
    password: "123456",
    cpf: "12345678909",
  });

  // GETBYID
  console.log("\nIniciando a busca do usuario com o metodo getByCPF\n");
  let user = await userRepositry.getByCpf("12345678909");
  console.log(user);

  // EDIT
  console.log("\nIniciando a edicao do usuario com o metodo editUser\n");
  await userRepositry.editUser({
    id: user._id,
    fullName: "FIAP teste ",
    email: "fiapteste@teste.com",
    password: "123456",
    cpf: "12345678909",
  });

  // GETBYID
  console.log(
    "\nIniciando a busca do usuario atualizado com o metodo getByCPF\n"
  );
  let updatedUser = await userRepositry.getByCpf("12345678909");

  console.log(updatedUser);

  // GETALL
  console.log("\nIniciando a busca de todos os usuarios com o metodo getAll\n");
  let users = await userRepositry.getAll();
  await users.forEach((user) => {
    console.log(user);
  });

  // DELETE
  console.log("\nIniciando a delecao do usuario com o metodo deleteUser\n");

  await userRepositry.deleteUser(updatedUser._id);

  // GETALL
  console.log("\nIniciando a busca dos usuarios com o metodo getAll\n");

  let finalUsers = await userRepositry.getAll();

  console.log("\nUsuarios encontrados\n");

  await finalUsers.forEach((user) => {
    console.log(user);
  });

  async function productsCRUD(db) {
    // ConnectDB
    const productRepositry = new productRepositry({ client: db });

    console.log("\nConectado a tabela de produtos com sucesso\n");
  }

  // CREATE
  console.log("\nIniciando a criacao de produtos com o metodo createProduct\n");
  await productRepositry.createProduct({
    nameOfProduct: "Batata",
    price: "20.00",
  });

  // GETALL
  console.log("\nIniciando a busca de todos os produtos com o metodo getAll\n");
  let products = await productRepositry.getAll();
  await products.forEach((product) => {
    console.log(product);
  });

  // EDIT
  console.log("\nIniciando a edicao do produto com o metodo editProduct\n");
  await productRepositry.editProduct({
    nameOfProduct: "Arroz",
    price: "30.00",
  });

  // DELETE
  console.log("\nIniciando a delecao de produtos com o metodo deleteUser\n");

  await productRepositry.deleteProduct(nameOfProduct);
}
