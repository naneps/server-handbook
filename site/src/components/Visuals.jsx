import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Monitor, HardDrive, Database, Globe, ArrowRight, CheckCircle, Box, GitBranch, Activity, Cloud, RefreshCw } from 'lucide-react';

const Card = ({ children, color = 'green', className = '' }) => {
  const colors = {
    green: 'border-green-500/30 bg-green-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    red: 'border-red-500/30 bg-red-500/5',
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
  };
  return (
    <div style={{ border: '1px solid', borderRadius: 8, padding: '1rem', fontSize: '0.8rem' }}
      className={`${colors[color]} ${className}`}>
      {children}
    </div>
  );
};

export const VpsComparison = () => (
  <div className="simulation-box">
    <div className="sim-header">PERBANDINGAN: DEDICATED vs VPS vs SHARED</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1.5rem' }}>
      {[
        { title: 'SHARED HOSTING', icon: '🛏️', items: ['Resource dibagi semua', 'Murah tapi terbatas', 'Tetangga bikin lambat', 'Tidak bisa custom'], color: '#ef4444', desc: 'Seperti asrama' },
        { title: 'VPS', icon: '🏠', items: ['Resource terjamin', 'Harga terjangkau', 'Isolasi antar user', 'Akses root penuh'], color: '#00FF41', desc: 'Seperti apartemen' },
        { title: 'DEDICATED', icon: '🏢', items: ['Resource 100% milik Anda', 'Performa maksimal', 'Total kontrol', 'Harga premium'], color: '#00E5FF', desc: 'Seperti gedung sendiri' },
      ].map((item, i) => (
        <div key={i} style={{ border: `1px solid ${item.color}30`, borderRadius: 8, padding: '1rem', background: `${item.color}08` }}>
          <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>{item.icon}</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: item.color, textAlign: 'center', marginBottom: '0.75rem', fontWeight: 'bold' }}>{item.title}</div>
          <div style={{ fontSize: '0.65rem', color: '#888', textAlign: 'center', marginBottom: '0.75rem', fontStyle: 'italic' }}>{item.desc}</div>
          {item.items.map((line, j) => (
            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.7rem', color: '#ccc' }}>
              <span style={{ color: item.color }}>›</span> {line}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const DeploymentFlow = () => {
  const steps = [
    { icon: <Globe size={20}/>, label: 'User Browser', color: '#888' },
    { icon: <Globe size={20}/>, label: 'DNS', color: '#888' },
    { icon: <Server size={20}/>, label: 'Nginx / Reverse Proxy', color: '#00FF41' },
    { icon: <Monitor size={20}/>, label: 'Frontend App', color: '#00E5FF' },
    { icon: <Box size={20}/>, label: 'Backend API', color: '#00E5FF' },
    { icon: <Database size={20}/>, label: 'Database', color: '#a78bfa' },
  ];
  return (
    <div className="simulation-box">
      <div className="sim-header">ARSITEKTUR DEPLOYMENT UMUM</div>
      <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <div style={{ padding: '0.75rem', borderRadius: 8, border: `1px solid ${step.color}40`, background: `${step.color}10`, color: step.color }}>
                {step.icon}
              </div>
              <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: step.color, textAlign: 'center', maxWidth: 80 }}>{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && <ArrowRight size={14} style={{ color: '#444', marginBottom: '1.2rem' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const SetupSteps = () => {
  const [active, setActive] = useState(0);
  const steps = [
    { num: '01', title: 'Login sebagai Root', desc: 'Akses awal ke server menggunakan kredensial dari provider VPS. Root memiliki akses penuh tanpa batas ke seluruh sistem.', warn: 'Jangan gunakan root untuk aktivitas harian — hanya untuk setup awal!', color: '#ef4444' },
    { num: '02', title: 'Buat User Baru', desc: 'Buat user non-root untuk operasional harian. User ini akan diberi akses sudo untuk perintah admin bila diperlukan.', warn: null, color: '#00E5FF' },
    { num: '03', title: 'Update Sistem', desc: 'Update semua package ke versi terbaru. Package lama bisa memiliki celah keamanan (CVE) yang sudah diketahui publik dan dieksploitasi oleh bot.', warn: null, color: '#00FF41' },
    { num: '04', title: 'Konfigurasi SSH', desc: 'Tambahkan SSH public key ke server. Ini memungkinkan login tanpa password — lebih aman dari brute force attack.', warn: 'Upload SSH key SEBELUM menonaktifkan password auth!', color: '#a78bfa' },
    { num: '05', title: 'Setup Firewall', desc: 'Aktifkan UFW dan hanya buka port yang diperlukan. Setiap port terbuka adalah potensi celah masuk bagi attacker.', warn: null, color: '#f59e0b' },
  ];
  return (
    <div className="simulation-box">
      <div className="sim-header">INITIAL SETUP — STEP BY STEP</div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 200 }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', padding: '1rem' }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: 6, background: active === i ? `${s.color}15` : 'transparent', border: active === i ? `1px solid ${s.color}40` : '1px solid transparent', color: active === i ? s.color : '#666', fontFamily: 'monospace', fontSize: '0.65rem', textAlign: 'left', cursor: 'pointer', marginBottom: 4, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ opacity: 0.5 }}>{s.num}</span> {s.title}
            </button>
          ))}
        </div>
        <div style={{ padding: '1.5rem' }}>
          <motion.div key={active} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: steps[active].color, marginBottom: '0.75rem', fontWeight: 'bold' }}>STEP {steps[active].num}: {steps[active].title.toUpperCase()}</div>
            <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.7, marginBottom: '1rem' }}>{steps[active].desc}</p>
            {steps[active].warn && (
              <div style={{ background: '#ef444420', border: '1px solid #ef444440', borderRadius: 6, padding: '0.75rem', fontSize: '0.75rem', color: '#fca5a5' }}>
                ⚠️ {steps[active].warn}
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {steps.map((_, i) => (
                <div key={i} onClick={() => setActive(i)}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: i === active ? steps[active].color : '#333', cursor: 'pointer', transition: 'all 0.2s' }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const DnsFlow = () => {
  const [step, setStep] = useState(-1);
  const steps = [
    { from: 'Browser', to: 'DNS Resolver', label: 'example.com?', color: '#00E5FF' },
    { from: 'DNS Resolver', to: 'Root DNS', label: 'Who handles .com?', color: '#a78bfa' },
    { from: 'Root DNS', to: 'TLD DNS', label: 'Ask TLD server', color: '#f59e0b' },
    { from: 'TLD DNS', to: 'Auth DNS', label: 'Who owns example.com?', color: '#00FF41' },
    { from: 'Auth DNS', to: 'Browser', label: '→ IP: 1.2.3.4', color: '#00FF41' },
  ];
  return (
    <div className="simulation-box">
      <div className="sim-header">DNS RESOLUTION — CARA DOMAIN MENJADI IP</div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)}
              style={{ padding: '0.4rem 0.75rem', borderRadius: 4, background: step === i ? `${s.color}20` : 'rgba(255,255,255,0.05)', border: `1px solid ${step === i ? s.color : 'rgba(255,255,255,0.1)'}`, color: step === i ? s.color : '#888', fontFamily: 'monospace', fontSize: '0.65rem', cursor: 'pointer' }}>
              STEP {i + 1}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {steps.map((s, i) => (
            <motion.div key={i} animate={{ opacity: step >= i ? 1 : 0.2, x: step === i ? [0, 4, 0] : 0 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 1rem', borderRadius: 6, background: step === i ? `${s.color}10` : 'transparent', border: `1px solid ${step >= i ? s.color + '30' : 'rgba(255,255,255,0.05)'}` }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#666', minWidth: 20 }}>{i + 1}.</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#aaa' }}>{s.from}</span>
              <ArrowRight size={12} style={{ color: s.color }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#aaa' }}>{s.to}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: s.color, marginLeft: 'auto' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
        {step === -1 && <p style={{ textAlign: 'center', color: '#555', fontSize: '0.75rem', marginTop: '1rem' }}>Klik STEP 1 untuk mulai simulasi</p>}
      </div>
    </div>
  );
};

export const DataArch = () => (
  <div className="simulation-box">
    <div className="sim-header">DATA LAYER ARCHITECTURE</div>
    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
      {[
        { icon: <Database size={24}/>, title: 'PostgreSQL', desc: 'Data persisten. Transaksi ACID. Relational.', color: '#3b82f6', tags: ['Users', 'Orders', 'Products'] },
        { icon: <Activity size={24}/>, title: 'Redis', desc: 'Cache in-memory. Sub-millisecond. Volatile.', color: '#ef4444', tags: ['Sessions', 'Cache', 'Queue'] },
        { icon: <HardDrive size={24}/>, title: 'Object Storage', desc: 'File statis. Gambar, video, dokumen.', color: '#f59e0b', tags: ['Images', 'PDFs', 'Backups'] },
        { icon: <RefreshCw size={24}/>, title: 'Queue Worker', desc: 'Background jobs. Async processing.', color: '#a78bfa', tags: ['Emails', 'Reports', 'Resize'] },
      ].map((item, i) => (
        <div key={i} style={{ border: `1px solid ${item.color}30`, borderRadius: 8, padding: '1rem', background: `${item.color}08`, textAlign: 'center' }}>
          <div style={{ color: item.color, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: item.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</div>
          <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.75rem' }}>{item.desc}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center' }}>
            {item.tags.map((tag, j) => (
              <span key={j} style={{ background: `${item.color}20`, color: item.color, padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6rem', fontFamily: 'monospace' }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DockerArch = () => (
  <div className="simulation-box">
    <div className="sim-header">DOCKER CONTAINER ARCHITECTURE</div>
    <div style={{ padding: '1.5rem' }}>
      <div style={{ border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8, padding: '1rem', marginBottom: '1rem', background: 'rgba(0,229,255,0.03)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#00E5FF', marginBottom: '1rem' }}>DOCKER HOST (VPS)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {[
            { name: 'nginx', port: ':80/:443', color: '#00FF41' },
            { name: 'frontend', port: ':3000', color: '#00E5FF' },
            { name: 'backend', port: ':8000', color: '#a78bfa' },
            { name: 'postgres', port: ':5432', color: '#3b82f6' },
            { name: 'redis', port: ':6379', color: '#ef4444' },
            { name: 'worker', port: 'no port', color: '#f59e0b' },
          ].map((c, i) => (
            <div key={i} style={{ border: `1px solid ${c.color}30`, borderRadius: 6, padding: '0.75rem', background: `${c.color}08`, textAlign: 'center' }}>
              <Box size={16} style={{ color: c.color, margin: '0 auto 0.4rem' }} />
              <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: c.color }}>{c.name}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: '#555', marginTop: '0.25rem' }}>{c.port}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '0.75rem' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#888', marginBottom: '0.5rem' }}>VOLUMES (Persistent Data)</div>
          {['postgres_data', 'redis_data', 'app_uploads'].map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <HardDrive size={10} style={{ color: '#f59e0b' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#aaa' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '0.75rem' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#888', marginBottom: '0.5rem' }}>NETWORKS (Internal)</div>
          {['app_network (internal)', 'proxy_network (external)'].map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Globe size={10} style={{ color: '#00E5FF' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#aaa' }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CicdFlow = () => {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const steps = [
    { label: 'git push', icon: '📤', color: '#888' },
    { label: 'Run Tests', icon: '🧪', color: '#00E5FF' },
    { label: 'Build Image', icon: '🏗️', color: '#a78bfa' },
    { label: 'Push to Registry', icon: '📦', color: '#f59e0b' },
    { label: 'Deploy to VPS', icon: '🚀', color: '#00FF41' },
    { label: 'Health Check', icon: '✅', color: '#00FF41' },
  ];
  const run = () => {
    if (running) return;
    setRunning(true);
    setCurrentStep(-1);
    steps.forEach((_, i) => {
      setTimeout(() => { setCurrentStep(i); if (i === steps.length - 1) setRunning(false); }, i * 800 + 300);
    });
  };
  return (
    <div className="simulation-box">
      <div className="sim-header">CI/CD PIPELINE SIMULATOR</div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem' }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <motion.div animate={{ scale: currentStep === i ? 1.1 : 1, opacity: currentStep >= i ? 1 : 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', minWidth: 70 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, border: `2px solid ${currentStep >= i ? s.color : '#333'}`, background: currentStep >= i ? `${s.color}15` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.3s' }}>
                  {s.icon}
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: currentStep >= i ? s.color : '#555', textAlign: 'center' }}>{s.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div animate={{ opacity: currentStep > i ? 1 : 0.2 }} style={{ height: 2, minWidth: 24, background: steps[i + 1].color, marginBottom: '1.2rem', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <button onClick={run} disabled={running}
          style={{ padding: '0.5rem 1.5rem', borderRadius: 6, background: running ? 'rgba(255,255,255,0.05)' : 'rgba(0,255,65,0.1)', border: `1px solid ${running ? '#333' : 'rgba(0,255,65,0.4)'}`, color: running ? '#555' : '#00FF41', fontFamily: 'monospace', fontSize: '0.7rem', cursor: running ? 'not-allowed' : 'pointer' }}>
          {running ? '⏳ PIPELINE RUNNING...' : '▶ SIMULATE DEPLOY'}
        </button>
      </div>
    </div>
  );
};

export const MonitoringStack = () => (
  <div className="simulation-box">
    <div className="sim-header">MONITORING STACK OVERVIEW</div>
    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#888', marginBottom: '0.75rem' }}>METRICS PIPELINE</div>
        {[
          { from: 'VPS/App', to: 'Node Exporter', color: '#a78bfa' },
          { from: 'Node Exporter', to: 'Prometheus', color: '#f59e0b' },
          { from: 'Prometheus', to: 'Grafana Dashboard', color: '#00E5FF' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: item.color, minWidth: 120 }}>{item.from}</span>
            <ArrowRight size={12} style={{ color: '#444' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#aaa' }}>{item.to}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#888', marginBottom: '0.75rem' }}>ALERT PIPELINE</div>
        {[
          { label: 'CPU > 80%', status: 'WARN', color: '#f59e0b' },
          { label: 'RAM > 90%', status: 'CRIT', color: '#ef4444' },
          { label: 'Disk > 85%', status: 'WARN', color: '#f59e0b' },
          { label: 'Uptime OK', status: 'OK', color: '#00FF41' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', padding: '0.3rem 0.5rem', borderRadius: 4, background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#aaa' }}>{item.label}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: item.color, fontWeight: 'bold' }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Backup321 = () => (
  <div className="simulation-box">
    <div className="sim-header">STRATEGI BACKUP 3-2-1</div>
    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {[
        { num: '3', title: 'SALINAN', desc: '3 copy data yang identik', icon: '📋', color: '#00FF41', items: ['Production DB', 'Backup lokal', 'Backup cloud'] },
        { num: '2', title: 'MEDIA', desc: '2 jenis media berbeda', icon: '💾', color: '#00E5FF', items: ['SSD/HDD server', 'Object Storage (S3/R2)'] },
        { num: '1', title: 'OFFSITE', desc: '1 di lokasi berbeda', icon: '☁️', color: '#a78bfa', items: ['Cloud provider berbeda', 'Region berbeda'] },
      ].map((item, i) => (
        <div key={i} style={{ border: `1px solid ${item.color}30`, borderRadius: 8, padding: '1.25rem', background: `${item.color}08`, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontFamily: 'monospace', color: item.color, fontWeight: 'bold', lineHeight: 1 }}>{item.num}</div>
          <div style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{item.icon}</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: item.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</div>
          <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.75rem' }}>{item.desc}</div>
          {item.items.map((line, j) => (
            <div key={j} style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.25rem' }}>• {line}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
