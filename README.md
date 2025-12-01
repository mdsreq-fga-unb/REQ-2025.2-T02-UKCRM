# REQ-2025.2-T02-UKCRM

![Contributors](https://img.shields.io/github/contributors/mdsreq-fga-unb/REQ-2025.2-T02-UKCRM)
![Stars](https://img.shields.io/github/stars/mdsreq-fga-unb/REQ-2025.2-T02-UKCRM)
![Last Commit](https://img.shields.io/github/last-commit/mdsreq-fga-unb/REQ-2025.2-T02-UKCRM)
![Forks](https://img.shields.io/github/forks/mdsreq-fga-unb/REQ-2025.2-T02-UKCRM)

Somos estudantes da **Universidade de Brasília (UnB) | Faculdade do Gama (FGA)** e este projeto está sendo desenvolvido para a disciplina de **Requisitos de Software**, ministrada pelo professor **George Marsicano**. Nosso grupo tem como objetivo desenvolver um sistema de CRM (Customer Relationship Management) robusto e escalável, aplicando as melhores práticas de engenharia de software e metodologias ágeis.

O UKCRM foi projetado para otimizar a gestão de relacionamento com o cliente, oferecendo funcionalidades como funil de vendas, gerenciamento de leads, equipes e organizações. A plataforma visa centralizar as informações, melhorar a comunicação entre as equipes de vendas e fornecer insights valiosos para a tomada de decisões estratégicas.

## Tech Stack

<table>
  <tr>
    <td align="center">
      <a href="https://www.python.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/>
      </a>
      <br>Python
    </td>
    <td align="center">
      <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer">
        <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="40" height="40"/>
      </a>
      <br>Django
    </td>
    <td align="center">
      <a href="https://www.django-rest-framework.org/" target="_blank" rel="noreferrer">
        <img src="https://www.django-rest-framework.org/img/logo.png" alt="drf" width="40" height="40"/>    
      </a>
      <br>DRF
    </td>
    <td align="center">
      <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/>
      </a>
      <br>PostgreSQL
    </td>
    <td align="center">
      <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/>
      </a>
      <br>Docker
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
      </a>
      <br>TypeScript
    </td>
    <td align="center">
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
      </a>
      <br>React
    </td>
    <td align="center">
      <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
        <img src="https://vitejs.dev/logo.svg" alt="vite" width="40" height="40"/>
      </a>
      <br>Vite
    </td>
    <td align="center">
      <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/tailwindcss/tailwindcss-original.svg" alt="tailwind" width="40" height="40"/>
      </a>
      <br>Tailwind CSS
    </td>
    <td align="center">
      <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
        <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" alt="shadcn-ui" width="40" height="40"/>
      </a>
      <br>Shadcn/UI
    </td>
  </tr>
</table>

## Integrantes do Grupo

<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/Carlos-UCH?s=150" width="150" alt="Carlos Henrique"/>
        <br />
        <b><a href="https://github.com/Carlos-UCH">Carlos Henrique</a></b>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/jonas3688?s=150" width="150" alt="João Guilherme"/>
        <br />
        <b><a href="https://github.com/jonas3688">João Guilherme</a></b>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/MarcosViniciusG?s=150" width="150" alt="Marcos Vinícius"/>
        <br />
        <b><a href="https://github.com/MarcosViniciusG">Marcos Vinícius</a></b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/PedroDev-sketch?s=150" width="150" alt="Pedro Teixeira"/>
        <br />
        <b><a href="https://github.com/PedroDev-sketch">Pedro Teixeira</a></b>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/euyogi?s=150" width="150" alt="Yogi Nam"/>
        <br />
        <b><a href="https://github.com/euyogi">Yogi Nam</a></b>
      </td>
    </tr>
  </tbody>
</table>

# 🚀 Rodando o Projeto Localmente

Siga as instruções abaixo para configurar e executar o ambiente de desenvolvimento do UKCRM em sua máquina.

## 🧩 Pré-requisitos

- **Docker** e **Docker Compose**
- **Node.js >= 18.0.0**
- **Python >= 3.10**

## 🐳 Usando Docker (Recomendado)

A maneira mais simples de rodar o projeto é utilizando o Docker.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mdsreq-fga-unb/REQ-2025.2-T02-UKCRM.git
    cd REQ-2025.2-T02-UKCRM
    ```

2.  **Inicie os containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Acesse as aplicações:**
    -   **Frontend:** [http://localhost:5173](http://localhost:5173)
    -   **Backend:** [http://localhost:8000/api/](http://localhost:8000/api/)

## 🛠️ Rodando Manualmente

### Backend (Django)

1.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    # No Windows, use: .venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure as variáveis de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env` e preencha as variáveis necessárias.
    ```bash
    cp .env.example .env
    ```

5.  **Execute as migrações do banco de dados:**
    ```bash
    python manage.py migrate
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    python manage.py runserver
    ```
    O backend estará disponível em `http://localhost:8000`.

### Frontend (React + Vite)

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env.local`.
    ```bash
    cp .env.example .env.local
    ```
    Certifique-se de que `VITE_API_BASE_URL` aponta para o seu backend (por padrão, `http://localhost:8000`).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 🚑 Solução de Problemas (Troubleshooting)

### Erro: `column <nome_da_coluna> does not exist`

Este erro geralmente ocorre quando um novo campo é adicionado a um modelo Django, mas a alteração correspondente ainda não foi aplicada ao banco de dados.

**Solução:**

1.  **Certifique-se de que os contêineres Docker estão em execução.**
2.  **Abra um novo terminal e aplique as migrações do banco de dados com o seguinte comando:**

    ```bash
    docker compose exec backend python manage.py migrate
    ```

Isso sincronizará o banco de dados com os modelos Django, criando as tabelas ou colunas ausentes.