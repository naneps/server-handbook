import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ChevronRight, 
  Terminal, 
  ShieldCheck, 
  Server, 
  Globe, 
  Box, 
  Cpu, 
  Database, 
  Activity, 
  HardDrive,
  Copy,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import docIndex from './content/index.json';
import { FirewallSimulator, SSHSimulator, NginxSimulator } from './components/Simulations';
import { VpsComparison, DeploymentFlow, SetupSteps, DnsFlow, DataArch, DockerArch, CicdFlow, MonitoringStack, Backup321 } from './components/Visuals';

// Helper for consistent icons
const getIcon = (filename) => {
  if (filename.includes('security')) return <ShieldCheck size={16} />;
  if (filename.includes('nginx')) return <Globe size={16} />;
  if (filename.includes('docker')) return <Box size={16} />;
  if (filename.includes('database') || filename.includes('data-layer')) return <Database size={16} />;
  if (filename.includes('monitoring')) return <Activity size={16} />;
  if (filename.includes('backup')) return <HardDrive size={16} />;
  if (filename.includes('setup') || filename.includes('foundation')) return <Terminal size={16} />;
  if (filename.includes('stack')) return <Cpu size={16} />;
  return <Server size={16} />;
};

const App = () => {
  const [docs, setDocs] = useState({});
  const [selectedDoc, setSelectedDoc] = useState('README.md');
  const [content, setContent] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);

  useEffect(() => {
    const logs = [
      "INITIALIZING VPS_HANDBOOK_CORE...",
      "LOADING ASSETS [####################] 100%",
      "DECRYPTING MARKDOWN FILES...",
      "ESTABLISHING SECURE CONNECTION...",
      "SYSTEM READY. WELCOME OPERATOR."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const docEntries = docIndex.map(file => [file.name, file.content]);
    const sortedDocs = Object.fromEntries(
      docEntries.sort(([nameA], [nameB]) => {
        if (nameA === 'README.md') return -1;
        if (nameB === 'README.md') return 1;
        return nameA.localeCompare(nameB);
      })
    );
    setDocs(sortedDocs);
    setContent(sortedDocs['README.md'] || '');
  }, []);

  useEffect(() => {
    if (docs[selectedDoc]) {
      setContent(docs[selectedDoc]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedDoc, docs]);

  const filteredDocs = useMemo(() => {
    return Object.keys(docs).filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [docs, searchQuery]);

  const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    return (
      <button onClick={handleCopy} className="copy-btn">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div key="copied" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex-center gap-2 text-green">
              <CheckCircle2 size={12} /> <span className="mono-xs">COPIED</span>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex-center gap-2 text-gray">
              <Copy size={12} /> <span className="mono-xs">COPY</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  };

  const CustomComponents = {
    p: (props) => {
      const text = props.children?.toString() || '';
      if (text.includes('[SIM:FIREWALL]')) return <FirewallSimulator />;
      if (text.includes('[SIM:SSH]')) return <SSHSimulator />;
      if (text.includes('[SIM:NGINX]')) return <NginxSimulator />;
      if (text.includes('[VIS:VPS_COMPARISON]')) return <VpsComparison />;
      if (text.includes('[VIS:DEPLOYMENT_FLOW]')) return <DeploymentFlow />;
      if (text.includes('[VIS:SETUP_STEPS]')) return <SetupSteps />;
      if (text.includes('[VIS:DNS_FLOW]')) return <DnsFlow />;
      if (text.includes('[VIS:DATA_ARCH]')) return <DataArch />;
      if (text.includes('[VIS:DOCKER_ARCH]')) return <DockerArch />;
      if (text.includes('[VIS:CICD_FLOW]')) return <CicdFlow />;
      if (text.includes('[VIS:MONITORING_STACK]')) return <MonitoringStack />;
      if (text.includes('[VIS:BACKUP_321]')) return <Backup321 />;
      return <p {...props} />;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeText = String(children).replace(/\n$/, '');
      if (!inline && match) {
        return (
          <div className="code-wrapper">
            <div className="code-lang">{match[1]}</div>
            <pre><code className={className} {...props}>{children}</code></pre>
            <CopyButton text={codeText} />
          </div>
        );
      }
      return <code className="inline-code" {...props}>{children}</code>;
    },
    li: (props) => (
      <li className="custom-li">
        <ChevronRight size={14} className="li-icon" />
        <span>{props.children}</span>
      </li>
    ),
  };

  if (isBooting) {
    return (
      <div className="boot-screen">
        <div className="boot-container">
          <div className="boot-header">
            <Server className="pulse" size={32} />
            <h1 className="boot-title">VPS HANDBOOK TERMINAL</h1>
          </div>
          <div className="boot-logs">
            {bootLogs.map((log, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="boot-log-line">
                <span className="log-idx">[{idx.toString().padStart(2, '0')}]</span>
                <span className={idx === bootLogs.length - 1 ? "log-active" : "log-text"}>{log}</span>
              </motion.div>
            ))}
            {bootLogs.length < 5 && <div className="cursor" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-root">
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: isSidebarOpen ? 'var(--sidebar-width)' : '0', transform: isSidebarOpen ? 'none' : 'translateX(-100%)' }}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo"><Server size={20} /></div>
            <div>
              <div className="brand-name">OPS HANDBOOK</div>
              <div className="brand-version">v2.4.0-STABLE</div>
            </div>
          </div>
          <div className="search-container">
            <Search className="search-icon" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH MODULES..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="nav-list">
          {filteredDocs.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedDoc(name)}
              className={`nav-item ${selectedDoc === name ? 'active' : ''}`}
            >
              <span className="nav-icon">{getIcon(name)}</span>
              <span className="nav-text">{name.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' ')}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="status-line">
            <span>SYSTEM STATUS:</span>
            <span className="status-active">● ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ marginLeft: isSidebarOpen ? 'var(--sidebar-width)' : '0' }}>
        <header className="header">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
            <BookOpen size={20} />
          </button>
          <div className="header-info">
            <div className="header-meta">
              <span><Info size={12}/> HELP</span>
              <div className="divider" />
              <span><Activity size={12}/> LOGS</span>
            </div>
            <div className="header-title">{selectedDoc.toUpperCase()}</div>
          </div>
        </header>

        <div className="container">
          <motion.div
            key={selectedDoc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="prose"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={CustomComponents}>
              {content}
            </ReactMarkdown>

            {/* Pro-Tip Block */}
            <div className="tip-card">
              <div className="tip-header">
                <AlertTriangle size={18} />
                <span>OPERATIONAL CONTEXT</span>
              </div>
              <p>Langkah-langkah di atas adalah standar industri untuk deployment produksi. Pastikan Anda memiliki snapshot VPS sebelum melakukan perubahan besar.</p>
              <div className="tip-actions">
                <button className="btn-secondary">VIEW ARCHITECTURE</button>
                <button className="btn-ghost">TROUBLESHOOTING</button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <footer className="footer">
          <p>© 2026 VPS OPERATIONS HANDBOOK • TERMINAL ACCESS v2.4</p>
        </footer>
      </main>

      <style>{`
        .flex-center { display: flex; align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .divider { width: 1px; height: 12px; background: var(--border-color); margin: 0 1rem; }
        .text-green { color: var(--accent-primary); }
        .text-gray { color: var(--text-secondary); }
        .mono-xs { font-size: 10px; font-family: var(--font-mono); font-weight: bold; }
        
        .brand { display: flex; align-items: center; gap: 0.75rem; }
        .brand-logo { width: 40px; height: 40px; background: rgba(0,255,65,0.1); border: 1px solid var(--accent-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); }
        .brand-name { font-size: 0.8rem; font-family: var(--font-mono); font-weight: bold; }
        .brand-version { font-size: 0.6rem; color: var(--text-secondary); letter-spacing: 0.2em; }
        
        .search-icon { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); }
        .nav-icon { opacity: 0.6; }
        .active .nav-icon { opacity: 1; }
        .nav-text { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
        
        .sidebar-footer { padding: 1rem 1.5rem; background: rgba(0,0,0,0.2); border-top: 1px solid var(--border-color); }
        .status-line { display: flex; justify-content: space-between; font-size: 0.65rem; font-family: var(--font-mono); color: var(--text-secondary); }
        .status-active { color: var(--accent-primary); animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        
        .toggle-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 4px; }
        .toggle-btn:hover { background: rgba(255,255,255,0.05); color: white; }
        .header-info { display: flex; align-items: center; gap: 2rem; }
        .header-meta { display: flex; align-items: center; font-size: 0.6rem; font-family: var(--font-mono); color: var(--text-secondary); letter-spacing: 0.1em; }
        .header-title { font-size: 0.75rem; font-family: var(--font-mono); color: var(--accent-primary); }
        
        .copy-btn { position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
        .copy-btn:hover { background: rgba(255,255,255,0.1); }
        .code-wrapper { position: relative; }
        .code-lang { position: absolute; top: -0.75rem; left: 1rem; background: #0D0D0F; padding: 0.2rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary); text-transform: uppercase; z-index: 10; }
        .inline-code { background: rgba(0,255,65,0.1); color: var(--accent-primary); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85em; }
        
        .custom-li { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; }
        .li-icon { margin-top: 0.25rem; color: var(--accent-primary); opacity: 0.5; }
        
        .boot-screen { position: fixed; inset: 0; background: var(--bg-color); z-index: 100; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); }
        .boot-container { width: 100%; max-width: 400px; padding: 2rem; }
        .boot-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .boot-title { font-size: 1.1rem; margin: 0; border: none; }
        .boot-logs { font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .boot-log-line { display: flex; gap: 1rem; }
        .log-idx { color: #444; }
        .log-active { color: var(--accent-primary); }
        .log-text { color: #888; }
        
        .tip-card { margin-top: 5rem; padding: 2rem; background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 12px; }
        .tip-header { display: flex; align-items: center; gap: 0.75rem; color: var(--accent-secondary); font-family: var(--font-mono); font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; }
        .tip-card p { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
        .tip-actions { display: flex; gap: 1rem; }
        .btn-secondary { background: rgba(0, 229, 255, 0.1); border: 1px solid var(--accent-secondary); color: var(--accent-secondary); padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.65rem; font-family: var(--font-mono); cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(0, 229, 255, 0.2); }
        .btn-ghost { background: none; border: 1px solid var(--border-color); color: white; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.65rem; font-family: var(--font-mono); cursor: pointer; }
        .btn-ghost:hover { background: rgba(255,255,255,0.05); }
        
        .footer { padding: 4rem 0; border-top: 1px solid var(--border-color); margin-top: 4rem; text-align: center; }
        .footer p { font-size: 0.6rem; font-family: var(--font-mono); color: var(--text-secondary); letter-spacing: 0.2em; }
      `}</style>
    </div>
  );
};

export default App;
