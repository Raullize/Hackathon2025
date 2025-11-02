import { toast } from 'sonner';

export const toastUtils = {
  // Toast de sucesso
  success: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.success(message, {
      id: options?.id,
      duration: options?.duration || 4000,
    });
  },

  // Toast de erro
  error: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.error(message, {
      id: options?.id,
      duration: options?.duration || 5000, // Erros ficam um pouco mais tempo
    });
  },

  // Toast de loading
  loading: (message: string, options?: { id?: string }) => {
    return toast.loading(message, {
      id: options?.id,
    });
  },

  // Toast informativo
  info: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.info(message, {
      id: options?.id,
      duration: options?.duration || 4000,
    });
  },

  // Toast de aviso
  warning: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.warning(message, {
      id: options?.id,
      duration: options?.duration || 4000,
    });
  },

  // Dismiss um toast específico
  dismiss: (id?: string) => {
    return toast.dismiss(id);
  },

  // Dismiss todos os toasts
  dismissAll: () => {
    return toast.dismiss();
  },
};

// Toasts específicos para autenticação
export const authToasts = {
  loginLoading: () => toastUtils.loading('Fazendo login...', { id: 'auth-login' }),
  loginSuccess: () => toastUtils.success('Login realizado com sucesso!', { id: 'auth-login' }),
  loginError: (error: string) => toastUtils.error(error || 'Erro no login', { id: 'auth-login' }),

  registerLoading: () => toastUtils.loading('Criando sua conta...', { id: 'auth-register' }),
  registerSuccess: () => toastUtils.success('Conta criada com sucesso! Redirecionando...', { id: 'auth-register' }),
  registerError: (error: string) => toastUtils.error(error || 'Erro no cadastro', { id: 'auth-register' }),
  
  stepCompleted: () => toastUtils.success('Primeira etapa concluída!'),
  passwordMismatch: () => toastUtils.error('As senhas não coincidem'),
  termsRequired: () => toastUtils.error('Você deve aceitar os termos de uso'),
  
  googleNotImplemented: () => toastUtils.info('Login com Google ainda não implementado'),
};

// Toasts para outras funcionalidades (podem ser expandidos)
export const appToasts = {
  // Toasts gerais da aplicação
  featureNotImplemented: (feature: string) => 
    toastUtils.info(`${feature} ainda não implementado`),
  
  saveSuccess: () => toastUtils.success('Dados salvos com sucesso!'),
  saveError: () => toastUtils.error('Erro ao salvar dados'),
  
  loadError: () => toastUtils.error('Erro ao carregar dados'),
  
  networkError: () => toastUtils.error('Erro de conexão. Tente novamente.'),
};