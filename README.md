# Sistema de Notas Escolar

Aplicação web para o gerenciamento de alunos, turmas, disciplinas e notas. O projeto foi desenvolvido como parte da disciplina de desenvolvimento de sistemas, com foco na aplicação do padrão arquitetural **MVC (Model–View–Controller)**.

## Objetivo

Permitir o cadastro e a consulta de informações acadêmicas, centralizando o lançamento e a visualização de notas dos alunos.

## Funcionalidades previstas

- Cadastrar, editar, listar e remover alunos;
- Cadastrar turmas e disciplinas;
- Lançar, editar e consultar notas;
- Visualizar as notas por aluno, turma ou disciplina;
- Calcular a média do aluno e exibir sua situação acadêmica.

> As funcionalidades podem ser implementadas gradualmente conforme o andamento do projeto.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Interface | React + Vite |
| Servidor | Node.js + Express |
| Banco de dados | MySQL |
| Linguagem | JavaScript |
| Gerenciador de pacotes | pnpm |

## Arquitetura

O projeto utiliza um único repositório. A interface e o servidor ficam organizados em pastas diferentes apenas para separar suas responsabilidades.

O padrão MVC é aplicado principalmente no backend:

```text
React (interface)
    ↓ requisição HTTP
Routes (rotas)
    ↓
Controllers (controle da requisição)
    ↓
Models (acesso e regras de dados)
    ↓
MySQL (banco de dados)
```

No frontend, o React é organizado por telas, componentes, rotas e serviços. Os arquivos em `services/` são responsáveis por conversar com a API do backend.

## Estrutura de pastas

```text
sistema-notas/
├── database/                  # Scripts SQL para criar e preencher o banco
│   └── schema.sql
├── public/                    # Arquivos públicos do Vite
├── server/                    # Backend Node.js + Express
│   ├── controllers/           # Recebem requisições e definem respostas
│   ├── database/              # Configuração da conexão com o MySQL
│   │   └── connection.js
│   ├── models/                # Consultas e operações com os dados
│   ├── routes/                # Endpoints da API
│   ├── app.js                 # Configuração do Express
│   └── server.js              # Inicialização do servidor
├── src/                       # Frontend React
│   ├── assets/                # Imagens e outros recursos estáticos
│   ├── components/            # Componentes reutilizáveis
│   ├── pages/                 # Páginas/telas da aplicação
│   ├── routes/                # Rotas do React
│   ├── services/              # Requisições para a API
│   ├── styles/                # Estilos compartilhados
│   ├── App.jsx
│   └── main.jsx
├── .env.example               # Exemplo das variáveis de ambiente
├── .gitignore
├── package.json
└── vite.config.js
```

## Pré-requisitos

Antes de iniciar, instale:

- [Node.js](https://nodejs.org/) (versão LTS recomendada);
- [pnpm](https://pnpm.io/installation);
- MySQL Server e uma ferramenta para administrá-lo, como MySQL Workbench.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Entre na pasta do projeto:

   ```bash
   cd sistema-notas
   ```

3. Instale as dependências:

   ```bash
   pnpm install
   ```

4. Crie o banco de dados executando o arquivo `database/schema.sql` no MySQL.

5. Crie um arquivo chamado `.env` na raiz do projeto a partir de `.env.example` e preencha as credenciais locais do banco.

   Exemplo:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=sistema_notas
   DB_PORT=3306
   PORT=3000
   ```

## Executando o projeto

O frontend e o backend são executados separadamente durante o desenvolvimento.

Em um terminal, inicie o React:

```bash
pnpm dev
```

Em outro terminal, inicie o servidor Node.js:

```bash
pnpm run server
```

Após a configuração, o frontend estará disponível em `http://localhost:5173` e a API em `http://localhost:3000`.

> Os comandos podem ser ajustados no `package.json` conforme os scripts definidos pela equipe.

## API

Todas as rotas da API devem utilizar o prefixo `/api`.

| Recurso | Exemplo de rota | Finalidade |
| --- | --- | --- |
| Alunos | `/api/alunos` | Gerenciar alunos |
| Turmas | `/api/turmas` | Gerenciar turmas |
| Disciplinas | `/api/disciplinas` | Gerenciar disciplinas |
| Notas | `/api/notas` | Lançar e consultar notas |

Exemplo de operações para alunos:

```text
GET    /api/alunos       Lista os alunos
GET    /api/alunos/:id   Busca um aluno pelo ID
POST   /api/alunos       Cadastra um aluno
PUT    /api/alunos/:id   Atualiza um aluno
DELETE /api/alunos/:id   Remove um aluno
```

## Convenções do projeto

- Um controller deve coordenar a requisição; consultas SQL ficam nos models.
- Componentes React devem ser reutilizáveis sempre que fizer sentido.
- Páginas representam telas completas da aplicação.
- Serviços do React centralizam chamadas à API; evite usar `fetch` diretamente em vários componentes.
- Nunca envie o arquivo `.env` ao repositório.
- Use nomes claros e consistentes, como `AlunoModel.js`, `AlunoController.js` e `alunoRoutes.js`.

## Equipe

| Nome | Responsabilidade |
| --- | --- |
| A definir | A definir |

## Licença

Projeto acadêmico desenvolvido para fins educacionais.
