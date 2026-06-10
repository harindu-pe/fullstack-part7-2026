import { ErrorBoundary, getErrorMessage } from "react-error-boundary";

export default function ShowError({ children }) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onError={(error, info) => {
        // Log the error to your error reporting service
      }}
      onReset={() => {
        // Reset any state that may have caused the error
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
