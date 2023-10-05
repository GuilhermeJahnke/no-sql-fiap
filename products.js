class ProductRepository {
  constructor({ product }) {
    this.product = product;
  }

  async createProduct({ nameOfProduct, price }) {
    try {
      const productCollections = this.product.collection("product");

      const newProduct = {
        nameOfProduct,
        price,
      };

      productCollections.insertOne(newProduct);

      return console.log("Produto criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async getAll() {
    try {
      const productCollections = this.product.collection("product");

      const product = productCollections.find({});

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

      const productCollections = this.product.collection("product");

      productCollections.updateOne(newProduct);

      return console.log("Produto atualizado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteProduct({ nameOfProduct }) {
    try {
      const productCollections = this.product.collection("product");

      productCollections.deleteOne({ nameOfProduct });

      return console.log("Produto deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}

export default ProductRepository;
