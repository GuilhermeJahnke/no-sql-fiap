export default class OrderRepository {
  constructor({ client }) {
    this.ordersCollection = client.collection("orders");
  }

  async execute() {
    // Orders
    // Create 3 orders
    await this.createOrder({
      customerName: "Adalberto Alves",
      status: "Pendente",
    });
    await this.createOrder({
      customerName: "Fulano de Tal",
      status: "Pendente",
    });
    await this.createOrder({
      customerName: "Ciclano de Tal",
      status: "Pendente",
    });

    // Get all orders
    const allRegisters = await this.getAll();

    console.log(await allRegisters.toArray());
    for await (const doc of allRegisters) {
      console.dir(doc);
    }

    // Update order
    await this.updateOrder("Adalberto Alves", "Finalizado");
    await this.updateOrder("Fulano de Tal", "Finalizado");

    // Delete orders
    await this.deleteOrder("Fulano de Tal");
    await this.deleteOrder("Ciclano de Tal");
    await this.deleteOrder("Adalberto Alves");
  }
  async getAll() {
    try {
      const orders = await this.ordersCollection.find({});

      return orders;
    } catch (error) {
      return console.log(error);
    }
  }

  async createOrder({ customerName, status }) {
    try {
      return await this.ordersCollection.insertOne({
        customerName,
        status,
      });
    } catch (error) {
      return console.log(error);
    }
  }

  async updateOrder({ customerName, status }) {
    try {
      return await this.ordersCollection.updateOne(
        {
          customerName,
        },
        {
          $set: {
            status,
          },
        }
      );
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteOrder(customerName) {
    try {
      return await this.ordersCollection.deleteOne({ customerName });
    } catch (error) {
      return console.log(error);
    }
  }
}
