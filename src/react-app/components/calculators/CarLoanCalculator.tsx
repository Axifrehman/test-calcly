import { useState } from 'react';
import { Car, DollarSign, Calendar, Percent, Calculator, TrendingUp, Info } from 'lucide-react';

export default function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [tradeInValue, setTradeInValue] = useState('');
  const [salesTax, setSalesTax] = useState('');
  const [currency, setCurrency] = useState('USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const calculateCarLoan = () => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const tax = parseFloat(salesTax) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const time = parseFloat(loanTerm) * 12 || 0;

    // Calculate total amount after tax
    const taxAmount = (price * tax) / 100;
    const totalPrice = price + taxAmount;
    
    // Calculate loan amount
    const loanAmount = Math.max(0, totalPrice - down - trade);

    if (loanAmount <= 0 || rate <= 0 || time <= 0) {
      return {
        loanAmount: loanAmount,
        monthlyPayment: 0,
        totalPayment: loanAmount,
        totalInterest: 0,
        taxAmount: taxAmount,
        totalPrice: totalPrice,
      };
    }

    const monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = monthlyPayment * time;
    const totalInterest = totalPayment - loanAmount;

    return {
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      taxAmount,
      totalPrice,
    };
  };

  const result = calculateCarLoan();
  const hasValidInputs = parseFloat(carPrice) > 0;

  const downPaymentPercentage = parseFloat(carPrice) > 0 ? ((parseFloat(downPayment) || 0) / parseFloat(carPrice) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Car Loan Calculator</h2>
            <p className="text-red-100">Calculate auto loan payments and total financing cost</p>
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Vehicle &amp; Loan Details</h3>

            {/* Car Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-2" />
                Car Price (MSRP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  placeholder="25000"
                  step="500"
                  min="1000"
                  max="500000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Down Payment
                {downPaymentPercentage > 0 && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {downPaymentPercentage.toFixed(1)}%
                  </span>
                )}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="5000"
                  step="500"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            {/* Trade-in Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trade-in Value (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(e.target.value)}
                  placeholder="0"
                  step="500"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            {/* Sales Tax */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sales Tax Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  placeholder="8.5"
                  step="0.1"
                  min="0"
                  max="15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Interest Rate */}
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
                  placeholder="4.5"
                  step="0.1"
                  min="0"
                  max="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
              >
                <option value="">Select loan term</option>
                <option value="2">2 years (24 months)</option>
                <option value="3">3 years (36 months)</option>
                <option value="4">4 years (48 months)</option>
                <option value="5">5 years (60 months)</option>
                <option value="6">6 years (72 months)</option>
                <option value="7">7 years (84 months)</option>
              </select>
            </div>

            {/* Auto Loan Rate Guide */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Current Auto Loan Rates ({currency})
              </h4>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex justify-between">
                  <span>New Car (Excellent Credit):</span>
                  <span className="font-medium">3% - 5%</span>
                </div>
                <div className="flex justify-between">
                  <span>New Car (Good Credit):</span>
                  <span className="font-medium">5% - 8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Used Car (Excellent Credit):</span>
                  <span className="font-medium">4% - 7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Used Car (Good Credit):</span>
                  <span className="font-medium">7% - 12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Financing Summary</h3>

            {hasValidInputs ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <Calculator className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-green-600 mb-2">Monthly Payment</h3>
                    <p className="text-3xl font-bold text-green-700">
                      {currentCurrency.symbol}{result.monthlyPayment.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Loan Amount</h3>
                    <p className="text-3xl font-bold text-blue-700">
                      {currentCurrency.symbol}{result.loanAmount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-purple-600 mb-2">Total Interest</h3>
                    <p className="text-3xl font-bold text-purple-700">
                      {currentCurrency.symbol}{result.totalInterest.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Car Price</span>
                      <span className="font-semibold">{currentCurrency.symbol}{parseFloat(carPrice).toFixed(2)}</span>
                    </div>
                    {result.taxAmount > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Sales Tax ({parseFloat(salesTax)}%)</span>
                        <span className="font-semibold">+{currentCurrency.symbol}{result.taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Price</span>
                      <span className="font-semibold">{currentCurrency.symbol}{result.totalPrice.toFixed(2)}</span>
                    </div>
                    {parseFloat(downPayment) > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Down Payment</span>
                        <span className="font-semibold text-green-600">-{currentCurrency.symbol}{parseFloat(downPayment).toFixed(2)}</span>
                      </div>
                    )}
                    {parseFloat(tradeInValue) > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Trade-in Value</span>
                        <span className="font-semibold text-green-600">-{currentCurrency.symbol}{parseFloat(tradeInValue).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Amount to Finance</span>
                      <span className="text-red-600">{currentCurrency.symbol}{result.loanAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Summary */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-4">Loan Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Monthly Payment:</span>
                      <span className="font-bold text-amber-900">{currentCurrency.symbol}{result.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Total of Payments:</span>
                      <span className="font-bold text-amber-900">{currentCurrency.symbol}{result.totalPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Total Interest Paid:</span>
                      <span className="font-bold text-amber-900">{currentCurrency.symbol}{result.totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Total Cost of Car:</span>
                      <span className="font-bold text-amber-900">{currentCurrency.symbol}{(result.totalPayment + (parseFloat(downPayment) || 0) + (parseFloat(tradeInValue) || 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Enter Vehicle Details</h3>
                <p className="text-gray-500">Fill in the car price and financing details to calculate your auto loan payment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Car Buying Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Car Buying Tips</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Put down at least 20% to avoid being upside down</li>
              <li>• Shop around for the best interest rates</li>
              <li>• Consider certified pre-owned vehicles</li>
              <li>• Factor in insurance, maintenance, and fuel costs</li>
              <li>• Don't focus only on monthly payment</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Financing Considerations</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Shorter terms = higher payments, less interest</li>
              <li>• Pre-approval gives you negotiating power</li>
              <li>• Credit unions often offer better rates</li>
              <li>• Avoid dealer financing markups</li>
              <li>• Read all loan terms carefully</li>
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
            <p className="mb-2"><strong>Auto Finance Disclaimer:</strong> This car loan calculator provides estimates based on the information provided. Actual loan terms, interest rates, and payments may vary based on creditworthiness, vehicle type, age, and lender requirements.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All calculations are mathematically accurate based on standard auto loan formulas. Additional costs like insurance, registration, and extended warranties are not included in these calculations.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and comparison purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
