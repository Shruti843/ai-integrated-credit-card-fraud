import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { CreditCard, Globe, DollarSign, Store, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    country: '',
    merchant: '',
    cvvStatus: 'VALID'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        ...formData,
        amount: Number(formData.amount)
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResult(response.data);
      // Reset form on success
      setFormData({ amount: '', country: '', merchant: '', cvvStatus: 'VALID' });
    } catch (err) {
      console.error(err);
      alert('Error submitting transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <CreditCard className="text-indigo-400" />
          New Transaction
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="number" 
                name="amount" 
                required 
                min="0.01" 
                step="0.01"
                value={formData.amount} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Country</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                name="country" 
                required 
                value={formData.country} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="e.g. US, UK, FR"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Merchant</label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                name="merchant" 
                required 
                value={formData.merchant} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Merchant Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">CVV Status</label>
            <div className="relative">
              <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <select 
                name="cvvStatus" 
                value={formData.cvvStatus} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="VALID">Valid</option>
                <option value="INVALID">Invalid</option>
                <option value="MISSING">Missing</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? 'Analyzing...' : 'Analyze Transaction'}
          </button>
        </form>
      </div>

      {/* Result Section */}
      <div className="glass-panel p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
        {!result ? (
          <div className="text-slate-500">
            <ShieldAlert size={48} className="mx-auto mb-4 opacity-50" />
            <p>Submit a transaction to see the fraud analysis.</p>
          </div>
        ) : (
          <div className="w-full animate-in fade-in zoom-in duration-300">
            {/* Background glowing effect based on verdict */}
            <div className={`absolute inset-0 opacity-10 blur-3xl rounded-full ${
              result.verdict === 'LEGITIMATE' ? 'bg-emerald-500' :
              result.verdict === 'SUSPICIOUS' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />

            <h3 className="text-xl font-medium text-slate-300 mb-2">Analysis Result</h3>
            
            <div className="my-8 relative">
              <svg className="w-32 h-32 mx-auto transform -rotate-90">
                <circle 
                  cx="64" cy="64" r="60" 
                  className="stroke-slate-700 fill-none" strokeWidth="8"
                />
                <circle 
                  cx="64" cy="64" r="60" 
                  className={`fill-none transition-all duration-1000 ease-out ${
                    result.verdict === 'LEGITIMATE' ? 'stroke-emerald-500' :
                    result.verdict === 'SUSPICIOUS' ? 'stroke-amber-500' : 'stroke-rose-500'
                  }`} 
                  strokeWidth="8"
                  strokeDasharray={`${(result.riskScore / 100) * 377} 377`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">{result.riskScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold border ${
              result.verdict === 'LEGITIMATE' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              result.verdict === 'SUSPICIOUS' 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {result.verdict === 'LEGITIMATE' && <CheckCircle size={24} />}
              {result.verdict === 'SUSPICIOUS' && <AlertTriangle size={24} />}
              {result.verdict === 'FRAUD' && <ShieldAlert size={24} />}
              {result.verdict}
            </div>
            
            <p className="mt-6 text-sm text-slate-400 bg-slate-900/50 p-4 rounded-lg">
              Transaction ID: <span className="font-mono text-slate-300">{result._id}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
