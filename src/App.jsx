import React, { useState } from 'react';

export default function App() {
  // Mock state representing what the Java backend will eventually send us
  const [customer, setCustomer] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com"
  });

  const [accounts, setAccounts] = useState([
    { accountNumber: 1001, accountType: "CHECKING", balance: 5420.50 },
    { accountNumber: 1002, accountType: "SAVINGS", balance: 12750.00 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, type: "DEPOSIT", amount: 1200.00, target: "Checking", date: "2026-11-01" },
    { id: 2, type: "WITHDRAWAL", amount: 45.50, target: "Checking", date: "2026-11-02" },
    { id: 3, type: "TRANSFER", amount: 500.00, target: "Savings", date: "2026-11-03" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar Section */}
      <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">ApexTrust Management System</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium">
            👋 Welcome, {customer.firstName}
          </span>
          <button className="text-sm bg-red-500 hover:bg-red-600 transition px-3 py-1.5 rounded-md font-semibold">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="max-w-6xl mx-auto p-6 mt-6">
        
        {/* Top Summary Banner */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{customer.firstName} {customer.lastName}</h2>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Net Liquid Assets</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">
              ${accounts.reduce((acc, curr) => acc + curr.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Grid Setup for Accounts and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Account Cards */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Active Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {accounts.map((acc) => (
                <div key={acc.accountNumber} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl text-white shadow-md relative overflow-hidden">
                  <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-500/30">
                      {acc.accountType}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">#{acc.accountNumber}</span>
                  </div>
                  <div className="mt-8">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Available Balance</p>
                    <p className="text-2xl font-bold mt-1">${acc.balance.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Transaction Ledger Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs text-gray-400 uppercase font-semibold">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Target Account</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/70 transition">
                        <td className="py-3.5 text-gray-500 font-mono">{tx.date}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-700' :
                            tx.type === 'WITHDRAWAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3.5 text-gray-600 font-medium">{tx.target}</td>
                        <td className={`py-3.5 text-right font-semibold ${
                          tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Column 3: Action Panel */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Quick Actions</h3>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition py-3 rounded-lg font-semibold text-sm border border-blue-200/50">
                ➕ Open New Account
              </button>
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition py-3 rounded-lg font-semibold text-sm shadow-sm">
                💸 Transfer Funds
              </button>
              <button className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition py-3 rounded-lg font-semibold text-sm">
                📥 Deposit Money
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
