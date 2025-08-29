import { useState } from 'react';
import { DollarSign, Users, Receipt } from 'lucide-react';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(18);
  const [numPeople, setNumPeople] = useState(1);
  const [customTip, setCustomTip] = useState('');

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tipPercent = customTip ? parseFloat(customTip) : tipPercentage;
    const people = Math.max(1, numPeople);

    const tipAmount = (bill * tipPercent) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonBill = bill / people;
    const perPersonTip = tipAmount / people;
    const perPersonTotal = totalAmount / people;

    return {
      tipAmount,
      totalAmount,
      perPersonBill,
      perPersonTip,
      perPersonTotal
    };
  };

  const result = calculateTip();
  const tipPresets = [10, 15, 18, 20, 25, 30];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tip Calculator</h2>
            <p className="text-amber-100">Calculate tips and split bills easily</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="space-y-6">
          {/* Bill Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Bill Amount
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-lg"
            />
          </div>

          {/* Tip Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Percentage
            </label>
            
            {/* Preset Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setTipPercentage(preset);
                    setCustomTip('');
                  }}
                  className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                    tipPercentage === preset && !customTip
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>

            {/* Custom Tip Input */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Custom:</span>
              <input
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Custom %"
                min="0"
                step="0.1"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              <span className="text-gray-500">%</span>
            </div>
          </div>

          {/* Number of People */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Number of People
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                -
              </button>
              <span className="text-2xl font-semibold w-12 text-center">{numPeople}</span>
              <button
                onClick={() => setNumPeople(numPeople + 1)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {billAmount && (
          <div className="mt-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <h3 className="text-sm font-medium text-green-600 mb-2">Tip Amount</h3>
                <p className="text-2xl font-bold text-green-700">${result.tipAmount.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <h3 className="text-sm font-medium text-blue-600 mb-2">Total Bill</h3>
                <p className="text-2xl font-bold text-blue-700">${result.totalAmount.toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <h3 className="text-sm font-medium text-purple-600 mb-2">Tip Rate</h3>
                <p className="text-2xl font-bold text-purple-700">
                  {customTip ? parseFloat(customTip).toFixed(1) : tipPercentage}%
                </p>
              </div>
            </div>

            {/* Per Person Breakdown */}
            {numPeople > 1 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Per Person ({numPeople} people)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-amber-600 mb-1">Bill Amount</div>
                    <div className="text-xl font-bold text-amber-900">
                      ${result.perPersonBill.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-amber-600 mb-1">Tip Amount</div>
                    <div className="text-xl font-bold text-amber-900">
                      ${result.perPersonTip.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-amber-600 mb-1">Total Per Person</div>
                    <div className="text-2xl font-bold text-amber-900">
                      ${result.perPersonTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bill Breakdown */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${parseFloat(billAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">
                    Tip ({customTip ? parseFloat(customTip).toFixed(1) : tipPercentage}%)
                  </span>
                  <span className="font-semibold text-green-600">+${result.tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">${result.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Tip Guide */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Tipping Guide</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-blue-800">
                <div><strong>Poor Service:</strong> 10-12%</div>
                <div><strong>Average Service:</strong> 15-18%</div>
                <div><strong>Good Service:</strong> 18-20%</div>
                <div><strong>Excellent Service:</strong> 20%+</div>
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
            <p className="mb-2"><strong>Service Disclaimer:</strong> This tip calculator provides suggestions based on common tipping practices and should be adjusted according to service quality, local customs, and personal preferences. Tipping practices vary by region, culture, and type of establishment.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All calculations are mathematically accurate. However, final tip amounts should be determined based on your satisfaction with service and local tipping customs.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for convenience and educational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
