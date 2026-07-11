"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity, Play, Terminal, Database, ChevronRight } from "lucide-react";
import { useMode } from "@/context/ModeContext";

// Mock Data Generator (Based on user selection)
const generateMockData = (crop: string) => {
  const basePrice = crop === "Wheat" ? 2200 : crop === "Rice" ? 3100 : 4500; // Fake base prices in INR
  return Array.from({ length: 7 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i],
    price: basePrice + Math.floor(Math.random() * 400) - 150 + (i * 50),
    predicted: basePrice + Math.floor(Math.random() * 200) + (i * 55),
  }));
};

export default function MLPlayground() {
  const { mode } = useMode();
  const isDev = mode === "developer";

  const [crop, setCrop] = useState("Wheat");
  const [model, setModel] = useState("LSTM");
  const [isInferencing, setIsInferencing] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const runModel = () => {
    setIsInferencing(true);
    setData(null);
    setLogs([]);

    // Fake Terminal Loading Sequence
    const loadingSteps = [
      "Connecting to prediction server...",
      `Loading historical data for ${crop}...`,
      "Preprocessing time-series sequences...",
      `Applying ${model} weights & biases...`,
      "[SUCCESS] Inference complete. Generating plot..."
    ];

    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
      }, index * 600);
    });

    // Show data after 'loading' is done
    setTimeout(() => {
      setData(generateMockData(crop));
      setIsInferencing(false);
    }, loadingSteps.length * 600 + 400);
  };

  const themeColor = isDev ? "#34d399" : "#06b6d4"; // Emerald vs Cyan

  return (
    <section className={`w-full max-w-5xl mx-auto my-20 p-6 rounded-3xl border transition-all duration-500 ${
      isDev ? 'border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'border-cyan-500/20 bg-cyan-950/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
            {isDev ? <Terminal size={24} /> : <Activity size={24} className="text-cyan-400" />}
            {isDev ? "model.predict(agri_data)" : "Live ML Simulator"}
          </h2>
          <p className={`text-sm mt-2 ${isDev ? 'text-emerald-500/70 font-mono' : 'text-zinc-400'}`}>
            {isDev ? "// Interactive playground for Agricultural Price Prediction" : "Test my Agricultural Price Prediction model directly in the browser."}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Controls Panel */}
        <div className={`p-6 rounded-2xl border ${isDev ? 'border-emerald-500/20 bg-emerald-900/10' : 'border-zinc-800 bg-zinc-900/50'} flex flex-col gap-6`}>
          
          {/* Select Crop */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${isDev ? 'text-emerald-500 font-mono' : 'text-zinc-400'}`}>
              Select Commodity
            </label>
            <div className="flex flex-wrap gap-2">
              {["Wheat", "Rice", "Sugarcane"].map((c) => (
                <button
                  key={c} onClick={() => setCrop(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    crop === c 
                      ? isDev ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-cyan-500 text-black border-cyan-500'
                      : isDev ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/50' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-cyan-500/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Select Model */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${isDev ? 'text-emerald-500 font-mono' : 'text-zinc-400'}`}>
              Algorithm
            </label>
            <div className="flex flex-wrap gap-2">
              {["LSTM", "Random Forest"].map((m) => (
                <button
                  key={m} onClick={() => setModel(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    model === m 
                      ? isDev ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-cyan-500 text-black border-cyan-500'
                      : isDev ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/50' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-cyan-500/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={runModel}
            disabled={isInferencing}
            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDev 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-cyan-500 text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02]'
            }`}
          >
            {isInferencing ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Play size={16} /> {isDev ? 'execute()' : 'Run Prediction'}
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className={`lg:col-span-2 relative p-6 rounded-2xl border min-h-[300px] flex flex-col ${isDev ? 'border-emerald-500/20 bg-[#0a0a0a]' : 'border-zinc-800 bg-zinc-900/30'}`}>
          
          <AnimatePresence mode="wait">
            {/* 1. INITIAL STATE */}
            {!isInferencing && !data && (
              <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
                <Database size={48} className={`mb-4 ${isDev ? 'text-emerald-500/50' : 'text-cyan-500/50'}`} />
                <p className={`text-sm ${isDev ? 'text-emerald-400 font-mono' : 'text-zinc-400'}`}>Awaiting parameters...</p>
              </motion.div>
            )}

            {/* 2. LOADING/TERMINAL STATE */}
            {isInferencing && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col justify-start">
                <div className="font-mono text-xs sm:text-sm space-y-2">
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`flex items-start gap-2 ${isDev ? 'text-emerald-400' : 'text-zinc-300'}`}>
                      <ChevronRight size={16} className="shrink-0 mt-0.5" />
                      <span>{log}</span>
                    </motion.div>
                  ))}
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={`w-2 h-4 bg-current mt-2 ml-2 ${isDev ? 'text-emerald-500' : 'text-cyan-500'}`} />
                </div>
              </motion.div>
            )}

            {/* 3. CHART RESULT STATE */}
            {!isInferencing && data && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-grow w-full h-full min-h-[250px]">
                <div className={`mb-4 text-xs font-bold tracking-widest uppercase flex justify-between ${isDev ? 'text-emerald-500 font-mono' : 'text-cyan-400'}`}>
                  <span>Trend Analysis</span>
                  <span>₹ / Quintal</span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDev ? "#10b98120" : "#3f3f46"} vertical={false} />
                    <XAxis dataKey="month" stroke={isDev ? "#10b98150" : "#a1a1aa"} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={isDev ? "#10b98150" : "#a1a1aa"} fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDev ? '#022c22' : '#18181b', borderColor: isDev ? '#10b981' : '#06b6d4', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                    />
                    <Line type="monotone" dataKey="price" name="Actual Price" stroke="#71717a" strokeWidth={2} dot={{ r: 4, fill: '#71717a' }} />
                    <Line type="monotone" dataKey="predicted" name={`${model} Forecast`} stroke={themeColor} strokeWidth={3} dot={{ r: 4, fill: themeColor }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}