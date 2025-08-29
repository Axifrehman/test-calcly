import { useState } from 'react';
import { Target, DollarSign, Calendar, Percent, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [retirementGoal, setRetirementGoal] = useState('');
  const [inflationRate, setInflationRate] = useState('3');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState<{
    yearsToRetirement: number;
    totalContributions: number;
    projectedSavings: number;
    monthlyIncomeAtRetirement: number;
    inflationAdjustedGoal: number;
    shortfall: number;
    recommendedMonthlyContribution: number;
    yearlyBreakdown: Array<{
      age: number;
      year: number;
      contribution: number;
      balance: number;
      realValue: number;
    }>;
  } | null>(null);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' }
  ];

  const getCurrencySymbol = () => currencies.find(c => c.code === currency)?.symbol || '$';

  const calculateRetirement = () => {
    if (!currentAge || !retirementAge || !annualReturn) return;

    const currentAgeNum = parseInt(currentAge);
    const retirementAgeNum = parseInt(retirementAge);
    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    
    if (yearsToRetirement <= 0) return;

    const monthlyRate = parseFloat(annualReturn) / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    const currentSavingsNum = parseFloat(currentSavings) || 0;
    const monthlyContributionNum = parseFloat(monthlyContribution) || 0;
    const inflationRateNum = parseFloat(inflationRate) / 100;
    const retirementGoalNum = parseFloat(retirementGoal) || 0;

    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavingsNum * Math.pow(1 + monthlyRate, totalMonths);

    // Calculate future value of monthly contributions (annuity)
    let futureValueOfContributions = 0;
    if (monthlyContributionNum > 0) {
      futureValueOfContributions = monthlyContributionNum * 
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }

    const projectedSavings = futureValueOfCurrentSavings + futureValueOfContributions;
    const totalContributions = currentSavingsNum + (monthlyContributionNum * totalMonths);

    // Adjust retirement goal for inflation
    const inflationAdjustedGoal = retirementGoalNum * Math.pow(1 + inflationRateNum, yearsToRetirement);

    // Calculate shortfall or surplus
    const shortfall = inflationAdjustedGoal - projectedSavings;

    // Calculate recommended monthly contribution to meet goal
    let recommendedMonthlyContribution = 0;
    if (shortfall > 0) {
      const remainingNeeded = shortfall;
      if (monthlyRate > 0) {
        recommendedMonthlyContribution = remainingNeeded / 
          ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      } else {
        recommendedMonthlyContribution = remainingNeeded / totalMonths;
      }
    }

    // Monthly income at retirement (4% rule)
    const monthlyIncomeAtRetirement = (projectedSavings * 0.04) / 12;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let runningBalance = currentSavingsNum;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = currentAgeNum + year;
      const yearContribution = monthlyContributionNum * 12;
      
      // Add annual contribution at beginning of year
      runningBalance += yearContribution;
      
      // Apply annual growth
      runningBalance *= (1 + parseFloat(annualReturn) / 100);
      
      // Calculate real value (inflation-adjusted)
      const realValue = runningBalance / Math.pow(1 + inflationRateNum, year);
      
      yearlyBreakdown.push({
        age,
        year,
        contribution: yearContribution,
        balance: runningBalance,
        realValue
      });
    }

    setResult({
      yearsToRetirement,
      totalContributions,
      projectedSavings,
      monthlyIncomeAtRetirement,
      inflationAdjustedGoal,
      shortfall,
      recommendedMonthlyContribution: Math.max(0, recommendedMonthlyContribution),
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    const symbol = getCurrencySymbol();
    return `${symbol}${Math.abs(amount).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Retirement Calculator - Pension Planning</h2>
            <p className="text-purple-100">Plan your retirement savings and calculate future income needs</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Current Age
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="e.g., 30"
              min="18"
              max="80"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Retirement Age
            </label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="e.g., 65"
              min="50"
              max="80"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Current Savings
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g., 50000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Percent className="w-4 h-4 mr-2" />
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              placeholder="e.g., 7"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Goal
            </label>
            <input
              type="number"
              value={retirementGoal}
              onChange={(e) => setRetirementGoal(e.target.value)}
              placeholder="e.g., 1000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inflation Rate (%)
            </label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="e.g., 3"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={calculateRetirement}
            disabled={!currentAge || !retirementAge || !annualReturn}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Calculate Retirement Plan
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-900 mb-2">Years to Retirement</h3>
                <p className="text-3xl font-bold text-purple-800">{result.yearsToRetirement}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-900 mb-2">Projected Savings</h3>
                <p className="text-3xl font-bold text-green-800">{formatCurrency(result.projectedSavings)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-900 mb-2">Monthly Retirement Income</h3>
                <p className="text-3xl font-bold text-blue-800">{formatCurrency(result.monthlyIncomeAtRetirement)}</p>
                <p className="text-sm text-blue-600 mt-1">(4% withdrawal rule)</p>
              </div>

              <div className={`bg-gradient-to-br border-2 rounded-xl p-6 text-center ${
                result.shortfall > 0 
                  ? 'from-red-50 to-red-100 border-red-200' 
                  : 'from-green-50 to-green-100 border-green-200'
              }`}>
                {result.shortfall > 0 ? (
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                ) : (
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                )}
                <h3 className={`font-bold mb-2 ${result.shortfall > 0 ? 'text-red-900' : 'text-green-900'}`}>
                  {result.shortfall > 0 ? 'Shortfall' : 'Surplus'}
                </h3>
                <p className={`text-3xl font-bold ${result.shortfall > 0 ? 'text-red-800' : 'text-green-800'}`}>
                  {result.shortfall > 0 ? '-' : '+'}{formatCurrency(Math.abs(result.shortfall))}
                </p>
              </div>
            </div>

            {/* Retirement Planning Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Savings Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Current Savings</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(currentSavings) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Future Contributions</span>
                    <span className="font-semibold">{formatCurrency(result.totalContributions - (parseFloat(currentSavings) || 0))}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Investment Growth</span>
                    <span className="font-semibold text-green-600">{formatCurrency(result.projectedSavings - result.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-lg font-bold">
                    <span>Total at Retirement</span>
                    <span className="text-purple-600">{formatCurrency(result.projectedSavings)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Retirement Income Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">4% Withdrawal Rule</h4>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.monthlyIncomeAtRetirement)}</p>
                    <p className="text-sm text-blue-700">Monthly income in today's dollars</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Purchasing Power</h4>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(result.monthlyIncomeAtRetirement / Math.pow(1 + parseFloat(inflationRate) / 100, result.yearsToRetirement))}
                    </p>
                    <p className="text-sm text-blue-700">Inflation-adjusted monthly income</p>
                  </div>

                  {retirementGoal && (
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Goal Achievement</h4>
                      <p className="text-lg font-bold text-blue-600">
                        {((result.projectedSavings / result.inflationAdjustedGoal) * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-blue-700">Of inflation-adjusted goal</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            {result.shortfall > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">📊 Recommendations to Meet Your Goal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">💰 Increase Monthly Contributions</h4>
                    <p className="text-2xl font-bold text-red-600 mb-2">
                      {formatCurrency(result.recommendedMonthlyContribution)}
                    </p>
                    <p className="text-sm text-red-700 mb-3">
                      Additional monthly contribution needed to reach your goal
                    </p>
                    <p className="text-sm text-red-700">
                      Total recommended: {formatCurrency((parseFloat(monthlyContribution) || 0) + result.recommendedMonthlyContribution)}/month
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">🎯 Alternative Strategies</h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• Work {Math.ceil(result.shortfall / (result.projectedSavings / result.yearsToRetirement))} additional years</li>
                      <li>• Reduce retirement expenses by {formatCurrency(result.shortfall * 0.04 / 12)}/month</li>
                      <li>• Achieve {((parseFloat(annualReturn) || 0) + 1).toFixed(1)}% annual return instead of {annualReturn}%</li>
                      <li>• Combine multiple strategies for best results</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Growth Visualization */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement Savings Growth Over Time</h3>
              <div className="relative">
                <div className="flex items-end space-x-1 h-40">
                  {result.yearlyBreakdown.slice(0, 20).map((year, index) => {
                    const maxValue = Math.max(...result.yearlyBreakdown.map(y => y.balance));
                    const nominalHeight = (year.balance / maxValue) * 100;
                    const realHeight = (year.realValue / maxValue) * 100;
                    
                    return (
                      <div key={index} className="flex-1 relative group">
                        <div
                          className="bg-gray-300 rounded-t-sm"
                          style={{ height: `${realHeight}%` }}
                        ></div>
                        <div
                          className="bg-purple-400 rounded-t-sm absolute bottom-0 w-full"
                          style={{ height: `${nominalHeight}%` }}
                        ></div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Age {year.age}: {formatCurrency(year.balance)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Age {parseInt(currentAge) + 1}</span>
                  <span className="text-purple-600">■ Nominal Value</span>
                  <span className="text-gray-600">■ Real Value</span>
                  <span>Age {Math.min(parseInt(currentAge) + 20, parseInt(retirementAge))}</span>
                </div>
              </div>
            </div>

            {/* Retirement Planning Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">🎯 Retirement Planning Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-800">
                <div>
                  <h4 className="font-semibold mb-3">💼 Maximize Tax-Advantaged Accounts</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>401(k)/403(b) with employer matching</li>
                    <li>Traditional and Roth IRA contributions</li>
                    <li>Health Savings Account (HSA) for medical expenses</li>
                    <li>Consider tax diversification strategies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">📈 Investment Strategy</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Start early to maximize compound growth</li>
                    <li>Diversify across asset classes</li>
                    <li>Gradually shift to conservative investments near retirement</li>
                    <li>Consider low-cost index funds and ETFs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">💰 Savings Strategies</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Automate contributions to stay consistent</li>
                    <li>Increase contributions with salary raises</li>
                    <li>Use windfalls (bonuses, tax refunds) wisely</li>
                    <li>Track progress and adjust as needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">🏥 Plan for Healthcare</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Estimate healthcare costs in retirement</li>
                    <li>Consider long-term care insurance</li>
                    <li>Maximize HSA contributions for future medical expenses</li>
                    <li>Understand Medicare and supplement options</li>
                  </ul>
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
            <p className="mb-2"><strong>Retirement Planning Disclaimer:</strong> This retirement calculator provides estimates for educational purposes only and should not be considered as financial advice. Actual investment returns, inflation rates, and retirement expenses may vary significantly from projections. Market volatility, economic changes, and personal circumstances can substantially impact retirement outcomes.</p>
            <p className="mb-2"><strong>Professional Guidance:</strong> For comprehensive retirement planning, consult with qualified financial advisors, retirement planning specialists, or certified financial planners who can provide personalized strategies based on your specific situation and goals.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
