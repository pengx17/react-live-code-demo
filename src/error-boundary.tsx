import React from 'react';

type State = { error: Error | null };

class ErrorBoundaryImpl extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      // TODO: contact PM/UEX about the wording
      return <div>{error.message}</div>;
    }
    const { children } = this.props;
    return children;
  }
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundaryImpl>{children}</ErrorBoundaryImpl>;
}
