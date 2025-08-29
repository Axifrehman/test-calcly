import { useState, useEffect } from 'react';
import { DollarSign, ArrowRightLeft, TrendingUp } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<{
    convertedAmount: number;
    rate: number;
    lastUpdated: string;
  } | null>(null);

  // Enhanced exchange rates for Tier 1 countries (USD as default base)
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 149, CAD: 1.36, AUD: 1.52, CHF: 0.88, CNY: 7.24, INR: 83.15, SEK: 10.85, NOK: 10.45, DKK: 6.85, NZD: 1.68, SGD: 1.35 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 162, CAD: 1.48, AUD: 1.66, CHF: 0.96, CNY: 7.88, INR: 90.6, SEK: 11.8, NOK: 11.4, DKK: 7.46, NZD: 1.83, SGD: 1.47 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 189, CAD: 1.72, AUD: 1.93, CHF: 1.11, CNY: 9.2, INR: 105.6, SEK: 13.8, NOK: 13.3, DKK: 8.7, NZD: 2.13, SGD: 1.71 },
    JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.010, CHF: 0.0059, CNY: 0.049, INR: 0.56, SEK: 0.073, NOK: 0.070, DKK: 0.046, NZD: 0.011, SGD: 0.009 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110, AUD: 1.12, CHF: 0.65, CNY: 5.33, INR: 61.2, SEK: 8.0, NOK: 7.7, DKK: 5.04, NZD: 1.24, SGD: 0.99 },
    AUD: { USD: 0.66, EUR: 0.60, GBP: 0.52, JPY: 98, CAD: 0.89, CHF: 0.58, CNY: 4.76, INR: 54.7, SEK: 7.14, NOK: 6.9, DKK: 4.5, NZD: 1.11, SGD: 0.89 },
    CHF: { USD: 1.14, EUR: 1.04, GBP: 0.90, JPY: 169, CAD: 1.54, AUD: 1.72, CNY: 8.25, INR: 94.8, SEK: 12.4, NOK: 11.9, DKK: 7.8, NZD: 1.91, SGD: 1.54 },
    CNY: { USD: 0.138, EUR: 0.127, GBP: 0.109, JPY: 20.6, CAD: 0.188, AUD: 0.21, CHF: 0.121, INR: 11.5, SEK: 1.5, NOK: 1.44, DKK: 0.95, NZD: 0.232, SGD: 0.186 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.79, CAD: 0.016, AUD: 0.018, CHF: 0.0105, CNY: 0.087, SEK: 0.13, NOK: 0.125, DKK: 0.082, NZD: 0.020, SGD: 0.016 },
    SEK: { USD: 0.092, EUR: 0.085, GBP: 0.072, JPY: 13.7, CAD: 0.125, AUD: 0.14, CHF: 0.081, CNY: 0.67, INR: 7.66, NOK: 0.96, DKK: 0.63, NZD: 0.155, SGD: 0.124 },
    NOK: { USD: 0.096, EUR: 0.088, GBP: 0.075, JPY: 14.3, CAD: 0.13, AUD: 0.145, CHF: 0.084, CNY: 0.69, INR: 8.0, SEK: 1.04, DKK: 0.65, NZD: 0.161, SGD: 0.129 },
    DKK: { USD: 0.146, EUR: 0.134, GBP: 0.115, JPY: 21.8, CAD: 0.198, AUD: 0.22, CHF: 0.128, CNY: 1.05, INR: 12.1, SEK: 1.58, NOK: 1.54, NZD: 0.245, SGD: 0.197 },
    NZD: { USD: 0.595, EUR: 0.547, GBP: 0.469, JPY: 88.7, CAD: 0.806, AUD: 0.90, CHF: 0.523, CNY: 4.31, INR: 49.5, SEK: 6.46, NOK: 6.2, DKK: 4.08, SGD: 0.803 },
    SGD: { USD: 0.741, EUR: 0.681, GBP: 0.584, JPY: 110, CAD: 1.004, AUD: 1.12, CHF: 0.651, CNY: 5.36, INR: 61.6, SEK: 8.04, NOK: 7.7, DKK: 5.07, NZD: 1.246 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', tier: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', tier: 1 },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', tier: 1 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', tier: 1 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', tier: 1 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', tier: 1 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', tier: 1 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', tier: 1 },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', tier: 1 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', tier: 1 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', tier: 1 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', tier: 1 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', tier: 2 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', tier: 2 }
  ];

  const convertCurrency = () => {
    if (!amount || fromCurrency === toCurrency) return;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;

    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    const convertedAmount = amountNum * rate;

    setResult({
      convertedAmount,
      rate,
      lastUpdated: new Date().toLocaleString()
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const getCurrencyInfo = (code: string) => currencies.find(c => c.code === code);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Currency Converter</h2>
            <p className="text-emerald-100">Convert between world currencies</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
            />
          </div>

          {/* Currency Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-3 bg-gray-100 hover:bg-emerald-100 rounded-full transition-colors group"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && amount && (
          <div className="mt-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-900 mb-2">
                  {getCurrencyInfo(toCurrency)?.symbol}{result.convertedAmount.toFixed(2)}
                </div>
                <p className="text-lg text-emerald-800">
                  {getCurrencyInfo(fromCurrency)?.symbol}{amount} {fromCurrency} = {getCurrencyInfo(toCurrency)?.symbol}{result.convertedAmount.toFixed(2)} {toCurrency}
                </p>
                <p className="text-sm text-emerald-600 mt-2">
                  Exchange Rate: 1 {fromCurrency} = {result.rate.toFixed(6)} {toCurrency}
                </p>
                <p className="text-xs text-emerald-500 mt-1">
                  Last Updated: {result.lastUpdated}
                </p>
              </div>
            </div>

            {/* Rate Comparison */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Exchange Rate Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-blue-800">
                  <strong>1 {fromCurrency} =</strong> {result.rate.toFixed(6)} {toCurrency}
                </div>
                <div className="text-blue-800">
                  <strong>1 {toCurrency} =</strong> {(1/result.rate).toFixed(6)} {fromCurrency}
                </div>
              </div>
            </div>

            {/* Popular Conversions */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Conversions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 5, 10, 100].map(val => (
                  <div key={val} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="font-semibold text-gray-900">
                      {getCurrencyInfo(fromCurrency)?.symbol}{val}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getCurrencyInfo(toCurrency)?.symbol}{(val * result.rate).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Disclaimer & Credit */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-gray-900">Developed by Waleed Rajpoot</p>
            <p className="text-xs text-gray-600">Professional Calculator Developer</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>Financial Disclaimer:</strong> This currency converter uses sample exchange rates for demonstration purposes. For actual financial transactions, always use real-time rates from official financial institutions or verified currency exchange services. Exchange rates fluctuate constantly and the rates shown here may not reflect current market conditions.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> The exchange rates used in this calculator are for educational and estimation purposes only. For actual currency conversion, please consult with banks, financial institutions, or official currency exchange services.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
