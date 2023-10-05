class UserRepository {
  constructor({ client }) {
    this.client = client;
  }

  async execute() {
    // ConnectDB

    console.log("\nConectado a tabela usuario com sucesso\n");

    // CREATE
    console.log("\nIniciando a criacao do Usuario com o metodo createUser\n");
    await this.createUser({
      fullName: "Adalberto Alves",
      email: "adalbertoAlves@teste.com",
      password: "123456",
      cpf: "12345678909",
    });

    // GETBYID
    console.log("\nIniciando a busca do usuario com o metodo getByCPF\n");
    let user = await this.getByCpf("12345678909");
    console.log(user);

    // EDIT
    console.log("\nIniciando a edicao do usuario com o metodo editUser\n");
    await this.editUser({
      id: user._id,
      fullName: "FIAP teste ",
      email: "fiapteste@teste.com",
      password: "123456",
      cpf: "12345678909",
    });

    // GETBYID
    console.log(
      "\nIniciando a busca do usuario atualizado com o metodo getByCPF\n"
    );
    let updatedUser = await this.getByCpf("12345678909");

    console.log(updatedUser);

    // GETALL
    console.log(
      "\nIniciando a busca de todos os usuarios com o metodo getAll\n"
    );
    let users = await this.getAll();
    await users.forEach((user) => {
      console.log(user);
    });

    // DELETE
    console.log("\nIniciando a delecao do usuario com o metodo deleteUser\n");

    await this.deleteUser(updatedUser._id);

    // GETALL
    console.log("\nIniciando a busca dos usuarios com o metodo getAll\n");

    let finalUsers = await this.getAll();

    console.log("\nUsuarios encontrados\n");

    await finalUsers.forEach((user) => {
      console.log(user);
    });
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
          _id: id,
        },
        {
          $set: {
            cpf: cpf,
            email: email,
            password: password,
            fullName: fullName,
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

      await userCollections.findOneAndDelete({ _id: id });

      return console.log("Usuario deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}

export default UserRepository;
