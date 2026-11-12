'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import {
  Download,
  Check,
  X,
  CreditCard,
  Clock,
  Truck,
  RotateCcw,
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const { transactions, verifyTransaction, showToast } = useApp();
  const [filterTab, setFilterTab] = useState<string>('All');

  const filtered = transactions.filter((t) => {
    if (filterTab === 'All') return true;
    if (filterTab === 'Pending verification') return t.status === 'Pending verification';
    if (filterTab === 'Verified') return t.status === 'Verified';
    if (filterTab === 'COD') return t.status === 'Collect on delivery';
    if (filterTab === 'Rejected') return t.status === 'Rejected';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Payments</h1>
          <p className="text-xs text-[#6B645A] mt-1">
            Track incoming payments and verify bank transfers and wallet receipts.
          </p>
        </div>

        <button
          onClick={() => showToast('Payment ledger exported to CSV', 'success')}
          className="px-4 py-2.5 bg-white border border-[#E7DFD0] rounded-xl text-xs font-semibold text-[#1C1917] hover:border-[#0E3B2E] transition flex items-center gap-2 self-start shadow-sm"
        >
          <Download className="w-4 h-4 text-[#B8893B]" />
          Export CSV
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Received this month</span>
            <CreditCard className="w-4 h-4 text-[#157F4F]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#0E3B2E]">Rs. 18,450,000</p>
          <p className="text-[11px] text-[#6B645A] mt-1">From 52 verified payments</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Awaiting verification</span>
            <Clock className="w-4 h-4 text-[#B54708]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#B54708]">6 payments</p>
          <p className="text-[11px] text-[#B54708] mt-1 font-medium">Rs. 2,125,000 pending</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>COD to collect</span>
            <Truck className="w-4 h-4 text-[#B8893B]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#1C1917]">Rs. 1,240,000</p>
          <p className="text-[11px] text-[#6B645A] mt-1">4 orders out for delivery</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Refunded</span>
            <RotateCcw className="w-4 h-4 text-[#B42318]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#1C1917]">Rs. 228,500</p>
          <p className="text-[11px] text-[#6B645A] mt-1">1 refund this month</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { label: 'All', count: transactions.length },
          { label: 'Pending verification', count: transactions.filter((t) => t.status === 'Pending verification').length },
          { label: 'Verified', count: transactions.filter((t) => t.status === 'Verified').length },
          { label: 'COD', count: transactions.filter((t) => t.status === 'Collect on delivery').length },
          { label: 'Rejected', count: transactions.filter((t) => t.status === 'Rejected').length },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilterTab(tab.label)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
              filterTab === tab.label
                ? 'bg-[#0E3B2E] text-white shadow-sm'
                : 'bg-white border border-[#E7DFD0] text-[#1C1917] hover:bg-[#FAF6EE]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterTab === tab.label
                  ? 'bg-white/20 text-white'
                  : 'bg-[#F2ECDF] text-[#6B645A]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-[#E7DFD0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] border-b border-[#E7DFD0] text-[#6B645A]">
              <tr>
                <th className="py-3 px-4 font-semibold">TRANSACTION</th>
                <th className="py-3 px-4 font-semibold">ORDER</th>
                <th className="py-3 px-4 font-semibold">CUSTOMER</th>
                <th className="py-3 px-4 font-semibold">METHOD</th>
                <th className="py-3 px-4 font-semibold">AMOUNT</th>
                <th className="py-3 px-4 font-semibold">DATE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]/60">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#FAF6EE]/50 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-[#1C1917]">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0E3B2E]">
                    <Link href={`/admin/orders/${t.orderId}`}>{t.orderId}</Link>
                  </td>
                  <td className="py-3 px-4 text-[#1C1917]">{t.customer}</td>
                  <td className="py-3 px-4 text-[#6B645A]">{t.method}</td>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">
                    Rs. {t.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#6B645A]">{t.date}</td>
                  <td className="py-3 px-4">
                    <Badge variant={t.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {t.status === 'Pending verification' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => verifyTransaction(t.id, true)}
                          className="w-7 h-7 rounded-lg bg-[#E8F5EF] text-[#157F4F] hover:bg-[#157F4F] hover:text-white transition flex items-center justify-center"
                          title="Verify Receipt"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => verifyTransaction(t.id, false)}
                          className="w-7 h-7 rounded-lg bg-[#FEE4E2] text-[#B42318] hover:bg-[#B42318] hover:text-white transition flex items-center justify-center"
                          title="Reject Receipt"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#6B645A] italic">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

