import React from "react";
import { Outlet, Link } from "react-router-dom";

/**
 * AuthLayout - A layout component that wraps the authentication pages with a consistent design.
 * It includes a top brand bar, a main auth container and a footer.
 * The main auth container contains a left section with marketing text and a right section that renders the Login/Register page.
 * The footer contains a small note about the data being private.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    
      {/* Main auth container */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8 pt-2 md:px-6 md:pb-12">
        <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          {/* Left: cute intro / marketing text */}
          <section className="hidden md:block">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-xs text-pink-200">
              
            </div>
          </section>

          {/* Right: Auth card where Login/Register will render */}
          <section className="w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-xl p-5 sm:p-6 md:p-7">
              {/* Small header inside card (optional) */}
              

              {/* This is where LoginPage / RegisterPage will appear */}
              <Outlet />
            </div>

            {/* Tiny footer */}
            <p className="mt-4 text-center text-[11px] text-slate-500">
              Your data stays private between you two. No public sharing, only shared caring. 💗
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
