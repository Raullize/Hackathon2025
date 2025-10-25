# Database

⬅️ **[Voltar para README.md](../README.md)**

## 🗄️ Estrutura do Banco de Dados

### Tecnologias

- **PostgreSQL 15**: Banco de dados relacional principal
- **Prisma ORM**: Object-Relational Mapping para TypeScript
- **Docker**: Containerização do banco de dados

### Modelo de Dados

#### 👤 User (Usuário)

```prisma
model User {
  id           String   @id @default(cuid())
  firstName    String   // Nome do usuário
  lastName     String   // Sobrenome do usuário
  email        String   @unique // Email único no sistema
  phone        String   @unique // Telefone único no sistema
  passwordHash String   // Senha criptografada com bcrypt
  zipCode      String   // CEP do usuário
  city         String   // Cidade do usuário
  state        String   // Estado (2 caracteres: RS, SP, etc.)
  createdAt    DateTime @default(now()) // Data de criação
  updatedAt    DateTime @updatedAt // Data de atualização

  @@map("users") // Nome da tabela no banco
}
```

### Relacionamentos

Atualmente o sistema possui apenas a entidade `User`. Futuras expansões podem incluir:

- **Alerts**: Alertas climáticos personalizados
- **Locations**: Localizações favoritas do usuário
- **ChatHistory**: Histórico de conversas com o ChatBot
- **Notifications**: Sistema de notificações

### Índices e Constraints

#### Campos Únicos
- `email`: Garante que cada email seja único no sistema
- `phone`: Garante que cada telefone seja único no sistema

#### Campos Obrigatórios
- Todos os campos são obrigatórios (`String` sem `?`)
- `createdAt`: Automaticamente definido na criação
- `updatedAt`: Automaticamente atualizado nas modificações

### Configuração do Banco

#### Variáveis de Ambiente

```env
DATABASE_URL="postgresql://hackathon_user:hackathon_password@localhost:5432/hackathon_db?schema=public"
```

#### Docker Compose

```yaml
postgres:
  image: postgres:15
  environment:
    POSTGRES_USER: hackathon_user
    POSTGRES_PASSWORD: hackathon_password
    POSTGRES_DB: hackathon_db
  ports:
    - "5432:5432"
```

### Operações Comuns

#### Criar Usuário

```typescript
const user = await prisma.user.create({
  data: {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    passwordHash: await bcrypt.hash('senha123', 10),
    zipCode: '01234567',
    city: 'São Paulo',
    state: 'SP'
  }
});
```

#### Buscar Usuário

```typescript
// Por email
const user = await prisma.user.findUnique({
  where: { email: 'joao@email.com' }
});

// Por ID
const user = await prisma.user.findUnique({
  where: { id: 'user_id_here' }
});
```

#### Atualizar Usuário

```typescript
const user = await prisma.user.update({
  where: { id: 'user_id_here' },
  data: {
    city: 'Nova Cidade',
    state: 'RJ'
  }
});
```

### Backup e Restore

```bash
# Backup
docker exec hackathon_postgres pg_dump -U hackathon_user hackathon_db > backup.sql

# Restore
docker exec -i hackathon_postgres psql -U hackathon_user hackathon_db < backup.sql
```

### Monitoramento

#### Prisma Studio
```bash
npx prisma studio
# Acesse: http://localhost:5555
```

#### Logs do PostgreSQL
```bash
docker-compose logs postgres
```

---

⬅️ **[Voltar para README.md](../README.md)**