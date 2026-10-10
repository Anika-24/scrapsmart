import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistant from '@/components/assistant/AIAssistant';

export default function AppShell() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-background overflow-hidden">
=======
    <div className="flex h-screen bg-[#F4F7F5] overflow-hidden">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleAssistant={() => setAssistantOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
