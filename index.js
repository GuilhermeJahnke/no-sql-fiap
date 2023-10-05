import { MongoClient, ServerApiVersion } from "mongodb";
import OrderRepository from "./orders.js";

(async () => {
  const uri =
    "mongodb+srv://fiap:fiap123@cluster0.umje6.mongodb.net/?retryWrites=true&w=majority";

  await userCRUD(db);
  let client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  client = await client.connect();

  try {
    const db = client.db("fiap");
    console.log("Connected correctly to server");
    const orderRepositry = new OrderRepository({ client: db });
    await orderRepositry.execute();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Disconnecting");
    await client.close();
    process.exit(0);
  }
})();

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
}
