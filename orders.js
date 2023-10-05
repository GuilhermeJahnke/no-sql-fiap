class OrderRepository {
  constructor({ client }) {
    this.ordersCollection = client.collection("orders");
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
      const newOrder = {
        customerName,
        status,
      };

      const response = await this.orderCollections.insertOne(newOrder);

      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async updateOrder({ customerName, status }) {
    try {
      const newOrder = {
        customerName,
        status,
      };

      const response = await this.orderCollections.updateOne(
        {
          id: newOrder.id,
        },
        newOrder
      );

      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteOrder(id) {
    try {
      const response = await this.orderCollections.deleteOne({ id });

      return response;
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = OrderRepository;
