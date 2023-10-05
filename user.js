class UserRepository {
  constructor({ client }) {
    this.client = client;
  }

  async createUser({ cpf, email, password, fullName }) {
    try {
      const userCollections = this.client.collection("user");

      const newUser = {
        cpf,
        email,
        password,
        fullName,
      };

      userCollections.insertOne(newUser);

      return console.log("Usuário criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async getAll() {
    try {
      const userCollections = this.client.collection("user");

      const users = userCollections.find({});

      return users;
    } catch (error) {
      return console.log(error);
    }
  }

  async editUser(document, { cpf, email, password, fullName }) {
    try {
      const userCollections = this.client.collection("user");

      const newUser = {
        cpf,
        email,
        password,
        fullName,
      };

      userCollections.updateOne(
        {
          cpf: document,
        },
        newUser
      );

      return console.log("Usuário atualizado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteUser({ cpf }) {
    try {
      const userCollections = this.client.collection("user");

      userCollections.deleteOne({ cpf });

      return console.log("Usuário deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}

export default UserRepository;
