# **Projeto CRUD - Faculdade FIAP**

## Descrição do Projeto
Este projeto consiste em um sistema CRUD (Create, Read, Update, Delete) desenvolvido para a FIAP. O sistema gerencia três tabelas: Products, Users e Orders. Além disso, todos os logs do sistema são armazenados em uma pasta chamada `LOGS`.

## **Tecnologias Utilizadas**
O projeto foi desenvolvido utilizando as seguintes tecnologias:
- Node.js
- MongoDB


## **Como executar e usar**

- Clone o repositorio:  `git clone https://github.com/GuilhermeJahnke/no-sql-fiap.git`
- Acessa a pasta do projeto no terminal: `cd no-sql-fiap`
- Instale as dependências: `npm install`
- Execute a aplicação em modo desenvolvimento: `npm run start`
- Agora é so executar os requests que deseja na URL Base: `http://localhost:3000`

## **Banco de Dados**

As chaves do banco de dados já estão vinculadas ao projeto. Portanto, não é necessário realizar nenhuma configuração adicional para conectar-se ao MongoDB.

## **Collections:**

### User

- **Document:**
  ```json
  {
  "_id": "ObjectId",
  "cpf": "string",
  "email": "string",
  "password": "string",
  "fullname": "string",
  }
  ```

---
 ### Products

- **Document:**
  ```json
    {
      "_id": "ObjectId",
      "name_of_product": "string",
      "price": "number",
    }
  ```

  ---
### Orders

- **Document:**
  ```json
  {
   "_id":"ObjectId",
   "customerName":"string",
   "status":"string",
  }
  ```

  ---

## **Pessoas Autoras:**

- *[Guilherme](https://github.com/GuilhermeJahnke)*
- *[Bernardo](https://github.com/bernardomoraes)*
- *[Felipe](https://github.com/Zapotoczn)*
- *[Thamires](https://github.com/ThamiresAluiza)*
- *[Gustavo](https://github.com/gustavoGui17)*

## Licença
Este projeto está licenciado sob a licença MIT
