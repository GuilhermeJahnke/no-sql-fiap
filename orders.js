export default class OrderRepository {
  constructor({ client }) {
    this.ordersCollection = client.collection("orders");
  }

  async execute() {
    // Orders

    console.log("\nConectado a tabela orders com sucesso");
    
    // Create 3 orders
    console.log("\nIniciando a criacao de 3 orders com o metodo createOrder\n")
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

    console.log("\nIniciando a busca de todos os orders com o metodo getAll\n");

    // Get all orders
    const allRegisters = await this.getAll();

    console.log(await allRegisters.toArray());

    // Update order
    console.log("\nIniciando a edicao do order com o metodo updateOrder\n");
    await this.updateOrder({
      customerName: "Adalberto Alves", 
      status: "Finalizado"
    });

    await this.updateOrder({
      customerName: "Fulano de Tal", 
      status: "Finalizado"
    });

    // Get all orders
    console.log("Iniciando a busca de todos os orders com o metodo getAll\n");
    const allRegistersUpdate = await this.getAll();

    console.log(await allRegistersUpdate.toArray());

    // Delete orders
    console.log("\nDeletando todas as orders com o metodo deleteOrder\n");
    await this.deleteOrder("Fulano de Tal");
    await this.deleteOrder("Ciclano de Tal");
    await this.deleteOrder("Adalberto Alves");

    // Get all orders
    console.log("\nIniciando a busca de todos os orders com o metodo getAll\n");
    const allRegistersDelete = await this.getAll();
    console.log(await allRegistersDelete.toArray());

    console.log("\nFinalizando a execucao do OrderRepository");
  }

  
  async createOrder({ customerName, status }) {
    try {
      await this.ordersCollection.insertOne({
        customerName,
        status,
      });
      
      return console.log("Order criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  } 
  
  async getAll() {
    try {
      const orders = await this.ordersCollection.find({});

      return orders;
    } catch (error) {
      return console.log(error);
    }
  }

  async updateOrder({ customerName, status }) {
    try {
      const order = {
        customerName,
        status,
      }

      console.log("Atualizando o order com estes dados:", JSON.stringify(order, null, 2));

      await this.ordersCollection.findOneAndUpdate(
        {
          customerName: {
            $eq: customerName,
          },
        },
        {
          $set: {
            status,
          },
        }
      );

      return console.log("\nOrder atualizado com sucesso!\n")
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteOrder(customerName) {
    try {
      await this.ordersCollection.deleteOne({ customerName });
      return console.log("Order deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}
