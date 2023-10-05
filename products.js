const MongoClient = require('mongodb').MongoClient;

// Configurações do servidor MongoDB
const url = 'mongodb://localhost:27017'; // URL do servidor MongoDB
const dbName = 'mydatabase'; // Nome do banco de dados

// Função para realizar operações CRUD
async function performCRUDOperations() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect(); // Conecta ao servidor MongoDB

    // Coleção 2: Produtos
    const productsCollection = client.db(dbName).collection('products');

    // Criação de Produto
    const newProduct = {
      name: 'Product A',
      description: 'This is product A',
      price: 19.99,
      stockQuantity: 100
    };

    const insertProductResult = await productsCollection.insertOne(newProduct);
    console.log('Produto criado:', insertProductResult.insertedId);

    // Consulta de Produto
    const foundProduct = await productsCollection.findOne({ name: 'Product A' });
    console.log('Produto encontrado:', foundProduct);

    // Atualização de Produto
    const updateProductResult = await productsCollection.updateOne(
      { name: 'Product A' },
      { $set: { price: 24.99 } }
    );

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    client.close(); // Fecha a conexão com o banco de dados
  }
}

performCRUDOperations();