import { Home, Dumbbell, Calendar, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'train', label: 'Train', icon: Dumbbell },
    { id: 'program', label: 'Program', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <>
      {/* Bottom fixed navigation bar - Mobile */}
      <nav 
        id="mobile-nav"
        className="fixed bottom-0 left-0 right-0 z-40 block bg-[#121212]/95 backdrop-blur-md border-t border-[#242424] px-4 py-2 sm:hidden shadow-lg shadow-black"
      >
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`btn-nav-mobile-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 relative group"
              >
                <div 
                  className={`p-1.5 rounded-lg transition-transform duration-300 ${
                    isActive 
                      ? 'text-[#E24B4A] scale-110' 
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span 
                  className={`text-[10px] mt-0.5 tracking-wide transition-colors ${
                    isActive ? 'text-[#E24B4A] font-bold' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 w-1.5 h-1.5 bg-[#E24B4A] rounded-full shadow-md shadow-[#E24B4A]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Side navigation rail - Desktop */}
      <aside 
        id="desktop-nav"
        className="hidden sm:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#0f0f0f] border-r border-white/5 p-8 text-white z-40"
      >
        {/* Gym Brand Logo */}
        <div className="mb-10">
          <h1 className="font-display text-3xl text-[#E24B4A] italic tracking-wide leading-none select-none">FITNESS WORLD</h1>
          <p className="text-[10px] opacity-40 -mt-0.5 tracking-widest text-white/50 font-bold">AI-POWERED PERFORMANCE</p>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest px-2 mb-4">Main Menu</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`btn-nav-desktop-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-[#E24B4A]/10 text-[#E24B4A] border-r-3 border-r-[#E24B4A]' 
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-[#E24B4A] scale-110' : 'text-white/55 group-hover:scale-105'
                    }`} 
                  />
                  <span className={`text-sm font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Desktop Footer Credits */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-display border border-[#E24B4A] text-sm font-semibold tracking-wide italic text-white">
              FW
            </div>
            <div>
              <p className="text-xs font-bold text-white">Warrior #802</p>
              <p className="text-[10px] text-white/40 font-mono">Level 7 — Intermediate</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
