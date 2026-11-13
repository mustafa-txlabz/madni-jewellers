'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BrandLogo, DiamondEmblem } from '@/components/ui/DiamondLogo';
import { User, Mail, Phone, Lock, ChevronLeft } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useApp();
  const [fullName, setFullName] = useState('Ayesha Khan');
  const [email, setEmail] = useState('ayesha.khan@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [agreed, setAgreed] = useState(true);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup();
    router.push('/shop');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF6EE] animate-fadeIn">
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
            Join Madni Jeweller
          </h2>
          <p className="text-xs text-[#F3E7CC]/80 font-light leading-relaxed max-w-sm">
            Create a free account to order jewellery, track deliveries and manage your details.
          </p>
        </div>
      </div>

      {/* Right Signup Form Column */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 max-w-lg mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-[#6B645A] hover:text-[#0E3B2E] mb-6 font-medium transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to shop
        </Link>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mb-1.5">
          Create account
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645A] mb-8">
          It only takes a minute. Browsing never needs an account.
        </p>

        {/* Form */}
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Full name</label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ayesha Khan"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                required
              />
              <User className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                required
              />
              <Mail className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Mobile number</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 3XX XXXXXXX"
                className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                required
              />
              <Phone className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                  required
                />
                <Lock className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-4 py-3 pl-10 bg-white border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                  required
                />
                <Lock className="w-4 h-4 text-[#6B645A] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#0E3B2E] focus:ring-[#0E3B2E] accent-[#0E3B2E]"
              required
            />
            <label htmlFor="terms" className="text-xs text-[#6B645A] leading-tight cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition shadow-sm mt-2"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#E7DFD0] w-full" />
            <span className="bg-[#FAF6EE] px-3 text-[11px] text-[#6B645A] uppercase tracking-wider absolute">
              or
            </span>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => {
              signup();
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
            Sign up with Google
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-xs text-[#6B645A] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0E3B2E] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

