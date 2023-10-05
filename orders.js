const MongoClient = require('mongodb').MongoClient;

// Configurações do servidor MongoDB
const url = 'mongodb://localhost:27017'; // URL do servidor MongoDB
const dbName = 'mydatabase'; // Nome do banco de dados

// Função para realizar operações CRUD
async function performCRUDOperations() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect(); // Conecta ao servidor MongoDB

    // Coleção 3: Pedidos
    const ordersCollection = client.db(dbName).collection('orders');

    console.log('Produto atualizado:', updateProductResult.modifiedCount);
    // Criação de Pedido
    const newOrder = {
      customerName: 'Alice Smith',
      items: [
        { productId: foundProduct._id, quantity: 2 },
        // Adicione mais itens aqui, conforme necessário
      ],
      status: 'Pending'
    };
    const insertOrderResult = await ordersCollection.insertOne(newOrder);
    console.log('Pedido criado:', insertOrderResult.insertedId);

    // Consulta de Pedido
    const foundOrder = await ordersCollection.findOne({ customerName: 'Alice Smith' });
    console.log('Pedido encontrado:', foundOrder);

    // Atualização de Pedido
    const updateOrderResult = await ordersCollection.updateOne(
      { customerName: 'Alice Smith' },
      { $set: { status: 'Shipped' } }
    );
    console.log('Pedido atualizado:', updateOrderResult.modifiedCount);

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    client.close(); // Fecha a conexão com o banco de dados
  }
}

performCRUDOperations();