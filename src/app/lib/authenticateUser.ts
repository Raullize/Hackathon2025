import { NextRequest } from 'next/server';
import { verifyToken } from './auth';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function authenticateUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        zipCode: true,
        city: true,
        state: true,
        createdAt: true
      }
    });

    return user;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return null;
  }
}