import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/journeys", label: "Journeys" },
  { to: "/hotels", label: "Stays" },
  { to: "/rooms", label: "Rooms" },
  { to: "/guides", label: "Guides" },
  { to: "/provinces", label: "Provinces" },
  { to: "/cities", label: "Cities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "People" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-10 md:pt-8">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-2xl px-5 py-3 shadow-soft glass-panel">
        <NavLink to="/" className="font-display text-xl tracking-[0.04em] text-charcoal md:text-2xl">
          Đất Việt
        </NavLink>
        <nav className="flex items-center gap-6 text-sm font-medium text-charcoal/80">
          {links.map((l) => {
            const active =
              l.to === "/"
                ? location.pathname === "/"
                : l.to === "/about" ||
                    l.to === "/contact" ||
                    l.to === "/services" ||
                    l.to === "/gallery" ||
                    l.to === "/team"
                  ? location.pathname === l.to
                  : location.pathname === l.to || location.pathname.startsWith(`${l.to}/`);
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={["transition-colors hover:text-sunset-deep", active ? "text-forest" : ""].join(" ")}
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            );
          })}
          <span className="hidden rounded-full border border-charcoal/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-charcoal/50 md:inline">
            Magazine · Guide
          </span>
        </nav>
      </div>
    </header>
  );
}
