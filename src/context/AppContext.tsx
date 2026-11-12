'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Customer,
  PaymentTransaction,
  GoldRates,
  mockProducts as defaultProducts,
  mockOrders as defaultOrders,
  mockCustomers as defaultCustomers,
  mockTransactions as defaultTransactions,
  initialGoldRates,
} from '@/data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    avatarInitials: string;
  };
  login: () => void;
  logout: () => void;
  signup: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Login Required Modal
  loginPromptOpen: boolean;
  openLoginPrompt: () => void;
  closeLoginPrompt: () => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], tracking?: string, note?: string) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;

  // Customers & Payments
  customers: Customer[];
  transactions: PaymentTransaction[];
  verifyTransaction: (txnId: string, approve: boolean) => void;

  // Gold Rates
  goldRates: GoldRates;
  updateGoldRates: (newRates: Partial<GoldRates>) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state (defaults to true for smooth review, but can toggle anytime)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const user = {
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
    avatarInitials: 'AK',
  };

  // Products state
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  // Cart state seeded with 3 items matching the Figma mockups
  const [cart, setCart] = useState<CartItem[]>([
    { product: defaultProducts[0], quantity: 1 },
    { product: defaultProducts[1], quantity: 1 },
    { product: defaultProducts[2], quantity: 1 },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-4']);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(defaultOrders);

  // Customers & Transactions
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(defaultTransactions);

  // Gold rates
  const [goldRates, setGoldRates] = useState<GoldRates>(initialGoldRates);

  // Modal prompt
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: ToastInfo['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = () => {
    setIsLoggedIn(true);
    setLoginPromptOpen(false);
    showToast('Signed in successfully as Ayesha Khan', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out of your account', 'info');
  };

  const signup = () => {
    setIsLoggedIn(true);
    setLoginPromptOpen(false);
    showToast('Account created successfully! Welcome to Madni Jeweller.', 'success');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
    showToast(`Product "${created.name}" added successfully!`, 'success');
    return created;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  const createOrder = (orderData: Partial<Order>) => {
    const newId = `MJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newId,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      shippingAddress: {
        street: 'House 24, Street 7, Model Town',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54700',
        ...orderData.shippingAddress,
      },
      date: '18 Oct 2026',
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        category: c.product.category,
        purity: c.product.purity,
        weight: c.product.weight,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image || '',
        imageBg: c.product.bgTint,
      })),
      subtotal: cartSubtotal,
      deliveryFee: 0,
      total: cartSubtotal,
      deliveryMethod: orderData.deliveryMethod || 'Insured home delivery',
      paymentMethod: orderData.paymentMethod || 'Bank Transfer',
      paymentStatus: orderData.paymentMethod === 'Bank Transfer' ? 'Pending verification' : 'Paid',
      orderStatus: 'Pending',
      timeline: [
        {
          status: 'Order placed',
          timestamp: 'Just now',
          description: 'Order created by customer',
          completed: true,
        },
        {
          status: 'Payment receipt uploaded',
          timestamp: 'Just now',
          description: 'Payment slip submitted',
          completed: true,
        },
        {
          status: 'Awaiting payment verification',
          timestamp: 'Admin review required',
          completed: false,
        },
        {
          status: 'Processing',
          timestamp: 'Estimated soon',
          completed: false,
        },
        {
          status: 'Shipped',
          timestamp: 'Pending dispatch',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: 'Expected in 2-4 days',
          completed: false,
        },
      ],
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also record transaction
    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(5800 + Math.random() * 200)}`,
      orderId: newId,
      customer: user.name,
      method: newOrder.paymentMethod,
      amount: newOrder.total,
      date: '18 Oct 2026',
      status: newOrder.paymentStatus as any,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    clearCart();
    showToast(`Order ${newId} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['orderStatus'],
    tracking?: string,
    note?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          orderStatus: status,
          courierTracking: tracking !== undefined ? tracking : o.courierTracking,
          internalNote: note !== undefined ? note : o.internalNote,
        };
      })
    );
    showToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
    setTransactions((prev) =>
      prev.map((t) => (t.orderId === orderId ? { ...t, status: status as any } : t))
    );
    showToast(`Payment status updated to ${status}`, 'success');
  };

  const verifyTransaction = (txnId: string, approve: boolean) => {
    const status = approve ? 'Verified' : 'Rejected';
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, status: status as any } : t))
    );
    const txn = transactions.find((t) => t.id === txnId);
    if (txn) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === txn.orderId
            ? {
                ...o,
                paymentStatus: status as any,
                orderStatus: approve ? 'Processing' : 'Cancelled',
              }
            : o
        )
      );
    }
    showToast(`Transaction ${txnId} marked as ${status}`, approve ? 'success' : 'warning');
  };

  const updateGoldRates = (newRates: Partial<GoldRates>) => {
    setGoldRates((prev) => ({
      ...prev,
      ...newRates,
      lastUpdated: 'Just now',
    }));
    showToast('Today’s gold rates updated successfully!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        signup,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        loginPromptOpen,
        openLoginPrompt: () => setLoginPromptOpen(true),
        closeLoginPrompt: () => setLoginPromptOpen(false),
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        customers,
        transactions,
        verifyTransaction,
        goldRates,
        updateGoldRates,
        wishlist,
        toggleWishlist,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

