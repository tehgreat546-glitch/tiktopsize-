/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'login';
  const isLogin = mode === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('rememberMe') !== 'false';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Persist the preference
        localStorage.setItem('rememberMe', rememberMe.toString());
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
        navigate('/auth?mode=login');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-brand-pink">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-brand-black p-12 shadow-2xl shadow-black/5"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4">{isLogin ? 'Welcome back.' : 'Join the club.'}</h1>
          <p className="text-zinc-500 text-sm font-medium">
            {isLogin ? 'Log in to manage your TikTok Shop images' : 'Start creating perfect product images today'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleAuth}>
          {!isLogin && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-zinc-400">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-brand-black/10 focus:outline-none focus:border-brand-black transition-all text-sm"
              />
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
              <input 
                type="email" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-brand-black/10 focus:outline-none focus:border-brand-black transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-zinc-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-brand-black/10 focus:outline-none focus:border-brand-black transition-all text-sm"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer appearance-none w-4 h-4 border border-brand-black/20 rounded-sm checked:bg-brand-black checked:border-brand-black transition-all"
                  />
                  <svg 
                    className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-zinc-500 group-hover:text-brand-black transition-colors">Remember me</span>
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset functionality coming soon!')}
                className="text-xs font-bold text-zinc-400 hover:text-brand-black transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-black text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Log In' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-brand-black/5 text-center">
          <p className="text-xs font-medium text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link 
              to={`/auth?mode=${isLogin ? 'signup' : 'login'}`}
              className="font-bold text-brand-black hover:opacity-50 transition-opacity"
            >
              {isLogin ? 'SIGN UP' : 'LOG IN'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
