import { useState } from 'react';
import { DollarSign, Calendar, Percent, Calculator, TrendingUp, Info } from 'lucide-react';

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const time = parseFloat(loanTerm) * 12 || 0;

    if (principal <= 0 || rate <= 0 || time <= 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    const monthlyPayment = principal * (rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = monthlyPayment * time;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  };

  const result = calculateLoan();
  const hasValidInputs = parseFloat(loanAmount) > 0 && parseFloat(interestRate) > 0 && parseFloat(loanTerm) > 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Personal Loan Calculator</h2>
            <p className="text-blue-100">Calculate personal loan payments and total cost</p>
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h3>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Personal Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="50000"
                  step="1000"
                  min="1000"
                  max="1000000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Percent className="w-4 h-4 mr-2" />
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="8.5"
                  step="0.1"
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
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
              <div className="relative">
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="5"
                  step="1"
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
              </div>
            </div>

            {/* Interest Rate Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Typical Personal Loan Interest Rates ({currency})
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Excellent Credit (750+):</span>
                  <span className="font-medium">6% - 10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Good Credit (700-749):</span>
                  <span className="font-medium">10% - 15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Fair Credit (650-699):</span>
                  <span className="font-medium">15% - 25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Poor Credit (&lt;650):</span>
                  <span className="font-medium">25% - 35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Calculation Results</h3>

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
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Total Payment</h3>
                    <p className="text-3xl font-bold text-blue-700">
                      {currentCurrency.symbol}{result.totalPayment.toFixed(2)}
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

                {/* Detailed Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Principal Amount</span>
                      <span className="font-semibold">{currentCurrency.symbol}{parseFloat(loanAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-semibold">{parseFloat(interestRate).toFixed(2)}% per year</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Loan Term</span>
                      <span className="font-semibold">{parseFloat(loanTerm)} years ({parseFloat(loanTerm) * 12} months)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-semibold text-green-600">{currentCurrency.symbol}{result.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Total Cost</span>
                      <span className="text-blue-600">{currentCurrency.symbol}{result.totalPayment.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Analysis */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-900 mb-4">Cost Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700">Interest vs Principal</span>
                      <span className="text-sm font-medium text-purple-900">
                        {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(1)}% interest cost
                      </span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Principal: {currentCurrency.symbol}{parseFloat(loanAmount).toFixed(0)}</span>
                      <span className="text-purple-600">Interest: {currentCurrency.symbol}{result.totalInterest.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Enter Loan Details</h3>
                <p className="text-gray-500">Fill in the loan amount, interest rate, and term to see your monthly payment calculation.</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits of Personal Loans */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Personal Loan Benefits</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Fixed interest rates and monthly payments</li>
              <li>• No collateral required (unsecured)</li>
              <li>• Flexible use for any personal expense</li>
              <li>• Predictable repayment schedule</li>
              <li>• Can help consolidate high-interest debt</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Before You Apply</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Check your credit score</li>
              <li>• Compare rates from multiple lenders</li>
              <li>• Consider fees and terms</li>
              <li>• Ensure you can afford monthly payments</li>
              <li>• Have a clear repayment plan</li>
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
            <p className="mb-2"><strong>Financial Disclaimer:</strong> This personal loan calculator provides estimates based on the information you provide. Actual loan terms, interest rates, and monthly payments may vary based on your creditworthiness, lender requirements, and market conditions.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All calculations are mathematically accurate based on standard loan formulas. However, consult with financial advisors or lenders for personalized advice and final loan terms.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and planning purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
