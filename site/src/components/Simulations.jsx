import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Key, Lock, Unlock, ArrowRight, Server, Globe, Box, User, Terminal } from 'lucide-react';

// 1. Firewall Simulation
export const FirewallSimulator = () => {
  const [packets, setPackets] = useState([]);
  const [activeRules, setActiveRules] = useState({ 22: true, 80: true, 443: true, 3306: false });

  const addPacket = (port) => {
    const id = Math.random();
    setPackets(prev => [...prev, { id, port, status: activeRules[port] ? 'allowed' : 'blocked' }]);
    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  return (
    <div className="simulation-box">
      <div className="sim-header">FIREWALL UFW SIMULATOR</div>
      <div className="flex gap-8 p-6">
        <div className="flex-1 space-y-4">
          <p className="text-xs text-zinc-400 mb-4 uppercase tracking-widest">Incoming Traffic</p>
          <div className="grid grid-cols-2 gap-2">
            {[22, 80, 443, 3306].map(port => (
              <button key={port} onClick={() => addPacket(port)} className="nav-item text-[10px]">
                SEND PACKET : PORT {port}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xs text-zinc-400 mb-4 uppercase tracking-widest">Active Rules</p>
            <div className="space-y-2">
              {Object.entries(activeRules).map(([port, allowed]) => (
                <div key={port} className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
                  <span className="mono-xs">PORT {port}</span>
                  <span className={allowed ? "text-green" : "text-red-500"}>{allowed ? "ALLOW" : "DENY"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-black/40 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center h-[300px]">
           {/* The Firewall Line */}
           <div className="absolute inset-y-0 left-1/2 w-px bg-accent-primary/50 shadow-[0_0_15px_rgba(0,255,65,0.5)] z-10" />
           <div className="absolute left-1/4 flex flex-col items-center gap-2">
             <Globe size={24} className="text-zinc-500" />
             <span className="text-[8px] uppercase">Internet</span>
           </div>
           <div className="absolute right-1/4 flex flex-col items-center gap-2">
             <Server size={24} className="text-accent-primary" />
             <span className="text-[8px] uppercase">Your VPS</span>
           </div>

           <AnimatePresence>
             {packets.map(packet => (
               <motion.div
                 key={packet.id}
                 initial={{ x: -80, opacity: 1 }}
                 animate={{ x: packet.status === 'allowed' ? 80 : 0 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1.5, ease: "linear" }}
                 className="absolute left-1/2 -translate-x-1/2 z-20"
               >
                 {packet.status === 'allowed' ? (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], color: ['#fff', '#00FF41', '#00FF41'] }}
                      className="bg-green-500/20 p-1 rounded-full border border-green-500/50"
                    >
                      <ShieldCheck size={16} className="text-green" />
                    </motion.div>
                 ) : (
                    <motion.div 
                      animate={{ x: [0, -5, 5, -5, 0], color: ['#fff', '#ef4444', '#ef4444'] }}
                      className="bg-red-500/20 p-1 rounded-full border border-red-500/50"
                    >
                      <ShieldAlert size={16} className="text-red-500" />
                    </motion.div>
                 )}
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// 2. SSH Key Simulation
export const SSHSimulator = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div className="simulation-box">
      <div className="sim-header">SSH KEY AUTHENTICATION SIMULATOR</div>
      <div className="p-8 flex flex-col items-center">
        <div className="flex items-center gap-12 mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <User size={32} className="text-blue-400" />
            </div>
            <span className="mono-xs">YOUR LAPTOP</span>
            <div className="flex gap-2 mt-2">
              <Key size={14} className="text-yellow-500" />
              <span className="text-[8px] text-zinc-500 uppercase">Private Key</span>
            </div>
          </div>

          <div className="relative h-px w-32 bg-zinc-800">
             <motion.div 
               animate={{ x: step === 1 ? [0, 128] : 0, opacity: step === 1 ? 1 : 0 }}
               className="absolute top-1/2 -translate-y-1/2"
             >
               <Lock size={16} className="text-accent-secondary" />
             </motion.div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
              <Server size={32} className="text-accent-primary" />
            </div>
            <span className="mono-xs">VPS SERVER</span>
            <div className="flex gap-2 mt-2">
              <Unlock size={14} className="text-accent-primary" />
              <span className="text-[8px] text-zinc-500 uppercase">Public Key</span>
            </div>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded border border-white/5 w-full text-center">
          <p className="text-xs text-zinc-400 mb-4">
            {step === 0 && "SSH Key bekerja dengan pasangan kunci. Public key ditaruh di server, Private key tetap di laptop Anda."}
            {step === 1 && "Server mengirim 'Challenge' yang terenkripsi dengan Public Key Anda."}
            {step === 2 && "Laptop Anda membuktikan kepemilikan dengan mendekripsi Challenge menggunakan Private Key."}
            {step === 3 && "LOGIN SUCCESS: Koneksi terenkripsi terbentuk!"}
          </p>
          <button 
            onClick={() => setStep((step + 1) % 4)}
            className="nav-item inline-flex gap-2 items-center"
          >
            {step === 3 ? "RESET SIMULATION" : "NEXT STEP"} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Nginx Reverse Proxy Simulation
export const NginxSimulator = () => {
  const [route, setRoute] = useState(null);

  return (
    <div className="simulation-box">
      <div className="sim-header">NGINX REVERSE PROXY SIMULATOR</div>
      <div className="p-6 flex flex-col items-center">
        <div className="flex gap-4 mb-8">
           <button onClick={() => setRoute('frontend')} className={`nav-item ${route === 'frontend' ? 'active' : ''}`}>DOMAIN.COM</button>
           <button onClick={() => setRoute('backend')} className={`nav-item ${route === 'backend' ? 'active' : ''}`}>API.DOMAIN.COM</button>
        </div>

        <div className="relative w-full h-[250px] flex items-center justify-between px-12">
          <Globe size={32} className="text-zinc-500" />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-xl bg-accent-primary/10 border-2 border-accent-primary flex items-center justify-center relative shadow-[0_0_20px_rgba(0,255,65,0.2)]">
              <Terminal size={32} className="text-accent-primary" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-primary text-black font-bold text-[8px] px-2 py-0.5 rounded">NGINX</div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className={`p-4 rounded border ${route === 'frontend' ? 'border-accent-secondary bg-accent-secondary/10' : 'border-white/5 opacity-30'} transition-all`}>
              <div className="mono-xs">PORT 3000</div>
              <div className="text-[8px] uppercase">Next.js App</div>
            </div>
            <div className={`p-4 rounded border ${route === 'backend' ? 'border-accent-secondary bg-accent-secondary/10' : 'border-white/5 opacity-30'} transition-all`}>
              <div className="mono-xs">PORT 8000</div>
              <div className="text-[8px] uppercase">FastAPI / Laravel</div>
            </div>
          </div>

          {/* Animated Paths */}
          <AnimatePresence>
            {route && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  d={route === 'frontend' ? "M 100 125 L 250 125 M 350 125 L 450 85" : "M 100 125 L 250 125 M 350 125 L 450 165"}
                  fill="none"
                  stroke="var(--accent-secondary)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-[10px] text-zinc-500 uppercase mt-4 text-center">
          Nginx menerima trafik di Port 80/443 dan mengarahkannya ke aplikasi yang berbeda berdasarkan domain/path.
        </p>
      </div>
    </div>
  );
};
