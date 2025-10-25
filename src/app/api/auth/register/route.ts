import { NextRequest, NextResponse } from 'next/server';
import { AuthController } from '@/app/controllers/authController';
import { RegisterRequest } from '@/types/auth';

const authController = new AuthController();

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const result = await authController.register(body);

    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(result.error, { status: result.status });
    }
  } catch (error) {
    console.error('Erro na rota de registro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}