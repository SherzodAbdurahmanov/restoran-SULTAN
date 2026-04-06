import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-zinc-950 border border-amber-900/20 rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-amber-500 mb-4">Что-то пошло не так</h1>
            <p className="text-amber-100/80 mb-6">
              Произошла ошибка при загрузке приложения. Пожалуйста, обновите страницу или попробуйте позже.
            </p>
            {this.state.error && (
              <details className="mb-6">
                <summary className="text-amber-400 cursor-pointer mb-2">Детали ошибки</summary>
                <pre className="bg-black/50 p-4 rounded-lg text-red-400 text-sm overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-6 py-3 rounded-full hover:from-amber-500 hover:to-yellow-400 transition-all font-semibold"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
