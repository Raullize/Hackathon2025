import { NextRequest, NextResponse } from 'next/server';
import { AuthController } from '@/app/controllers/authController';
import { LoginRequest } from '@/types/auth';

const authController = new AuthController();

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const result = await authController.login(body);

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(result.error, { status: result.status });
    }
  } catch (error) {
    console.error('Erro na rota de login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}