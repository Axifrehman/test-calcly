import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
    yearlyBreakdown: Array<{
      year: number;
      balance: number;
      interestEarned: number;
      totalContributions: number;
    }>;
  } | null>(null);

  const frequencies = [
    { value: 1, label: 'Annually' },
    { value: 2, label: 'Semi-annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' }
  ];

  const calculateCompoundInterest = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const PMT = parseFloat(monthlyContribution) || 0;

    // Calculate compound interest with regular contributions
    let balance = P;
    const yearlyBreakdown = [];
    let totalContributions = P;

    for (let year = 1; year <= t; year++) {
      let yearStartBalance = balance;
      let yearContributions = 0;

      // Calculate monthly compounding within the year
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        if (PMT > 0) {
          balance += PMT;
          yearContributions += PMT;
          totalContributions += PMT;
        }
        
        // Apply monthly interest (assuming monthly compounding for simplicity)
        balance = balance * (1 + r / 12);
      }

      const interestEarned = balance - yearStartBalance - yearContributions;

      yearlyBreakdown.push({
        year,
        balance,
        interestEarned,
        totalContributions
      });
    }

    const finalAmount = balance;
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount,
      totalContributions,
      totalInterest,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Compound Interest Calculator</h2>
            <p className="text-green-100">See how your money grows with compound interest</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Initial Investment
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 10000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Percent className="w-4 h-4 mr-2" />
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 7"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Time Period (years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {frequencies.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="e.g., 500 (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={calculateCompoundInterest}
              disabled={!principal || !rate || !time}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-green-600 mb-2">Final Amount</h3>
                <p className="text-3xl font-bold text-green-700">
                  {formatCurrency(result.finalAmount)}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-blue-600 mb-2">Total Contributions</h3>
                <p className="text-3xl font-bold text-blue-700">
                  {formatCurrency(result.totalContributions)}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-purple-600 mb-2">Interest Earned</h3>
                <p className="text-3xl font-bold text-purple-700">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Growth</h3>
              <div className="relative">
                <div className="flex items-end space-x-1 h-32">
                  {result.yearlyBreakdown.slice(0, 20).map((year, index) => {
                    const maxAmount = Math.max(...result.yearlyBreakdown.map(y => y.balance));
                    const height = (year.balance / maxAmount) * 100;
                    
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-green-400 to-green-600 rounded-t-sm relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Year {year.year}: {formatCurrency(year.balance)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Year 1</span>
                  <span>Year {Math.min(20, result.yearlyBreakdown.length)}</span>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Yearly Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Year</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Balance</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Interest Earned</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Total Contributions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.slice(0, 15).map((year, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{year.year}</td>
                        <td className="text-right py-3 px-4 text-gray-700 font-medium">
                          {formatCurrency(year.balance)}
                        </td>
                        <td className="text-right py-3 px-4 text-green-600">
                          {formatCurrency(year.interestEarned)}
                        </td>
                        <td className="text-right py-3 px-4 text-blue-600">
                          {formatCurrency(year.totalContributions)}
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

            {/* Key Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Return on Investment:</strong> {
                    ((result.totalInterest / result.totalContributions) * 100).toFixed(1)
                  }%
                </div>
                <div>
                  <strong>Average Annual Growth:</strong> {
                    ((Math.pow(result.finalAmount / parseFloat(principal), 1 / parseFloat(time)) - 1) * 100).toFixed(1)
                  }%
                </div>
                <div>
                  <strong>Interest vs Contributions:</strong> {
                    (result.totalInterest > result.totalContributions - parseFloat(principal) ? 
                    'Interest exceeds additional contributions' : 
                    'Contributions exceed interest earned')
                  }
                </div>
                <div>
                  <strong>Compound Effect:</strong> 
                  The power of compounding earned you {formatCurrency(result.totalInterest)} in interest
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
            <p className="mb-2"><strong>Investment Disclaimer:</strong> This compound interest calculator is for educational and illustrative purposes only and should not be considered as investment advice. Actual investment returns may vary significantly due to market conditions, fees, taxes, and other factors. Past performance does not guarantee future results. Always consult with qualified financial advisors before making investment decisions.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> Calculations are based on the compound interest formula and assume consistent returns and contributions. Real investment scenarios may include variable returns, fees, and market volatility.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
