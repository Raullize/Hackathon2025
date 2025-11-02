# MIRC - Mapeador Inteligente de Resiliência Climática

O **MIRC** é uma aplicação web inovadora que utiliza inteligência artificial e geolocalização para fornecer alertas precoces e informações personalizadas sobre riscos climáticos no Rio Grande do Sul, com foco especial na bacia do Rio Jacuí.

## 🎯 Sobre o Projeto

O MIRC foi desenvolvido para proteger comunidades dos riscos climáticos extremos, oferecendo:

- **🤖 Assistente de IA Especializado**: ChatBot inteligente com conhecimento sobre riscos climáticos
- **🗺️ Mapa Interativo**: Visualização em tempo real de dados climáticos e alertas
- **🔔 Sistema de Alertas**: Notificações multicanal (SMS, WhatsApp) para eventos extremos
- **👤 Autenticação Segura**: Sistema completo de login e cadastro de usuários
- **📱 Interface Responsiva**: Design moderno e adaptável para todos os dispositivos

## 🎬 Demonstração

Veja o MIRC em ação! Confira nossa demonstração completa das principais funcionalidades:

<div align="center">
  <img src="public/videos/demo/demo.gif" alt="Demonstração do MIRC - Mapeador Inteligente de Resiliência Climática" width="800">
</div>

> 📱 **Quer ver mais detalhes?** [Clique aqui para visualizar em tamanho completo](public/videos/demo/demo.gif)

> ⏳ **Nota**: A demonstração pode demorar alguns segundos para carregar devido ao tamanho do arquivo. Por favor, aguarde!

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **Heroicons** - Biblioteca de ícones SVG
- **@ai-sdk/react** - SDK para integração com IA

### Backend & IA
- **Next.js API Routes** - Endpoints serverless
- **Google Gemini 2.5 Pro** - Modelo de IA para o ChatBot
- **@ai-sdk/google** - SDK para integração com Google AI
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hash seguro de senhas

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - Object-Relational Mapping
- **Prisma Client** - Cliente type-safe para banco de dados

### DevOps & Ferramentas
- **Docker & Docker Compose** - Containerização e orquestração
- **ESLint & Prettier** - Linting e formatação de código
- **TypeScript** - Desenvolvimento type-safe
- **tsx** - Executor TypeScript para desenvolvimento

## 📚 Documentação

- **[🗄️ Estrutura do Banco de Dados](./docs/DATABASE.md)** - Documentação completa dos modelos, relacionamentos e estrutura do banco
- **[🌱 Seeders](./docs/SEEDERS.md)** - Guia para popular o banco com dados de teste e desenvolvimento
- **[🔧 Prisma ORM](./docs/PRISMA.md)** - Configuração e uso do Prisma para gerenciamento do banco de dados
- **[🐳 Docker](./docs/DOCKER.md)** - Configuração de containerização e ambiente de desenvolvimento

## 📁 Estrutura do Projeto

