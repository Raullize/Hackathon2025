import { config } from 'dotenv';
import { PrismaClient } from '../../src/generated/prisma/client';
import { seedUser, cleanupUser } from './userSeeder';

// Carregar variáveis de ambiente
config();

const prisma = new PrismaClient();

async function main() {
  try {
    const isCleanup = process.argv.includes('--cleanup');
    
    if (isCleanup) {
      console.log('Iniciando limpeza dos dados de usuário de teste...');
      await cleanupUser();
      console.log('Limpeza concluída com sucesso!');
    } else {
      console.log('Iniciando processo de seed para usuário de teste...');
      await seedUser();
      console.log('Seed concluído com sucesso!');
    }
  } catch (error) {
    console.error('Erro durante o processo de seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();