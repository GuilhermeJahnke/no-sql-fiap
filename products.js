class ProductRepository {
  constructor({ client }) {
    this.productCollection = client.collection("product");
  }

  async execute() {
    // ConnectDB
    console.log("\nConectado a tabela produto com sucesso");

    // // CREATE
    console.log("\nIniciando a criacao de 3 produtos com o metodo createProduct\n");
    
    await this.createProduct({
      nameOfProduct: "Laranja",
      price: 10,
    });
    await this.createProduct({
      nameOfProduct: "Banana",
      price: 15,
    });
    await this.createProduct({
      nameOfProduct: "Maca",
      price: 20,
    });
    
    console.log(
      "\nIniciando a busca de todos os produtos com o metodo getAll\n"
    );
    
    let firstSearch = await this.getAll();

    console.log(await firstSearch.toArray());

    // EDIT
    console.log("\nIniciando a edicao do produto com o metodo editProduct\n");

    await this.editProduct({
      nameOfProduct: "Laranja",
      price: 5,
    });
    await this.editProduct({
      nameOfProduct: "Banana",
      price: 10,
    });

    // GETALL
    console.log(
      "Iniciando a busca de todos os produtos com o metodo getAll\n"
    );

    let products = await this.getAll();

    console.log(await products.toArray());

    // // DELETE
    console.log("\nDeletando todos os produtos criado\n");

    await this.deleteProduct({
      nameOfProduct: "Laranja",
    });
    await this.deleteProduct({
      nameOfProduct: "Banana",
    });
    await this.deleteProduct({
      nameOfProduct: "Maca",
    });

    console.log("\nIniciando a busca dos produtos com o metodo getAll\n");
    
    let finalUsers = await this.getAll();

    console.log("Produtos encontrados\n");

    console.log(await finalUsers.toArray())

    console.log("\nFinalizando a execucao do UserRepository\n");
  }

  async createProduct({ nameOfProduct, price }) {
    try {
      const newProduct = {
        nameOfProduct,
        price,
      };

     await this.productCollection.insertOne(newProduct);

      return console.log("Produto criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async getAll() {
    try {

      const product = await this.productCollection.find({});

      return product;
    } catch (error) {
      return console.log(error);
    }
  }

  async editProduct({ nameOfProduct, price }) {
    try {
      const newProduct = {
        nameOfProduct,
        price,
      };

      console.log("Atualizando o produto com estes dados:", JSON.stringify(newProduct, null, 2));

      await this.productCollection.findOneAndUpdate(
        {
          nameOfProduct: {
            $eq: nameOfProduct,
          },
        },
        {
          $set: {
            price: price,
            nameOfProduct: nameOfProduct,
          },
        }
      );

      return console.log("\nProduto atualizado com sucesso!\n");
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteProduct({ nameOfProduct }) {
    try {

     await this.productCollection.findOneAndDelete({ nameOfProduct });

      return console.log("Produto deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

}

export default ProductRepository;
