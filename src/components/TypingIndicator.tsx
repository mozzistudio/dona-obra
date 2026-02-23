export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-coral to-coral-dark rounded-lg flex items-center justify-center text-base shadow-sm shrink-0">
        👷‍♀️
      </div>
      <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-[18px_18px_18px_4px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[220px]">
        <span className="text-sm text-muted">Escribiendo</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
