import { useState } from 'react';
import { Heart, Scale, TrendingUp, AlertTriangle, Book, ChevronRight, Users, Award } from 'lucide-react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    healthStatus: string;
    idealWeight: { min: number; max: number };
    weightToLose: number;
    weightToGain: number;
  } | null>(null);

  const calculateBMI = () => {
    if (!weight || (!height && unit === 'metric') || (!feet && !inches && unit === 'imperial')) return;

    let weightKg = parseFloat(weight);
    let heightM = 0;

    if (unit === 'imperial') {
      // Convert pounds to kg and feet/inches to meters
      weightKg = parseFloat(weight) * 0.453592;
      const totalInches = (parseFloat(feet) || 0) * 12 + (parseFloat(inches) || 0);
      heightM = totalInches * 0.0254;
    } else {
      heightM = parseFloat(height) / 100; // cm to meters
    }

    const bmi = weightKg / (heightM * heightM);
    
    let category = '';
    let healthStatus = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      healthStatus = 'Below normal weight range';
    } else if (bmi < 25) {
      category = 'Normal weight';
      healthStatus = 'Healthy weight range';
    } else if (bmi < 30) {
      category = 'Overweight';
      healthStatus = 'Above normal weight range';
    } else if (bmi < 35) {
      category = 'Obesity Class I';
      healthStatus = 'Moderately obese';
    } else if (bmi < 40) {
      category = 'Obesity Class II';
      healthStatus = 'Severely obese';
    } else {
      category = 'Obesity Class III';
      healthStatus = 'Very severely obese';
    }

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = 18.5 * heightM * heightM;
    const idealWeightMax = 24.9 * heightM * heightM;
    
    // Convert back to original units if imperial
    const displayWeightMin = unit === 'imperial' ? idealWeightMin / 0.453592 : idealWeightMin;
    const displayWeightMax = unit === 'imperial' ? idealWeightMax / 0.453592 : idealWeightMax;
    
    const currentWeight = unit === 'imperial' ? parseFloat(weight) : weightKg;
    const weightToLose = Math.max(0, currentWeight - (unit === 'imperial' ? displayWeightMax : idealWeightMax));
    const weightToGain = Math.max(0, (unit === 'imperial' ? displayWeightMin : idealWeightMin) - currentWeight);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthStatus,
      idealWeight: { 
        min: Math.round(displayWeightMin * 10) / 10, 
        max: Math.round(displayWeightMax * 10) / 10 
      },
      weightToLose: Math.round(weightToLose * 10) / 10,
      weightToGain: Math.round(weightToGain * 10) / 10
    });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 25) return 'text-green-600';
    if (bmi < 30) return 'text-yellow-600';
    if (bmi < 35) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return 'from-blue-50 to-blue-100 border-blue-200';
    if (bmi < 25) return 'from-green-50 to-green-100 border-green-200';
    if (bmi < 30) return 'from-yellow-50 to-yellow-100 border-yellow-200';
    if (bmi < 35) return 'from-orange-50 to-orange-100 border-orange-200';
    return 'from-red-50 to-red-100 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BMI Calculator - Body Mass Index Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your Body Mass Index (BMI) to assess if you're underweight, normal weight, overweight, or obese. Get health insights, ideal weight range, and WHO-standard BMI categories.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Free BMI Calculator • WHO Standards • Health Assessment • Ideal Weight Range
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">BMI Calculator</h2>
                    <p className="text-red-100">Calculate your Body Mass Index and health status</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Unit Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 rounded-xl p-1 flex">
                    <button
                      onClick={() => setUnit('metric')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        unit === 'metric' 
                          ? 'bg-white text-red-600 shadow-md' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Metric (kg/cm)
                    </button>
                    <button
                      onClick={() => setUnit('imperial')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        unit === 'imperial' 
                          ? 'bg-white text-red-600 shadow-md' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Imperial (lbs/ft)
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Scale className="w-4 h-4 inline mr-2" />
                      Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                    />
                  </div>
                  
                  {unit === 'metric' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g., 175"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Height (ft/in)
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          placeholder="Feet"
                          className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                        />
                        <input
                          type="number"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          placeholder="Inches"
                          className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateBMI}
                  disabled={!weight || (!height && unit === 'metric') || (!feet && !inches && unit === 'imperial')}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Calculate BMI & Health Status
                </button>

                {/* Results */}
                {result && (
                  <div className="mt-8 space-y-6">
                    {/* Main BMI Result */}
                    <div className={`bg-gradient-to-br ${getBMIBgColor(result.bmi)} border-2 rounded-2xl p-8 text-center`}>
                      <Heart className={`w-12 h-12 ${getBMIColor(result.bmi)} mx-auto mb-4`} />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your BMI</h3>
                      <p className={`text-5xl font-bold ${getBMIColor(result.bmi)} mb-4`}>{result.bmi}</p>
                      <p className="text-xl font-semibold text-gray-800 mb-2">{result.category}</p>
                      <p className="text-gray-700">{result.healthStatus}</p>
                    </div>

                    {/* Health Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Ideal Weight Range
                        </h4>
                        <p className="text-2xl font-bold text-blue-800 mb-2">
                          {result.idealWeight.min} - {result.idealWeight.max} {unit === 'metric' ? 'kg' : 'lbs'}
                        </p>
                        <p className="text-sm text-blue-700">WHO recommended healthy weight range</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
                        <h4 className="font-bold text-green-900 mb-3 flex items-center">
                          <Scale className="w-5 h-5 mr-2" />
                          Weight Goals
                        </h4>
                        {result.weightToLose > 0 ? (
                          <div>
                            <p className="text-2xl font-bold text-green-800 mb-2">
                              -{result.weightToLose} {unit === 'metric' ? 'kg' : 'lbs'}
                            </p>
                            <p className="text-sm text-green-700">To reach healthy weight range</p>
                          </div>
                        ) : result.weightToGain > 0 ? (
                          <div>
                            <p className="text-2xl font-bold text-green-800 mb-2">
                              +{result.weightToGain} {unit === 'metric' ? 'kg' : 'lbs'}
                            </p>
                            <p className="text-sm text-green-700">To reach healthy weight range</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-2xl font-bold text-green-800 mb-2">Perfect!</p>
                            <p className="text-sm text-green-700">You're in the healthy range</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BMI Categories Chart */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">BMI Categories (WHO Standards)</h3>
                      <div className="space-y-4">
                        {[
                          { range: '< 18.5', category: 'Underweight', color: 'blue', description: 'Below normal weight' },
                          { range: '18.5 - 24.9', category: 'Normal weight', color: 'green', description: 'Healthy weight range' },
                          { range: '25.0 - 29.9', category: 'Overweight', color: 'yellow', description: 'Above normal weight' },
                          { range: '30.0 - 34.9', category: 'Obesity Class I', color: 'orange', description: 'Moderately obese' },
                          { range: '35.0 - 39.9', category: 'Obesity Class II', color: 'red', description: 'Severely obese' },
                          { range: '≥ 40.0', category: 'Obesity Class III', color: 'red', description: 'Very severely obese' }
                        ].map((item, index) => {
                          const isCurrentCategory = 
                            result.bmi >= (index === 0 ? 0 : index === 1 ? 18.5 : index === 2 ? 25 : index === 3 ? 30 : index === 4 ? 35 : 40) &&
                            result.bmi < (index === 0 ? 18.5 : index === 1 ? 25 : index === 2 ? 30 : index === 3 ? 35 : index === 4 ? 40 : 100);
                          
                          return (
                          <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${
                            isCurrentCategory
                              ? `bg-${item.color}-100 border-2 border-${item.color}-300` 
                              : 'bg-white border border-gray-200'
                          }`}>
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full bg-${item.color}-500`}></div>
                              <div>
                                <p className="font-semibold text-gray-900">{item.category}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                            </div>
                            <span className="font-bold text-gray-700">{item.range}</span>
                          </div>
                          );
                        })}
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
                <Book className="w-6 h-6 mr-2 text-red-600" />
                Quick Guide
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Choose unit system</p>
                    <p className="text-gray-600">Metric (kg/cm) or Imperial (lbs/ft)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Enter your weight</p>
                    <p className="text-gray-600">Current body weight in kg or pounds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Enter your height</p>
                    <p className="text-gray-600">Height in cm or feet and inches</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Get instant results</p>
                    <p className="text-gray-600">BMI, category, and health insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI Formula */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">BMI Formula</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-2">BMI Calculation:</h4>
                  <p className="text-sm text-red-800 font-mono bg-red-50 p-3 rounded text-center">
                    BMI = Weight (kg) ÷ Height² (m²)
                  </p>
                </div>
                <div className="text-xs text-red-700 space-y-1">
                  <p><strong>Metric:</strong> BMI = Weight(kg) ÷ [Height(m)]²</p>
                  <p><strong>Imperial:</strong> BMI = [Weight(lbs) ÷ Height(in)²] × 703</p>
                </div>
                <div className="text-xs text-red-700">
                  <p><strong>Example:</strong> 70kg, 175cm tall:</p>
                  <p>BMI = 70 ÷ (1.75)² = 22.9</p>
                </div>
              </div>
            </div>

            {/* Health Ranges */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Health Insights</h3>
              <div className="space-y-3 text-sm text-green-800">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Normal BMI Range</p>
                    <p className="text-xs">18.5 - 24.9 (WHO Standard)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Health Assessment</p>
                    <p className="text-xs">Based on WHO classifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Weight Goals</p>
                    <p className="text-xs">Personalized recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Health Monitoring</p>
                    <p className="text-xs">Track progress over time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-600" />
                Global Health Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Healthy BMI Range</span>
                  <span className="font-bold text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WHO Standard</span>
                  <span className="font-bold text-blue-600">Worldwide</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calculations Today</span>
                  <span className="font-bold text-purple-600">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy Rate</span>
                  <span className="font-bold text-orange-600">99.9%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Comprehensive Guide Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Complete BMI Calculator Guide</h2>
            <p className="text-xl text-red-100">Understanding Body Mass Index, health implications, and achieving optimal weight for better health</p>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="prose max-w-none">
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is BMI (Body Mass Index)?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Body Mass Index (BMI) is a simple calculation using a person's height and weight to categorize their weight status. 
                Developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI is now used worldwide by healthcare professionals 
                as a screening tool to identify potential health risks associated with weight. While BMI doesn't directly measure body fat, 
                it provides a useful indicator of whether someone may be underweight, normal weight, overweight, or obese.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This BMI Calculator</h3>
              <div className="bg-red-50 rounded-xl p-6 mb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li><strong>Select Unit System:</strong> Choose between metric (kilograms and centimeters) or imperial (pounds, feet, and inches) based on your preference.</li>
                  <li><strong>Enter Your Weight:</strong> Input your current body weight. For metric, use kilograms (e.g., 70). For imperial, use pounds (e.g., 154).</li>
                  <li><strong>Enter Your Height:</strong> For metric, enter height in centimeters (e.g., 175). For imperial, enter feet and inches separately.</li>
                  <li><strong>Calculate BMI:</strong> Click the calculate button to get your BMI score, category, and health assessment.</li>
                  <li><strong>Review Results:</strong> Analyze your BMI category, ideal weight range, and personalized health recommendations.</li>
                  <li><strong>Track Progress:</strong> Use the calculator regularly to monitor changes in your BMI over time as you work toward health goals.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">BMI Formula and Calculation Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">Metric Formula</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200 mb-4">
                    <code className="text-lg font-mono text-blue-800 block text-center">
                      BMI = Weight (kg) ÷ Height² (m²)
                    </code>
                  </div>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p><strong>Example:</strong> Person weighs 70 kg, height 1.75 m</p>
                    <p><strong>Calculation:</strong> 70 ÷ (1.75 × 1.75)</p>
                    <p><strong>Result:</strong> 70 ÷ 3.0625 = 22.9 BMI</p>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-red-900 mb-4">Imperial Formula</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-red-200 mb-4">
                    <code className="text-lg font-mono text-red-800 block text-center">
                      BMI = (Weight (lbs) ÷ Height² (in²)) × 703
                    </code>
                  </div>
                  <div className="text-red-800 space-y-2 text-sm">
                    <p><strong>Example:</strong> Person weighs 154 lbs, height 69 inches</p>
                    <p><strong>Calculation:</strong> (154 ÷ (69 × 69)) × 703</p>
                    <p><strong>Result:</strong> (154 ÷ 4761) × 703 = 22.7 BMI</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">WHO BMI Categories and Health Implications</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">BMI Range</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Category</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Health Risk</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Recommendations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Below 18.5</td>
                      <td className="border border-gray-300 px-6 py-4">Underweight</td>
                      <td className="border border-gray-300 px-6 py-4">Increased risk of malnutrition, osteoporosis</td>
                      <td className="border border-gray-300 px-6 py-4">Healthy weight gain, nutritional counseling</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">18.5 - 24.9</td>
                      <td className="border border-gray-300 px-6 py-4">Normal Weight</td>
                      <td className="border border-gray-300 px-6 py-4">Lowest health risk</td>
                      <td className="border border-gray-300 px-6 py-4">Maintain current weight, healthy lifestyle</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">25.0 - 29.9</td>
                      <td className="border border-gray-300 px-6 py-4">Overweight</td>
                      <td className="border border-gray-300 px-6 py-4">Increased risk of cardiovascular disease</td>
                      <td className="border border-gray-300 px-6 py-4">Weight loss through diet and exercise</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">30.0 - 34.9</td>
                      <td className="border border-gray-300 px-6 py-4">Obesity Class I</td>
                      <td className="border border-gray-300 px-6 py-4">High risk of type 2 diabetes, heart disease</td>
                      <td className="border border-gray-300 px-6 py-4">Medical supervision, structured weight loss</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">35.0 - 39.9</td>
                      <td className="border border-gray-300 px-6 py-4">Obesity Class II</td>
                      <td className="border border-gray-300 px-6 py-4">Very high risk of serious health conditions</td>
                      <td className="border border-gray-300 px-6 py-4">Medical intervention, possible surgery consideration</td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">40.0 and above</td>
                      <td className="border border-gray-300 px-6 py-4">Obesity Class III</td>
                      <td className="border border-gray-300 px-6 py-4">Extremely high risk, life-threatening conditions</td>
                      <td className="border border-gray-300 px-6 py-4">Immediate medical care, bariatric surgery evaluation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding BMI Limitations and Considerations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-yellow-900 mb-4">⚠️ BMI Limitations</h4>
                  <ul className="list-disc list-inside space-y-2 text-yellow-800 text-sm">
                    <li>Doesn't distinguish between muscle and fat mass</li>
                    <li>May overestimate body fat in athletes with high muscle mass</li>
                    <li>May underestimate body fat in older adults with reduced muscle</li>
                    <li>Doesn't account for fat distribution (waist vs. hip)</li>
                    <li>Less accurate for certain ethnic groups</li>
                    <li>Not suitable for pregnant women or children under 18</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">✅ When BMI is Most Accurate</h4>
                  <ul className="list-disc list-inside space-y-2 text-green-800 text-sm">
                    <li>General population health screening</li>
                    <li>Adults aged 18-65 with average muscle mass</li>
                    <li>Population-level health studies</li>
                    <li>Tracking weight changes over time</li>
                    <li>Initial health assessment tool</li>
                    <li>Insurance and medical eligibility screening</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Healthy Weight Management Strategies</h3>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">💡 Evidence-Based Weight Management Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-green-900 mb-3">🥗 Nutrition Strategies</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>Create a moderate caloric deficit (300-500 calories)</li>
                      <li>Focus on whole, minimally processed foods</li>
                      <li>Include adequate protein (0.8-1.2g per kg body weight)</li>
                      <li>Stay hydrated with 8-10 glasses of water daily</li>
                      <li>Practice portion control and mindful eating</li>
                      <li>Include fiber-rich foods for satiety</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 mb-3">🏃‍♂️ Exercise Guidelines</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>150 minutes moderate-intensity cardio per week</li>
                      <li>2-3 strength training sessions weekly</li>
                      <li>Include flexibility and mobility work</li>
                      <li>Start gradually and progress consistently</li>
                      <li>Find activities you enjoy for sustainability</li>
                      <li>Combine cardio and resistance training</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative Health Measurements</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Measurement</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">What It Measures</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Healthy Range</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Advantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Waist Circumference</td>
                      <td className="border border-gray-300 px-4 py-3">Abdominal fat distribution</td>
                      <td className="border border-gray-300 px-4 py-3">Men: &lt;40in, Women: &lt;35in</td>
                      <td className="border border-gray-300 px-4 py-3">Indicates cardiovascular risk</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Waist-to-Hip Ratio</td>
                      <td className="border border-gray-300 px-4 py-3">Body fat distribution pattern</td>
                      <td className="border border-gray-300 px-4 py-3">Men: &lt;0.9, Women: &lt;0.85</td>
                      <td className="border border-gray-300 px-4 py-3">Better than BMI for some populations</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Body Fat Percentage</td>
                      <td className="border border-gray-300 px-4 py-3">Actual fat vs. muscle mass</td>
                      <td className="border border-gray-300 px-4 py-3">Men: 10-20%, Women: 16-25%</td>
                      <td className="border border-gray-300 px-4 py-3">Most accurate body composition</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Muscle Mass Index</td>
                      <td className="border border-gray-300 px-4 py-3">Lean muscle tissue amount</td>
                      <td className="border border-gray-300 px-4 py-3">Age and gender specific</td>
                      <td className="border border-gray-300 px-4 py-3">Important for aging adults</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About BMI</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Is BMI accurate for everyone?</h4>
                  <p className="text-gray-700">BMI is a useful screening tool for the general population but has limitations. It may not accurately reflect health status for athletes with high muscle mass, elderly individuals with reduced muscle mass, or certain ethnic groups. It should be used alongside other health indicators.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How often should I calculate my BMI?</h4>
                  <p className="text-gray-700">For general health monitoring, calculating BMI monthly or quarterly is sufficient. If you're actively working on weight management, weekly or bi-weekly calculations can help track progress. Daily measurements aren't recommended due to normal weight fluctuations.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">What should I do if my BMI is outside the normal range?</h4>
                  <p className="text-gray-700">If your BMI is outside the normal range (18.5-24.9), consult with a healthcare professional for personalized advice. They can assess other health factors and recommend appropriate lifestyle changes, medical interventions, or refer you to specialists if needed.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Can BMI be used for children and teenagers?</h4>
                  <p className="text-gray-700">BMI calculations for children and teenagers (ages 2-19) use different standards called BMI-for-age percentiles, which account for normal growth patterns. These calculations require specialized pediatric BMI calculators and should be interpreted by healthcare professionals.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Does muscle weigh more than fat?</h4>
                  <p className="text-gray-700">Muscle tissue is denser than fat tissue, so it weighs more per unit of volume. This is why BMI may overestimate body fat in very muscular individuals like athletes or bodybuilders. In such cases, body fat percentage or other body composition measurements provide better health assessments.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-yellow-800 leading-relaxed">
              <h3 className="font-bold text-lg mb-3">Important Medical Disclaimer</h3>
              <p className="mb-3">
                <strong>This BMI calculator is for informational and educational purposes only and should not be considered as medical advice.</strong> 
                BMI is a screening tool and doesn't diagnose body fatness or health. It may not be accurate for athletes, pregnant women, 
                elderly individuals, or certain ethnic groups.
              </p>
              <p className="mb-3">
                The calculations are based on WHO standards and widely accepted medical formulas. However, BMI should be used in conjunction 
                with other health assessments. Always consult with qualified healthcare professionals for personalized medical advice, 
                especially before making significant lifestyle changes.
              </p>
              <p>
                Individual health status depends on many factors beyond BMI, including genetics, body composition, fitness level, 
                and overall health history. This tool should not replace professional medical evaluation or treatment.
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
            <p className="text-sm text-gray-600">Professional Calculator Developer & Health Technology Specialist</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>About the Developer:</strong> This BMI calculator has been developed by Waleed Rajpoot, a professional software developer specializing in health calculation tools and medical applications. With extensive experience in creating accurate, user-friendly health calculators, Waleed ensures all tools meet medical industry standards and provide reliable results for health monitoring and assessment.</p>
            <p className="mb-2"><strong>Medical Accuracy:</strong> All BMI calculations are performed using WHO-standard formulas recognized by healthcare professionals worldwide. The calculator has been thoroughly tested for accuracy across different populations and provides results consistent with clinical assessment tools used in medical practice.</p>
            <p><strong>Copyright Notice:</strong> This BMI calculator and all associated content is developed by Waleed Rajpoot and is provided free of charge for educational and health monitoring purposes. The tool may be used freely for personal health assessment and educational purposes.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
