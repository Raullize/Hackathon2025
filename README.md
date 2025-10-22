# Hackathon2025

Detalhar...

## 🚀 Tecnologias Utilizadas

### Frontend
- Detalhar...

### Backend
- Detalhar...

### Banco de Dados
- Detalhar...

### DevOps & Ferramentas
- Detalhar...

## 📚 Documentação

- **[🔄 API Endpoints & CRUD](./docs/CRUD.md)** - Documentação completa de todos os endpoints da API
- **[🗄️ Estrutura do Banco de Dados](./docs/DATABASE.md)** - Documentação completa dos modelos, relacionamentos e estrutura do banco
- **[🌱 Seeders](./docs/SEEDERS.md)** - Guia para popular o banco com dados de teste e desenvolvimento
- **[🐳 Docker](./docs/DOCKER.md)** - Configuração de containerização e ambiente de desenvolvimento

## 📁 Estrutura do Projeto

```
Detalhar...
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- Docker e Docker Compose instalados
- Git instalado

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd Hackathon2025
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações.

4. **Inicie o banco de dados PostgreSQL**
   ```bash
   docker-compose up -d
   ```

5. **Configure o banco de dados**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

6. **Popule o banco com dados iniciais (opcional)**
   ```bash
   npm run db:seed
   ```
   Isso criará:
   - Detalhar...

7. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

8. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
   
   **🔗 Links úteis:**
   - 🔍 **API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health) *(teste no Insomnia/Postman ou navegador)*

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Executa aplicação Next.js em modo desenvolvimento

# Build e Produção
npm run build        # Build da aplicação Next.js
npm start            # Executa aplicação em produção

# Qualidade de código
npm run lint         # Verificar código com ESLint
npm run lint:fix     # Corrigir automaticamente problemas do ESLint

# Banco de dados
npm run db:generate  # Gerar Prisma Client
npm run db:push      # Sincronizar schema com banco (desenvolvimento)
npm run db:studio    # Abrir Prisma Studio (interface visual)
npm run db:seed      # Executar seeders para popular o banco de dados
npm run db:seed:cleanup # Limpar dados criados pelos seeders

# Docker
docker-compose up -d    # Iniciar todos os serviços
docker-compose down     # Parar todos os serviços
docker-compose logs app # Ver logs da aplicação
```

## 🔧 Configuração do Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
# Database
DATABASE_URL="postgresql://hackathon_user:hackathon_password@localhost:5432/hackathon_db?schema=public"

# Node Environment
NODE_ENV=development

# NextAuth.js
# Generate a random secret key at: https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 🔑 Variáveis Importantes:
- **DATABASE_URL**: Conexão com PostgreSQL (use as credenciais do docker-compose.yml)
- **NODE_ENV**: Ambiente de execução (development/production)
- **NEXTAUTH_SECRET**: Chave secreta para autenticação (gere uma nova em produção) <mcreference link="https://generate-secret.vercel.app/32" index="0">0</mcreference>
- **NEXTAUTH_URL**: URL base da aplicação para NextAuth.js

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LeonardoEnnes">
        <img src="https://github.com/LeonardoEnnes.png" width="100px;" alt="Leonardo Ennes"/><br />
        <sub><b>Leonardo Ennes</b></sub>
      </a><br />
      <sub>Desenvolvedor Web</sub>
    </td>
    <td align="center">
      <a href="https://github.com/MatheusAlves111">
        <img src="https://github.com/MatheusAlves111.png" width="100px;" alt="Matheus Alves"/><br />
        <sub><b>Matheus Alves</b></sub>
      </a><br />
      <sub>Desenvolvedor Web</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Raullize">
        <img src="https://github.com/Raullize.png" width="100px;" alt="Raul Lize"/><br />
        <sub><b>Raul Lize Teixeira</b></sub>
      </a><br />
      <sub>Desenvolvedor Web</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/MiguelLewandowski">
        <img src="https://github.com/MiguelLewandowski.png" width="100px;" alt="Miguel Lewandowski"/><br />
        <sub><b>Miguel Lewandowski</b></sub>
      </a><br />
      <sub>Desenvolvedor Web</sub>
    </td>
    <td colspan="2"></td>
  </tr>
</table>

---

Hackathon2025 🚀
