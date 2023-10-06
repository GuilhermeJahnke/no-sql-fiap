class UserRepository {
  constructor({ client }) {
    this.userCollection = client.collection("user");
  }

  async execute() {
    // ConnectDB
    console.log("\nConectado a tabela usuario com sucesso");

    // CREATE
    console.log("\nIniciando a criacao de 3 Usuarios com o metodo createUser\n");
    await this.createUser({
      fullName: "Adalberto Alves",
      email: "adalbertoAlves@teste.com",
      password: "123456",
      cpf: "12345678909",
    });
    await this.createUser({
      fullName: "Fulano de Tal",
      email: "fulanodetal@teste.com",
      password: "123456",
      cpf: "43542227013",
    });
    await this.createUser({
      fullName: "Ciclano de Tal",
      email: "ciclanodetal@teste.com",
      password: "123456",
      cpf: "73456377002",
    });

    console.log(
      "\nIniciando a busca de todos os usuarios com o metodo getAll\n"
    );

    let firstSearch = await this.getAll();

    console.log(await firstSearch.toArray());

    // EDIT
    console.log("\nIniciando a edicao do usuario com o metodo editUser\n");
    await this.editUser({
      fullName: "FIAP teste ",
      email: "fiapteste@teste.com",
      password: "123456",
      cpf: "12345678909",
    });
    await this.editUser({
      fullName: "FIAP teste 2",
      email: "fiapteste2@teste.com",
      password: "123456",
      cpf: "43542227013",
    });

    // GETALL
    console.log(
      "Iniciando a busca de todos os usuarios com o metodo getAll\n"
    );
    let users = await this.getAll();

    console.log(await users.toArray());


    // DELETE
    console.log("\nDeletando todos os usuarios criado\n");
    
    await this.deleteUser("12345678909");
    await this.deleteUser("43542227013");
    await this.deleteUser("73456377002");

    console.log("\nIniciando a busca dos usuarios com o metodo getAll\n");
    
    let finalUsers = await this.getAll();

    console.log("Usuarios encontrados\n");

    console.log(await finalUsers.toArray())

    console.log("\nFinalizando a execucao do UserRepository\n");
  }

  async createUser({ cpf, email, password, fullName }) {
    try {

      const newUser = {
        cpf,
        email,
        password,
        fullName,
      };

      await this.userCollection.insertOne(newUser);

      return console.log("Usuario criado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }

  async getAll() {
    try {

      const users = await this.userCollection.find({});

      return users;
    } catch (error) {
      return console.log(error);
    }
  }

  async editUser({ cpf, email, password, fullName }) {
    try {
      let user = {
        cpf,
        email,
        password,
        fullName
      }

      console.log("Atualizando o usuario com estes dados:", JSON.stringify(user, null, 2));

      await this.userCollection.findOneAndUpdate(
        {
          cpf: cpf,
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

      return console.log("\nUsuario atualizado com sucesso!\n");
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteUser(cpf) {
    try {

      await this.userCollection.findOneAndDelete({ cpf: cpf });

      return console.log("Usuario deletado com sucesso!");
    } catch (error) {
      return console.log(error);
    }
  }
}

export default UserRepository;
