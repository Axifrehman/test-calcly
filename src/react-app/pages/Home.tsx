import { useState } from 'react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import BMICalculator from '@/react-app/components/calculators/BMICalculator';
import LoanCalculator from '@/react-app/components/calculators/LoanCalculator';
import PercentageCalculator from '@/react-app/components/calculators/PercentageCalculator';
import AgeCalculator from '@/react-app/components/calculators/AgeCalculator';
import CurrencyConverter from '@/react-app/components/calculators/CurrencyConverter';
import ScientificCalculator from '@/react-app/components/calculators/ScientificCalculator';
import TipCalculator from '@/react-app/components/calculators/TipCalculator';
import CompoundInterestCalculator from '@/react-app/components/calculators/CompoundInterestCalculator';
import InvestmentCalculator from '@/react-app/components/calculators/InvestmentCalculator';
import MortgageCalculator from '@/react-app/components/calculators/MortgageCalculator';
import TaxCalculator from '@/react-app/components/calculators/TaxCalculator';
import RetirementCalculator from '@/react-app/components/calculators/RetirementCalculator';
import TemperatureConverter from '@/react-app/components/calculators/TemperatureConverter';
import LengthConverter from '@/react-app/components/calculators/LengthConverter';
import PersonalLoanCalculator from '@/react-app/components/calculators/PersonalLoanCalculator';
import CarLoanCalculator from '@/react-app/components/calculators/CarLoanCalculator';
import BusinessLoanCalculator from '@/react-app/components/calculators/BusinessLoanCalculator';
import CreditCardCalculator from '@/react-app/components/calculators/CreditCardCalculator';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleCategorySelect = (category: string, tool?: string) => {
    setSelectedCategory(category);
    setSelectedTool(tool || '');
    setCurrentView('category');
  };

  const renderSpecificTool = () => {
    const toolComponents: Record<string, React.ReactElement> = {
      'bmi-calculator': <BMICalculator />,
      'loan-calculator': <LoanCalculator />,
      'percentage-calculator': <PercentageCalculator />,
      'age-calculator': <AgeCalculator />,
      'currency-converter': <CurrencyConverter />,
      'scientific-calculator': <ScientificCalculator />,
      'tip-calculator': <TipCalculator />,
      'compound-interest': <CompoundInterestCalculator />,
      'investment-calculator': <InvestmentCalculator />,
      'mortgage-calculator': <MortgageCalculator />,
      'tax-calculator': <TaxCalculator />,
      'retirement-calculator': <RetirementCalculator />,
      'sip-calculator': <InvestmentCalculator />,
      'temperature-converter': <TemperatureConverter />,
      'length-converter': <LengthConverter />,
      'personal-loan-calculator': <PersonalLoanCalculator />,
      'car-loan-calculator': <CarLoanCalculator />,
      'business-loan-calculator': <BusinessLoanCalculator />,
      'credit-card-calculator': <CreditCardCalculator />,
    };

    return toolComponents[selectedTool] || null;
  };

  const renderCategoryContent = () => {
    // If a specific tool is selected, render it
    if (selectedTool && renderSpecificTool()) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <button
                onClick={() => setSelectedTool('')}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-4"
              >
                ← Back to {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools
              </button>
            </div>
            {renderSpecificTool()}
          </div>
        </div>
      );
    }

    // Get tools from MegaMenu data structure
    const getToolsForCategory = (categoryId: string) => {
      // This would normally come from a shared data source, but for now we'll use a simplified version
      const toolsData: Record<string, Array<{name: string, slug: string, description: string, keywords: string, popular?: boolean}>> = {
      health: [
        { name: 'BMI Calculator - Body Mass Index', slug: 'bmi-calculator', description: 'Calculate BMI, body mass index, weight status, healthy weight range, obesity calculator', keywords: 'bmi calculator, body mass index, weight calculator, healthy weight' },
        { name: 'Age Calculator - Exact Age', slug: 'age-calculator', description: 'Calculate exact age in years months days, age difference, birthday calculator, date calculator', keywords: 'age calculator, exact age, birthday calculator, age difference' },
        { name: 'Calorie Calculator - Daily Calories', slug: 'calorie-calculator', description: 'Calculate daily calorie needs, BMR, TDEE, weight loss calories, calorie deficit calculator', keywords: 'calorie calculator, daily calories, BMR calculator, TDEE' },
        { name: 'Body Fat Calculator - Body Composition', slug: 'body-fat-calculator', description: 'Calculate body fat percentage, lean body mass, body composition analysis', keywords: 'body fat calculator, body fat percentage, lean body mass' },
        { name: 'Water Intake Calculator - Daily Water', slug: 'water-intake-calculator', description: 'Calculate daily water intake, hydration calculator, water needs, fluid calculator', keywords: 'water intake calculator, daily water, hydration calculator' },
        { name: 'Heart Rate Calculator - Target HR', slug: 'heart-rate-calculator', description: 'Calculate target heart rate, maximum heart rate, heart rate zones for exercise', keywords: 'heart rate calculator, target heart rate, max heart rate' },
        { name: 'Pregnancy Calculator - Due Date', slug: 'pregnancy-calculator', description: 'Calculate pregnancy due date, weeks pregnant, trimester calculator, conception date', keywords: 'pregnancy calculator, due date calculator, pregnancy weeks' },
        { name: 'Ideal Weight Calculator - Perfect Weight', slug: 'ideal-weight-calculator', description: 'Calculate ideal body weight, perfect weight, healthy weight range calculator', keywords: 'ideal weight calculator, perfect weight, healthy weight range' },
      ],
      financial: [
        { name: 'Loan Calculator - EMI Calculator', slug: 'loan-calculator', popular: true, description: 'Calculate loan EMI, monthly payments, total interest, amortization schedule with USD as default', keywords: 'loan calculator, EMI calculator, monthly payment, loan EMI' },
        { name: 'Mortgage Calculator - Home Loan', slug: 'mortgage-calculator', popular: true, description: 'Calculate mortgage payments, home loan EMI, property loan calculator for US, UK, Canada, Australia', keywords: 'mortgage calculator, home loan calculator, property loan EMI' },
        { name: 'Investment Calculator - SIP Calculator', slug: 'investment-calculator', popular: true, description: 'Calculate SIP returns, lump sum investments, mutual fund calculator with multi-currency support', keywords: 'investment calculator, SIP calculator, mutual fund calculator' },
        { name: 'Compound Interest Calculator', slug: 'compound-interest', popular: true, description: 'Calculate compound interest, investment growth, future value with USD default currency', keywords: 'compound interest calculator, investment calculator, future value' },
        { name: 'Currency Converter - Multi-Currency', slug: 'currency-converter', description: 'Convert between major world currencies, USD, EUR, GBP, CAD, AUD with live rates', keywords: 'currency converter, exchange rate, USD converter, forex' },
        { name: 'Tax Calculator - Multi-Country', slug: 'tax-calculator', description: 'Calculate income tax for US, Canada, UK, Australia, Germany, France with USD default', keywords: 'tax calculator, income tax calculator, US tax, multi-country tax' },
        { name: 'Retirement Calculator - Pension Planning', slug: 'retirement-calculator', description: 'Plan retirement savings with multi-currency support, inflation adjustment for Tier 1 countries', keywords: 'retirement calculator, pension calculator, retirement planning USD' },
        { name: 'Tip Calculator - Bill Splitter', slug: 'tip-calculator', description: 'Calculate tip amount, split bill, gratuity calculator with USD, EUR, GBP support', keywords: 'tip calculator, bill splitter, gratuity calculator, restaurant tip' },
        { name: 'SIP Calculator - Systematic Investment', slug: 'sip-calculator', description: 'Dedicated SIP calculator for systematic investment planning with USD as base currency', keywords: 'SIP calculator, systematic investment, monthly investment USD' },
        { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', description: 'Calculate personal loan EMI, interest rates, repayment schedule for US market', keywords: 'personal loan calculator, unsecured loan EMI, personal finance' },
        { name: 'Car Loan Calculator', slug: 'car-loan-calculator', description: 'Calculate auto loan payments, car financing, vehicle loan EMI with USD default', keywords: 'car loan calculator, auto loan EMI, vehicle financing' },
        { name: 'Business Loan Calculator', slug: 'business-loan-calculator', description: 'Calculate business loan EMI, commercial loan payments, small business financing', keywords: 'business loan calculator, commercial loan EMI, SME financing' },
        { name: 'Credit Card Calculator', slug: 'credit-card-calculator', description: 'Calculate credit card payments, payoff time, interest savings for US credit cards', keywords: 'credit card calculator, credit card payoff, minimum payment' },
        { name: 'Loan Comparison Calculator', slug: 'loan-comparison-calculator', description: 'Compare multiple loan offers, interest rates, terms side by side with USD base', keywords: 'loan comparison, compare loans, best loan rates' },
        { name: 'Refinance Calculator', slug: 'refinance-calculator', description: 'Calculate refinancing savings, break-even analysis for mortgages and loans', keywords: 'refinance calculator, mortgage refinance, loan refinancing savings' },
        { name: 'Student Loan Calculator', slug: 'student-loan-calculator', description: 'Calculate education loan payments, student debt repayment, income-driven plans', keywords: 'student loan calculator, education loan EMI, student debt' },
        { name: 'FD Calculator - Fixed Deposit', slug: 'fd-calculator', description: 'Calculate fixed deposit returns, term deposit interest, certificate of deposit', keywords: 'FD calculator, fixed deposit calculator, term deposit returns' },
        { name: 'RD Calculator - Recurring Deposit', slug: 'rd-calculator', description: 'Calculate recurring deposit maturity, monthly savings plan returns', keywords: 'RD calculator, recurring deposit, monthly savings plan' },
        { name: 'Mutual Fund Calculator', slug: 'mutual-fund-calculator', description: 'Calculate mutual fund returns, NAV growth, portfolio performance analysis', keywords: 'mutual fund calculator, NAV calculator, portfolio returns' },
        { name: 'Stock Return Calculator', slug: 'stock-return-calculator', description: 'Calculate stock investment returns, dividend yield, capital gains analysis', keywords: 'stock calculator, stock returns, dividend calculator' },
        { name: 'CAGR Calculator', slug: 'cagr-calculator', description: 'Calculate compound annual growth rate, investment performance metrics', keywords: 'CAGR calculator, compound annual growth rate, investment returns' }
      ],
      math: [
        { name: 'Scientific Calculator - Advanced Math', slug: 'scientific-calculator', description: 'Scientific calculator with trigonometry, logarithms, advanced mathematical functions', keywords: 'scientific calculator, advanced calculator, trigonometry calculator' },
        { name: 'Percentage Calculator - Percent Math', slug: 'percentage-calculator', description: 'Calculate percentage, percent increase decrease, percentage change calculator', keywords: 'percentage calculator, percent calculator, percentage change' },
        { name: 'Fraction Calculator - Fraction Math', slug: 'fraction-calculator', description: 'Add subtract multiply divide fractions, fraction calculator, mixed numbers', keywords: 'fraction calculator, fraction math, add fractions' },
        { name: 'Square Root Calculator - Root Math', slug: 'square-root-calculator', description: 'Calculate square root, cube root, nth root, radical calculator', keywords: 'square root calculator, cube root, root calculator' },
        { name: 'Statistics Calculator - Data Analysis', slug: 'statistics-calculator', description: 'Calculate mean, median, mode, standard deviation, statistics calculator', keywords: 'statistics calculator, mean median mode, standard deviation' },
        { name: 'Matrix Calculator - Linear Algebra', slug: 'matrix-calculator', description: 'Matrix operations, determinant, inverse matrix, matrix multiplication calculator', keywords: 'matrix calculator, determinant calculator, matrix operations' },
        { name: 'GCD Calculator - Greatest Common Divisor', slug: 'gcd-calculator', description: 'Calculate GCD, greatest common divisor, highest common factor calculator', keywords: 'GCD calculator, greatest common divisor, HCF calculator' },
        { name: 'LCM Calculator - Least Common Multiple', slug: 'lcm-calculator', description: 'Calculate LCM, least common multiple, lowest common multiple calculator', keywords: 'LCM calculator, least common multiple, LCM finder' },
      ],
      conversion: [
        { name: 'Length Converter - Distance Units', slug: 'length-converter', description: 'Convert length units, meters feet inches, distance converter, measurement converter', keywords: 'length converter, distance converter, meters to feet, unit converter' },
        { name: 'Temperature Converter - Celsius Fahrenheit', slug: 'temperature-converter', description: 'Convert temperature Celsius Fahrenheit Kelvin, temperature conversion calculator', keywords: 'temperature converter, celsius to fahrenheit, temperature conversion' },
        { name: 'Weight Converter - Mass Units', slug: 'weight-converter', description: 'Convert weight units, kg to pounds, mass converter, weight conversion calculator', keywords: 'weight converter, kg to pounds, mass converter, weight conversion' },
        { name: 'Area Converter - Area Units', slug: 'area-converter', description: 'Convert area units, square meters feet, area conversion calculator, surface area', keywords: 'area converter, square meters to feet, area conversion' },
        { name: 'Volume Converter - Capacity Units', slug: 'volume-converter', description: 'Convert volume units, liters gallons, capacity converter, volume conversion', keywords: 'volume converter, liters to gallons, capacity converter' },
        { name: 'Time Converter - Time Units', slug: 'time-converter', description: 'Convert time units, hours minutes seconds, time zone converter, duration calculator', keywords: 'time converter, time zone converter, duration calculator' },
        { name: 'Speed Converter - Velocity Units', slug: 'speed-converter', description: 'Convert speed units, mph to kmh, velocity converter, speed conversion calculator', keywords: 'speed converter, mph to kmh, velocity converter' },
        { name: 'Pressure Converter - Pressure Units', slug: 'pressure-converter', description: 'Convert pressure units, PSI bar pascal, pressure conversion calculator', keywords: 'pressure converter, PSI to bar, pressure conversion' },
      ],
      engineering: [
        { name: 'Ohm\'s Law Calculator - Electrical', slug: 'ohms-law-calculator', description: 'Calculate voltage current resistance power, Ohms law calculator, electrical calculator', keywords: 'ohms law calculator, voltage calculator, electrical calculator' },
        { name: 'Electrical Power Calculator - Wattage', slug: 'electrical-power-calculator', description: 'Calculate electrical power, wattage calculator, power consumption calculator', keywords: 'electrical power calculator, wattage calculator, power consumption' },
        { name: 'Wire Size Calculator - Cable Gauge', slug: 'wire-size-calculator', description: 'Calculate wire gauge, cable size calculator, electrical wire sizing calculator', keywords: 'wire size calculator, cable gauge calculator, wire gauge' },
        { name: 'Concrete Calculator - Cement Mixer', slug: 'concrete-calculator', description: 'Calculate concrete volume, cement calculator, concrete mix calculator, material calculator', keywords: 'concrete calculator, cement calculator, concrete volume' },
        { name: 'Beam Calculator - Structural', slug: 'beam-calculator', description: 'Calculate beam deflection, structural beam calculator, load calculator', keywords: 'beam calculator, beam deflection, structural calculator' },
        { name: 'Heat Transfer Calculator - Thermal', slug: 'heat-transfer-calculator', description: 'Calculate heat transfer rate, thermal calculator, heat exchange calculator', keywords: 'heat transfer calculator, thermal calculator, heat exchange' },
        { name: 'Transformer Calculator - Electrical', slug: 'transformer-calculator', description: 'Calculate transformer turns ratio, voltage transformer calculator', keywords: 'transformer calculator, turns ratio, voltage transformer' },
        { name: 'Capacitor Calculator - Electronic', slug: 'capacitor-calculator', description: 'Calculate capacitance, capacitor value calculator, electronic calculator', keywords: 'capacitor calculator, capacitance calculator, electronic calculator' },
      ],
      business: [
        { name: 'Profit Margin Calculator - Business', slug: 'profit-margin-calculator', description: 'Calculate profit margin, gross profit, net profit margin calculator', keywords: 'profit margin calculator, gross profit, business calculator' },
        { name: 'ROI Calculator - Return Investment', slug: 'roi-calculator', description: 'Calculate ROI, return on investment, investment return calculator', keywords: 'ROI calculator, return on investment, investment return' },
        { name: 'Break Even Calculator - Business', slug: 'break-even-calculator', description: 'Calculate break even point, break even analysis, business calculator', keywords: 'break even calculator, break even analysis, business planning' },
        { name: 'Markup Calculator - Pricing', slug: 'markup-calculator', description: 'Calculate markup percentage, selling price, pricing calculator, margin calculator', keywords: 'markup calculator, pricing calculator, selling price' },
        { name: 'Payroll Calculator - Salary', slug: 'payroll-calculator', description: 'Calculate payroll, salary calculator, wage calculator, employee pay calculator', keywords: 'payroll calculator, salary calculator, wage calculator' },
        { name: 'Sales Tax Calculator - Tax Rate', slug: 'sales-tax-calculator', description: 'Calculate sales tax, tax amount, tax rate calculator, purchase tax', keywords: 'sales tax calculator, tax rate calculator, purchase tax' },
        { name: 'Discount Calculator - Sale Price', slug: 'discount-calculator', description: 'Calculate discount percentage, sale price, discount amount calculator', keywords: 'discount calculator, sale price, discount percentage' },
        { name: 'Commission Calculator - Sales', slug: 'commission-calculator', description: 'Calculate sales commission, commission rate, sales calculator', keywords: 'commission calculator, sales commission, commission rate' },
      ]
    };

      return toolsData[categoryId] || [];
    };

    const tools = getToolsForCategory(selectedCategory);
    const categoryInfo: Record<string, {color: string, accent: string, title: string, description: string}> = {
      health: { 
        color: 'from-red-50 to-pink-50', 
        accent: 'red',
        title: 'Health & Medical Calculators - BMI, Calorie, Age Calculator',
        description: 'Free online health calculators including BMI calculator, calorie calculator, age calculator, body fat calculator. Professional medical calculation tools for health monitoring and fitness planning.'
      },
      financial: { 
        color: 'from-green-50 to-emerald-50', 
        accent: 'green',
        title: 'Financial Calculators - Loan EMI, Investment, Tax Calculator',
        description: 'Professional financial calculators including loan EMI calculator, compound interest calculator, investment calculator, tax calculator. Free online tools for financial planning and analysis.'
      },
      math: { 
        color: 'from-blue-50 to-indigo-50', 
        accent: 'blue',
        title: 'Math Calculators - Scientific, Percentage, Fraction Calculator',
        description: 'Advanced mathematical calculators including scientific calculator, percentage calculator, fraction calculator, statistics calculator. Free online math tools for students and professionals.'
      },
      conversion: { 
        color: 'from-purple-50 to-violet-50', 
        accent: 'purple',
        title: 'Unit Converters - Length, Temperature, Weight Converter',
        description: 'Professional unit conversion tools including length converter, temperature converter, weight converter, area converter. Free online conversion calculators for all measurement units.'
      },
      engineering: { 
        color: 'from-orange-50 to-amber-50', 
        accent: 'orange',
        title: 'Engineering Calculators - Electrical, Structural, Mechanical',
        description: 'Professional engineering calculators including Ohms law calculator, concrete calculator, beam calculator, electrical power calculator. Free engineering calculation tools.'
      },
      business: { 
        color: 'from-gray-50 to-slate-50', 
        accent: 'gray',
        title: 'Business Calculators - Profit, ROI, Break Even Calculator',
        description: 'Professional business calculators including profit margin calculator, ROI calculator, break even calculator, payroll calculator. Free online business calculation tools.'
      }
    };

    const info = categoryInfo[selectedCategory] || { 
      color: 'from-gray-50 to-white', 
      accent: 'blue',
      title: 'Professional Calculators',
      description: 'Free online calculation tools and converters'
    };

    return (
      <div className={`min-h-screen bg-gradient-to-b ${info.color} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO Optimized Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {info.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {info.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Free professional calculation tools • No registration required • Instant results
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedTool(tool.slug)}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {tool.description}
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  Keywords: {tool.keywords}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">Free Calculator</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Calculate Now →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Calculators
            </h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Our comprehensive collection of {selectedCategory} calculators provides accurate, instant results for all your calculation needs. 
                These professional-grade tools are designed for students, professionals, and anyone requiring precise calculations.
              </p>
              <p className="mb-4">
                All calculators are free to use, require no registration, and provide instant results. Each tool is optimized for accuracy 
                and ease of use, making complex calculations simple and accessible.
              </p>
              <p className="mb-4">
                Whether you're a student working on assignments, a professional making business decisions, or simply need quick calculations, 
                our {selectedCategory} calculators deliver the accuracy and reliability you need.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentView('home')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              ← Explore All Calculator Categories
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Homepage - Tools Data Only
  const renderHomepage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Hero Section - Enhanced Design */}
        <section className="relative pt-24 pb-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-8 shadow-lg">
                🎯 Most Trusted Calculator Platform • 10M+ Calculations Daily
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  1000+ Professional
                </span>
                <br />
                <span className="text-gray-800">Online Calculators</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-10 font-light">
                Free professional calculation tools for <span className="font-semibold text-blue-600">finance</span>, 
                <span className="font-semibold text-green-600"> health</span>, 
                <span className="font-semibold text-purple-600"> engineering</span>, and 
                <span className="font-semibold text-orange-600"> business</span>. 
                Instant results with detailed insights.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search calculators... (BMI, Loan EMI, Percentage, etc.)"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-lg"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Search
                  </button>
                </div>
              </div>

              {/* Popular Keywords */}
              <div className="text-lg text-gray-500 mb-12">
                <span className="font-medium">Popular:</span> 
                <span className="inline-flex flex-wrap gap-3 mt-2">
                  {['BMI Calculator', 'Loan EMI', 'Percentage', 'Currency Converter', 'Scientific Calculator', 'Age Calculator'].map((keyword, i) => (
                    <span key={i} className="px-4 py-2 bg-white/80 text-blue-600 rounded-lg font-medium hover:bg-blue-50 cursor-pointer transition-all shadow-sm">
                      {keyword}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {[
                { number: '1000+', label: 'Professional Calculators', icon: '🧮', color: 'from-blue-500 to-blue-600' },
                { number: '50+', label: 'Specialized Categories', icon: '📊', color: 'from-green-500 to-green-600' },
                { number: '10M+', label: 'Daily Calculations', icon: '⚡', color: 'from-purple-500 to-purple-600' },
                { number: '99.9%', label: 'Accuracy Rate', icon: '🎯', color: 'from-orange-500 to-orange-600' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid - Enhanced Design */}
        <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Calculator Categories
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
                Explore our comprehensive collection of specialized calculation tools designed by experts for professionals and students worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  id: 'financial',
                  name: 'Financial Calculators',
                  description: 'Professional financial planning tools optimized for Tier 1 countries with USD as default currency. Complete suite including loan EMI, investment, tax, mortgage, and SIP calculators',
                  icon: '💰',
                  gradient: 'from-green-400 via-green-500 to-emerald-600',
                  bgGradient: 'from-green-50 to-emerald-50',
                  tools: 'Loan EMI • Mortgage • Investment • SIP • Tax • Currency • Retirement • Credit Card • Refinance • Business Loan',
                  count: '20+',
                  features: ['USD default currency', 'Multi-country support', 'Tier 1 market focus', 'Instant calculations']
                },
                {
                  id: 'health',
                  name: 'Health & Medical Calculators',
                  description: 'Evidence-based health calculators including BMI, calorie, body fat, age, pregnancy, and heart rate for comprehensive health monitoring',
                  icon: '🏥',
                  gradient: 'from-red-400 via-red-500 to-pink-600',
                  bgGradient: 'from-red-50 to-pink-50',
                  tools: 'BMI • Calorie • Age • Body Fat • Pregnancy • Heart Rate • Water Intake • Ideal Weight',
                  count: '150+',
                  features: ['WHO standard calculations', 'Health risk assessments', 'Personalized recommendations', 'Medical-grade accuracy']
                },
                {
                  id: 'math',
                  name: 'Math & Statistics Calculators',
                  description: 'Advanced mathematical tools including scientific, percentage, fraction, statistics, and matrix calculators for academic and professional use',
                  icon: '📐',
                  gradient: 'from-blue-400 via-blue-500 to-indigo-600',
                  bgGradient: 'from-blue-50 to-indigo-50',
                  tools: 'Scientific • Percentage • Fraction • Statistics • Matrix • Square Root • GCD • LCM',
                  count: '180+',
                  features: ['Advanced functions', 'Step-by-step solutions', 'Graphing capabilities', 'Statistical analysis']
                },
                {
                  id: 'conversion',
                  name: 'Unit Conversion Tools',
                  description: 'Comprehensive measurement converters for length, weight, temperature, area, volume, and more with international standards',
                  icon: '🔄',
                  gradient: 'from-purple-400 via-purple-500 to-violet-600',
                  bgGradient: 'from-purple-50 to-violet-50',
                  tools: 'Length • Temperature • Weight • Area • Volume • Time • Speed • Pressure',
                  count: '120+',
                  features: ['International standards', 'Multiple unit systems', 'Real-time conversion', 'Historical rates']
                },
                {
                  id: 'engineering',
                  name: 'Engineering Calculators',
                  description: 'Professional engineering tools for electrical, structural, and mechanical calculations with industry-standard formulas',
                  icon: '⚙️',
                  gradient: 'from-orange-400 via-orange-500 to-amber-600',
                  bgGradient: 'from-orange-50 to-amber-50',
                  tools: 'Ohms Law • Electrical Power • Concrete • Beam • Wire Size • Heat Transfer • Transformer',
                  count: '200+',
                  features: ['Industry standards', 'Safety factors', 'Code compliance', 'Technical documentation']
                },
                {
                  id: 'business',
                  name: 'Business & Commerce Tools',
                  description: 'Essential business calculators for profit analysis, sales tax, payroll, discounts, and comprehensive business planning',
                  icon: '📊',
                  gradient: 'from-gray-400 via-gray-500 to-slate-600',
                  bgGradient: 'from-gray-50 to-slate-50',
                  tools: 'Profit Margin • Sales Tax • Payroll • Discount • Commission • Break Even • Markup',
                  count: '150+',
                  features: ['Business intelligence', 'Financial planning', 'ROI analysis', 'Tax calculations']
                }
              ].map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="group cursor-pointer relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  {/* Gradient Border */}
                  <div className={`h-1 bg-gradient-to-r ${category.gradient}`}></div>
                  
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-5`}></div>
                  
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`text-5xl p-4 bg-gradient-to-br ${category.bgGradient} rounded-2xl`}>
                        {category.icon}
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                          {category.count}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Tools</div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {category.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mr-2`}></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Popular Tools */}
                    <div className="text-xs text-gray-500 mb-6">
                      <strong className="text-gray-700">Popular Tools:</strong><br />
                      {category.tools}
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-semibold">Free & Professional</span>
                      </div>
                      <button className={`px-4 py-2 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105`}>
                        Explore Tools →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools Section - Enhanced */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-6">
                🔥 Trending Now
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Most Popular Calculators
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Top-rated calculation tools trusted by millions of professionals, students, and individuals worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  name: 'Loan EMI Calculator', 
                  slug: 'loan-calculator', 
                  category: 'financial', 
                  icon: '💰', 
                  desc: 'Calculate monthly loan payments with USD as default currency',
                  users: '3.2M+',
                  rating: '4.9',
                  gradient: 'from-green-400 to-emerald-500'
                },
                { 
                  name: 'Mortgage Calculator', 
                  slug: 'mortgage-calculator', 
                  category: 'financial', 
                  icon: '🏠', 
                  desc: 'Home loan calculator for US, Canada, UK, Australia markets',
                  users: '2.8M+',
                  rating: '4.8',
                  gradient: 'from-blue-400 to-indigo-500'
                },
                { 
                  name: 'Investment Calculator', 
                  slug: 'investment-calculator', 
                  category: 'financial', 
                  icon: '📈', 
                  desc: 'SIP and lump sum calculator with multi-currency support',
                  users: '2.5M+',
                  rating: '4.9',
                  gradient: 'from-purple-400 to-violet-500'
                },
                { 
                  name: 'Currency Converter', 
                  slug: 'currency-converter', 
                  category: 'financial', 
                  icon: '💱', 
                  desc: 'Convert between major world currencies with live rates',
                  users: '3.1M+',
                  rating: '4.7',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                { 
                  name: 'Tax Calculator', 
                  slug: 'tax-calculator', 
                  category: 'financial', 
                  icon: '🧾', 
                  desc: 'Multi-country income tax calculator for Tier 1 nations',
                  users: '1.9M+',
                  rating: '4.8',
                  gradient: 'from-red-400 to-pink-500'
                },
                { 
                  name: 'Retirement Calculator', 
                  slug: 'retirement-calculator', 
                  category: 'financial', 
                  icon: '🎯', 
                  desc: 'Plan retirement savings with inflation adjustment',
                  users: '1.7M+',
                  rating: '4.9',
                  gradient: 'from-indigo-400 to-purple-500'
                },
                { 
                  name: 'BMI Calculator', 
                  slug: 'bmi-calculator', 
                  category: 'health', 
                  icon: '🏥', 
                  desc: 'Body mass index calculator with WHO standards',
                  users: '2.3M+',
                  rating: '4.8',
                  gradient: 'from-teal-400 to-green-500'
                },
                { 
                  name: 'Scientific Calculator', 
                  slug: 'scientific-calculator', 
                  category: 'math', 
                  icon: '📐', 
                  desc: 'Advanced mathematical functions and calculations',
                  users: '4.1M+',
                  rating: '4.9',
                  gradient: 'from-cyan-400 to-blue-500'
                }
              ].map((tool) => (
                <div
                  key={tool.slug}
                  onClick={() => handleCategorySelect(tool.category, tool.slug)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  {/* Header with gradient */}
                  <div className={`h-32 bg-gradient-to-br ${tool.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative p-6 text-white">
                      <div className="text-4xl mb-2">{tool.icon}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">★ {tool.rating}</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{tool.users} users</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {tool.desc}
                    </p>
                    
                    {/* Features */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-blue-600 font-medium">Instant</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-purple-600 font-medium">Accurate</span>
                      </div>
                    </div>
                    
                    <button className={`w-full py-3 bg-gradient-to-r ${tool.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105`}>
                      Use Calculator Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-lg rounded-2xl px-8 py-6 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">10M+ calculations today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">99.9% uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Trusted by professionals</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCategorySelect={handleCategorySelect}
        currentCategory={selectedCategory}
      />
      
      {currentView === 'home' ? renderHomepage() : renderCategoryContent()}
      
      <Footer />
    </div>
  );
}
