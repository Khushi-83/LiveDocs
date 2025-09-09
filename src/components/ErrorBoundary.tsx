import { Component, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-sm">
          <div className="mb-2 font-semibold text-red-600">Something went wrong.</div>
          <pre className="whitespace-pre-wrap text-muted-foreground">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


