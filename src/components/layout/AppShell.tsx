import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-charcoal">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
