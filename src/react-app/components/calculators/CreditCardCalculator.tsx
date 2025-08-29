import { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Percent, TrendingDown, Info, AlertTriangle } from 'lucide-react';

export default function CreditCardCalculator() {
  const [currentBalance, setCurrentBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [currency, setCurrency] = useState('USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const calculateCreditCard = () => {
    const balance = parseFloat(currentBalance) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const payment = parseFloat(monthlyPayment) || 0;

    if (balance <= 0 || rate <= 0 || payment <= 0) {
      return {
        months: 0,
        totalPayments: 0,
        totalInterest: 0,
        minimumPayment: balance * 0.02, // Typical 2% minimum payment
      };
    }

    // Calculate minimum payment (typically 2% of balance)
    const minimumPayment = Math.max(25, balance * 0.02);

    // If payment is less than interest, debt will never be paid off
    const monthlyInterest = balance * rate;
    if (payment <= monthlyInterest) {
      return {
        months: Infinity,
        totalPayments: Infinity,
        totalInterest: Infinity,
        minimumPayment,
        warningMessage: 'Payment too low - debt will never be paid off!'
      };
    }

    // Calculate payoff time
    let remainingBalance = balance;
    let totalPaid = 0;
    let months = 0;

    while (remainingBalance > 0.01 && months < 600) { // Cap at 50 years
      const interestCharge = remainingBalance * rate;
      const principalPayment = Math.min(payment - interestCharge, remainingBalance);
      
      remainingBalance -= principalPayment;
      totalPaid += payment;
      months++;

      if (principalPayment <= 0) break;
    }

    const totalInterest = totalPaid - balance;

    return {
      months,
      totalPayments: totalPaid,
      totalInterest,
      minimumPayment,
    };
  };

  const result = calculateCreditCard();
  const hasValidInputs = parseFloat(currentBalance) > 0 && parseFloat(interestRate) > 0;

  // Calculate minimum payment scenario
  const calculateMinimumPaymentScenario = () => {
    const balance = parseFloat(currentBalance) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const minPayment = Math.max(25, balance * 0.02);

    if (balance <= 0 || rate <= 0) return null;

    let remainingBalance = balance;
    let totalPaid = 0;
    let months = 0;

    while (remainingBalance > 0.01 && months < 600) {
      const interestCharge = remainingBalance * rate;
      const currentMinPayment = Math.max(25, remainingBalance * 0.02);
      const principalPayment = Math.min(currentMinPayment - interestCharge, remainingBalance);
      
      if (principalPayment <= 0) break;
      
      remainingBalance -= principalPayment;
      totalPaid += currentMinPayment;
      months++;
    }

    return {
      months,
      totalPayments: totalPaid,
      totalInterest: totalPaid - balance,
      monthlyPayment: minPayment,
    };
  };

  const minPaymentResult = calculateMinimumPaymentScenario();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Credit Card Payoff Calculator</h2>
            <p className="text-purple-100">Calculate payoff time and interest savings</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Currency Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.symbol} {curr.name} ({curr.code})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Card Details</h3>

            {/* Current Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  placeholder="5000"
                  step="100"
                  min="0"
                  max="100000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            {/* Interest Rate (APR) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Percent className="w-4 h-4 mr-2" />
                Annual Interest Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="18.99"
                  step="0.1"
                  min="0"
                  max="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Monthly Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Monthly Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="200"
                  step="10"
                  min="25"
                  max="10000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                />
              </div>
              {hasValidInputs && (
                <div className="mt-2 text-sm text-gray-600">
                  Minimum payment: {currentCurrency.symbol}{result.minimumPayment.toFixed(2)}
                </div>
              )}
            </div>

            {/* Credit Card Rate Guide */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Typical Credit Card Interest Rates ({currency})
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Excellent Credit (750+):</span>
                  <span className="font-medium">13% - 16%</span>
                </div>
                <div className="flex justify-between">
                  <span>Good Credit (700-749):</span>
                  <span className="font-medium">16% - 20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Fair Credit (650-699):</span>
                  <span className="font-medium">20% - 25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Poor Credit (&lt;650):</span>
                  <span className="font-medium">25% - 30%</span>
                </div>
              </div>
            </div>

            {/* Warning for low payments */}
            {result.warningMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm font-semibold text-red-900">{result.warningMessage}</span>
                </div>
                <p className="text-xs text-red-800 mt-2">
                  Your monthly payment must be higher than the monthly interest charge to pay off the debt.
                </p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Payoff Analysis</h3>

            {hasValidInputs && parseFloat(monthlyPayment) > 0 && !result.warningMessage ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-green-600 mb-2">Payoff Time</h3>
                    <p className="text-3xl font-bold text-green-700">
                      {result.months} months
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {Math.floor(result.months / 12)} years, {result.months % 12} months
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <TrendingDown className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Total Payments</h3>
                    <p className="text-3xl font-bold text-blue-700">
                      {currentCurrency.symbol}{result.totalPayments.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 text-center">
                    <Percent className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-orange-600 mb-2">Total Interest</h3>
                    <p className="text-3xl font-bold text-orange-700">
                      {currentCurrency.symbol}{result.totalInterest.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Payment Comparison */}
                {minPaymentResult && (
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Minimum Payment vs Your Payment
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Minimum Payment Only</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monthly Payment:</span>
                            <span className="font-medium">{currentCurrency.symbol}{minPaymentResult.monthlyPayment.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payoff Time:</span>
                            <span className="font-medium">{minPaymentResult.months} months</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-medium text-red-600">{currentCurrency.symbol}{minPaymentResult.totalInterest.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Your Payment Plan</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monthly Payment:</span>
                            <span className="font-medium">{currentCurrency.symbol}{parseFloat(monthlyPayment).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payoff Time:</span>
                            <span className="font-medium">{result.months} months</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-medium text-green-600">{currentCurrency.symbol}{result.totalInterest.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Savings Highlight */}
                    <div className="mt-4 p-4 bg-green-100 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">Your Savings</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-700">Interest Saved:</span>
                          <span className="font-bold text-green-900 ml-2">
                            {currentCurrency.symbol}{(minPaymentResult.totalInterest - result.totalInterest).toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-700">Time Saved:</span>
                          <span className="font-bold text-green-900 ml-2">
                            {minPaymentResult.months - result.months} months
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Current Balance</span>
                      <span className="font-semibold">{currentCurrency.symbol}{parseFloat(currentBalance).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Interest Rate (APR)</span>
                      <span className="font-semibold">{parseFloat(interestRate).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-semibold text-green-600">{currentCurrency.symbol}{parseFloat(monthlyPayment).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Payoff Time</span>
                      <span className="font-semibold">{result.months} months</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Total Cost</span>
                      <span className="text-purple-600">{currentCurrency.symbol}{result.totalPayments.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Enter Credit Card Details</h3>
                <p className="text-gray-500">Fill in your balance, interest rate, and payment to see your payoff timeline.</p>
              </div>
            )}
          </div>
        </div>

        {/* Credit Card Payoff Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Payoff Strategies</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Pay more than the minimum amount</li>
              <li>• Focus on highest interest rate cards first</li>
              <li>• Consider balance transfer to lower rate</li>
              <li>• Avoid making new purchases</li>
              <li>• Set up automatic payments</li>
              <li>• Use windfalls for extra payments</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Important Reminders</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Minimum payments barely cover interest</li>
              <li>• Late payments increase interest rates</li>
              <li>• High balances hurt credit scores</li>
              <li>• Consider debt consolidation options</li>
              <li>• Build emergency fund to avoid new debt</li>
              <li>• Track all credit card spending</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-gray-900">Developed by Waleed Rajpoot</p>
            <p className="text-xs text-gray-600">Professional Calculator Developer</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>Credit Card Disclaimer:</strong> This calculator provides estimates based on standard credit card calculations. Actual payoff times may vary due to changes in interest rates, fees, additional purchases, or varying payment amounts.</p>
            <p className="mb-2"><strong>Financial Advice Notice:</strong> Results are for informational purposes only. Consider consulting with financial advisors for personalized debt management strategies and credit counseling services.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and debt planning purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
