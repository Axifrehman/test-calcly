import { useState } from 'react';
import { Percent, TrendingUp, TrendingDown, BarChart3, Info, Book, ChevronRight, Award, Sparkles } from 'lucide-react';

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState<'percentage' | 'increase' | 'decrease' | 'change'>('percentage');
  
  // Percentage calculation states
  const [number, setNumber] = useState('');
  const [percentage, setPercentage] = useState('');
  
  // Percentage change states
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  
  const [result, setResult] = useState<{
    value: number;
    type: string;
    explanation: string;
    formatted: string;
  } | null>(null);

  const calculatePercentage = () => {
    let calculated = 0;
    let explanation = '';
    let type = '';
    let formatted = '';

    switch (calculationType) {
      case 'percentage':
        if (number && percentage) {
          calculated = (parseFloat(number) * parseFloat(percentage)) / 100;
          explanation = `${percentage}% of ${number} = ${calculated}`;
          type = 'Percentage of Number';
          formatted = calculated.toFixed(2);
        }
        break;
        
      case 'increase':
        if (number && percentage) {
          const increase = (parseFloat(number) * parseFloat(percentage)) / 100;
          calculated = parseFloat(number) + increase;
          explanation = `${number} increased by ${percentage}% = ${number} + ${increase.toFixed(2)} = ${calculated}`;
          type = 'Percentage Increase';
          formatted = calculated.toFixed(2);
        }
        break;
        
      case 'decrease':
        if (number && percentage) {
          const decrease = (parseFloat(number) * parseFloat(percentage)) / 100;
          calculated = parseFloat(number) - decrease;
          explanation = `${number} decreased by ${percentage}% = ${number} - ${decrease.toFixed(2)} = ${calculated}`;
          type = 'Percentage Decrease';
          formatted = calculated.toFixed(2);
        }
        break;
        
      case 'change':
        if (oldValue && newValue) {
          const change = ((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100;
          calculated = Math.abs(change);
          const changeType = change >= 0 ? 'increase' : 'decrease';
          explanation = `From ${oldValue} to ${newValue} is ${Math.abs(change).toFixed(2)}% ${changeType}`;
          type = change >= 0 ? 'Percentage Increase' : 'Percentage Decrease';
          formatted = `${Math.abs(change).toFixed(2)}% ${changeType}`;
        }
        break;
    }

    if (calculated !== 0 || calculationType === 'change') {
      setResult({
        value: calculated,
        type,
        explanation,
        formatted
      });
    }
  };

  const getResultColor = () => {
    if (!result) return 'text-blue-600';
    if (result.type.includes('Increase')) return 'text-green-600';
    if (result.type.includes('Decrease')) return 'text-red-600';
    return 'text-blue-600';
  };

  const getResultBgColor = () => {
    if (!result) return 'from-blue-50 to-blue-100 border-blue-200';
    if (result.type.includes('Increase')) return 'from-green-50 to-green-100 border-green-200';
    if (result.type.includes('Decrease')) return 'from-red-50 to-red-100 border-red-200';
    return 'from-blue-50 to-blue-100 border-blue-200';
  };

  const renderInputs = () => {
    switch (calculationType) {
      case 'percentage':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Number
              </label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Percent className="w-4 h-4 inline mr-2" />
                Percentage (%)
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="e.g., 25"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </div>
        );
        
      case 'increase':
      case 'decrease':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Original Number
              </label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Percent className="w-4 h-4 inline mr-2" />
                {calculationType === 'increase' ? 'Increase' : 'Decrease'} Percentage (%)
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="e.g., 25"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </div>
        );
        
      case 'change':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <TrendingDown className="w-4 h-4 inline mr-2" />
                Old Value
              </label>
              <input
                type="number"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
                placeholder="e.g., 80"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                New Value
              </label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Percentage Calculator - Calculate Percentages Instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate percentages, percentage increases, decreases, and percentage changes with step-by-step explanations. Perfect for math homework, business calculations, and everyday percentage problems.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Free Percentage Calculator • Step-by-Step Solutions • Multiple Calculation Types • Educational Tool
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Percent className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Percentage Calculator</h2>
                    <p className="text-blue-100">Calculate percentages with detailed explanations</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Calculation Type Selector */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Calculation Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { type: 'percentage', label: 'Percentage of Number', icon: Percent, desc: 'Find X% of Y' },
                      { type: 'increase', label: 'Percentage Increase', icon: TrendingUp, desc: 'Increase by X%' },
                      { type: 'decrease', label: 'Percentage Decrease', icon: TrendingDown, desc: 'Decrease by X%' },
                      { type: 'change', label: 'Percentage Change', icon: BarChart3, desc: 'Find % change' }
                    ].map((calc) => (
                      <button
                        key={calc.type}
                        onClick={() => setCalculationType(calc.type as any)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                          calculationType === calc.type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <calc.icon className={`w-6 h-6 mx-auto mb-2 ${
                          calculationType === calc.type ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <p className="font-semibold text-sm">{calc.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{calc.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="mb-8">
                  {renderInputs()}
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculatePercentage}
                  disabled={
                    (calculationType !== 'change' && (!number || !percentage)) ||
                    (calculationType === 'change' && (!oldValue || !newValue))
                  }
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Calculate Percentage
                </button>

                {/* Results */}
                {result && (
                  <div className="mt-8 space-y-6">
                    {/* Main Result */}
                    <div className={`bg-gradient-to-br ${getResultBgColor()} border-2 rounded-2xl p-8 text-center`}>
                      <div className="flex justify-center mb-4">
                        {result.type.includes('Increase') && <TrendingUp className="w-12 h-12 text-green-600" />}
                        {result.type.includes('Decrease') && <TrendingDown className="w-12 h-12 text-red-600" />}
                        {!result.type.includes('Increase') && !result.type.includes('Decrease') && <Percent className="w-12 h-12 text-blue-600" />}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.type}</h3>
                      <p className={`text-5xl font-bold ${getResultColor()} mb-4`}>{result.formatted}</p>
                      <p className="text-gray-700 text-lg">{result.explanation}</p>
                    </div>

                    {/* Step-by-step breakdown */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Solution</h3>
                      <div className="space-y-4">
                        {calculationType === 'percentage' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Formula:</span>
                              <span className="font-mono text-blue-600">Result = (Number × Percentage) ÷ 100</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Substitute:</span>
                              <span className="font-mono text-blue-600">Result = ({number} × {percentage}) ÷ 100</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Calculate:</span>
                              <span className="font-mono text-blue-600">Result = {result.value.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                        
                        {(calculationType === 'increase' || calculationType === 'decrease') && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Step 1:</span>
                              <span className="font-mono text-blue-600">Calculate {calculationType}: ({number} × {percentage}) ÷ 100 = {((parseFloat(number) * parseFloat(percentage)) / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Step 2:</span>
                              <span className="font-mono text-blue-600">{calculationType === 'increase' ? 'Add' : 'Subtract'}: {number} {calculationType === 'increase' ? '+' : '-'} {((parseFloat(number) * parseFloat(percentage)) / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Result:</span>
                              <span className="font-mono text-blue-600">{result.value.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                        
                        {calculationType === 'change' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Formula:</span>
                              <span className="font-mono text-blue-600">% Change = ((New - Old) ÷ Old) × 100</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Substitute:</span>
                              <span className="font-mono text-blue-600">% Change = (({newValue} - {oldValue}) ÷ {oldValue}) × 100</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Calculate:</span>
                              <span className="font-mono text-blue-600">% Change = {(((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100).toFixed(2)}%</span>
                            </div>
                          </div>
                        )}
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
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Choose calculation type</p>
                    <p className="text-gray-600">Select the type of percentage calculation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Enter your numbers</p>
                    <p className="text-gray-600">Input the values based on calculation type</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Get instant results</p>
                    <p className="text-gray-600">See the answer with step-by-step solution</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Learn the method</p>
                    <p className="text-gray-600">Understand the formula and calculation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Percentage Formulas */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Key Formulas</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Basic Percentage:</h4>
                  <p className="text-sm text-blue-800 font-mono bg-blue-50 p-3 rounded text-center">
                    X% of Y = (X × Y) ÷ 100
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Percentage Change:</h4>
                  <p className="text-sm text-blue-800 font-mono bg-blue-50 p-3 rounded text-center">
                    ((New - Old) ÷ Old) × 100
                  </p>
                </div>
                <div className="text-xs text-blue-700">
                  <p><strong>Example:</strong> 25% of 200 = (25 × 200) ÷ 100 = 50</p>
                </div>
              </div>
            </div>

            {/* Common Uses */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Common Uses</h3>
              <div className="space-y-3 text-sm text-green-800">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Sales & Discounts</p>
                    <p className="text-xs">Calculate sale prices and savings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Tips & Service Charges</p>
                    <p className="text-xs">Calculate restaurant tips and fees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Grade Calculations</p>
                    <p className="text-xs">Convert test scores to percentages</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Business Analytics</p>
                    <p className="text-xs">Growth rates and performance metrics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Quick Examples
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-medium text-yellow-900">15% tip on $50 bill</p>
                  <p className="text-yellow-700">15% of 50 = $7.50</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-medium text-yellow-900">20% discount on $100</p>
                  <p className="text-yellow-700">$100 - 20% = $80</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-medium text-yellow-900">Price change from $80 to $100</p>
                  <p className="text-yellow-700">25% increase</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Comprehensive Guide Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Complete Percentage Calculator Guide</h2>
            <p className="text-xl text-blue-100">Master percentage calculations with comprehensive formulas, examples, and real-world applications</p>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="prose max-w-none">
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding Percentages: The Foundation</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A percentage is a way of expressing a number as a fraction of 100. The word "percent" comes from the Latin "per centum," 
                meaning "by the hundred." Percentages are used everywhere in our daily lives - from calculating tips and discounts to 
                understanding statistics, grades, and financial information. This calculator helps you master all types of percentage 
                calculations with step-by-step explanations and real-world examples.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Percentage Calculator</h3>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li><strong>Select Calculation Type:</strong> Choose from four main calculation types - basic percentage, percentage increase, percentage decrease, or percentage change.</li>
                  <li><strong>Enter Your Numbers:</strong> Input the required values based on your calculation type. For basic percentages, enter the number and percentage. For changes, enter old and new values.</li>
                  <li><strong>Calculate Results:</strong> Click the calculate button to get instant results with detailed explanations and step-by-step solutions.</li>
                  <li><strong>Review Solutions:</strong> Study the step-by-step breakdown to understand the mathematical process and learn the underlying formulas.</li>
                  <li><strong>Apply Knowledge:</strong> Use the learned methods for homework, business calculations, or everyday percentage problems.</li>
                  <li><strong>Practice Regularly:</strong> Try different calculation types and numbers to build confidence in percentage mathematics.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Percentage Formulas and Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">Basic Percentage Calculation</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200 mb-4">
                    <code className="text-lg font-mono text-green-800 block text-center">
                      Result = (Number × Percentage) ÷ 100
                    </code>
                  </div>
                  <div className="text-green-800 space-y-2 text-sm">
                    <p><strong>Example:</strong> Find 25% of 200</p>
                    <p><strong>Calculation:</strong> (200 × 25) ÷ 100</p>
                    <p><strong>Result:</strong> 5000 ÷ 100 = 50</p>
                    <p><strong>Answer:</strong> 25% of 200 is 50</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">Percentage Change Formula</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200 mb-4">
                    <code className="text-lg font-mono text-blue-800 block text-center">
                      % Change = ((New - Old) ÷ Old) × 100
                    </code>
                  </div>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p><strong>Example:</strong> Price changed from $80 to $100</p>
                    <p><strong>Calculation:</strong> ((100 - 80) ÷ 80) × 100</p>
                    <p><strong>Result:</strong> (20 ÷ 80) × 100 = 25%</p>
                    <p><strong>Answer:</strong> 25% increase</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Percentage Calculations</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Calculation Type</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Formula</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Example</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Common Uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Basic Percentage</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">X% of Y = (X × Y) ÷ 100</td>
                      <td className="border border-gray-300 px-6 py-4">20% of 150 = 30</td>
                      <td className="border border-gray-300 px-6 py-4">Tips, discounts, taxes</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Percentage Increase</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">Y + (Y × X ÷ 100)</td>
                      <td className="border border-gray-300 px-6 py-4">100 + 20% = 120</td>
                      <td className="border border-gray-300 px-6 py-4">Price increases, growth rates</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Percentage Decrease</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">Y - (Y × X ÷ 100)</td>
                      <td className="border border-gray-300 px-6 py-4">100 - 20% = 80</td>
                      <td className="border border-gray-300 px-6 py-4">Sales, reductions, depreciation</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Percentage Change</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">((New-Old) ÷ Old) × 100</td>
                      <td className="border border-gray-300 px-6 py-4">80→100 = 25% increase</td>
                      <td className="border border-gray-300 px-6 py-4">Performance analysis, comparisons</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">What Percentage</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">(Part ÷ Whole) × 100</td>
                      <td className="border border-gray-300 px-6 py-4">30 is what % of 150? = 20%</td>
                      <td className="border border-gray-300 px-6 py-4">Test scores, ratios, proportions</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Percentage to Decimal</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono text-sm">Percentage ÷ 100</td>
                      <td className="border border-gray-300 px-6 py-4">25% = 0.25</td>
                      <td className="border border-gray-300 px-6 py-4">Mathematical calculations, programming</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real-World Percentage Applications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-green-900 mb-4">💰 Financial Applications</h4>
                  <ul className="list-disc list-inside space-y-2 text-green-800 text-sm">
                    <li>Interest rates on loans and savings</li>
                    <li>Investment returns and portfolio growth</li>
                    <li>Tax calculations and deductions</li>
                    <li>Commission and fee calculations</li>
                    <li>Inflation rates and economic indicators</li>
                    <li>Credit card interest and payment calculations</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">🛍️ Shopping & Business</h4>
                  <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm">
                    <li>Sales discounts and promotional prices</li>
                    <li>Markup and profit margin calculations</li>
                    <li>Employee raises and salary adjustments</li>
                    <li>Market share and business growth</li>
                    <li>Customer satisfaction and survey results</li>
                    <li>Inventory turnover and stock management</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-4">📚 Education & Statistics</h4>
                  <ul className="list-disc list-inside space-y-2 text-purple-800 text-sm">
                    <li>Test scores and grade calculations</li>
                    <li>Statistical analysis and data interpretation</li>
                    <li>Population demographics and surveys</li>
                    <li>Scientific research and experimental results</li>
                    <li>Sports statistics and performance metrics</li>
                    <li>Academic progress and improvement tracking</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Problem Solving Examples</h3>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">💡 Worked Examples with Solutions</h4>
                
                <div className="space-y-8">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-green-900 mb-3">Example 1: Restaurant Tip Calculation</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> Calculate 18% tip on a $65 restaurant bill.</p>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Step 1:</strong> Identify the values - Bill = $65, Tip rate = 18%</p>
                      <p><strong>Step 2:</strong> Apply formula - Tip = (65 × 18) ÷ 100</p>
                      <p><strong>Step 3:</strong> Calculate - Tip = 1170 ÷ 100 = $11.70</p>
                      <p><strong>Step 4:</strong> Total bill = $65 + $11.70 = $76.70</p>
                      <p><strong>Answer:</strong> 18% tip is $11.70, total bill is $76.70</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-blue-900 mb-3">Example 2: Sale Price Calculation</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> A $120 jacket is on sale for 25% off. What's the sale price?</p>
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Step 1:</strong> Calculate discount amount - (120 × 25) ÷ 100 = $30</p>
                      <p><strong>Step 2:</strong> Subtract discount from original price - $120 - $30 = $90</p>
                      <p><strong>Alternative method:</strong> $120 × (100% - 25%) = $120 × 0.75 = $90</p>
                      <p><strong>Answer:</strong> Sale price is $90</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-purple-900 mb-3">Example 3: Performance Change Analysis</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> Sales increased from 240 units to 300 units. What's the percentage increase?</p>
                    <div className="bg-purple-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Step 1:</strong> Calculate change - New - Old = 300 - 240 = 60 units</p>
                      <p><strong>Step 2:</strong> Apply percentage change formula - (60 ÷ 240) × 100</p>
                      <p><strong>Step 3:</strong> Calculate - 0.25 × 100 = 25%</p>
                      <p><strong>Answer:</strong> Sales increased by 25%</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Percentage Mistakes and How to Avoid Them</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-red-900 mb-3">❌ Common Mistake #1: Confusing Percentage Points with Percentages</h4>
                  <p className="text-red-800 mb-2"><strong>Wrong:</strong> Interest rate changed from 5% to 7%, that's a 2% increase.</p>
                  <p className="text-red-800 mb-2"><strong>Right:</strong> That's a 2 percentage point increase, or a 40% relative increase.</p>
                  <p className="text-red-700 text-sm">Explanation: (7-5)/5 × 100 = 40% increase, not 2%.</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-yellow-900 mb-3">⚠️ Common Mistake #2: Reversing Percentage Changes</h4>
                  <p className="text-yellow-800 mb-2"><strong>Wrong:</strong> If something decreases by 25%, increasing by 25% gets back to original.</p>
                  <p className="text-yellow-800 mb-2"><strong>Right:</strong> You need to increase by 33.33% to get back to original.</p>
                  <p className="text-yellow-700 text-sm">Example: 100 → 75 (25% decrease) → 100 (33.33% increase of 75).</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">💡 Tip: Order of Operations Matters</h4>
                  <p className="text-blue-800 mb-2">When calculating multiple percentage changes, apply them sequentially, not additively.</p>
                  <p className="text-blue-700 text-sm">Example: 10% increase then 20% increase = 1.1 × 1.2 = 1.32 = 32% total increase (not 30%).</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How do I convert between percentages, decimals, and fractions?</h4>
                  <p className="text-gray-700 mb-3">Percentage to decimal: divide by 100 (25% = 0.25). Decimal to percentage: multiply by 100 (0.25 = 25%). For fractions: 25% = 25/100 = 1/4. These conversions are essential for different types of calculations and help verify your answers.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">What's the difference between percentage increase and percentage of increase?</h4>
                  <p className="text-gray-700">Percentage increase shows how much bigger the new value is compared to the old value. "Percentage of increase" is the same thing. The formula is always ((New - Old) / Old) × 100. Don't confuse this with finding what percentage one number is of another.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How do I calculate cumulative percentage changes?</h4>
                  <p className="text-gray-700">For multiple percentage changes, multiply the change factors: (1 + change1/100) × (1 + change2/100) × ... - 1, then multiply by 100. For example, 10% increase then 5% decrease: (1.10 × 0.95) - 1 = 0.045 = 4.5% net increase.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">When should I use percentage vs. percentage points?</h4>
                  <p className="text-gray-700">Use percentage points when comparing two percentages directly (interest rate went from 5% to 7% = 2 percentage point increase). Use percentage when comparing relative changes (7% is 40% higher than 5%). This distinction is crucial in finance, statistics, and data analysis.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How accurate should my percentage calculations be?</h4>
                  <p className="text-gray-700">For most practical purposes, round to 2 decimal places (25.75%). For financial calculations, you might need more precision. For rough estimates, 1 decimal place or whole numbers are often sufficient. Always consider the context and required precision of your specific application.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="mt-12 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-yellow-800 leading-relaxed">
              <h3 className="font-bold text-lg mb-3">Educational Disclaimer</h3>
              <p className="mb-3">
                <strong>This percentage calculator is designed for educational and general calculation purposes.</strong> 
                While the calculations are mathematically accurate and based on standard percentage formulas, results should be 
                verified for critical applications such as financial transactions, academic grading, or business decisions.
              </p>
              <p className="mb-3">
                The calculator provides step-by-step solutions to help users understand percentage mathematics. For homework assignments, 
                please check with your instructor about tool usage policies. For financial or business calculations, consider consulting 
                with qualified professionals when making important decisions.
              </p>
              <p>
                Always double-check calculations for important applications and understand the underlying mathematical principles 
                rather than relying solely on calculator results.
              </p>
            </div>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-8 p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-gray-900 flex items-center justify-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Developed by Waleed Rajpoot
            </p>
            <p className="text-sm text-gray-600">Professional Calculator Developer & Mathematics Education Specialist</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>About the Developer:</strong> This percentage calculator has been developed by Waleed Rajpoot, a professional software developer specializing in educational calculation tools and mathematical applications. With extensive experience in creating accurate, user-friendly educational calculators, Waleed ensures all tools meet academic standards and provide reliable results for learning and practical applications.</p>
            <p className="mb-2"><strong>Mathematical Accuracy:</strong> All percentage calculations are performed using standard mathematical formulas taught in schools and universities worldwide. The calculator includes step-by-step solutions to enhance learning and understanding of percentage mathematics, making it an excellent educational resource for students and professionals.</p>
            <p><strong>Copyright Notice:</strong> This percentage calculator and all associated educational content is developed by Waleed Rajpoot and is provided free of charge for educational and general calculation purposes. The tool may be used freely for learning, homework assistance, and everyday percentage calculations.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
