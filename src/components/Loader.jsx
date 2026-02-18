export default function Loader() {
    return (
      <div 
        className="min-h-[100vh] flex flex-col items-center justify-center gap-4 bg-slate-50 text-slate-900"
        role="status"
        aria-label="Chargement en cours"
      >
        {/* Cercle avec bordure animée */}
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#AF937F] animate-spin" />
        
        <p className="text-sm tracking-[0.15em] uppercase font-medium text-slate-600 animate-pulse">
          Chargement...
        </p>
      </div>
    );
  }