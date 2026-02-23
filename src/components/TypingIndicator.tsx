export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm max-w-[200px] border border-sand">
      <span className="text-sm text-muted">Doña Obra está escribiendo</span>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
