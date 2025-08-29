import { useState } from 'react';
import { Ruler, ArrowRightLeft } from 'lucide-react';

export default function LengthConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');

  const lengthUnits = [
    // Metric
    { id: 'kilometer', name: 'Kilometer', symbol: 'km', factor: 1000, category: 'Metric' },
    { id: 'meter', name: 'Meter', symbol: 'm', factor: 1, category: 'Metric' },
    { id: 'centimeter', name: 'Centimeter', symbol: 'cm', factor: 0.01, category: 'Metric' },
    { id: 'millimeter', name: 'Millimeter', symbol: 'mm', factor: 0.001, category: 'Metric' },
    
    // Imperial
    { id: 'mile', name: 'Mile', symbol: 'mi', factor: 1609.344, category: 'Imperial' },
    { id: 'yard', name: 'Yard', symbol: 'yd', factor: 0.9144, category: 'Imperial' },
    { id: 'foot', name: 'Foot', symbol: 'ft', factor: 0.3048, category: 'Imperial' },
    { id: 'inch', name: 'Inch', symbol: 'in', factor: 0.0254, category: 'Imperial' },
    
    // Nautical
    { id: 'nautical_mile', name: 'Nautical Mile', symbol: 'nmi', factor: 1852, category: 'Nautical' },
    
    // Astronomical
    { id: 'light_year', name: 'Light Year', symbol: 'ly', factor: 9.461e15, category: 'Astronomical' },
    { id: 'parsec', name: 'Parsec', symbol: 'pc', factor: 3.086e16, category: 'Astronomical' },
    { id: 'astronomical_unit', name: 'Astronomical Unit', symbol: 'AU', factor: 1.496e11, category: 'Astronomical' },
  ];

  const convertLength = (value: number, fromFactor: number, toFactor: number): number => {
    // Convert to meters first, then to target unit
    const meters = value * fromFactor;
    return meters / toFactor;
  };

  const getResult = () => {
    if (!value) return null;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;
    
    const fromFactor = lengthUnits.find(u => u.id === fromUnit)?.factor || 1;
    const toFactor = lengthUnits.find(u => u.id === toUnit)?.factor || 1;
    
    return convertLength(numValue, fromFactor, toFactor);
  };

  const result = getResult();
  const fromUnitInfo = lengthUnits.find(u => u.id === fromUnit)!;
  const toUnitInfo = lengthUnits.find(u => u.id === toUnit)!;

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitsByCategory = () => {
    const categories = ['Metric', 'Imperial', 'Nautical', 'Astronomical'];
    return categories.map(category => ({
      category,
      units: lengthUnits.filter(unit => unit.category === category)
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Length Converter</h2>
            <p className="text-purple-100">Convert between different length and distance units</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter length"
              step="0.0001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {getUnitsByCategory().map(categoryGroup => (
                  <optgroup key={categoryGroup.category} label={categoryGroup.category}>
                    {categoryGroup.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-gray-100 hover:bg-purple-100 rounded-full transition-colors group"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {getUnitsByCategory().map(categoryGroup => (
                  <optgroup key={categoryGroup.category} label={categoryGroup.category}>
                    {categoryGroup.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {result !== null && value && (
          <div className="mt-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  {result < 0.001 || result > 1000000 ? result.toExponential(3) : result.toFixed(6).replace(/\.?0+$/, '')}
                  <span className="text-2xl ml-2">{toUnitInfo.symbol}</span>
                </div>
                <p className="text-lg text-purple-800">
                  {value} {fromUnitInfo.symbol} = {result < 0.001 || result > 1000000 ? result.toExponential(3) : result.toFixed(6).replace(/\.?0+$/, '')} {toUnitInfo.symbol}
                </p>
              </div>
            </div>

            {/* Common Conversions */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Conversions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['meter', 'foot', 'inch', 'centimeter'].map(unitId => {
                  const unit = lengthUnits.find(u => u.id === unitId)!;
                  const fromFactor = lengthUnits.find(u => u.id === fromUnit)?.factor || 1;
                  const convertedValue = convertLength(parseFloat(value), fromFactor, unit.factor);
                  
                  return (
                    <div key={unitId} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="font-medium text-sm text-gray-600">{unit.name}</div>
                      <div className="text-lg font-bold text-gray-900">
                        {convertedValue < 0.001 || convertedValue > 1000000 
                          ? convertedValue.toExponential(2) 
                          : convertedValue.toFixed(3).replace(/\.?0+$/, '')
                        }
                      </div>
                      <div className="text-xs text-gray-500">{unit.symbol}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reference Measurements */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Common Reference Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Credit Card Width:</span>
                    <span className="font-medium">8.56 cm / 3.37 in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Door Height:</span>
                    <span className="font-medium">2.03 m / 6.67 ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Football Field:</span>
                    <span className="font-medium">100 m / 109 yd</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Average Human:</span>
                    <span className="font-medium">1.7 m / 5.6 ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">City Block:</span>
                    <span className="font-medium">~80 m / 260 ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Marathon:</span>
                    <span className="font-medium">42.2 km / 26.2 mi</span>
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
            <p className="mb-2"><strong>Scientific Disclaimer:</strong> This length converter uses internationally recognized conversion factors and provides accurate conversions between different length and distance units. The reference measurements are based on standard definitions and may be used for educational, professional, and practical applications.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All length conversions are mathematically precise using established international conversion factors. Results maintain accuracy suitable for most practical applications.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
