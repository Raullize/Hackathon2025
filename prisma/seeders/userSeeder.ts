import { PrismaClient } from '../../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUser() {
  console.log('Criando usuário de teste...');

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: 'teste@gmail.com' }
  });

  if (existingUser) {
    console.log('Usuário de teste já existe, pulando criação...');
    return existingUser;
  }

  // Criar hash da senha
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      firstName: 'Usuário',
      lastName: 'Teste',
      email: 'teste@gmail.com',
      phone: '11999999999',
      passwordHash: hashedPassword,
      zipCode: '01234567',
      city: 'Charqueadas',
      state: 'RS'
    }
  });

  console.log('Usuário de teste criado com sucesso:', {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`
  });

  return user;
}

export async function cleanupUser() {
  console.log('Removendo usuário de teste...');

  const deletedUser = await prisma.user.deleteMany({
    where: {
      email: 'teste@gmail.com'
    }
  });

  if (deletedUser.count > 0) {
    console.log('Usuário de teste removido com sucesso');
  } else {
    console.log('Nenhum usuário de teste encontrado para remoção');
  }

  return deletedUser;
}