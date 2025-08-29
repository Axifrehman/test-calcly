import { useState } from 'react';
import { Calculator, DollarSign, FileText, TrendingDown, AlertCircle, PieChart } from 'lucide-react';

export default function TaxCalculator() {
  const [country, setCountry] = useState('US');
  const [annualIncome, setAnnualIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductions, setDeductions] = useState('');
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard');
  const [result, setResult] = useState<{
    grossIncome: number;
    taxableIncome: number;
    federalTax: number;
    stateTax: number;
    totalTax: number;
    afterTaxIncome: number;
    effectiveRate: number;
    marginalRate: number;
    monthlyTakeHome: number;
  } | null>(null);

  const countries = [
    { 
      code: 'US', 
      name: 'United States', 
      currency: 'USD', 
      symbol: '$',
      standardDeduction: { single: 13850, married: 27700, hoh: 20800 }
    },
    { 
      code: 'CA', 
      name: 'Canada', 
      currency: 'CAD', 
      symbol: 'C$',
      standardDeduction: { single: 15000, married: 15000, hoh: 15000 }
    },
    { 
      code: 'UK', 
      name: 'United Kingdom', 
      currency: 'GBP', 
      symbol: '£',
      standardDeduction: { single: 12570, married: 12570, hoh: 12570 }
    },
    { 
      code: 'AU', 
      name: 'Australia', 
      currency: 'AUD', 
      symbol: 'A$',
      standardDeduction: { single: 18200, married: 18200, hoh: 18200 }
    },
    { 
      code: 'DE', 
      name: 'Germany', 
      currency: 'EUR', 
      symbol: '€',
      standardDeduction: { single: 10908, married: 21816, hoh: 10908 }
    },
    { 
      code: 'FR', 
      name: 'France', 
      currency: 'EUR', 
      symbol: '€',
      standardDeduction: { single: 10777, married: 21554, hoh: 10777 }
    }
  ];

  const getCountryInfo = () => countries.find(c => c.code === country) || countries[0];

  // Simplified tax brackets for demonstration
  const getTaxBrackets = () => {
    const brackets: Record<string, any> = {
      US: {
        single: [
          { min: 0, max: 11000, rate: 0.10 },
          { min: 11000, max: 44725, rate: 0.12 },
          { min: 44725, max: 95375, rate: 0.22 },
          { min: 95375, max: 182050, rate: 0.24 },
          { min: 182050, max: 231250, rate: 0.32 },
          { min: 231250, max: 578125, rate: 0.35 },
          { min: 578125, max: Infinity, rate: 0.37 }
        ],
        married: [
          { min: 0, max: 22000, rate: 0.10 },
          { min: 22000, max: 89450, rate: 0.12 },
          { min: 89450, max: 190750, rate: 0.22 },
          { min: 190750, max: 364200, rate: 0.24 },
          { min: 364200, max: 462500, rate: 0.32 },
          { min: 462500, max: 693750, rate: 0.35 },
          { min: 693750, max: Infinity, rate: 0.37 }
        ]
      },
      CA: {
        single: [
          { min: 0, max: 53359, rate: 0.15 },
          { min: 53359, max: 106717, rate: 0.205 },
          { min: 106717, max: 165430, rate: 0.26 },
          { min: 165430, max: 235675, rate: 0.29 },
          { min: 235675, max: Infinity, rate: 0.33 }
        ]
      },
      UK: {
        single: [
          { min: 0, max: 37700, rate: 0.20 },
          { min: 37700, max: 125140, rate: 0.40 },
          { min: 125140, max: Infinity, rate: 0.45 }
        ]
      },
      AU: {
        single: [
          { min: 0, max: 45000, rate: 0.19 },
          { min: 45000, max: 120000, rate: 0.325 },
          { min: 120000, max: 180000, rate: 0.37 },
          { min: 180000, max: Infinity, rate: 0.45 }
        ]
      }
    };

    const countryBrackets = brackets[country];
    return countryBrackets?.[filingStatus] || countryBrackets?.single || brackets.US.single;
  };

  const calculateTax = (income: number, brackets: any[]) => {
    let tax = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (income > bracket.min) {
        const taxableInThisBracket = Math.min(income, bracket.max) - bracket.min;
        tax += taxableInThisBracket * bracket.rate;
        marginalRate = bracket.rate;
      }
    }

    return { tax, marginalRate };
  };

  const calculateIncomeTax = () => {
    if (!annualIncome) return;

    const grossIncome = parseFloat(annualIncome);
    const countryInfo = getCountryInfo();
    
    // Determine deduction amount
    let deductionAmount = 0;
    if (deductionType === 'standard') {
      deductionAmount = (countryInfo.standardDeduction as any)[filingStatus] || 0;
    } else {
      deductionAmount = parseFloat(deductions) || 0;
    }

    const taxableIncome = Math.max(0, grossIncome - deductionAmount);
    
    // Calculate federal/main tax
    const brackets = getTaxBrackets();
    const { tax: federalTax, marginalRate } = calculateTax(taxableIncome, brackets);
    
    // Estimate state/provincial tax (simplified)
    let stateTaxRate = 0;
    if (country === 'US') stateTaxRate = 0.05; // Average state tax
    if (country === 'CA') stateTaxRate = 0.08; // Average provincial tax
    
    const stateTax = taxableIncome * stateTaxRate;
    const totalTax = federalTax + stateTax;
    const afterTaxIncome = grossIncome - totalTax;
    const effectiveRate = (totalTax / grossIncome) * 100;
    const monthlyTakeHome = afterTaxIncome / 12;

    setResult({
      grossIncome,
      taxableIncome,
      federalTax,
      stateTax,
      totalTax,
      afterTaxIncome,
      effectiveRate,
      marginalRate: marginalRate * 100,
      monthlyTakeHome
    });
  };

  const formatCurrency = (amount: number) => {
    const { symbol } = getCountryInfo();
    return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const filingStatuses = {
    US: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married Filing Jointly' },
      { value: 'hoh', label: 'Head of Household' }
    ],
    CA: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' }
    ],
    UK: [
      { value: 'single', label: 'Individual' }
    ],
    default: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' }
    ]
  };

  const getFilingStatuses = () => {
    return (filingStatuses as any)[country] || filingStatuses.default;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Income Tax Calculator - Multi-Country</h2>
            <p className="text-green-100">Calculate income tax for major countries</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country/Region
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Annual Gross Income
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="e.g., 75000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {getFilingStatuses().map((status: any) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deduction Type
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDeductionType('standard')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                  deductionType === 'standard'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setDeductionType('itemized')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                  deductionType === 'itemized'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Itemized
              </button>
            </div>
          </div>

          {deductionType === 'itemized' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Total Deductions
              </label>
              <input
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                placeholder="e.g., 15000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={calculateIncomeTax}
              disabled={!annualIncome}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Calculate Tax
            </button>
          </div>
        </div>

        {/* Standard Deduction Information */}
        {deductionType === 'standard' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Standard Deduction</h3>
            </div>
            <p className="text-blue-800">
              Standard deduction for {getCountryInfo().name} ({filingStatus}): {' '}
              <strong>{formatCurrency((getCountryInfo().standardDeduction as any)[filingStatus] || 0)}</strong>
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-900 mb-2">Gross Income</h3>
                <p className="text-2xl font-bold text-blue-800">{formatCurrency(result.grossIncome)}</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
                <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Total Tax</h3>
                <p className="text-2xl font-bold text-red-800">{formatCurrency(result.totalTax)}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-900 mb-2">After-Tax Income</h3>
                <p className="text-2xl font-bold text-green-800">{formatCurrency(result.afterTaxIncome)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
                <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-900 mb-2">Monthly Take-Home</h3>
                <p className="text-2xl font-bold text-purple-800">{formatCurrency(result.monthlyTakeHome)}</p>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Gross Income</span>
                    <span className="font-semibold">{formatCurrency(result.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Deductions</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(result.grossIncome - result.taxableIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Taxable Income</span>
                    <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Federal/Main Tax</span>
                    <span className="font-semibold text-red-600">{formatCurrency(result.federalTax)}</span>
                  </div>
                  {result.stateTax > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">State/Provincial Tax</span>
                      <span className="font-semibold text-red-600">{formatCurrency(result.stateTax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 text-lg font-bold">
                    <span>After-Tax Income</span>
                    <span className="text-green-600">{formatCurrency(result.afterTaxIncome)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Tax Rates & Metrics</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Effective Tax Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">{result.effectiveRate.toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">Total tax as % of gross income</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Marginal Tax Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">{result.marginalRate.toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">Tax rate on next dollar earned</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Monthly Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gross Monthly:</span>
                        <span className="font-medium">{formatCurrency(result.grossIncome / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Tax:</span>
                        <span className="font-medium text-red-600">{formatCurrency(result.totalTax / 12)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Monthly:</span>
                        <span className="text-green-600">{formatCurrency(result.monthlyTakeHome)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Planning Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">💡 Tax Planning Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-yellow-800">
                <div>
                  <h4 className="font-semibold mb-2">📊 Reduce Taxable Income</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Maximize retirement contributions (401k, IRA)</li>
                    <li>Consider Health Savings Account (HSA)</li>
                    <li>Use pre-tax benefits (commuter, childcare)</li>
                    <li>Deduct business expenses if applicable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎯 Optimize Tax Strategy</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Compare standard vs itemized deductions</li>
                    <li>Time income and expenses across tax years</li>
                    <li>Consider tax-efficient investments</li>
                    <li>Consult with tax professionals for complex situations</li>
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
            <p className="mb-2"><strong>Tax Disclaimer:</strong> This tax calculator provides estimates for educational purposes only and should not be considered as tax advice. Tax calculations are simplified and may not account for all deductions, credits, AMT, or specific tax situations. Actual tax liability may vary significantly based on individual circumstances, local taxes, and current tax laws.</p>
            <p className="mb-2"><strong>Professional Advice:</strong> For accurate tax planning and filing, please consult with qualified tax professionals, CPAs, or tax attorneys. Tax laws change frequently and vary by jurisdiction.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
