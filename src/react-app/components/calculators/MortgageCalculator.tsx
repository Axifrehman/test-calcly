import { useState } from 'react';
import { Home, DollarSign, Calendar, Percent, TrendingUp, Calculator, PieChart } from 'lucide-react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [downPaymentType, setDownPaymentType] = useState<'amount' | 'percentage'>('percentage');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [homeInsurance, setHomeInsurance] = useState('');
  const [pmi, setPmi] = useState('');
  const [hoaFees, setHoaFees] = useState('');
  const [country, setCountry] = useState('US');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoaFees: number;
    totalMonthlyPayment: number;
    loanAmount: number;
    totalInterest: number;
    totalCost: number;
    payoffDate: string;
  } | null>(null);

  const countries = [
    { code: 'US', name: 'United States', currency: 'USD', symbol: '$' },
    { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$' },
    { code: 'UK', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
    { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$' },
    { code: 'NZ', name: 'New Zealand', currency: 'NZD', symbol: 'NZ$' },
    { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€' },
    { code: 'FR', name: 'France', currency: 'EUR', symbol: '€' },
    { code: 'NL', name: 'Netherlands', currency: 'EUR', symbol: '€' },
    { code: 'CH', name: 'Switzerland', currency: 'CHF', symbol: 'Fr' },
    { code: 'SE', name: 'Sweden', currency: 'SEK', symbol: 'kr' }
  ];

  const getCurrencyInfo = () => countries.find(c => c.code === country) || countries[0];

  const calculateMortgage = () => {
    if (!homePrice || !downPayment || !interestRate) return;

    const homePriceNum = parseFloat(homePrice);
    let downPaymentAmount = 0;

    if (downPaymentType === 'percentage') {
      downPaymentAmount = (homePriceNum * parseFloat(downPayment)) / 100;
    } else {
      downPaymentAmount = parseFloat(downPayment);
    }

    const loanAmount = homePriceNum - downPaymentAmount;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    // Monthly Principal & Interest Payment
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Other monthly costs
    const monthlyPropertyTax = propertyTax ? parseFloat(propertyTax) / 12 : 0;
    const monthlyHomeInsurance = homeInsurance ? parseFloat(homeInsurance) / 12 : 0;
    const monthlyPMI = pmi ? parseFloat(pmi) / 12 : 0;
    const monthlyHOA = hoaFees ? parseFloat(hoaFees) / 12 : 0;

    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + monthlyHOA;
    const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;
    const totalCost = homePriceNum + totalInterest + (monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + monthlyHOA) * numberOfPayments;

    // Calculate payoff date
    const currentDate = new Date();
    const payoffDate = new Date(currentDate.getFullYear() + parseInt(loanTerm), currentDate.getMonth(), currentDate.getDate());

    setResult({
      monthlyPayment: monthlyPI,
      principalAndInterest: monthlyPI,
      propertyTax: monthlyPropertyTax,
      homeInsurance: monthlyHomeInsurance,
      pmi: monthlyPMI,
      hoaFees: monthlyHOA,
      totalMonthlyPayment,
      loanAmount,
      totalInterest,
      totalCost,
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  const formatCurrency = (amount: number) => {
    const { symbol } = getCurrencyInfo();
    return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const getCountrySpecificInfo = () => {
    const info: Record<string, any> = {
      US: {
        taxRange: '0.5% - 3.0%',
        insuranceRange: '$500 - $3,000',
        pmiInfo: 'Required if down payment < 20%',
        avgRate: '6.0% - 7.5%',
        maxTerm: '30 years',
        minDownPayment: '3% - 5%'
      },
      CA: {
        taxRange: '0.5% - 2.5%',
        insuranceRange: 'C$800 - C$2,500',
        pmiInfo: 'Required if down payment < 20% (CMHC)',
        avgRate: '5.5% - 6.5%',
        maxTerm: '30 years',
        minDownPayment: '5% - 10%'
      },
      UK: {
        taxRange: '0.1% - 2.0%',
        insuranceRange: '£200 - £1,500',
        pmiInfo: 'Not typically required',
        avgRate: '4.5% - 6.0%',
        maxTerm: '35 years',
        minDownPayment: '5% - 10%'
      },
      AU: {
        taxRange: '0.2% - 2.0%',
        insuranceRange: 'A$500 - A$2,000',
        pmiInfo: 'LMI required if deposit < 20%',
        avgRate: '5.5% - 7.0%',
        maxTerm: '30 years',
        minDownPayment: '5% - 10%'
      }
    };
    return info[country] || info.US;
  };

  const countryInfo = getCountrySpecificInfo();

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Mortgage Calculator - Home Loan Calculator</h2>
            <p className="text-blue-100">Calculate monthly mortgage payments with taxes and insurance</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Country Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {countries.map(c => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.currency})
              </option>
            ))}
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Home Price
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="e.g., 500000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Down Payment
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="e.g., 20"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <select
                value={downPaymentType}
                onChange={(e) => setDownPaymentType(e.target.value as 'amount' | 'percentage')}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="percentage">%</option>
                <option value="amount">{getCurrencyInfo().symbol}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Loan Term (years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
              <option value="35">35 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Percent className="w-4 h-4 mr-2" />
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 6.5"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Tax (annual)
            </label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              placeholder="e.g., 6000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Insurance (annual)
            </label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              placeholder="e.g., 1200"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PMI/LMI (annual)
            </label>
            <input
              type="number"
              value={pmi}
              onChange={(e) => setPmi(e.target.value)}
              placeholder="e.g., 2400"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HOA Fees (monthly)
            </label>
            <input
              type="number"
              value={hoaFees}
              onChange={(e) => setHoaFees(e.target.value)}
              placeholder="e.g., 200"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={calculateMortgage}
              disabled={!homePrice || !downPayment || !interestRate}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Calculate Mortgage
            </button>
          </div>
        </div>

        {/* Country-Specific Information */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">{getCurrencyInfo().name} - Market Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <strong>Typical Interest Rate:</strong><br />
              {countryInfo.avgRate}
            </div>
            <div>
              <strong>Property Tax Range:</strong><br />
              {countryInfo.taxRange}
            </div>
            <div>
              <strong>Home Insurance:</strong><br />
              {countryInfo.insuranceRange}
            </div>
            <div>
              <strong>Min. Down Payment:</strong><br />
              {countryInfo.minDownPayment}
            </div>
            <div>
              <strong>Maximum Term:</strong><br />
              {countryInfo.maxTerm}
            </div>
            <div>
              <strong>Mortgage Insurance:</strong><br />
              {countryInfo.pmiInfo}
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Monthly Payment Breakdown */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Monthly Payment Breakdown</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Payment Components */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Principal & Interest</span>
                    <span className="font-bold text-xl">{formatCurrency(result.principalAndInterest)}</span>
                  </div>
                  {result.propertyTax > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Property Tax</span>
                      <span className="font-bold text-xl">{formatCurrency(result.propertyTax)}</span>
                    </div>
                  )}
                  {result.homeInsurance > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Home Insurance</span>
                      <span className="font-bold text-xl">{formatCurrency(result.homeInsurance)}</span>
                    </div>
                  )}
                  {result.pmi > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">PMI/LMI</span>
                      <span className="font-bold text-xl">{formatCurrency(result.pmi)}</span>
                    </div>
                  )}
                  {result.hoaFees > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">HOA Fees</span>
                      <span className="font-bold text-xl">{formatCurrency(result.hoaFees)}</span>
                    </div>
                  )}
                </div>

                {/* Total Payment */}
                <div className="flex flex-col justify-center items-center bg-white rounded-xl p-8 shadow-lg">
                  <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Monthly Payment</h4>
                  <p className="text-4xl font-bold text-blue-600">{formatCurrency(result.totalMonthlyPayment)}</p>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-green-200 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-900 mb-2">Loan Amount</h3>
                <p className="text-2xl font-bold text-green-800">{formatCurrency(result.loanAmount)}</p>
              </div>
              
              <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Total Interest</h3>
                <p className="text-2xl font-bold text-red-800">{formatCurrency(result.totalInterest)}</p>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6 text-center">
                <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-900 mb-2">Total Cost</h3>
                <p className="text-2xl font-bold text-purple-800">{formatCurrency(result.totalCost)}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Home Price:</span>
                    <span className="font-medium">{formatCurrency(parseFloat(homePrice))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-medium">
                      {downPaymentType === 'percentage' 
                        ? `${downPayment}% (${formatCurrency((parseFloat(homePrice) * parseFloat(downPayment)) / 100)})`
                        : formatCurrency(parseFloat(downPayment))
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-medium">{interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term:</span>
                    <span className="font-medium">{loanTerm} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payoff Date:</span>
                    <span className="font-medium">{result.payoffDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Financial Ratios</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Debt-to-Income Ratio:</span>
                    <span className="font-medium">Calculate with your income</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan-to-Value Ratio:</span>
                    <span className="font-medium">
                      {((result.loanAmount / parseFloat(homePrice)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment as % of Home Price:</span>
                    <span className="font-medium">
                      {((result.totalMonthlyPayment * 12 / parseFloat(homePrice)) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest as % of Total Payments:</span>
                    <span className="font-medium">
                      {((result.totalInterest / (result.principalAndInterest * parseInt(loanTerm) * 12)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips for First-Time Buyers */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">💡 First-Time Buyer Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
                <div>
                  <h4 className="font-semibold mb-2">🏠 Before You Buy</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Get pre-approved for mortgage</li>
                    <li>Save for closing costs (2-5% of home price)</li>
                    <li>Check your credit score</li>
                    <li>Research neighborhoods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Financial Planning</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Keep housing costs under 28% of income</li>
                    <li>Budget for maintenance (1-2% annually)</li>
                    <li>Consider all ownership costs</li>
                    <li>Build an emergency fund</li>
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
            <p className="mb-2"><strong>Mortgage Disclaimer:</strong> This mortgage calculator provides estimates for educational purposes only and should not be considered as financial advice. Actual mortgage terms, rates, fees, and payments may vary based on lender policies, credit score, debt-to-income ratio, and market conditions. Always consult with qualified mortgage professionals and compare offers from multiple lenders.</p>
            <p className="mb-2"><strong>Rate Accuracy:</strong> Interest rates change daily and the rates shown are examples only. Your actual rate will depend on your credit profile and current market conditions.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
