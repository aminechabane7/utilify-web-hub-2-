import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

type RouteErrorBoundaryProps = { children: ReactNode };
type RouteErrorBoundaryState = { hasError: boolean };

class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep diagnostics available without exposing implementation details to visitors.
    console.error("Unable to render application route", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">This tool could not be loaded</h1>
          <p className="mt-3 text-slate-300">Please refresh the page or return to the tools directory.</p>
          <Link className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground" to="/tools">
            Browse tools
          </Link>
        </section>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
