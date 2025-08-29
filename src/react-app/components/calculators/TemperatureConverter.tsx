import { useState } from 'react';
import { Thermometer, ArrowRightLeft } from 'lucide-react';

export default function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const temperatureUnits = [
    { id: 'celsius', name: 'Celsius', symbol: '°C', color: 'bg-blue-100 text-blue-800' },
    { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', color: 'bg-red-100 text-red-800' },
    { id: 'kelvin', name: 'Kelvin', symbol: 'K', color: 'bg-purple-100 text-purple-800' },
    { id: 'rankine', name: 'Rankine', symbol: '°R', color: 'bg-green-100 text-green-800' },
    { id: 'delisle', name: 'Delisle', symbol: '°De', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'newton', name: 'Newton', symbol: '°N', color: 'bg-orange-100 text-orange-800' },
  ];

  const convertTemperature = (value: number, from: string, to: string): number => {
    // First convert to Celsius as base
    let celsius = 0;
    
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      case 'delisle':
        celsius = 100 - value * 2/3;
        break;
      case 'newton':
        celsius = value * 100/33;
        break;
    }

    // Then convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'rankine':
        return (celsius + 273.15) * 9/5;
      case 'delisle':
        return (100 - celsius) * 3/2;
      case 'newton':
        return celsius * 33/100;
      default:
        return celsius;
    }
  };

  const getResult = () => {
    if (!value) return null;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;
    return convertTemperature(numValue, fromUnit, toUnit);
  };

  const result = getResult();
  const fromUnitInfo = temperatureUnits.find(u => u.id === fromUnit)!;
  const toUnitInfo = temperatureUnits.find(u => u.id === toUnit)!;

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getTemperatureDescription = (temp: number, unit: string) => {
    let celsius = unit === 'celsius' ? temp : convertTemperature(temp, unit, 'celsius');
    
    if (celsius < -40) return 'Extremely cold';
    if (celsius < 0) return 'Freezing';
    if (celsius < 10) return 'Very cold';
    if (celsius < 20) return 'Cool';
    if (celsius < 30) return 'Warm';
    if (celsius < 40) return 'Hot';
    return 'Extremely hot';
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Temperature Converter</h2>
            <p className="text-red-100">Convert between temperature scales</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter temperature"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
            />
          </div>

          {/* Unit Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                {temperatureUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-gray-100 hover:bg-red-100 rounded-full transition-colors group"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                {temperatureUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {result !== null && value && (
          <div className="mt-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-900 mb-2">
                  {result.toFixed(2)}{toUnitInfo.symbol}
                </div>
                <p className="text-lg text-red-800 mb-2">
                  {value}{fromUnitInfo.symbol} = {result.toFixed(2)}{toUnitInfo.symbol}
                </p>
                <p className="text-sm text-red-600">
                  {getTemperatureDescription(result, toUnit)}
                </p>
              </div>
            </div>

            {/* All Conversions */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Conversions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {temperatureUnits.map(unit => {
                  const convertedValue = convertTemperature(parseFloat(value), fromUnit, unit.id);
                  return (
                    <div key={unit.id} className={`p-4 rounded-lg ${unit.color}`}>
                      <div className="font-medium text-sm">{unit.name}</div>
                      <div className="text-lg font-bold">
                        {convertedValue.toFixed(2)}{unit.symbol}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common References */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Reference Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Absolute Zero:</span>
                    <span className="font-medium">-273.15°C / -459.67°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Water Freezes:</span>
                    <span className="font-medium">0°C / 32°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Room Temperature:</span>
                    <span className="font-medium">20°C / 68°F</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Body Temperature:</span>
                    <span className="font-medium">37°C / 98.6°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Water Boils:</span>
                    <span className="font-medium">100°C / 212°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Oven Temperature:</span>
                    <span className="font-medium">200°C / 392°F</span>
                  </div>
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
            <p className="mb-2"><strong>Scientific Disclaimer:</strong> This temperature converter uses standard scientific conversion formulas and provides accurate conversions between different temperature scales. The reference points and descriptions are based on standard atmospheric pressure conditions and may vary at different altitudes or atmospheric conditions.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All temperature conversions are mathematically accurate using established scientific formulas. Results are precise within the limitations of the input data.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
