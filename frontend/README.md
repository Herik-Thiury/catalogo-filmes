# Catálogo de Filmes (Aplicação Fullstack CRUD)

Uma aplicação completa para gerenciar um catálogo de filmes, permitindo operações de Criar, Ler, Atualizar e Deletar (CRUD). Desenvolvido com um backend em Node.js e um frontend em ReactJS, utilizando um banco de dados MySQL.

## 🚀 Funcionalidades

A aplicação permite ao usuário:

* **Cadastrar** um novo filme com:
    * Título
    * Descrição
    * Ano de Lançamento
    * Gênero
    * URL da Imagem do Pôster
* **Listar** todos os filmes cadastrados.
* **Visualizar detalhes** de um filme específico.
* **Editar** as informações de um filme existente.
* **Deletar** um filme do catálogo.

## 🛠️ Tecnologias Utilizadas

### Backend
* **Node.js**
* **Express.js** (para a criação da API RESTful)
* **MySQL2** (Driver MySQL para Node.js)
* **dotenv** (para gerenciar variáveis de ambiente)
* **cors** (para permitir requisições de diferentes origens)

### Frontend
* **ReactJS**
* **React Router DOM** (para navegação entre as páginas)
* **Hooks** (useState, useEffect) (para gerenciamento de estado e efeitos colaterais)
* **Fetch API** (para consumo da API do backend)
* **CSS Puro** (para estilização básica, aguardando refatoração para estilização avançada)

### Banco de Dados
* **MySQL** (Banco de dados relacional para persistência dos dados).

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 14 ou superior recomendada)
* **npm** (Node Package Manager) ou **Yarn**
* **MySQL Server** (ou MariaDB)

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar a aplicação localmente. O projeto deve funcionar localmente ao rodar os comandos indicados na documentação do projeto.

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd catalogo-filmes
(Assumindo que este seja o diretório raiz do seu projeto.)

2. Configuração do Backend
Navegue até o diretório backend:

Bash

cd backend
Instale as dependências do backend:

Bash

npm install
# ou
yarn install
Crie e configure o arquivo de variáveis de ambiente .env:
Crie um arquivo chamado .env na raiz do diretório backend com o seguinte conteúdo, substituindo pelos seus dados de configuração do MySQL:

Snippet de código

PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql # Deixe vazio se não tiver senha
DB_NAME=catalogo_filmes
Configure o Banco de Dados MySQL:
Conecte-se ao seu servidor MySQL (via linha de comando, MySQL Workbench, phpMyAdmin, etc.) e execute os seguintes comandos SQL para criar o banco de dados e a tabela movies:

SQL

CREATE DATABASE IF NOT EXISTS catalogo_filmes;

USE catalogo_filmes;

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ano INT NOT NULL,
    genero VARCHAR(100),
    poster_url VARCHAR(255)
);
Inicie o servidor backend:

Bash

node server.js
Você deverá ver mensagens como: Servidor rodando em http://localhost:3001 e Conectado ao banco de dados com sucesso!.

3. Configuração do Frontend
Navegue de volta para o diretório raiz do projeto e depois para o diretório frontend:

Bash

cd ..
cd frontend
Instale as dependências do frontend:

Bash

npm install
# ou
yarn install
Inicie o aplicativo frontend:

Bash

npm start
O aplicativo deverá abrir automaticamente no seu navegador em http://localhost:3000.

🚀 Como Usar a Aplicação
Com o backend e o frontend rodando, acesse http://localhost:3000 no seu navegador.

Utilize os links de navegação no cabeçalho ("Listar", "Cadastrar") ou os botões nas páginas para realizar as operações de CRUD:

Listar Filmes: Veja todos os filmes cadastrados.

Cadastrar Novo Filme: Preencha o formulário e adicione um novo filme.

Ver Detalhes: Clique em um filme na lista para ver seus detalhes.

Editar: Na página de detalhes, clique em "Editar" para modificar as informações do filme.

Deletar: Na página de detalhes, clique em "Deletar" para remover um filme.

🌐 Endpoints da API (Backend)
Todos os endpoints da API são acessados em http://localhost:3001/api/movies.

GET /api/movies - Lista todos os filmes.

GET /api/movies/:id - Retorna os detalhes de um filme específico.

POST /api/movies - Cadastra um novo filme.

PUT /api/movies/:id - Atualiza um filme existente.

DELETE /api/movies/:id - Deleta um filme específico.

📁 Estrutura do Projeto
catalogo-filmes/
├── backend/
│   ├── controllers/      # Lógica dos controladores da API
│   ├── database/         # Configuração da conexão com o banco de dados
│   ├── models/           # Modelos de interação com o banco de dados
│   ├── routes/           # Definição das rotas da API
│   ├── .env              # Variáveis de ambiente
│   ├── server.js         # Ponto de entrada do servidor
│   └── package.json      # Dependências e scripts do backend
├── frontend/
│   ├── public/           # Arquivos estáticos
│   ├── src/
│   │   ├── api/          # Funções para consumir a API do backend
│   │   ├── components/   # Componentes reutilizáveis (ex: Header)
│   │   ├── pages/        # Componentes das páginas da aplicação (Listar, Cadastrar, etc.)
│   │   ├── styles/       # Estilos CSS globais
│   │   ├── App.js        # Componente principal e configuração de rotas
│   │   └── index.js      # Ponto de entrada do React
│   └── package.json      # Dependências e scripts do frontend
└── README.md             # Este arquivo
📄 Licença
Este projeto está licenciado sob a licença MIT.