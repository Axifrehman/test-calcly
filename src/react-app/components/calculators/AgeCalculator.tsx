import { useState } from 'react';
import { Calendar, Cake, Clock } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) return;

    // Calculate age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time
    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));

    // Calculate next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysUntilBirthday
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Cake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Age Calculator</h2>
            <p className="text-pink-100">Calculate your exact age and time lived</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Calculate Age On
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateAge}
          disabled={!birthDate}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Calculate Age
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Main Age Display */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-pink-900 mb-4">Your Age</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-700">{result.years}</div>
                    <div className="text-sm text-pink-600">Years</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-700">{result.months}</div>
                    <div className="text-sm text-pink-600">Months</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-700">{result.days}</div>
                    <div className="text-sm text-pink-600">Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-700 mb-1">
                  {result.totalDays.toLocaleString()}
                </div>
                <div className="text-sm text-blue-600">Total Days</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">
                  {result.totalHours.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Total Hours</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-700 mb-1">
                  {result.totalMinutes.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">Total Minutes</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-700 mb-1">
                  {result.daysUntilBirthday}
                </div>
                <div className="text-sm text-orange-600">Days to Birthday</div>
              </div>
            </div>

            {/* Birthday Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Cake className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-900">Next Birthday</h3>
              </div>
              <p className="text-yellow-800">
                Your next birthday is on <strong>{result.nextBirthday}</strong>, 
                which is in <strong>{result.daysUntilBirthday} days</strong>.
              </p>
            </div>

            {/* Fun Facts */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-indigo-900">Fun Facts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800">
                <div>
                  <strong>Heart beats:</strong> ~{(result.totalDays * 100000).toLocaleString()}
                </div>
                <div>
                  <strong>Breaths taken:</strong> ~{(result.totalDays * 20000).toLocaleString()}
                </div>
                <div>
                  <strong>Times blinked:</strong> ~{(result.totalDays * 17000).toLocaleString()}
                </div>
                <div>
                  <strong>Hair grown:</strong> ~{Math.round(result.totalDays * 0.35)} cm
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
            <p className="mb-2"><strong>Educational Disclaimer:</strong> This age calculator provides accurate calculations based on standard calendar calculations. The fun facts and statistics are approximations based on average human physiological data and should be considered for entertainment and educational purposes only.</p>
            <p className="mb-2"><strong>Accuracy Notice:</strong> All age calculations are mathematically accurate using standard date calculation methods. Results are precise to the day level.</p>
            <p><strong>Copyright Notice:</strong> This calculator is developed by Waleed Rajpoot and is provided free of charge for educational and informational purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
