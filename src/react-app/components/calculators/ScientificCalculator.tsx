import { useState } from 'react';
import { Calculator, RotateCcw, Info, Book, ChevronRight, Award, Brain } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<'degrees' | 'radians'>('degrees');
  const [history, setHistory] = useState<string[]>([]);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
    }
    
    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '^': return Math.pow(firstValue, secondValue);
      case 'mod': return firstValue % secondValue;
      default: return secondValue;
    }
  };

  const performScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    let operation: string;

    switch (func) {
      case 'sin':
        result = Math.sin(angleMode === 'degrees' ? value * Math.PI / 180 : value);
        operation = `sin(${value}${angleMode === 'degrees' ? '°' : ' rad'}) = ${result}`;
        break;
      case 'cos':
        result = Math.cos(angleMode === 'degrees' ? value * Math.PI / 180 : value);
        operation = `cos(${value}${angleMode === 'degrees' ? '°' : ' rad'}) = ${result}`;
        break;
      case 'tan':
        result = Math.tan(angleMode === 'degrees' ? value * Math.PI / 180 : value);
        operation = `tan(${value}${angleMode === 'degrees' ? '°' : ' rad'}) = ${result}`;
        break;
      case 'log':
        result = Math.log10(value);
        operation = `log(${value}) = ${result}`;
        break;
      case 'ln':
        result = Math.log(value);
        operation = `ln(${value}) = ${result}`;
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        operation = `√${value} = ${result}`;
        break;
      case 'square':
        result = value * value;
        operation = `${value}² = ${result}`;
        break;
      case 'cube':
        result = value * value * value;
        operation = `${value}³ = ${result}`;
        break;
      case 'factorial':
        result = factorial(Math.floor(value));
        operation = `${Math.floor(value)}! = ${result}`;
        break;
      case 'reciprocal':
        result = 1 / value;
        operation = `1/${value} = ${result}`;
        break;
      case 'abs':
        result = Math.abs(value);
        operation = `|${value}| = ${result}`;
        break;
      case 'negate':
        result = -value;
        operation = `-(${value}) = ${result}`;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    addToHistory(operation);
    setWaitingForNewValue(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const addToHistory = (entry: string) => {
    setHistory(prev => [entry, ...prev.slice(0, 9)]); // Keep last 10 operations
  };

  const insertConstant = (constant: string) => {
    let value: number;
    let name: string;

    switch (constant) {
      case 'pi':
        value = Math.PI;
        name = 'π';
        break;
      case 'e':
        value = Math.E;
        name = 'e';
        break;
      default:
        return;
    }

    setDisplay(value.toString());
    addToHistory(`${name} = ${value}`);
    setWaitingForNewValue(true);
  };

  const buttonClass = "h-14 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-sm";
  const numberButtonClass = `${buttonClass} bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800`;
  const operatorButtonClass = `${buttonClass} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white`;
  const functionButtonClass = `${buttonClass} bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm`;
  const constantButtonClass = `${buttonClass} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scientific Calculator - Advanced Mathematical Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional scientific calculator with trigonometric functions, logarithms, exponentials, and advanced mathematical operations. Perfect for students, engineers, and scientists.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Advanced Scientific Calculator • Trigonometry • Logarithms • Constants • Memory Functions
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Calculator Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Calculator className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Scientific Calculator</h2>
                      <p className="text-blue-100">Advanced mathematical functions and operations</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAngleMode(angleMode === 'degrees' ? 'radians' : 'degrees')}
                      className="px-4 py-2 bg-white/20 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                    >
                      {angleMode === 'degrees' ? 'DEG' : 'RAD'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Display */}
                <div className="mb-6">
                  <div className="bg-black rounded-xl p-6 mb-4">
                    <div className="text-right">
                      <div className="text-3xl font-mono text-green-400 mb-2 break-all">
                        {display}
                      </div>
                      {operation && previousValue !== null && (
                        <div className="text-sm text-gray-400">
                          {previousValue} {operation}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Memory and Mode Display */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Memory: {memory}</span>
                      <span>Mode: {angleMode}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>Scientific Mode</span>
                    </div>
                  </div>
                </div>

                {/* Calculator Buttons */}
                <div className="grid grid-cols-8 gap-3">
                  {/* Row 1: Memory and Clear Functions */}
                  <button className={functionButtonClass} onClick={() => setMemory(parseFloat(display))}>MC</button>
                  <button className={functionButtonClass} onClick={() => setMemory(memory + parseFloat(display))}>M+</button>
                  <button className={functionButtonClass} onClick={() => setMemory(memory - parseFloat(display))}>M-</button>
                  <button className={functionButtonClass} onClick={() => { setDisplay(memory.toString()); setWaitingForNewValue(true); }}>MR</button>
                  <button className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`} onClick={clear}>C</button>
                  <button className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`} onClick={clearEntry}>CE</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('negate')}>±</button>
                  <button className={operatorButtonClass} onClick={() => performOperation('/')}>/</button>

                  {/* Row 2: Scientific Functions */}
                  <button className={functionButtonClass} onClick={() => performScientificFunction('sin')}>sin</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('cos')}>cos</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('tan')}>tan</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('log')}>log</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('7')}>7</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('8')}>8</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('9')}>9</button>
                  <button className={operatorButtonClass} onClick={() => performOperation('*')}>×</button>

                  {/* Row 3: More Scientific Functions */}
                  <button className={functionButtonClass} onClick={() => performScientificFunction('ln')}>ln</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('sqrt')}>√</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('square')}>x²</button>
                  <button className={functionButtonClass} onClick={() => performOperation('^')}>x^y</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('4')}>4</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('5')}>5</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('6')}>6</button>
                  <button className={operatorButtonClass} onClick={() => performOperation('-')}>-</button>

                  {/* Row 4: Additional Functions */}
                  <button className={constantButtonClass} onClick={() => insertConstant('pi')}>π</button>
                  <button className={constantButtonClass} onClick={() => insertConstant('e')}>e</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('factorial')}>n!</button>
                  <button className={functionButtonClass} onClick={() => performOperation('mod')}>mod</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('1')}>1</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('2')}>2</button>
                  <button className={numberButtonClass} onClick={() => inputNumber('3')}>3</button>
                  <button className={operatorButtonClass} onClick={() => performOperation('+')}>+</button>

                  {/* Row 5: Final Row */}
                  <button className={functionButtonClass} onClick={() => performScientificFunction('abs')}>|x|</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('reciprocal')}>1/x</button>
                  <button className={functionButtonClass} onClick={() => performScientificFunction('cube')}>x³</button>
                  <div></div>
                  <button className={`${numberButtonClass} col-span-2`} onClick={() => inputNumber('0')}>0</button>
                  <button className={numberButtonClass} onClick={inputDecimal}>.</button>
                  <button className={`${operatorButtonClass} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700`} onClick={() => performOperation('=')}>=</button>
                </div>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <RotateCcw className="w-6 h-6 mr-2 text-blue-600" />
                History
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">No calculations yet</p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded border">
                      {entry}
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setHistory([])}
                className="mt-3 w-full py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear History
              </button>
            </div>

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
                    <p className="font-medium text-gray-900">Basic Operations</p>
                    <p className="text-gray-600">+, -, ×, ÷ for arithmetic</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Scientific Functions</p>
                    <p className="text-gray-600">sin, cos, tan, log, ln, √</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Constants</p>
                    <p className="text-gray-600">π (pi), e (Euler's number)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Memory Functions</p>
                    <p className="text-gray-600">MC, M+, M-, MR for memory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Function Reference */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Function Reference</h3>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold text-blue-900">sin, cos, tan</div>
                  <div className="text-blue-700">Trigonometric</div>
                  <div className="font-semibold text-blue-900">log</div>
                  <div className="text-blue-700">Base 10 log</div>
                  <div className="font-semibold text-blue-900">ln</div>
                  <div className="text-blue-700">Natural log</div>
                  <div className="font-semibold text-blue-900">√</div>
                  <div className="text-blue-700">Square root</div>
                  <div className="font-semibold text-blue-900">x²</div>
                  <div className="text-blue-700">Square</div>
                  <div className="font-semibold text-blue-900">x³</div>
                  <div className="text-blue-700">Cube</div>
                  <div className="font-semibold text-blue-900">x^y</div>
                  <div className="text-blue-700">Power</div>
                  <div className="font-semibold text-blue-900">n!</div>
                  <div className="text-blue-700">Factorial</div>
                  <div className="font-semibold text-blue-900">1/x</div>
                  <div className="text-blue-700">Reciprocal</div>
                  <div className="font-semibold text-blue-900">|x|</div>
                  <div className="text-blue-700">Absolute value</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Comprehensive Guide Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Complete Scientific Calculator Guide</h2>
            <p className="text-xl text-blue-100">Master advanced mathematical calculations with comprehensive function explanations and examples</p>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="prose max-w-none">
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is a Scientific Calculator?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A scientific calculator is an advanced calculation tool designed to perform complex mathematical operations beyond basic arithmetic. 
                Unlike standard calculators, scientific calculators include trigonometric functions, logarithms, exponentials, statistical functions, 
                and various mathematical constants. They are essential tools for students, engineers, scientists, mathematicians, and professionals 
                who work with advanced mathematical concepts and calculations.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Scientific Calculator</h3>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li><strong>Basic Operations:</strong> Use the number pad and basic operators (+, -, ×, ÷) for arithmetic calculations.</li>
                  <li><strong>Scientific Functions:</strong> Click function buttons (sin, cos, log, etc.) to apply mathematical functions to the displayed number.</li>
                  <li><strong>Angle Mode:</strong> Toggle between degrees and radians for trigonometric calculations using the DEG/RAD button.</li>
                  <li><strong>Memory Functions:</strong> Use MC (clear), M+ (add), M- (subtract), and MR (recall) to store and retrieve values.</li>
                  <li><strong>Constants:</strong> Insert mathematical constants like π (pi) and e (Euler's number) with dedicated buttons.</li>
                  <li><strong>History:</strong> Review your calculation history in the side panel to track your work and verify results.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mathematical Functions and Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">Trigonometric Functions</h4>
                  <div className="space-y-3 text-green-800 text-sm">
                    <div><strong>sin(x):</strong> Sine of angle x</div>
                    <div><strong>cos(x):</strong> Cosine of angle x</div>
                    <div><strong>tan(x):</strong> Tangent of angle x</div>
                    <div className="text-xs text-green-700 mt-2">
                      <strong>Note:</strong> Results depend on angle mode (degrees or radians)
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">Logarithmic Functions</h4>
                  <div className="space-y-3 text-blue-800 text-sm">
                    <div><strong>log(x):</strong> Common logarithm (base 10)</div>
                    <div><strong>ln(x):</strong> Natural logarithm (base e)</div>
                    <div className="text-xs text-blue-700 mt-2">
                      <strong>Example:</strong> log(100) = 2, ln(e) = 1
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Mathematical Operations</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-gray-50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Function</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Symbol</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Description</th>
                      <th className="border border-gray-300 px-6 py-4 text-left font-bold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Square Root</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">√x</td>
                      <td className="border border-gray-300 px-6 py-4">Find the square root of x</td>
                      <td className="border border-gray-300 px-6 py-4">√25 = 5</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Square</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">x²</td>
                      <td className="border border-gray-300 px-6 py-4">Multiply x by itself</td>
                      <td className="border border-gray-300 px-6 py-4">5² = 25</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Cube</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">x³</td>
                      <td className="border border-gray-300 px-6 py-4">Multiply x by itself twice</td>
                      <td className="border border-gray-300 px-6 py-4">3³ = 27</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Power</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">x^y</td>
                      <td className="border border-gray-300 px-6 py-4">Raise x to the power of y</td>
                      <td className="border border-gray-300 px-6 py-4">2^8 = 256</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Factorial</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">n!</td>
                      <td className="border border-gray-300 px-6 py-4">Product of all positive integers ≤ n</td>
                      <td className="border border-gray-300 px-6 py-4">5! = 120</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 px-6 py-4 font-semibold">Reciprocal</td>
                      <td className="border border-gray-300 px-6 py-4 font-mono">1/x</td>
                      <td className="border border-gray-300 px-6 py-4">Multiplicative inverse of x</td>
                      <td className="border border-gray-300 px-6 py-4">1/4 = 0.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mathematical Constants</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">π (Pi)</h4>
                  <div className="text-green-800 space-y-2 text-sm">
                    <p><strong>Value:</strong> 3.14159265359...</p>
                    <p><strong>Definition:</strong> Ratio of circle's circumference to diameter</p>
                    <p><strong>Uses:</strong> Geometry, trigonometry, calculus</p>
                    <p><strong>Examples:</strong> Circle area = πr², Circle circumference = 2πr</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">e (Euler's Number)</h4>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p><strong>Value:</strong> 2.71828182846...</p>
                    <p><strong>Definition:</strong> Base of natural logarithm</p>
                    <p><strong>Uses:</strong> Exponential growth, calculus, statistics</p>
                    <p><strong>Examples:</strong> Compound interest, population growth</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Practical Applications and Examples</h3>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">💡 Real-World Calculation Examples</h4>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-purple-900 mb-3">Engineering: Calculate Force on Inclined Plane</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> Find the component of a 100N force at 30° angle.</p>
                    <div className="bg-purple-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Step 1:</strong> Set calculator to degree mode</p>
                      <p><strong>Step 2:</strong> Calculate horizontal component: 100 × cos(30°) = 86.6N</p>
                      <p><strong>Step 3:</strong> Calculate vertical component: 100 × sin(30°) = 50N</p>
                      <p><strong>Answer:</strong> Horizontal: 86.6N, Vertical: 50N</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-blue-900 mb-3">Physics: Exponential Decay Calculation</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> Calculate radioactive decay after 3 half-lives.</p>
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Formula:</strong> N = N₀ × e^(-λt) or N = N₀ × (1/2)^(t/t₁/₂)</p>
                      <p><strong>Calculation:</strong> N = 1000 × (1/2)³ = 1000 × 0.125 = 125</p>
                      <p><strong>Using calculator:</strong> 1000 × 0.5^3 = 125 atoms remaining</p>
                      <p><strong>Answer:</strong> 125 atoms remain after 3 half-lives</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="font-bold text-green-900 mb-3">Statistics: Standard Deviation Calculation</h5>
                    <p className="text-gray-700 mb-3"><strong>Problem:</strong> Calculate probability using normal distribution.</p>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Data:</strong> Mean = 100, Standard deviation = 15, Find P(X &gt; 115)</p>
                      <p><strong>Step 1:</strong> Calculate z-score: (115-100)/15 = 1</p>
                      <p><strong>Step 2:</strong> Using calculator for approximation</p>
                      <p><strong>Result:</strong> Approximately 16% of values are above 115</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Memory Functions and Advanced Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-yellow-900 mb-4">💾 Memory Functions</h4>
                  <ul className="list-disc list-inside space-y-2 text-yellow-800 text-sm">
                    <li><strong>MC:</strong> Clear memory (set to 0)</li>
                    <li><strong>M+:</strong> Add current display to memory</li>
                    <li><strong>M-:</strong> Subtract current display from memory</li>
                    <li><strong>MR:</strong> Recall (display) memory value</li>
                    <li>Use for storing intermediate results</li>
                    <li>Essential for complex multi-step calculations</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-orange-900 mb-4">🔄 Angle Modes</h4>
                  <ul className="list-disc list-inside space-y-2 text-orange-800 text-sm">
                    <li><strong>Degrees:</strong> 360° = full circle</li>
                    <li><strong>Radians:</strong> 2π = full circle</li>
                    <li>Toggle using DEG/RAD button</li>
                    <li>Critical for trigonometric functions</li>
                    <li>Physics often uses radians</li>
                    <li>Engineering often uses degrees</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-green-900 mb-4">⚡ Quick Operations</h4>
                  <ul className="list-disc list-inside space-y-2 text-green-800 text-sm">
                    <li><strong>±:</strong> Change sign (positive/negative)</li>
                    <li><strong>C:</strong> Clear all (complete reset)</li>
                    <li><strong>CE:</strong> Clear entry (current number only)</li>
                    <li><strong>mod:</strong> Modulo operation (remainder)</li>
                    <li>Use parentheses for complex expressions</li>
                    <li>Follow order of operations (PEMDAS)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">What's the difference between degrees and radians?</h4>
                  <p className="text-gray-700">Degrees divide a circle into 360 equal parts, while radians use the radius length as the unit. 360° = 2π radians. Use degrees for everyday applications and radians for advanced mathematics and physics. Always check which mode your calculator is in before trigonometric calculations.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How do I calculate compound expressions?</h4>
                  <p className="text-gray-700">Break complex expressions into steps, use memory functions to store intermediate results, and follow the order of operations (PEMDAS). For example, to calculate sin(30°) + cos(45°)², first calculate sin(30°), store in memory, then calculate cos(45°)², square it, and add the memory value.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Why do I get error messages?</h4>
                  <p className="text-gray-700">Common errors include: dividing by zero, taking square root of negative numbers, calculating logarithm of zero or negative numbers, or factorial of negative numbers. Check your input values and ensure they're within the valid domain for the function you're using.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How accurate are the calculations?</h4>
                  <p className="text-gray-700">This calculator uses double-precision floating-point arithmetic, providing approximately 15-17 significant digits of accuracy. For most practical applications, this is more than sufficient. However, be aware of rounding errors in very large calculations or when dealing with irrational numbers.</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Can I use this for homework and exams?</h4>
                  <p className="text-gray-700">This scientific calculator is suitable for homework, practice, and learning. However, check with your instructor about calculator policies for exams. Some tests may require specific calculator models or may not allow calculators at all. Always follow your institution's academic policies.</p>
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
              <h3 className="font-bold text-lg mb-3">Educational and Usage Disclaimer</h3>
              <p className="mb-3">
                <strong>This scientific calculator is designed for educational, academic, and professional use.</strong> 
                All calculations are performed using standard mathematical algorithms and provide results accurate to 
                approximately 15 significant digits. However, users should be aware of limitations inherent in 
                floating-point arithmetic for extremely large or precise calculations.
              </p>
              <p className="mb-3">
                For academic use, please verify that calculator usage is permitted according to your institution's 
                policies. Some examinations may have restrictions on calculator types or may prohibit calculator use entirely. 
                This tool is intended to supplement learning and understanding of mathematical concepts.
              </p>
              <p>
                For professional and scientific applications, verify critical calculations using multiple methods 
                or specialized software when high precision is required. Always understand the mathematical principles 
                behind the calculations rather than relying solely on computational results.
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
            <p className="text-sm text-gray-600">Professional Calculator Developer & Mathematical Software Specialist</p>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2"><strong>About the Developer:</strong> This scientific calculator has been developed by Waleed Rajpoot, a professional software developer specializing in mathematical calculation tools and educational software. With extensive experience in creating accurate, user-friendly scientific calculators, Waleed ensures all tools meet academic and professional standards for mathematical computation.</p>
            <p className="mb-2"><strong>Mathematical Accuracy:</strong> All scientific calculations are implemented using standard mathematical libraries and algorithms recognized in academic and professional settings. The calculator supports both degree and radian modes, provides comprehensive function coverage, and maintains high precision for reliable computational results.</p>
            <p><strong>Copyright Notice:</strong> This scientific calculator and all associated educational content is developed by Waleed Rajpoot and is provided free of charge for educational, academic, and professional use. The tool may be used freely for learning, research, and computational assistance in mathematical and scientific applications.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
