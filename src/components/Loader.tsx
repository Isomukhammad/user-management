import { JSX } from "react";

const Loader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-neutral-600"></div>
    </div>
  );
};

export default Loader;
