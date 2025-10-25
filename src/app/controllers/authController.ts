import { PrismaClient } from '@/generated/prisma/client';
import { hashPassword, verifyPassword, generateToken } from '@/app/lib/auth';
import { RegisterRequest, LoginRequest, AuthResponse, UserResponse, ApiError } from '@/types/auth';

const prisma = new PrismaClient();

export class AuthController {
  async register(data: RegisterRequest): Promise<{ success: true; data: AuthResponse } | { success: false; error: ApiError; status: number }> {
    try {
      if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password || !data.zipCode || !data.city || !data.state) {
        return {
          success: false,
          error: { error: 'Todos os campos são obrigatórios' },
          status: 400
        };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return {
          success: false,
          error: { error: 'Email inválido' },
          status: 400
        };
      }

      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        return {
          success: false,
          error: { error: 'Telefone deve conter apenas números (10-15 dígitos)' },
          status: 400
        };
      }

      const zipCodeRegex = /^\d{8}$/;
      if (!zipCodeRegex.test(data.zipCode.replace(/\D/g, ''))) {
        return {
          success: false,
          error: { error: 'CEP deve conter 8 dígitos' },
          status: 400
        };
      }

      if (data.state.length !== 2) {
        return {
          success: false,
          error: { error: 'Estado deve ter 2 caracteres (ex: RS)' },
          status: 400
        };
      }

      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUserByEmail) {
        return {
          success: false,
          error: { error: 'Email já cadastrado' },
          status: 409
        };
      }

      const existingUserByPhone = await prisma.user.findUnique({
        where: { phone: data.phone }
      });

      if (existingUserByPhone) {
        return {
          success: false,
          error: { error: 'Telefone já cadastrado' },
          status: 409
        };
      }

      const passwordHash = await hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          passwordHash,
          zipCode: data.zipCode.replace(/\D/g, ''),
          city: data.city,
          state: data.state.toUpperCase()
        },
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

      return {
        success: true,
        data: {
          message: 'Usuário criado com sucesso',
        }
      };

    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        error: { error: 'Erro interno do servidor' },
        status: 500
      };
    }
  }

  async login(data: LoginRequest): Promise<{ success: true; data: AuthResponse } | { success: false; error: ApiError; status: number }> {
    try {
      if (!data.email || !data.password) {
        return {
          success: false,
          error: { error: 'Email e senha são obrigatórios' },
          status: 400
        };
      }

      const user = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (!user) {
        return {
          success: false,
          error: { error: 'Credenciais inválidas' },
          status: 401
        };
      }

      const isPasswordValid = await verifyPassword(data.password, user.passwordHash);

      if (!isPasswordValid) {
        return {
          success: false,
          error: { error: 'Credenciais inválidas' },
          status: 401
        };
      }

      // Gerar token JWT
      const token = generateToken(user.id);

      const userData: UserResponse = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        zipCode: user.zipCode,
        city: user.city,
        state: user.state,
        createdAt: user.createdAt
      };

      return {
        success: true,
        data: {
          message: 'Login realizado com sucesso',
          token
        }
      };

    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: { error: 'Erro interno do servidor' },
        status: 500
      };
    }
  }

  async getCurrentUser(userId: string): Promise<{ success: true; data: UserResponse } | { success: false; error: ApiError; status: number }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
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

      if (!user) {
        return {
          success: false,
          error: { error: 'Usuário não encontrado' },
          status: 404
        };
      }

      return {
        success: true,
        data: user
      };

    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return {
        success: false,
        error: { error: 'Erro interno do servidor' },
        status: 500
      };
    }
  }
}