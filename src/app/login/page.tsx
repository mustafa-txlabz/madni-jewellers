'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BrandLogo, DiamondEmblem } from '@/components/ui/DiamondLogo';
import { ChevronLeft, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState('ayesha.khan@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1-click prototype login as requested
    login();
    router.push('/shop');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF6EE]">
      {/* Left Emerald Brand Column */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#0E3B2E] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div>
          <Link href="/" className="group inline-block">
            <BrandLogo variant="light" size="responsive" />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center my-auto">
          <div className="w-56 h-56 rounded-full bg-[#13493A] flex items-center justify-center shadow-2xl relative">
            <DiamondEmblem size={96} color="#B8893B" className="drop-shadow-lg" />
          </div>
        </div>

        <div className="space-y-3 z-10">
          <h2 className="font-serif text-3xl font-medium text-white leading-tight">
            Welcome back to <br />
            Madni Jeweller
          </h2>
          <p className="text-xs text-[#F3E7CC]/80 font-light leading-relaxed max-w-sm">
            Log in to track orders, save your wishlist and check out faster.
          </p>
        </div>
      </div>

      {/* Right Login Form Column */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 max-w-lg mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-[#6B645A] hover:text-[#0E3B2E] mb-8 font-medium transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to shop
        </Link>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mb-2">
          Log in
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645A] mb-8">
          Enter your details to access your account.
        </p>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Email / Mobile */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              Email or mobile number
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
              />
              <Mail className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Password</label>
              <button
                type="button"
                onClick={() => alert('Demo prototype: clicking Log In will sign you in!')}
                className="text-xs text-[#B8893B] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
              />
              <Lock className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-[#0E3B2E] focus:ring-[#0E3B2E] accent-[#0E3B2E]"
            />
            <label htmlFor="remember" className="text-xs text-[#6B645A] cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition shadow-sm"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#E7DFD0] w-full" />
            <span className="bg-[#FAF6EE] px-3 text-[11px] text-[#6B645A] uppercase tracking-wider absolute">
              or
            </span>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => {
              login();
              router.push('/shop');
            }}
            className="w-full py-3 bg-white border border-[#E7DFD0] text-[#1C1917] rounded-xl text-xs sm:text-sm font-medium hover:bg-[#F2ECDF] transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-xs text-[#6B645A] mt-8">
          New to Madni Jeweller?{' '}
          <Link href="/signup" className="text-[#0E3B2E] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

