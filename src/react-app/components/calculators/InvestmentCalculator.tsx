import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, PieChart, Target } from 'lucide-react';

export default function InvestmentCalculator() {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [lumpSumAmount, setLumpSumAmount] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInvested: number;
    totalGains: number;
    yearlyBreakdown: Array<{
      year: number;
      invested: number;
      value: number;
      gains: number;
    }>;
  } | null>(null);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' }
  ];

  const getCurrencySymbol = () => currencies.find(c => c.code === currency)?.symbol || '$';

  const calculateInvestment = () => {
    if ((!monthlyInvestment && !lumpSumAmount) || !expectedReturn || !timePeriod) return;

    const years = parseInt(timePeriod);
    const annualRate = parseFloat(expectedReturn) / 100;
    const monthlyRate = annualRate / 12;
    
    let finalAmount = 0;
    let totalInvested = 0;
    const yearlyBreakdown = [];

    if (investmentType === 'sip') {
      const monthlyAmount = parseFloat(monthlyInvestment);
      const months = years * 12;
      
      // SIP Future Value = P * [((1 + r)^n - 1) / r] * (1 + r)
      finalAmount = monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
      totalInvested = monthlyAmount * months;

      // Generate yearly breakdown
      let runningInvested = 0;
      let runningValue = 0;

      for (let year = 1; year <= years; year++) {
        runningInvested += monthlyAmount * 12;
        
        // Calculate value at end of this year
        const monthsCompleted = year * 12;
        runningValue = monthlyAmount * (Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate * (1 + monthlyRate);
        
        yearlyBreakdown.push({
          year,
          invested: runningInvested,
          value: runningValue,
          gains: runningValue - runningInvested
        });
      }
    } else {
      // Lump sum investment
      const principal = parseFloat(lumpSumAmount);
      finalAmount = principal * Math.pow(1 + annualRate, years);
      totalInvested = principal;

      // Generate yearly breakdown
      for (let year = 1; year <= years; year++) {
        const value = principal * Math.pow(1 + annualRate, year);
        yearlyBreakdown.push({
          year,
          invested: principal,
          value,
          gains: value - principal
        });
      }
    }

    const totalGains = finalAmount - totalInvested;

    setResult({
      finalAmount,
      totalInvested,
      totalGains,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    const symbol = getCurrencySymbol();
    return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Investment Calculator - SIP & Lump Sum</h2>
            <p className="text-blue-100">Calculate returns on SIP and lump sum investments</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Investment Type Toggle */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setInvestmentType('sip')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
                investmentType === 'sip'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              SIP Investment
            </button>
            <button
              onClick={() => setInvestmentType('lumpsum')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
                investmentType === 'lumpsum'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Lump Sum Investment
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Investment Amount */}
          {investmentType === 'sip' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Monthly Investment
              </label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                placeholder="e.g., 1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Lump Sum Amount
              </label>
              <input
                type="number"
                value={lumpSumAmount}
                onChange={(e) => setLumpSumAmount(e.target.value)}
                placeholder="e.g., 100000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Percent className="w-4 h-4 mr-2" />
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="e.g., 12"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Time Period (years)
            </label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="e.g., 20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={calculateInvestment}
            disabled={(!monthlyInvestment && !lumpSumAmount) || !expectedReturn || !timePeriod}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Calculate Returns
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-900 mb-2">Final Value</h3>
                <p className="text-3xl font-bold text-green-800">{formatCurrency(result.finalAmount)}</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-900 mb-2">Total Invested</h3>
                <p className="text-3xl font-bold text-blue-800">{formatCurrency(result.totalInvested)}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
                <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-900 mb-2">Total Gains</h3>
                <p className="text-3xl font-bold text-purple-800">{formatCurrency(result.totalGains)}</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Investment Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {((result.totalGains / result.totalInvested) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Total Return</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(Math.pow(result.finalAmount / result.totalInvested, 1 / parseInt(timePeriod)) - 1).toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-600">CAGR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(result.finalAmount / result.totalInvested).toFixed(1)}x
                  </div>
                  <div className="text-sm text-gray-600">Wealth Multiple</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {investmentType === 'sip' ? parseInt(timePeriod) * 12 : parseInt(timePeriod)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {investmentType === 'sip' ? 'Total Payments' : 'Years Invested'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Growth Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Growth Over Time</h3>
              <div className="relative">
                <div className="flex items-end space-x-1 h-40">
                  {result.yearlyBreakdown.slice(0, 20).map((year, index) => {
                    const maxValue = Math.max(...result.yearlyBreakdown.map(y => y.value));
                    const investedHeight = (year.invested / maxValue) * 100;
                    const valueHeight = (year.value / maxValue) * 100;
                    
                    return (
                      <div key={index} className="flex-1 relative group">
                        <div
                          className="bg-blue-200 rounded-t-sm"
                          style={{ height: `${investedHeight}%` }}
                        ></div>
                        <div
                          className="bg-green-400 rounded-t-sm absolute bottom-0 w-full"
                          style={{ height: `${valueHeight}%` }}
                        ></div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Year {year.year}: {formatCurrency(year.value)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Year 1</span>
                  <span className="text-blue-600">■ Invested</span>
                  <span className="text-green-600">■ Total Value</span>
                  <span>Year {Math.min(20, result.yearlyBreakdown.length)}</span>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Year-wise Investment Growth</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Year</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Amount Invested</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Portfolio Value</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Gains</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.slice(0, 15).map((year, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{year.year}</td>
                        <td className="text-right py-3 px-4 text-blue-600 font-medium">
                          {formatCurrency(year.invested)}
                        </td>
                        <td className="text-right py-3 px-4 text-gray-700 font-bold">
                          {formatCurrency(year.value)}
                        </td>
                        <td className="text-right py-3 px-4 text-green-600 font-medium">
                          {formatCurrency(year.gains)}
                        </td>
                        <td className="text-right py-3 px-4 text-purple-600 font-medium">
                          {((year.gains / year.invested) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.yearlyBreakdown.length > 15 && (
                  <p className="text-center text-gray-500 text-sm py-4">
                    ... and {result.yearlyBreakdown.length - 15} more years
                  </p>
                )}
              </div>
            </div>

            {/* Investment Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Investment Strategy Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
                <div>
                  <h4 className="font-semibold mb-2">🎯 Power of Compounding</h4>
                  <p>Your investments earn returns not just on the principal, but also on previously earned returns. Starting early maximizes this effect.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📈 Dollar-Cost Averaging</h4>
                  <p>SIP helps reduce market timing risk by investing fixed amounts regularly, regardless of market conditions.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏰ Time in Market</h4>
                  <p>Long-term investing typically outperforms short-term trading. Stay invested for the full time horizon.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔄 Regular Review</h4>
                  <p>Review and rebalance your portfolio annually to maintain desired asset allocation.</p>
                </div>
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
            <p className="mb-2"><strong>Investment Disclaimer:</strong> This investment calculator is for educational and illustrative purposes only and should not be considered as investment advice. Past performance does not guarantee future results. Market conditions, fees, taxes, and other factors can significantly affect actual returns. Always consult with qualified financial advisors before making investment decisions.</p>
            <p className="mb-2"><strong>Risk Warning:</strong> All investments carry risk, including potential loss of principal. Returns shown are hypothetical and assume consistent growth rates, which may not reflect actual market conditions.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
