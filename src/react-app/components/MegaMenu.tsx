import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calculator, TrendingUp, Heart, Ruler, Zap, Building, Star, Sparkles, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  onCategorySelect?: (category: string, tool?: string) => void;
}

export default function MegaMenu({ onCategorySelect }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Comprehensive tool database with 1000+ tools
  const menuItems = [
    {
      id: 'financial',
      label: 'Financial Tools',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-emerald-600',
      count: 200,
      categories: [
        {
          name: 'Loan & Credit',
          tools: [
            { name: 'Loan EMI Calculator', slug: 'loan-calculator', popular: true, description: 'Calculate monthly loan payments' },
            { name: 'Mortgage Calculator', slug: 'mortgage-calculator', popular: true, description: 'Home loan calculations' },
            { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', description: 'Personal loan EMI calculator' },
            { name: 'Car Loan Calculator', slug: 'car-loan-calculator', description: 'Auto loan payment calculator' },
            { name: 'Business Loan Calculator', slug: 'business-loan-calculator', description: 'Commercial loan calculator' },
            { name: 'Credit Card Calculator', slug: 'credit-card-calculator', description: 'Credit card payment calculator' },
            { name: 'Loan Comparison Calculator', slug: 'loan-comparison-calculator', description: 'Compare multiple loans' },
            { name: 'Refinance Calculator', slug: 'refinance-calculator', description: 'Refinancing savings calculator' },
            { name: 'Debt Consolidation Calculator', slug: 'debt-consolidation-calculator', description: 'Consolidate multiple debts' },
            { name: 'Student Loan Calculator', slug: 'student-loan-calculator', description: 'Education loan calculator' }
          ]
        },
        {
          name: 'Investment & Returns',
          tools: [
            { name: 'Investment Calculator', slug: 'investment-calculator', popular: true, description: 'Calculate investment returns' },
            { name: 'SIP Calculator', slug: 'sip-calculator', popular: true, description: 'Systematic investment plan' },
            { name: 'Compound Interest Calculator', slug: 'compound-interest', popular: true, description: 'Compound interest growth' },
            { name: 'FD Calculator', slug: 'fd-calculator', description: 'Fixed deposit calculator' },
            { name: 'RD Calculator', slug: 'rd-calculator', description: 'Recurring deposit calculator' },
            { name: 'Mutual Fund Calculator', slug: 'mutual-fund-calculator', description: 'Mutual fund returns' },
            { name: 'Stock Return Calculator', slug: 'stock-return-calculator', description: 'Stock investment returns' },
            { name: 'CAGR Calculator', slug: 'cagr-calculator', description: 'Compound annual growth rate' },
            { name: 'Portfolio Calculator', slug: 'portfolio-calculator', description: 'Investment portfolio analysis' },
            { name: 'Dividend Calculator', slug: 'dividend-calculator', description: 'Dividend yield calculator' }
          ]
        },
        {
          name: 'Tax & Planning',
          tools: [
            { name: 'Income Tax Calculator', slug: 'income-tax-calculator', description: 'Calculate income tax liability' },
            { name: 'TDS Calculator', slug: 'tds-calculator', description: 'Tax deducted at source' },
            { name: 'Capital Gains Calculator', slug: 'capital-gains-calculator', description: 'Capital gains tax calculator' },
            { name: 'GST Calculator', slug: 'gst-calculator', description: 'Goods and services tax' },
            { name: 'Retirement Calculator', slug: 'retirement-calculator', description: 'Retirement planning calculator' },
            { name: 'EPF Calculator', slug: 'epf-calculator', description: 'Employee provident fund' },
            { name: 'PPF Calculator', slug: 'ppf-calculator', description: 'Public provident fund' },
            { name: 'HRA Calculator', slug: 'hra-calculator', description: 'House rent allowance' },
            { name: 'Gratuity Calculator', slug: 'gratuity-calculator', description: 'Employee gratuity calculator' },
            { name: 'NPS Calculator', slug: 'nps-calculator', description: 'National pension scheme' }
          ]
        },
        {
          name: 'Currency & Trading',
          tools: [
            { name: 'Currency Converter', slug: 'currency-converter', popular: true, description: 'Live currency exchange rates' },
            { name: 'Crypto Calculator', slug: 'crypto-calculator', description: 'Cryptocurrency calculator' },
            { name: 'Forex Calculator', slug: 'forex-calculator', description: 'Foreign exchange calculator' },
            { name: 'Gold Rate Calculator', slug: 'gold-rate-calculator', description: 'Gold price calculator' },
            { name: 'Silver Rate Calculator', slug: 'silver-rate-calculator', description: 'Silver price calculator' },
            { name: 'Option Calculator', slug: 'option-calculator', description: 'Options trading calculator' },
            { name: 'Future Calculator', slug: 'future-calculator', description: 'Futures trading calculator' },
            { name: 'Margin Calculator', slug: 'margin-calculator', description: 'Trading margin calculator' },
            { name: 'Pip Calculator', slug: 'pip-calculator', description: 'Forex pip value calculator' },
            { name: 'Position Size Calculator', slug: 'position-size-calculator', description: 'Trading position calculator' }
          ]
        }
      ]
    },
    {
      id: 'health',
      label: 'Health & Medical',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      gradient: 'from-red-500 to-pink-600',
      count: 150,
      categories: [
        {
          name: 'Body Metrics',
          tools: [
            { name: 'BMI Calculator', slug: 'bmi-calculator', popular: true, description: 'Body mass index calculator' },
            { name: 'Body Fat Calculator', slug: 'body-fat-calculator', popular: true, description: 'Body fat percentage calculator' },
            { name: 'Ideal Weight Calculator', slug: 'ideal-weight-calculator', popular: true, description: 'Ideal body weight calculator' },
            { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Daily calorie needs calculator' },
            { name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Basal metabolic rate calculator' },
            { name: 'Body Surface Area Calculator', slug: 'body-surface-area', description: 'BSA calculator for medical dosing' },
            { name: 'Waist to Hip Ratio Calculator', slug: 'waist-hip-ratio-calculator', description: 'WHR health risk calculator' },
            { name: 'Body Frame Calculator', slug: 'body-frame-calculator', description: 'Body frame size calculator' },
            { name: 'Lean Body Mass Calculator', slug: 'lean-body-mass-calculator', description: 'LBM calculator' },
            { name: 'Body Adiposity Index Calculator', slug: 'body-adiposity-calculator', description: 'BAI calculator' }
          ]
        },
        {
          name: 'Nutrition & Diet',
          tools: [
            { name: 'Macro Calculator', slug: 'macro-calculator', description: 'Macronutrient calculator' },
            { name: 'Protein Calculator', slug: 'protein-calculator', description: 'Daily protein needs' },
            { name: 'Water Intake Calculator', slug: 'water-intake-calculator', description: 'Daily water requirement' },
            { name: 'Keto Calculator', slug: 'keto-calculator', description: 'Ketogenic diet calculator' },
            { name: 'TDEE Calculator', slug: 'tdee-calculator', description: 'Total daily energy expenditure' },
            { name: 'Weight Loss Calculator', slug: 'weight-loss-calculator', description: 'Weight loss timeline' },
            { name: 'Meal Calorie Calculator', slug: 'meal-calorie-calculator', description: 'Calculate meal calories' },
            { name: 'Intermittent Fasting Calculator', slug: 'intermittent-fasting-calculator', description: 'Fasting schedule calculator' },
            { name: 'Carb Calculator', slug: 'carb-calculator', description: 'Carbohydrate intake calculator' },
            { name: 'Fiber Calculator', slug: 'fiber-calculator', description: 'Daily fiber needs' }
          ]
        },
        {
          name: 'Medical & Clinical',
          tools: [
            { name: 'Dosage Calculator', slug: 'dosage-calculator', description: 'Medical dosage calculator' },
            { name: 'Blood Pressure Calculator', slug: 'blood-pressure-calculator', description: 'BP category calculator' },
            { name: 'Heart Rate Calculator', slug: 'heart-rate-calculator', description: 'Target heart rate zones' },
            { name: 'GFR Calculator', slug: 'gfr-calculator', description: 'Glomerular filtration rate' },
            { name: 'Creatinine Clearance Calculator', slug: 'creatinine-calculator', description: 'Kidney function calculator' },
            { name: 'IV Drip Rate Calculator', slug: 'iv-drip-calculator', description: 'IV fluid rate calculator' },
            { name: 'Pediatric Dosage Calculator', slug: 'pediatric-dosage-calculator', description: 'Child medication dosage' },
            { name: 'Insulin Calculator', slug: 'insulin-calculator', description: 'Insulin dosage calculator' },
            { name: 'Drug Half Life Calculator', slug: 'drug-half-life-calculator', description: 'Medication elimination calculator' },
            { name: 'Medical Unit Converter', slug: 'medical-unit-converter', description: 'Medical units conversion' }
          ]
        },
        {
          name: 'Life & Wellness',
          tools: [
            { name: 'Age Calculator', slug: 'age-calculator', popular: true, description: 'Exact age calculator' },
            { name: 'Pregnancy Calculator', slug: 'pregnancy-calculator', description: 'Due date calculator' },
            { name: 'Sleep Calculator', slug: 'sleep-calculator', description: 'Sleep cycle calculator' },
            { name: 'Period Calculator', slug: 'period-calculator', description: 'Menstrual cycle calculator' },
            { name: 'Ovulation Calculator', slug: 'ovulation-calculator', description: 'Fertility calculator' },
            { name: 'Baby Growth Calculator', slug: 'baby-growth-calculator', description: 'Infant growth percentiles' },
            { name: 'Life Expectancy Calculator', slug: 'life-expectancy-calculator', description: 'Life span calculator' },
            { name: 'Biological Age Calculator', slug: 'biological-age-calculator', description: 'Real age calculator' },
            { name: 'Stress Level Calculator', slug: 'stress-calculator', description: 'Stress assessment tool' },
            { name: 'Mental Health Calculator', slug: 'mental-health-calculator', description: 'Mental wellness assessment' }
          ]
        }
      ]
    },
    {
      id: 'math',
      label: 'Math & Statistics',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-indigo-600',
      count: 180,
      categories: [
        {
          name: 'Basic Mathematics',
          tools: [
            { name: 'Scientific Calculator', slug: 'scientific-calculator', popular: true, description: 'Advanced scientific calculator' },
            { name: 'Percentage Calculator', slug: 'percentage-calculator', popular: true, description: 'Percentage calculations' },
            { name: 'Fraction Calculator', slug: 'fraction-calculator', popular: true, description: 'Fraction arithmetic calculator' },
            { name: 'Decimal Calculator', slug: 'decimal-calculator', description: 'Decimal operations calculator' },
            { name: 'Ratio Calculator', slug: 'ratio-calculator', description: 'Ratio and proportion calculator' },
            { name: 'Square Root Calculator', slug: 'square-root-calculator', description: 'Square root and cube root' },
            { name: 'Exponent Calculator', slug: 'exponent-calculator', description: 'Power and exponent calculator' },
            { name: 'Logarithm Calculator', slug: 'logarithm-calculator', description: 'Log and natural log calculator' },
            { name: 'Absolute Value Calculator', slug: 'absolute-value-calculator', description: 'Absolute value calculator' },
            { name: 'Rounding Calculator', slug: 'rounding-calculator', description: 'Number rounding calculator' }
          ]
        },
        {
          name: 'Algebra & Equations',
          tools: [
            { name: 'Quadratic Equation Solver', slug: 'quadratic-equation', description: 'Solve quadratic equations' },
            { name: 'Linear Equation Solver', slug: 'linear-equation-solver', description: 'Solve linear equations' },
            { name: 'System of Equations Solver', slug: 'system-equations-solver', description: 'Multiple equation solver' },
            { name: 'Polynomial Calculator', slug: 'polynomial-calculator', description: 'Polynomial operations' },
            { name: 'Factoring Calculator', slug: 'factoring-calculator', description: 'Factor polynomials' },
            { name: 'Slope Calculator', slug: 'slope-calculator', description: 'Line slope calculator' },
            { name: 'Distance Formula Calculator', slug: 'distance-formula-calculator', description: 'Point distance calculator' },
            { name: 'Midpoint Calculator', slug: 'midpoint-calculator', description: 'Midpoint formula calculator' },
            { name: 'Function Calculator', slug: 'function-calculator', description: 'Function evaluation' },
            { name: 'Inequality Solver', slug: 'inequality-solver', description: 'Solve inequalities' }
          ]
        },
        {
          name: 'Geometry & Trigonometry',
          tools: [
            { name: 'Area Calculator', slug: 'area-calculator', description: 'Calculate area of shapes' },
            { name: 'Perimeter Calculator', slug: 'perimeter-calculator', description: 'Calculate perimeter' },
            { name: 'Volume Calculator', slug: 'volume-calculator', description: 'Calculate volume of 3D shapes' },
            { name: 'Triangle Calculator', slug: 'triangle-calculator', description: 'Triangle calculations' },
            { name: 'Circle Calculator', slug: 'circle-calculator', description: 'Circle area and circumference' },
            { name: 'Right Triangle Calculator', slug: 'right-triangle-calculator', description: 'Right triangle solver' },
            { name: 'Pythagorean Theorem Calculator', slug: 'pythagorean-calculator', description: 'Pythagorean theorem solver' },
            { name: 'Trigonometry Calculator', slug: 'trigonometry-calculator', description: 'Sin, cos, tan calculator' },
            { name: 'Law of Cosines Calculator', slug: 'law-cosines-calculator', description: 'Law of cosines solver' },
            { name: 'Law of Sines Calculator', slug: 'law-sines-calculator', description: 'Law of sines solver' }
          ]
        },
        {
          name: 'Statistics & Probability',
          tools: [
            { name: 'Statistics Calculator', slug: 'statistics-calculator', description: 'Statistical analysis' },
            { name: 'Standard Deviation Calculator', slug: 'standard-deviation-calculator', description: 'Standard deviation and variance' },
            { name: 'Mean Calculator', slug: 'mean-calculator', description: 'Average, median, mode calculator' },
            { name: 'Correlation Calculator', slug: 'correlation-calculator', description: 'Correlation coefficient' },
            { name: 'Regression Calculator', slug: 'regression-calculator', description: 'Linear regression analysis' },
            { name: 'Probability Calculator', slug: 'probability-calculator', description: 'Probability calculations' },
            { name: 'Combination Calculator', slug: 'combination-calculator', description: 'Combinations and permutations' },
            { name: 'Normal Distribution Calculator', slug: 'normal-distribution-calculator', description: 'Normal distribution calculator' },
            { name: 'Z Score Calculator', slug: 'z-score-calculator', description: 'Z-score calculator' },
            { name: 'Chi Square Calculator', slug: 'chi-square-calculator', description: 'Chi-square test calculator' }
          ]
        }
      ]
    },
    {
      id: 'conversion',
      label: 'Unit Converters',
      icon: Ruler,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-violet-600',
      count: 120,
      categories: [
        {
          name: 'Length & Distance',
          tools: [
            { name: 'Length Converter', slug: 'length-converter', popular: true, description: 'Convert length units' },
            { name: 'Distance Converter', slug: 'distance-converter', description: 'Distance unit converter' },
            { name: 'Height Converter', slug: 'height-converter', description: 'Height unit converter' },
            { name: 'Feet to Meters Converter', slug: 'feet-meters-converter', description: 'Feet to meters conversion' },
            { name: 'Inches to CM Converter', slug: 'inches-cm-converter', description: 'Inches to centimeters' },
            { name: 'Miles to KM Converter', slug: 'miles-km-converter', description: 'Miles to kilometers' },
            { name: 'Yard to Meter Converter', slug: 'yard-meter-converter', description: 'Yard to meter conversion' },
            { name: 'Nautical Mile Converter', slug: 'nautical-mile-converter', description: 'Nautical miles converter' },
            { name: 'Light Year Converter', slug: 'light-year-converter', description: 'Astronomical distance converter' },
            { name: 'Pixel to Inch Converter', slug: 'pixel-inch-converter', description: 'DPI and pixel converter' }
          ]
        },
        {
          name: 'Weight & Mass',
          tools: [
            { name: 'Weight Converter', slug: 'weight-converter', popular: true, description: 'Weight unit converter' },
            { name: 'Mass Converter', slug: 'mass-converter', description: 'Mass unit converter' },
            { name: 'KG to Pounds Converter', slug: 'kg-pounds-converter', description: 'Kilograms to pounds' },
            { name: 'Grams to Ounces Converter', slug: 'grams-ounces-converter', description: 'Grams to ounces' },
            { name: 'Stone to KG Converter', slug: 'stone-kg-converter', description: 'Stone to kilograms' },
            { name: 'Ton Converter', slug: 'ton-converter', description: 'Metric and imperial tons' },
            { name: 'Carat Converter', slug: 'carat-converter', description: 'Carat weight converter' },
            { name: 'Grain Converter', slug: 'grain-converter', description: 'Grain weight converter' },
            { name: 'Troy Ounce Converter', slug: 'troy-ounce-converter', description: 'Precious metal weight' },
            { name: 'Atomic Mass Converter', slug: 'atomic-mass-converter', description: 'Atomic mass units' }
          ]
        },
        {
          name: 'Temperature & Energy',
          tools: [
            { name: 'Temperature Converter', slug: 'temperature-converter', popular: true, description: 'Temperature unit converter' },
            { name: 'Celsius Fahrenheit Converter', slug: 'celsius-fahrenheit-converter', description: 'C to F conversion' },
            { name: 'Kelvin Converter', slug: 'kelvin-converter', description: 'Kelvin temperature converter' },
            { name: 'Energy Converter', slug: 'energy-converter', description: 'Energy unit converter' },
            { name: 'Power Converter', slug: 'power-converter', description: 'Power unit converter' },
            { name: 'Calorie Converter', slug: 'calorie-converter', description: 'Calorie energy converter' },
            { name: 'BTU Converter', slug: 'btu-converter', description: 'British thermal unit converter' },
            { name: 'Joule Converter', slug: 'joule-converter', description: 'Joule energy converter' },
            { name: 'Watt Hour Converter', slug: 'watt-hour-converter', description: 'Electrical energy converter' },
            { name: 'Horsepower Converter', slug: 'horsepower-converter', description: 'Power rating converter' }
          ]
        },
        {
          name: 'Time & Digital',
          tools: [
            { name: 'Time Converter', slug: 'time-converter', description: 'Time unit converter' },
            { name: 'Time Zone Converter', slug: 'time-zone-converter', description: 'World time zones' },
            { name: 'Date Calculator', slug: 'date-calculator', description: 'Date difference calculator' },
            { name: 'Digital Storage Converter', slug: 'digital-storage-converter', description: 'File size converter' },
            { name: 'Data Transfer Rate Converter', slug: 'data-transfer-converter', description: 'Internet speed converter' },
            { name: 'Binary Converter', slug: 'binary-converter', description: 'Number system converter' },
            { name: 'Hexadecimal Converter', slug: 'hexadecimal-converter', description: 'Hex number converter' },
            { name: 'RGB to HEX Converter', slug: 'rgb-hex-converter', description: 'Color code converter' },
            { name: 'ASCII Converter', slug: 'ascii-converter', description: 'ASCII character converter' },
            { name: 'Unicode Converter', slug: 'unicode-converter', description: 'Unicode character converter' }
          ]
        }
      ]
    },
    {
      id: 'engineering',
      label: 'Engineering Tools',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-red-600',
      count: 200,
      categories: [
        {
          name: 'Electrical Engineering',
          tools: [
            { name: 'Ohm\'s Law Calculator', slug: 'ohms-law-calculator', popular: true, description: 'Voltage, current, resistance' },
            { name: 'Electrical Power Calculator', slug: 'electrical-power-calculator', popular: true, description: 'Electrical power calculations' },
            { name: 'Wire Size Calculator', slug: 'wire-size-calculator', description: 'Wire gauge calculator' },
            { name: 'Voltage Drop Calculator', slug: 'voltage-drop-calculator', description: 'Voltage drop in wires' },
            { name: 'Capacitor Calculator', slug: 'capacitor-calculator', description: 'Capacitance calculations' },
            { name: 'Inductor Calculator', slug: 'inductor-calculator', description: 'Inductance calculations' },
            { name: 'Transformer Calculator', slug: 'transformer-calculator', description: 'Transformer design calculator' },
            { name: 'Resistor Color Code Calculator', slug: 'resistor-color-calculator', description: 'Resistor value calculator' },
            { name: 'LED Calculator', slug: 'led-calculator', description: 'LED resistor calculator' },
            { name: 'Battery Life Calculator', slug: 'battery-life-calculator', description: 'Battery runtime calculator' }
          ]
        },
        {
          name: 'Mechanical Engineering',
          tools: [
            { name: 'Torque Calculator', slug: 'torque-calculator', description: 'Torque and force calculator' },
            { name: 'Gear Ratio Calculator', slug: 'gear-ratio-calculator', description: 'Gear ratio calculator' },
            { name: 'Belt Length Calculator', slug: 'belt-length-calculator', description: 'Belt and pulley calculator' },
            { name: 'Spring Calculator', slug: 'spring-calculator', description: 'Spring design calculator' },
            { name: 'Bearing Calculator', slug: 'bearing-calculator', description: 'Bearing load calculator' },
            { name: 'Shaft Calculator', slug: 'shaft-calculator', description: 'Shaft design calculator' },
            { name: 'Pressure Vessel Calculator', slug: 'pressure-vessel-calculator', description: 'Pressure vessel design' },
            { name: 'Heat Exchanger Calculator', slug: 'heat-exchanger-calculator', description: 'Heat transfer calculator' },
            { name: 'Pump Calculator', slug: 'pump-calculator', description: 'Pump sizing calculator' },
            { name: 'Fluid Flow Calculator', slug: 'fluid-flow-calculator', description: 'Fluid dynamics calculator' }
          ]
        },
        {
          name: 'Civil Engineering',
          tools: [
            { name: 'Concrete Calculator', slug: 'concrete-calculator', popular: true, description: 'Concrete volume calculator' },
            { name: 'Beam Calculator', slug: 'beam-calculator', description: 'Structural beam calculator' },
            { name: 'Footing Calculator', slug: 'footing-calculator', description: 'Foundation design calculator' },
            { name: 'Rebar Calculator', slug: 'rebar-calculator', description: 'Reinforcement steel calculator' },
            { name: 'Soil Bearing Calculator', slug: 'soil-bearing-calculator', description: 'Soil capacity calculator' },
            { name: 'Road Design Calculator', slug: 'road-design-calculator', description: 'Highway design calculator' },
            { name: 'Retaining Wall Calculator', slug: 'retaining-wall-calculator', description: 'Wall design calculator' },
            { name: 'Bridge Calculator', slug: 'bridge-calculator', description: 'Bridge design calculator' },
            { name: 'Earthquake Load Calculator', slug: 'earthquake-calculator', description: 'Seismic load calculator' },
            { name: 'Wind Load Calculator', slug: 'wind-load-calculator', description: 'Wind pressure calculator' }
          ]
        },
        {
          name: 'Specialized Engineering',
          tools: [
            { name: 'Antenna Calculator', slug: 'antenna-calculator', description: 'Antenna design calculator' },
            { name: 'PCB Trace Calculator', slug: 'pcb-trace-calculator', description: 'PCB trace width calculator' },
            { name: 'Filter Calculator', slug: 'filter-calculator', description: 'Electronic filter calculator' },
            { name: 'Heat Sink Calculator', slug: 'heat-sink-calculator', description: 'Thermal management calculator' },
            { name: 'Solar Panel Calculator', slug: 'solar-panel-calculator', description: 'Solar system calculator' },
            { name: 'Wind Turbine Calculator', slug: 'wind-turbine-calculator', description: 'Wind energy calculator' },
            { name: 'Pipe Size Calculator', slug: 'pipe-size-calculator', description: 'Pipe sizing calculator' },
            { name: 'HVAC Calculator', slug: 'hvac-calculator', description: 'Heating and cooling calculator' },
            { name: 'Insulation Calculator', slug: 'insulation-calculator', description: 'Thermal insulation calculator' },
            { name: 'Noise Calculator', slug: 'noise-calculator', description: 'Sound level calculator' }
          ]
        }
      ]
    },
    {
      id: 'business',
      label: 'Business Tools',
      icon: Building,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      gradient: 'from-gray-500 to-slate-600',
      count: 150,
      categories: [
        {
          name: 'Financial Analysis',
          tools: [
            { name: 'Profit Margin Calculator', slug: 'profit-margin-calculator', popular: true, description: 'Calculate profit margins' },
            { name: 'ROI Calculator', slug: 'roi-calculator', popular: true, description: 'Return on investment' },
            { name: 'Break Even Calculator', slug: 'break-even-calculator', popular: true, description: 'Break-even analysis' },
            { name: 'Cash Flow Calculator', slug: 'cash-flow-calculator', description: 'Cash flow analysis' },
            { name: 'NPV Calculator', slug: 'npv-calculator', description: 'Net present value' },
            { name: 'IRR Calculator', slug: 'irr-calculator', description: 'Internal rate of return' },
            { name: 'Payback Period Calculator', slug: 'payback-period-calculator', description: 'Investment payback time' },
            { name: 'WACC Calculator', slug: 'wacc-calculator', description: 'Weighted average cost of capital' },
            { name: 'Working Capital Calculator', slug: 'working-capital-calculator', description: 'Working capital analysis' },
            { name: 'Valuation Calculator', slug: 'valuation-calculator', description: 'Business valuation' }
          ]
        },
        {
          name: 'Pricing & Sales',
          tools: [
            { name: 'Markup Calculator', slug: 'markup-calculator', description: 'Price markup calculator' },
            { name: 'Discount Calculator', slug: 'discount-calculator', description: 'Discount and sale calculator' },
            { name: 'Sales Tax Calculator', slug: 'sales-tax-calculator', description: 'Sales tax calculator' },
            { name: 'Commission Calculator', slug: 'commission-calculator', description: 'Sales commission calculator' },
            { name: 'Tip Calculator', slug: 'tip-calculator', description: 'Tip and gratuity calculator' },
            { name: 'Price Comparison Calculator', slug: 'price-comparison-calculator', description: 'Compare prices' },
            { name: 'Bulk Pricing Calculator', slug: 'bulk-pricing-calculator', description: 'Volume discount calculator' },
            { name: 'Cost Per Unit Calculator', slug: 'cost-per-unit-calculator', description: 'Unit cost calculator' },
            { name: 'Revenue Calculator', slug: 'revenue-calculator', description: 'Revenue projections' },
            { name: 'Conversion Rate Calculator', slug: 'conversion-rate-calculator', description: 'Sales conversion metrics' }
          ]
        },
        {
          name: 'HR & Payroll',
          tools: [
            { name: 'Payroll Calculator', slug: 'payroll-calculator', description: 'Employee payroll calculator' },
            { name: 'Overtime Calculator', slug: 'overtime-calculator', description: 'Overtime pay calculator' },
            { name: 'Salary Calculator', slug: 'salary-calculator', description: 'Salary conversion calculator' },
            { name: 'Hourly Rate Calculator', slug: 'hourly-rate-calculator', description: 'Hourly wage calculator' },
            { name: 'Benefits Calculator', slug: 'benefits-calculator', description: 'Employee benefits calculator' },
            { name: 'Vacation Calculator', slug: 'vacation-calculator', description: 'Vacation accrual calculator' },
            { name: 'Sick Leave Calculator', slug: 'sick-leave-calculator', description: 'Sick time calculator' },
            { name: 'Performance Bonus Calculator', slug: 'performance-bonus-calculator', description: 'Bonus calculation' },
            { name: 'Retirement Contribution Calculator', slug: 'retirement-contribution-calculator', description: '401k contribution calculator' },
            { name: 'Stock Option Calculator', slug: 'stock-option-calculator', description: 'Employee stock options' }
          ]
        },
        {
          name: 'Marketing & Analytics',
          tools: [
            { name: 'CPM Calculator', slug: 'cpm-calculator', description: 'Cost per thousand impressions' },
            { name: 'CPC Calculator', slug: 'cpc-calculator', description: 'Cost per click calculator' },
            { name: 'ROAS Calculator', slug: 'roas-calculator', description: 'Return on ad spend' },
            { name: 'Customer Lifetime Value Calculator', slug: 'clv-calculator', description: 'CLV calculator' },
            { name: 'Churn Rate Calculator', slug: 'churn-rate-calculator', description: 'Customer churn calculator' },
            { name: 'A/B Test Calculator', slug: 'ab-test-calculator', description: 'A/B test significance' },
            { name: 'Email Open Rate Calculator', slug: 'email-open-rate-calculator', description: 'Email marketing metrics' },
            { name: 'Social Media ROI Calculator', slug: 'social-media-roi-calculator', description: 'Social media returns' },
            { name: 'Lead Conversion Calculator', slug: 'lead-conversion-calculator', description: 'Lead conversion metrics' },
            { name: 'Market Share Calculator', slug: 'market-share-calculator', description: 'Market analysis calculator' }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          setHoverTimer(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  const handleMenuEnter = (menuId: string) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
    setHoverTimer(timer);
  };

  const handleDropdownEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleDropdownLeave = () => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
    setHoverTimer(timer);
  };

  const handleToolClick = (category: string, tool: string) => {
    onCategorySelect?.(category, tool);
    setActiveMenu(null);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Menu Items */}
      <nav className="hidden lg:flex items-center space-x-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleMenuEnter(item.id)}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                activeMenu === item.id 
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105` 
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeMenu === item.id ? 'text-white' : item.color}`} />
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center space-x-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeMenu === item.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.count}+
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>
        ))}
      </nav>

      {/* Enhanced Mega Menu Dropdown */}
      {activeMenu && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-100 rounded-3xl shadow-2xl mt-2 z-[9999] backdrop-blur-xl"
          style={{ 
            top: '5rem',
            width: '1400px',
            maxWidth: '95vw',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {menuItems
            .filter(item => item.id === activeMenu)
            .map((activeItem) => (
              <div key={activeItem.id} className="p-8">
                {/* Enhanced Menu Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl">
                  <div className={`bg-gradient-to-r ${activeItem.gradient} p-8 text-white relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                          <activeItem.icon className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-4xl font-black mb-2">{activeItem.label}</h3>
                          <p className="text-xl text-white/90 mb-3">{activeItem.count}+ professional calculation tools</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4" />
                              <span className="text-sm font-semibold">Trusted by millions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-4 h-4" />
                              <span className="text-sm font-semibold">Instant results</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-6xl font-black text-white/20 mb-2">{activeItem.count}+</div>
                        <div className="text-sm text-white/80">Professional Tools</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tool Categories */}
                <div className="space-y-8">
                  {activeItem.categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeItem.gradient}`}></div>
                        <h4 className="text-xl font-bold text-gray-900">{category.name}</h4>
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-500 font-medium">{category.tools.length} tools</span>
                      </div>

                      {/* Popular Tools First */}
                      {category.tools.some(tool => tool.popular) && (
                        <div className="mb-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Most Popular</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {category.tools
                              .filter(tool => tool.popular)
                              .map((tool, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleToolClick(activeItem.id, tool.slug)}
                                  className="group text-left p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <h5 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 leading-tight">
                                      {tool.name}
                                    </h5>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
                                  </div>
                                  <p className="text-sm text-gray-600 group-hover:text-blue-600 mb-4">
                                    {tool.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      <span className="text-xs text-green-600 font-medium">Free & Instant</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      <span className="text-xs text-yellow-600 font-bold">Popular</span>
                                    </div>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* All Tools Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {category.tools
                          .filter(tool => !tool.popular)
                          .map((tool, index) => (
                            <button
                              key={index}
                              onClick={() => handleToolClick(activeItem.id, tool.slug)}
                              className="group text-left px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm"
                            >
                              <div className="font-medium group-hover:font-semibold transition-all">
                                {tool.name}
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced View All Button */}
                <div className="pt-8 border-t border-gray-200 mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">Explore All {activeItem.label}</h4>
                      <p className="text-sm text-gray-600">Access our complete collection of {activeItem.count}+ professional tools</p>
                    </div>
                    <button
                      onClick={() => handleToolClick(activeItem.id, '')}
                      className={`group inline-flex items-center px-8 py-4 bg-gradient-to-r ${activeItem.gradient} text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                    >
                      <span>View All {activeItem.count}+ Tools</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
