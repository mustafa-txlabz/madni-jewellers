import React from 'react';

export type BadgeVariant =
  | 'Paid'
  | 'Pending'
  | 'Pending verification'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Rejected'
  | 'New'
  | 'Bestseller'
  | 'Active'
  | 'Low stock'
  | 'Out of stock'
  | 'Awaiting payment';

interface BadgeProps {
  label?: string;
  variant?: BadgeVariant | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant, className = '' }) => {
  const text = label || variant || '';

  const getStyles = () => {
    switch (text) {
      case 'Paid':
      case 'Delivered':
      case 'Active':
      case 'Verified':
        return 'bg-[#E8F5EF] text-[#157F4F] border border-[#157F4F]/20';
      case 'Pending':
      case 'Pending verification':
      case 'Awaiting payment':
      case 'Low stock':
      case 'Collect on delivery':
        return 'bg-[#FEF3EB] text-[#B54708] border border-[#B54708]/20';
      case 'Processing':
        return 'bg-[#EFF8FF] text-[#1D5FBF] border border-[#1D5FBF]/20';
      case 'Shipped':
        return 'bg-[#EFF8FF] text-[#1D5FBF] border border-[#1D5FBF]/20';
      case 'Cancelled':
      case 'Rejected':
      case 'Out of stock':
        return 'bg-[#FEE4E2] text-[#B42318] border border-[#B42318]/20';
      case 'New':
        return 'bg-[#0E3B2E] text-white';
      case 'Bestseller':
        return 'bg-[#0E3B2E] text-white';
      default:
        return 'bg-[#F2ECDF] text-[#1C1917] border border-[#E7DFD0]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStyles()} ${className}`}
    >
      {text}
    </span>
  );
};

