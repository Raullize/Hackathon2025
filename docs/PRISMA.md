# Prisma

⬅️ **[Voltar para README.md](../README.md)**

## 🔧 Configuração Prisma

### Schema do Banco de Dados

O projeto utiliza Prisma ORM para gerenciar o banco de dados PostgreSQL:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  firstName    String
  lastName     String
  email        String   @unique
  phone        String   @unique
  passwordHash String
  zipCode      String
  city         String
  state        String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}
```

### Comandos Prisma

```bash
# Gerar o Prisma Client
npx prisma generate

# Sincronizar schema com banco (desenvolvimento)
npx prisma db push

# Criar e aplicar migrações (produção)
npx prisma migrate dev --name init

# Abrir Prisma Studio (interface visual)
npx prisma studio

# Reset do banco de dados
npx prisma migrate reset
```

### Scripts NPM Disponíveis

```bash
# Gerar Prisma Client
npm run db:generate

# Sincronizar schema com banco
npm run db:push

# Abrir Prisma Studio
npm run db:studio

# Executar seeders
npm run db:seed

# Limpar dados dos seeders
npm run db:seed:cleanup
```

### Cliente Prisma

O cliente é gerado em `src/generated/prisma/client` e pode ser usado assim:

```typescript
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

// Exemplo de uso
const user = await prisma.user.create({
  data: {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@email.com',
    // ...outros campos
  }
});
```

---

⬅️ **[Voltar para README.md](../README.md)**