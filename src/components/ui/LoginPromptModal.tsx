'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export const LoginPromptModal: React.FC = () => {
  const { loginPromptOpen, closeLoginPrompt, login, signup } = useApp();
  const router = useRouter();

  if (!loginPromptOpen) return null;

  const handleLogin = () => {
    login();
    closeLoginPrompt();
    router.push('/checkout');
  };

  const handleSignup = () => {
    signup();
    closeLoginPrompt();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-modal text-center relative border border-[#E7DFD0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft circle with gold lock */}
        <div className="w-16 h-16 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center mb-5">
          <Lock className="w-7 h-7 text-[#B8893B]" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1C1917] mb-2">
          Log in to continue
        </h3>
        <p className="text-sm text-[#6B645A] leading-relaxed mb-6">
          Create an account or log in to place your order. Your cart will be saved and waiting for you.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#0E3B2E] text-white rounded-lg font-medium hover:bg-[#08261E] transition shadow-sm text-sm"
          >
            Log In (Instant Demo)
          </button>

          <button
            onClick={handleSignup}
            className="w-full py-3 border border-[#E7DFD0] text-[#1C1917] rounded-lg font-medium hover:bg-[#FAF6EE] transition text-sm"
          >
            Create an Account
          </button>

          <button
            onClick={closeLoginPrompt}
            className="w-full pt-2 text-xs font-medium text-[#6B645A] hover:text-[#1C1917] transition"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};

