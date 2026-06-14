import { Sparkles, Dumbbell, Play, Award, Zap } from 'lucide-react';

interface LandingViewProps {
  onStartTraining: () => void;
  onViewPrograms: () => void;
}

export default function LandingView({ onStartTraining, onViewPrograms }: LandingViewProps) {
  const features = [
    {
      icon: Sparkles,
      title: 'AI COACHING',
      desc: 'Connect server-side with raw intelligence for feedback, form checks, and tailored nutrition guidelines instantly.'
    },
    {
      icon: Play,
      title: 'VIDEO GUIDES',
      desc: 'Unlock rich visual instruction cards for high-power exercises to protect your lower back and joints.'
    },
    {
      icon: Award,
      title: 'PROGRESS TRACKING',
      desc: 'Complete sets in style, level up your profile, earn XP, and preserve daily streaks towards your fitness goals.'
    }
  ];

  return (
    <div id="landing-page" className="min-h-screen bg-[#070707] text-white flex flex-col justify-between py-12 px-4 relative overflow-hidden font-sans select-none bg-linear-to-b from-black via-[#070707] to-[#0a0a0a] selection:bg-[#E24B4A]/30">
      {/* Background Decorative Elongated Red Lighting Ornaments */}
      <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] rounded-full bg-[#E24B4A]/10 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute left-[-150px] bottom-[-150px] w-[500px] h-[500px] rounded-full bg-red-800/10 blur-[130px] -z-10 pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center text-center mt-12 sm:mt-18 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E24B4A]/10 border border-[#E24B4A]/25 rounded-full mb-6 shadow-glow">
          <Zap className="w-4 h-4 text-[#E24B4A] animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-[#E24B4A] uppercase font-bold">NEXT GENERATION AI FITNESS</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider leading-none text-white select-none italic">
          FITNESS <span className="text-[#E24B4A]">WORLD</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm tracking-widest text-white/40 mt-4 max-w-lg uppercase font-light">
          YOUR AI-POWERED PERSONAL TRAINER
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-md">
          <button
            id="landing-cta-train"
            onClick={onStartTraining}
            className="flex-1 px-8 py-4 rounded-lg red-gradient font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E24B4A]/20 hover:scale-[1.02] active:scale-95 transition-all text-white cursor-pointer accent-glow"
          >
            Start Training
          </button>
          <button
            id="landing-cta-program"
            onClick={onViewPrograms}
            className="flex-1 px-8 py-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 font-bold uppercase tracking-wider text-xs transition-all text-white/70 hover:bg-white/[0.08] hover:text-white cursor-pointer"
          >
            View Programs
          </button>
        </div>
      </div>

      {/* Feature Bento Card Deck */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 pb-12">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              id={`landing-feature-card-${idx}`}
              key={idx}
              className="glass-card border-white/5 bg-white/[0.01] p-6 rounded-xl hover:border-[#E24B4A]/30 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-white/5 text-[#E24B4A] flex items-center justify-center mb-5 border border-white/5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold tracking-widest text-white mb-2 uppercase font-mono">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed font-sans mt-2">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
