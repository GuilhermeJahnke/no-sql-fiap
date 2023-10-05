import { MongoClient, ServerApiVersion } from "mongodb";
import OrderRepository from "./orders.js";
import UserRepository from "./user.js";

(async () => {
  const uri =
    "mongodb+srv://fiap:fiap123@cluster0.umje6.mongodb.net/?retryWrites=true&w=majority";

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
    // Order
    const orderRepositry = new OrderRepository({ client: db });
    await orderRepositry.execute();

    // User
    // const userRepositry = new UserRepository({ client: db });
    // await userRepositry.execute();

    // Products
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Disconnecting");
    await client.close();
    process.exit(0);
  }
})();
