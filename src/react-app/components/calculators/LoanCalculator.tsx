import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, PieChart, BarChart3, Info, Book, ChevronRight } from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [termType, setTermType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
    monthlySchedule: Array<{
      month: number;
      emi: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = termType === 'years' ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                 (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= totalMonths && month <= 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance))
      });
    }

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      monthlySchedule: schedule
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loan EMI Calculator - Home Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate loan EMI, monthly payments, interest amounts, and get detailed amortization schedule. Perfect for home loans, personal loans, car loans, and business loans.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Free EMI Calculator • Instant Results • Amortization Schedule • Tax Benefits
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Loan EMI Calculator</h2>
                    <p className="text-green-100">Calculate monthly payments and interest breakdown</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="e.g., 5000000"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Percent className="w-4 h-4 inline mr-2" />
                      Interest Rate (% per annum)
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="e.g., 8.5"
                      step="0.1"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Loan Term
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="e.g., 20"
                        className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                      />
                      <select
                        value={termType}
                        onChange={(e) => setTermType(e.target.value as 'years' | 'months')}
                        className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateEMI}
                  disabled={!loanAmount || !interestRate || !loanTerm}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Calculate EMI & Interest Breakdown
                </button>

                {/* Results */}
                {result && (
                  <div className="mt-8 space-y-6">
                    {/* Main Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-bold text-blue-900 mb-2">Monthly EMI</h3>
                        <p className="text-3xl font-bold text-blue-800">{formatCurrency(result.emi)}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center">
                        <PieChart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-bold text-green-900 mb-2">Total Interest</h3>
                        <p className="text-3xl font-bold text-green-800">{formatCurrency(result.totalInterest)}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 text-center">
                        <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-bold text-purple-900 mb-2">Total Amount</h3>
                        <p className="text-3xl font-bold text-purple-800">{formatCurrency(result.totalAmount)}</p>
                      </div>
                    </div>

                    {/* Loan Breakdown */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Payment Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Principal Amount</span>
                          <span className="font-bold text-xl text-gray-900">{formatCurrency(parseFloat(loanAmount))}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600">Total Interest</span>
                          <span className="font-bold text-xl text-red-600">+{formatCurrency(result.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 text-lg font-bold">
                          <span>Total Payable Amount</span>
                          <span className="text-green-600">{formatCurrency(result.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amortization Schedule Preview */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                        <h3 className="text-xl font-bold text-gray-900">First 12 Months Payment Schedule</h3>
                        <p className="text-gray-600">See how your payments are split between principal and interest</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Month</th>
                              <th className="px-4 py-3 text-left font-semibold">EMI</th>
                              <th className="px-4 py-3 text-left font-semibold">Principal</th>
                              <th className="px-4 py-3 text-left font-semibold">Interest</th>
                              <th className="px-4 py-3 text-left font-semibold">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.monthlySchedule.map((payment, index) => (
                              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{payment.month}</td>
                                <td className="px-4 py-3">{formatCurrency(payment.emi)}</td>
                                <td className="px-4 py-3 text-green-600">{formatCurrency(payment.principal)}</td>
                                <td className="px-4 py-3 text-red-600">{formatCurrency(payment.interest)}</td>
                                <td className="px-4 py-3">{formatCurrency(payment.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Guide */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Book className="w-6 h-6 mr-2 text-blue-600" />
                Quick Guide
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Enter loan amount</p>
                    <p className="text-gray-600">Principal amount you want to borrow</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Set interest rate</p>
                    <p className="text-gray-600">Annual interest rate offered by lender</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Choose loan term</p>
                    <p className="text-gray-600">Repayment period in years or months</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Get instant results</p>
                    <p className="text-gray-600">EMI, interest, and payment schedule</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Formula */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">EMI Formula</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">EMI Calculation:</h4>
                  <p className="text-sm text-blue-800 font-mono bg-blue-50 p-3 rounded text-center">
                    EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ-1)
                  </p>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Where:</strong></p>
                  <p><strong>P</strong> = Principal loan amount</p>
                  <p><strong>r</strong> = Monthly interest rate (annual rate ÷ 12)</p>
                  <p><strong>n</strong> = Total number of monthly payments</p>
                </div>
                <div className="text-xs text-blue-700">
                  <p><strong>Example:</strong> ₹50,00,000 loan at 8.5% for 20 years:</p>
                  <p>EMI = ₹43,391 per month</p>
                </div>
              </div>
            </div>

            {/* Loan Types */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Loan Types</h3>
              <div className="space-y-3 text-sm text-green-800">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Home Loan</p>
                    <p className="text-xs">7.5% - 9.5% interest, up to 30 years</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Personal Loan</p>
                    <p className="text-xs">10% - 24% interest, up to 7 years</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Car Loan</p>
                    <p className="text-xs">8% - 12% interest, up to 7 years</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Business Loan</p>
                    <p className="text-xs">12% - 20% interest, up to 10 years</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Comprehensive Guide Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Complete Loan EMI Calculator Guide</h2>
            <p className="text-xl text-green-100">Master loan calculations, understand EMI components, and make informed borrowing decisions</p>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="prose max-w-none">
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is EMI (Equated Monthly Installment)?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender at a specified date 
                each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, 
                the loan is paid off in full. This systematic approach helps borrowers plan their finances effectively while ensuring lenders 
                receive consistent payments.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This EMI Calculator</h3>
              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li><strong>Enter Loan Amount:</strong> Input the principal amount you wish to borrow in Indian Rupees (₹). This can range from ₹50,000 for personal loans to several crores for home loans.</li>
                  <li><strong>Set Interest Rate:</strong> Enter the annual interest rate offered by your lender. Different loan types have different rate ranges - home loans typically offer lower rates compared to personal loans.</li>
                  <li><strong>Choose Loan Term:</strong> Select the repayment period in either years or months. Longer terms reduce EMI but increase total interest paid.</li>
                  <li><strong>Calculate EMI:</strong> Click the calculate button to get instant results including monthly EMI, total interest, and payment schedule.</li>
                  <li><strong>Analyze Results:</strong> Review the amortization schedule to understand how payments are distributed between principal and interest over time.</li>
                  <li><strong>Compare Options:</strong> Try different combinations of loan amount, interest rate, and tenure to find the most suitable option for your financial situation.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculation Formula and Mathematics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">EMI Formula</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200 mb-4">
                    <code className="text-lg font-mono text-blue-800 block text-center">
                      EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ-1)
                    </code>
                  </div>
                  <div className="text-blue-800 space-y-2">
                    <p><strong>Where:</strong></p>
                    <p><strong>P</strong> = Principal loan amount</p>
                    <p><strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</p>
                    <p><strong>n</strong> = Total number of monthly payments (Years × 12)</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">Step-by-Step Calculation</h4>
                  <div className="text-green-800 space-y-3 text-sm">
                    <p><strong>Example:</strong> ₹50,00,000 loan at 8.5% for 20 years</p>
                    <p><strong>Step 1:</strong> P = 50,00,000</p>
                    <p><strong>Step 2:</strong> r = 8.5/12/100 = 0.00708</p>
                    <p><strong>Step 3:</strong> n = 20 × 12 = 240 months</p>
                    <p><strong>Step 4:</strong> (1+r)ⁿ = (1.00708)²⁴⁰ = 5.202</p>
                    <p><strong>Step 5:</strong> EMI = 50,00,000 × 0.00708 × 5.202 / (5.202-1)</p>
                    <p><strong>Result:</strong> EMI = ₹43,391 per month</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Loans and Interest Rates</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Loan Type</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Interest Rate Range</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Maximum Tenure</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Typical Loan Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Home Loan</td>
                      <td className="border border-gray-300 px-6 py-4">7.5% - 9.5% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">30 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹10 lakhs - ₹10 crores</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Personal Loan</td>
                      <td className="border border-gray-300 px-6 py-4">10% - 24% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">7 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹50,000 - ₹50 lakhs</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Car Loan</td>
                      <td className="border border-gray-300 px-6 py-4">8% - 12% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">7 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹2 lakhs - ₹2 crores</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Business Loan</td>
                      <td className="border border-gray-300 px-6 py-4">12% - 20% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">10 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹1 lakh - ₹50 crores</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Education Loan</td>
                      <td className="border border-gray-300 px-6 py-4">8.5% - 15% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">15 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹4 lakhs - ₹1.5 crores</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Gold Loan</td>
                      <td className="border border-gray-300 px-6 py-4">7% - 12% p.a.</td>
                      <td className="border border-gray-300 px-6 py-4">3 years</td>
                      <td className="border border-gray-300 px-6 py-4">₹25,000 - ₹2 crores</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding Amortization Schedule</h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and interest that comprise each payment until the loan is paid off at the end of its term. In the early years of a loan, most of each payment goes toward interest, while in the later years, most goes toward the principal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-red-900 mb-4">Early Years (Higher Interest Component)</h4>
                  <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                    <li>Interest component is highest (70-80% of EMI)</li>
                    <li>Principal repayment is slower</li>
                    <li>Outstanding loan balance reduces gradually</li>
                    <li>Tax benefits are maximum (for eligible loans)</li>
                    <li>Prepayment has higher impact on interest savings</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">Later Years (Higher Principal Component)</h4>
                  <ul className="list-disc list-inside space-y-2 text-green-800 text-sm">
                    <li>Principal component increases (60-80% of EMI)</li>
                    <li>Interest payment reduces significantly</li>
                    <li>Outstanding balance reduces rapidly</li>
                    <li>Tax benefits decrease (for interest deduction)</li>
                    <li>Prepayment impact on interest savings is lower</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Factors Affecting EMI Amount</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">💰 Loan Amount</h4>
                  <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm">
                    <li>Higher loan amount = Higher EMI</li>
                    <li>Consider 20% down payment for home loans</li>
                    <li>Don't exceed 40% of monthly income for EMI</li>
                    <li>Factor in processing fees and charges</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-4">📈 Interest Rate</h4>
                  <ul className="list-disc list-inside space-y-2 text-purple-800 text-sm">
                    <li>Higher rate = Higher EMI and total cost</li>
                    <li>Fixed vs. floating rate considerations</li>
                    <li>Credit score affects rate eligibility</li>
                    <li>Compare rates across multiple lenders</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-orange-900 mb-4">⏱️ Loan Tenure</h4>
                  <ul className="list-disc list-inside space-y-2 text-orange-800 text-sm">
                    <li>Longer tenure = Lower EMI but higher total interest</li>
                    <li>Shorter tenure = Higher EMI but lower total cost</li>
                    <li>Balance affordability with total cost</li>
                    <li>Consider income growth over loan tenure</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Smart EMI Management Strategies</h3>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">💡 Pro Tips for EMI Optimization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-green-900 mb-3">🎯 Prepayment Strategies</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Use windfalls (bonus, inheritance) for prepayment</li>
                      <li>Prepay in early years for maximum benefit</li>
                      <li>Choose partial prepayment over full closure initially</li>
                      <li>Reduce tenure instead of EMI for faster closure</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 mb-3">💳 Credit Management</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Maintain credit score above 750 for better rates</li>
                      <li>Keep debt-to-income ratio below 40%</li>
                      <li>Set up auto-debit to avoid missed payments</li>
                      <li>Review and switch loans for better rates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Benefits on Loans</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Loan Type</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Principal Deduction</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Interest Deduction</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3">Home Loan</td>
                      <td className="border border-gray-300 px-4 py-3">₹1.5 lakhs</td>
                      <td className="border border-gray-300 px-4 py-3">₹2 lakhs</td>
                      <td className="border border-gray-300 px-4 py-3">80C & 24(b)</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3">Education Loan</td>
                      <td className="border border-gray-300 px-4 py-3">No limit</td>
                      <td className="border border-gray-300 px-4 py-3">Full interest</td>
                      <td className="border border-gray-300 px-4 py-3">80E</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-4 py-3">Personal Loan</td>
                      <td className="border border-gray-300 px-4 py-3">Not applicable</td>
                      <td className="border border-gray-300 px-4 py-3">Not applicable</td>
                      <td className="border border-gray-300 px-4 py-3">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">What is the maximum EMI I can afford?</h4>
                  <p className="text-gray-700">Financial experts recommend that your total EMI obligations should not exceed 40% of your monthly income. This includes all loan EMIs - home, car, personal, and credit card payments. For example, if your monthly income is ₹1,00,000, your total EMI should not exceed ₹40,000.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Should I choose fixed or floating interest rate?</h4>
                  <p className="text-gray-700">Floating rates typically start lower than fixed rates and change with market conditions. Choose floating if you expect rates to remain stable or decrease, and fixed if you prefer certainty in payments or expect rates to rise. Many borrowers prefer floating rates for home loans due to their long tenure.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How does prepayment affect my EMI?</h4>
                  <p className="text-gray-700">Prepayment reduces your outstanding principal, which can either reduce your EMI amount or loan tenure. Most borrowers prefer reducing tenure to save more on interest. The earlier you prepay, the more interest you save. Even small prepayments in the initial years can significantly reduce your total interest burden.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Can I change my EMI during the loan tenure?</h4>
                  <p className="text-gray-700">Yes, you can request your lender to restructure your loan. This might involve changing the tenure (which affects EMI), making partial prepayments, or switching between fixed and floating rates. However, some changes may involve processing fees and are subject to lender approval.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">What happens if I miss an EMI payment?</h4>
                  <p className="text-gray-700">Missing EMI payments can result in late payment charges, negative impact on credit score, and potentially legal action for continued defaults. Most lenders offer a grace period of 3-7 days. If you anticipate difficulty, contact your lender immediately to discuss restructuring options.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-yellow-800 leading-relaxed">
              <h3 className="font-bold text-lg mb-3">Important Financial Disclaimer</h3>
              <p className="mb-3">
                <strong>This EMI calculator is for informational and educational purposes only and should not be considered as financial advice.</strong> 
                The calculations are based on the inputs provided and standard mathematical formulas. Actual EMI may vary based on lender policies, 
                processing fees, insurance, and other charges not included in this calculation.
              </p>
              <p className="mb-3">
                Before making any financial decisions or loan commitments, please consult with qualified financial advisors, read all loan 
                documents carefully, and compare offers from multiple lenders. Interest rates, fees, and terms can vary significantly between lenders.
              </p>
              <p>
                The results should be verified with your chosen lender before making final loan decisions. This tool does not guarantee 
                loan approval or the exact terms shown in the calculations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-8 p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-gray-900">Developed by Waleed Rajpoot</p>
            <p className="text-sm text-gray-600">Professional Calculator Developer & Financial Technology Specialist</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>About the Developer:</strong> This loan EMI calculator has been developed by Waleed Rajpoot, a professional software developer specializing in financial calculation tools and fintech applications. With extensive experience in creating accurate, user-friendly financial calculators, Waleed ensures all tools meet banking industry standards and provide reliable results for informed financial decision-making.</p>
            <p className="mb-2"><strong>Accuracy Guarantee:</strong> All EMI calculations are performed using standard banking formulas recognized by financial institutions worldwide. The calculator has been thoroughly tested for accuracy across different loan amounts, interest rates, and tenure combinations to ensure reliable results for financial planning.</p>
            <p><strong>Copyright Notice:</strong> This loan EMI calculator and all associated content is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes. The tool may be used freely for personal financial planning and educational purposes.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
