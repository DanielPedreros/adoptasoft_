// src/presentation/layouts/DashboardLayout.jsx

export function DashboardLayout({ subtitle, roleLabel, roleIcon, navItems, activeNav, onNavigate, onLogout, children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-warm-cream">
      <header className="flex items-center justify-between bg-gradient-to-r from-primary to-primary-dark px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <button className="text-xl">☰</button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">🐾</div>
          <div>
            <p className="font-bold leading-tight">Adoptasoft</p>
            <p className="text-[10px] uppercase tracking-wide text-white/80">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            {roleIcon} {roleLabel}
          </span>
          <button
            onClick={onLogout}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold hover:bg-white/25"
          >
            ⎋ Salir
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-60 flex-col justify-between border-r border-border bg-warm-cream px-4 py-6 md:flex">
          <div>
            <p className="mb-3 px-2 text-xs font-semibold tracking-wide text-text-muted">NAVEGACIÓN</p>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors
                    ${activeNav === item.key
                      ? "border border-primary bg-white text-primary"
                      : "text-text-dark hover:bg-white/60"
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary-light/30 px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              {roleIcon}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-dark">{roleLabel}</p>
              <p className="text-xs text-text-muted">Sesión activa</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
