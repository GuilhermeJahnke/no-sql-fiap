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

      await userCollections.insertOne(newUser);

      return console.log("Usuario criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async getAll() {
    try {
      const userCollections = this.client.collection("user");

      const users = await userCollections.find({});

      return users;
    } catch (error) {
      return console.log(error);
    }
  }

  async getByCpf(cpf) {
    try {
      const userCollections = this.client.collection("user");

      const user = await userCollections.findOne({ cpf: cpf });

      return user;
    } catch (error) {
      return console.log(error);
    }
  }

  async editUser({ id, cpf, email, password, fullName }) {
    try {
      const userCollections = this.client.collection("user");

      await userCollections.findOneAndUpdate(
        {
          "_id": id,
        },
        {
          $set: {
            "cpf": cpf,
            "email": email,
            "password": password,
            "fullName": fullName,
          },
        }
      );

      return console.log("Usuario atualizado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteUser(id) {
    try {
      const userCollections = this.client.collection("user");
     
      await userCollections.findOneAndDelete({ "_id" : id });

      return console.log("Usuario deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}

export default UserRepository;
