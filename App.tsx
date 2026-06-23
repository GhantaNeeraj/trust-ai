import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { DashboardView } from './components/DashboardView';
import { AgentsView } from './components/AgentsView';
import { SettingsView } from './components/SettingsView';
import { ReportsView } from './components/ReportsView';

function AppContent() {
  const { currentView, isDarkMode } = useApp();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatView />;
      case 'dashboard':
        return <DashboardView />;
      case 'agents':
        return <AgentsView />;
      case 'settings':
        return <SettingsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-surface-900 transition-colors dark:bg-surface-900 dark:text-surface-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <motion.main
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {renderView()}
        </motion.main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