```
Hackathon2025/
├── 📁 prisma/                    # Configuração do banco de dados
│   ├── schema.prisma            # Schema do Prisma (modelo User)
│   └── seeders/                 # Scripts para popular o banco
│       ├── index.ts            # Orquestrador dos seeders
│       └── userSeeder.ts       # Seeder para usuários de teste
├── 📁 src/
│   ├── 📁 app/                  # App Router do Next.js
│   │   ├── 📁 api/              # Endpoints da API
│   │   │   ├── auth/           # Autenticação (login, register, me)
│   │   │   ├── chat/           # ChatBot com IA
│   │   │   ├── health/         # Health check
│   │   │   └── map/            # Dados do mapa
│   │   ├── login/              # Página de login/cadastro
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css         # Estilos globais
│   ├── 📁 components/           # Componentes React
│   │   ├── ChatBot.tsx         # ChatBot com IA
│   │   ├── Hero.tsx            # Seção hero da landing page
│   │   ├── Login.tsx           # Formulários de login/cadastro
│   │   ├── Navbar.tsx          # Barra de navegação
│   │   ├── InteractiveMap.tsx  # Mapa interativo
│   │   ├── FAQ.tsx             # Perguntas frequentes
│   │   ├── Footer.tsx          # Rodapé
│   │   ├── Partners.tsx        # Seção de parceiros
│   │   └── Testimonials.tsx    # Depoimentos
│   ├── 📁 hooks/                # Custom hooks
│   │   └── useAuth.ts          # Hook de autenticação
│   ├── 📁 lib/                  # Utilitários e configurações
│   │   └── prisma.ts           # Cliente Prisma
│   ├── 📁 types/                # Definições de tipos TypeScript
│   │   └── auth.ts             # Tipos de autenticação
│   └── 📁 generated/            # Arquivos gerados automaticamente
│       └── prisma/             # Cliente Prisma gerado
├── 📁 public/                   # Arquivos estáticos
│   ├── images/                 # Imagens (chat, cities, companies, map)
│   ├── logos/                  # Logotipos
│   └── videos/                 # Vídeos de background
├── 📁 docs/                     # Documentação
├── .env.example                # Exemplo de variáveis de ambiente
├── docker-compose.yml          # Configuração Docker
├── package.json                # Dependências e scripts
├── tailwind.config.js          # Configuração Tailwind
└── tsconfig.json               # Configuração TypeScript
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
   Isso criará um usuário de teste com as seguintes credenciais:
   - **Email**: `teste@gmail.com`
   - **Senha**: `123456`
   - **Telefone**: `11999999999`
   - **Localização**: Charqueadas, RS

7. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

8. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
   
   **🔗 Links úteis:**
   - 🏠 **Página Inicial**: [http://localhost:3000](http://localhost:3000) - Landing page com hero, mapa interativo e ChatBot
   - 🔐 **Login/Cadastro**: [http://localhost:3000/login](http://localhost:3000/login) - Sistema de autenticação
   - 🤖 **ChatBot**: Disponível na página inicial (requer login)
   - 🔍 **API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health) - Status da API

## 🎮 Funcionalidades Principais

### 🤖 ChatBot Inteligente
- **IA Especializada**: Powered by Google Gemini 2.5 Pro
- **Conhecimento Específico**: Focado em riscos climáticos do RS
- **Busca em Tempo Real**: Consulta informações atualizadas na internet
- **Autenticação Obrigatória**: Acesso apenas para usuários logados

### 🔐 Sistema de Autenticação
- **Cadastro Completo**: Formulário em duas etapas com validação
- **Login Seguro**: JWT tokens com bcrypt para senhas
- **Dados Pessoais**: Nome, email, telefone, CEP, cidade e estado
- **Validação**: Email e telefone únicos no sistema

### 🗺️ Mapa Interativo
- **Visualização Geográfica**: Mapa focado na bacia do Rio Jacuí
- **Dados Climáticos**: Informações sobre riscos e alertas
- **Interface Responsiva**: Adaptável para desktop e mobile

### 📱 Interface Moderna
- **Design Responsivo**: Tailwind CSS com componentes otimizados
- **Vídeos de Background**: Experiência visual imersiva
- **Navegação Intuitiva**: UX focada na usabilidade
- **Componentes Modulares**: FAQ, Testimonials, Partners, Footer

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

# Session Secret (para JWT)
SESSION_SECRET=your-super-secret-key-here

# Google AI API Key (para o ChatBot)
GOOGLE_API_KEY=your-google-ai-api-key-here
```

### 🔑 Variáveis Importantes:
- **DATABASE_URL**: Conexão com PostgreSQL (use as credenciais do docker-compose.yml)
- **NODE_ENV**: Ambiente de execução (development/production)
- **SESSION_SECRET**: Chave secreta para JWT tokens (gere uma chave segura)
- **GOOGLE_API_KEY**: Chave da API do Google AI para o ChatBot com Gemini

### 🤖 Configuração da API do Google AI:
1. Acesse [Google AI Studio](https://aistudio.google.com/)
2. Crie uma nova API Key
3. Adicione a chave no arquivo `.env` como `GOOGLE_API_KEY`



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

**MIRC - Mapeador Inteligente de Resiliência Climática** 🌦️🛡️  
*Protegendo comunidades através da tecnologia e inteligência artificial*
