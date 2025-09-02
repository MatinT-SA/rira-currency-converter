import React, { useState, type ChangeEvent } from "react";

const App: React.FC = () => {
  // Exchange rate (fixed rate for simplicity)
  const EXCHANGE_RATE = 1050000;

  const [amount, setAmount] = useState<number | string>("");
  const [fromCurrency, setFromCurrency] = useState<"dollar" | "rial">("dollar");

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? "" : value);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value as "dollar" | "rial");
  };

  const convertCurrency = (inputAmount: number | string): number | string => {
    if (typeof inputAmount !== "number" || isNaN(inputAmount)) {
      return "";
    }

    if (fromCurrency === "dollar") {
      return inputAmount * EXCHANGE_RATE;
    } else {
      return (inputAmount / EXCHANGE_RATE).toFixed(2);
    }
  };

  const convertedAmount = convertCurrency(amount);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-vazirmatn"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          تبدیل‌ کننده ارز
        </h1>
        <div className="space-y-4">
          <div className="relative">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              مقدار
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              placeholder="0"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تبدیل از
            </label>
            <select
              id="currency"
              name="currency"
              value={fromCurrency}
              onChange={handleCurrencyChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="dollar">دلار ($)</option>
              <option value="rial">ریال (IRR)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">مقدار تبدیل‌ شده:</p>
          <p className="text-2xl font-semibold text-indigo-700 mt-1">
            {convertedAmount} {fromCurrency === "dollar" ? "ریال" : "دلار"}
          </p>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          توجه: این تبدیل‌ کننده از یک نرخ ثابت ({EXCHANGE_RATE}) استفاده میکند.
        </p>
      </div>
    </div>
  );
};

export default App;
