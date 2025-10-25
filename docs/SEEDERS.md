# Seeders

⬅️ **[Voltar para README.md](../README.md)**

## 🌱 Sistema de Seeders

### Visão Geral

Os seeders são scripts que populam o banco de dados com dados iniciais para desenvolvimento e teste. O projeto possui um sistema organizado de seeders localizado em `prisma/seeders/`.

### Estrutura dos Seeders

```
prisma/seeders/
├── index.ts          # Orquestrador principal dos seeders
└── userSeeder.ts     # Seeder específico para usuários
```

### Usuário de Teste

O seeder cria um usuário de teste com as seguintes credenciais:

```typescript
// Dados do usuário de teste
{
  firstName: 'Usuário',
  lastName: 'Teste',
  email: 'teste@gmail.com',
  phone: '11999999999',
  password: '123456', // Hash: bcrypt
  zipCode: '01234567',
  city: 'Charqueadas',
  state: 'RS'
}
```

### Comandos Disponíveis

```bash
# Executar todos os seeders
npm run db:seed

# Limpar dados criados pelos seeders
npm run db:seed:cleanup

# Executar seeder diretamente
npx tsx prisma/seeders/index.ts

# Executar limpeza diretamente
npx tsx prisma/seeders/index.ts --cleanup
```

### Como Usar

#### 1. Popular o Banco

```bash
npm run db:seed
```

Isso criará:
- ✅ Usuário de teste para login
- ✅ Dados básicos para desenvolvimento

#### 2. Limpar Dados de Teste

```bash
npm run db:seed:cleanup
```

Isso removerá:
- 🗑️ Usuário de teste
- 🗑️ Dados criados pelos seeders

### Funcionalidades dos Seeders

#### userSeeder.ts

- **Verificação de Duplicatas**: Verifica se o usuário já existe antes de criar
- **Hash de Senha**: Utiliza bcrypt para criptografar senhas
- **Logs Informativos**: Mostra o progresso da criação/limpeza
- **Tratamento de Erros**: Gerencia erros de criação e remoção

#### index.ts

- **Orquestração**: Coordena a execução de todos os seeders
- **Modo Limpeza**: Suporte ao parâmetro `--cleanup`
- **Conexão Prisma**: Gerencia conexão e desconexão do banco
- **Exit Codes**: Retorna códigos apropriados para CI/CD

### Adicionando Novos Seeders

Para adicionar um novo seeder:

1. **Crie o arquivo do seeder**:
```typescript
// prisma/seeders/novoSeeder.ts
import { PrismaClient } from '../../src/generated/prisma/client';

const prisma = new PrismaClient();

export async function seedNovo() {
  // Lógica de criação
}

export async function cleanupNovo() {
  // Lógica de limpeza
}
```

2. **Importe no index.ts**:
```typescript
import { seedNovo, cleanupNovo } from './novoSeeder';

// Adicione nas funções main()
```

### Logs de Exemplo

```bash
$ npm run db:seed

Iniciando processo de seed para usuário de teste...
Criando usuário de teste...
Usuário de teste criado com sucesso: {
  id: 'clx1234567890',
  email: 'teste@gmail.com',
  name: 'Usuário Teste'
}
Seed concluído com sucesso!
```

---

⬅️ **[Voltar para README.md](../README.md)**