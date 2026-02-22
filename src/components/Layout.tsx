/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-brand-soft border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-sm font-bold tracking-tighter uppercase">tiktopsize.com</Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:underline underline-offset-4">home</Link>
            <Link to="/how-it-works" className="hover:underline underline-offset-4">how it works</Link>
            <Link to="/pricing" className="hover:underline underline-offset-4">pricing</Link>
            <Link to="/privacy" className="hover:underline underline-offset-4">privacy</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {user.user_metadata.full_name || user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  log out
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/auth?mode=login" 
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  log in
                </Link>
                <Link 
                  to="/auth?mode=signup" 
                  className="px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
            <div className="max-w-sm">
              <h2 className="editorial-title text-5xl mb-6">TikTop Size.</h2>
              <p className="text-zinc-400 text-lg">AI-powered image outpainting for the next generation of TikTok Shop sellers.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-zinc-400">Home</Link></li>
                  <li><Link to="/pricing" className="hover:text-zinc-400">Pricing</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-zinc-400">How it works</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/privacy" className="hover:text-zinc-400">Privacy</Link></li>
                  <li><Link to="/privacy" className="hover:text-zinc-400">Terms</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="mailto:hello@tiktopsize.com" className="hover:text-zinc-400">Email</a></li>
                  <li><a href="#" className="hover:text-zinc-400">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <p>© 2024 TikTop Size. All rights reserved.</p>
            <p>Made for TikTok Shop Sellers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
