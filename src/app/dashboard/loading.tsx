
export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-1 overflow-hidden fixed top-0 left-0 right-0 z-50 bg-primary/20">
        <div className="h-full bg-primary animate-page-loading-bar"></div>
      </div>
    </div>
  );
}
