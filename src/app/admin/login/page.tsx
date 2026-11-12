'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/ui/DiamondLogo';
import { useApp } from '@/context/AppContext';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [email, setEmail] = useState('admin@madnijeweller.pk');
  const [password, setPassword] = useState('••••••••');

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed in to Madni Jeweller Admin Panel', 'success');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0E3B2E] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-white/20 text-center space-y-6 animate-fadeIn">
        {/* Logo */}
        <div className="flex justify-center">
          <BrandLogo variant="dark" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-[#FAF3E0] text-[#B8893B] text-[11px] font-semibold tracking-wider uppercase">
          Admin Portal
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-semibold">
          Sign in to manage your shop
        </h1>

        <form onSubmit={handleAdminSignIn} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@madnijeweller.pk"
                className="w-full px-4 py-3 pl-10 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                required
              />
              <Mail className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Password</label>
              <button
                type="button"
                onClick={() => showToast('Demo Mode: Click Sign In directly', 'info')}
                className="text-[11px] text-[#B8893B] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                required
              />
              <Lock className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition shadow-md mt-2"
          >
            Sign In (Instant Demo Access)
          </button>
        </form>

        <div className="pt-2 border-t border-[#E7DFD0] flex items-center justify-center gap-1.5 text-[11px] text-[#6B645A]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#B8893B]" />
          Restricted area · Authorized staff only
        </div>
      </div>
    </div>
  );
}

