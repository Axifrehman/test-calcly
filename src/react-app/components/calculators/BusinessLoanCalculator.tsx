import { useState } from 'react';
import { Building, DollarSign, Calendar, Percent, Calculator, TrendingUp, Info, Briefcase } from 'lucide-react';

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanType, setLoanType] = useState('term-loan');
  const [currency, setCurrency] = useState('USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  ];

  const loanTypes = [
    { value: 'term-loan', name: 'Term Loan', rate: '6-12%' },
    { value: 'sba-loan', name: 'SBA Loan', rate: '4-8%' },
    { value: 'equipment-financing', name: 'Equipment Financing', rate: '5-15%' },
    { value: 'working-capital', name: 'Working Capital Loan', rate: '8-18%' },
    { value: 'merchant-advance', name: 'Merchant Cash Advance', rate: '20-50%' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];
  const currentLoanType = loanTypes.find(t => t.value === loanType) || loanTypes[0];

  const calculateBusinessLoan = () => {
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

  const result = calculateBusinessLoan();
  const hasValidInputs = parseFloat(loanAmount) > 0 && parseFloat(interestRate) > 0 && parseFloat(loanTerm) > 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Business Loan Calculator</h2>
            <p className="text-indigo-100">Calculate business loan payments and financing costs</p>
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Loan Details</h3>

            {/* Loan Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Loan Type
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
              >
                {loanTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.name} (Typical: {type.rate})
                  </option>
                ))}
              </select>
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="100000"
                  step="5000"
                  min="5000"
                  max="10000000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
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
                  placeholder="7.5"
                  step="0.1"
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Typical range for {currentLoanType.name}: {currentLoanType.rate}
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
                  max="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
              </div>
            </div>

            {/* Business Loan Types Guide */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Business Loan Types &amp; Rates
              </h4>
              <div className="space-y-2 text-sm text-indigo-800">
                <div className="flex justify-between">
                  <span>SBA Loans:</span>
                  <span className="font-medium">4% - 8% (Govt. backed)</span>
                </div>
                <div className="flex justify-between">
                  <span>Term Loans:</span>
                  <span className="font-medium">6% - 12% (Traditional)</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment Financing:</span>
                  <span className="font-medium">5% - 15% (Asset-based)</span>
                </div>
                <div className="flex justify-between">
                  <span>Working Capital:</span>
                  <span className="font-medium">8% - 18% (Short-term)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Financing Results</h3>

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
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Total Repayment</h3>
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
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Loan Type</span>
                      <span className="font-semibold">{currentLoanType.name}</span>
                    </div>
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
                      <span>Total Business Cost</span>
                      <span className="text-indigo-600">{currentCurrency.symbol}{result.totalPayment.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Interest Cost Analysis */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-900 mb-4">Cost Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700">Interest vs Principal</span>
                      <span className="text-sm font-medium text-purple-900">
                        {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(1)}% total interest cost
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

                {/* ROI Consideration */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-4">Investment Consideration</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span className="font-bold">{currentCurrency.symbol}{result.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Break-even Revenue Needed:</span>
                      <span className="font-bold">{currentCurrency.symbol}{(result.monthlyPayment * 2).toFixed(2)} /month</span>
                    </div>
                    <p className="text-xs text-green-700 mt-3">
                      Rule of thumb: Your business should generate at least 2x the monthly payment in additional revenue to justify the loan.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Enter Business Loan Details</h3>
                <p className="text-gray-500">Fill in the loan amount, interest rate, and term to calculate your business loan payment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Loan Benefits & Considerations */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Business Loan Benefits</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Build business credit history</li>
              <li>• Maintain ownership and control</li>
              <li>• Tax-deductible interest payments</li>
              <li>• Flexible use of funds</li>
              <li>• Predictable monthly payments</li>
              <li>• Opportunity for business growth</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Before Applying</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Prepare detailed business plan</li>
              <li>• Organize financial statements</li>
              <li>• Check business credit score</li>
              <li>• Consider SBA loan options</li>
              <li>• Calculate debt-to-income ratio</li>
              <li>• Have collateral documentation ready</li>
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
            <p className="mb-2"><strong>Business Finance Disclaimer:</strong> This business loan calculator provides estimates for planning purposes. Actual loan terms, interest rates, and approval depend on business creditworthiness, cash flow, collateral, and lender requirements.</p>
            <p className="mb-2"><strong>Investment Warning:</strong> Business loans involve risk. Ensure your business can generate sufficient cash flow to service the debt. Consider consulting with financial advisors and tax professionals.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for business planning and educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
