import { Spinner } from "./ui/spinner";

function LoadingSpinner() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 text-slate-400">
      <Spinner size="large" />
      <span className="text-lg">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
