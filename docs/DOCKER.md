# Docker

⬅️ **[Voltar para README.md](../README.md)**

## 🐳 Configuração Docker

### Docker Compose

O projeto utiliza Docker Compose para orquestrar os serviços necessários:

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15
    container_name: hackathon_postgres
    environment:
      POSTGRES_USER: hackathon_user
      POSTGRES_PASSWORD: hackathon_password
      POSTGRES_DB: hackathon_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Comandos Úteis

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs da aplicação
docker-compose logs app

# Reconstruir containers
docker-compose up --build

# Limpar volumes (cuidado: remove dados do banco)
docker-compose down -v
```

### Desenvolvimento com Docker

Para desenvolvimento, você pode usar o `docker-compose.dev.yml`:

```bash
# Usar configuração de desenvolvimento
docker-compose -f docker-compose.dev.yml up -d
```

### Variáveis de Ambiente

Certifique-se de configurar as variáveis no arquivo `.env`:

```env
DATABASE_URL="postgresql://hackathon_user:hackathon_password@localhost:5432/hackathon_db?schema=public"
```

---

⬅️ **[Voltar para README.md](../README.md)**