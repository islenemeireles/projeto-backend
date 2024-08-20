# Projeto Backend
Este é um projeto backend da Geração Tech desenvolvido em Node.js com o framework Express e Sequelize para gerenciamento de produtos, categorias e usuários. O projeto inclui autenticação JWT, operações CRUD e filtragem avançada de produtos.
## Organização do Projeto
A organização do projeto é organizada da seguinte maneira:
   ```bash
├── src              # Diretório principal do código-fonte.
│   ├── config       # Contém arquivos de configuração, como a conexão com o banco de dados e JWT.  
│   ├── controllers  # Contém os controladores para gerenciar a lógica de negócio.
│   ├── database      
│   ├── middleware       
│   ├── models       # Contém os modelos Sequelize para a interação com o banco de dados.  
│   ├── routes       # Define as rotas da API.    
│   └── server.js        
├── .env                 
│── LICENSE    
├── README.md
├── package-lock.json       
├── package.json        

   ```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para criação de APIs RESTful.
- **Sequelize**: ORM para interação com o banco de dados SQL.
- **MySQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/islenemeireles/projeto-backend.git
   cd projeto-backend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o banco de dados**

   Certifique-se de configurar o arquivo de conexão do banco de dados em `src/config/connection.js` com suas credenciais do MySQL ou outro banco de dados que você esteja usando.
```bash
## exemplo de config/connection que eu utilizei
const { Sequelize } = require('sequelize');

//configurações do banco de dados
const database = 'mydatabase'; //nome do banco de dados
const username = 'root';       //nome de usuário do MySQL
const password = 'root';       //senha do MySQL
const host = 'localhost';      //host do MySQL

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  port: 3306, //porta do MySQL
  logging: false, //desativa o logging SQL
  define: {
    timestamps: true, //adiciona createdAt e updatedAt por padrão
  },
});

module.exports = sequelize;
```
4. **Configure o ambiente**

Arquivo .env na raiz do projeto:

```bash
## .env que usei no projeto
DB_NAME=mydatabase
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=3306
```
5. **Configure o banco de dados**

Se você não tem o MySQL instalado, aqui [guia de instalação do MySQL](https://dev.mysql.com/downloads/), e clique para instalar para windows.


- Crie o banco de dados: Use o comando abaixo para criar a estrutura do banco de dados:

```bash
mysql -u [usuario] -p [nome_do_banco] < caminho/para/seu/script.sql
```
- Popule o banco de dados (opcional): Se você tem um script para dados iniciais:

```bash
mysql -u [usuario] -p [nome_do_banco] < caminho/para/seu/dados_iniciais.sql`
```
6. **Inicie o servidor**

   ```bash
   npm start
   ```

   O servidor estará rodando em `http://localhost:3000` por padrão.

## Rotas
- Rota completa de usuarios: http://localhost:3000/v1/user/search ou :id ou token (ou vazio para post para criar usuário).
- Rota completa de produtos: http://localhost:3000/v1/user/search ou :id (ou vazio para post para criar produto).
- Rota completa de categorias: http://localhost:3000/v1/user/search ou :id (ou vazio para post para criar categoria).

### Usuários

- **Criar um novo usuário**
  - **POST** `/v1/user`
  - **Body**: 
    ```json
    {
      "firstname": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "confirmPassword": "password123"
    }
    ```

- **Obter um usuário pelo ID**
  - **GET** `/v1/user/:id`

- **Atualizar um usuário pelo ID**
  - **PUT** `/v1/user/:id`
  - **Body**:
    ```json
    {
      "firstname": "John",
      "surname": "Doe",
      "email": "john.doe@example.com"
    }
    ```

- **Deletar um usuário pelo ID**
  - **DELETE** `/v1/user/:id`

- **Gerar um token JWT**
  - **POST** `/v1/user/token`
  - **Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

- **Pesquisar usuários**
  - **GET** `/v1/user/search`

### Produtos

- **Criar um novo produto**
  - **POST** `/v1/product`
  - **Body**:
    ```json
    {
      "enabled": true,
      "name": "Produto 01",
      "slug": "produto-01",
      "stock": 10,
      "description": "Descrição do produto 01",
      "price": 119.90,
      "price_with_discount": 99.90,
      "category_ids": [1, 15, 24, 68],
      "images": [
        {
          "type": "image/png",
          "content": "base64 da imagem 1"
        },
        {
          "type": "image/png",
          "content": "base64 da imagem 2"
        }
      ],
      "options": [
        {
          "title": "Cor",
          "shape": "square",
          "radius": "4px",
          "type": "text",
          "value": ["PP", "GG", "M"]
        }
      ]
    }
    ```

- **Obter todos os produtos**
  - **GET** `/v1/product/search`
  - **Query Params**: `limit`, `page`, `fields`, `match`, `category_ids`, `price-range`

- **Obter um produto pelo ID**
  - **GET** `/v1/product/:id`

- **Atualizar um produto pelo ID**
  - **PUT** `/v1/product/:id`
  - **Body**: Similar ao body da criação do produto

- **Deletar um produto pelo ID**
  - **DELETE** `/v1/product/:id`
## Informações

[Documentação oficial](https://github.com/digitalcollegebr/projeto-backend)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou suporte, entre em contato com [islenemeireles@gmail.com].

```

Esse `README` fornece uma visão geral do projeto, instruções de instalação e uso. Se você tiver mais detalhes específicos ou preferências, posso ajustar o conteúdo para atender melhor às suas necessidades!
