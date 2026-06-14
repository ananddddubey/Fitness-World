import { Sparkles, Calendar, TrendingUp, HelpCircle, Check, Dumbbell, Award, ArrowUpRight } from 'lucide-react';
import { Exercise } from '../types';
import AIChat from './AIChat';

interface DashboardViewProps {
  exercises: Exercise[];
  completedSets: Record<string, boolean[]>;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
  onSelectExercise: (exercise: Exercise) => void;
  totalWorkoutsCompleted: number;
  streakDays: number;
}

export default function DashboardView({
  exercises,
  completedSets,
  toggleSetCompleted,
  onSelectExercise,
  totalWorkoutsCompleted,
  streakDays
}: DashboardViewProps) {
  // Grab a couple of recommended today's exercises
  const todaysExercises = exercises.slice(0, 3);

  // Compute stats:
  // Sessions: totalWorkoutsCompleted
  // Sets Done: iterate all values in completedSets and count `true`
  let totalSetsDone = 0;
  Object.values(completedSets).forEach(sets => {
    sets.forEach(done => {
      if (done) totalSetsDone++;
    });
  });

  // Completion Percentage: Out of those 3 exercises (todaysExercises) or total tracked
  const totalTargetSets = todaysExercises.reduce((acc, curr) => acc + curr.sets, 0);
  let todaysSetsDone = 0;
  todaysExercises.forEach(ex => {
    const sets = completedSets[ex.id] || Array(ex.sets).fill(false);
    sets.forEach(done => {
      if (done) todaysSetsDone++;
    });
  });

  const completionRate = totalTargetSets > 0 
    ? Math.round((todaysSetsDone / totalTargetSets) * 100) 
    : 0;

  // Get current day string
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div id="dashboard-view" className="space-y-8 max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Header Greeting layout following Immersive UI Header Spec */}
      <header className="flex items-center justify-between py-6 px-8 glass-card rounded-2xl border-white/5 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E24B4A]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div>
          <h2 className="font-display text-3xl sm:text-4xl italic tracking-wider text-white">READY TO GRIND?</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E24B4A]" /> {currentDayName} &bull; {formattedDate}
          </p>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">STREAK</p>
            <p className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center justify-end gap-1">
              🔥 {streakDays} DAYS
            </p>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">STATUS</p>
            <p className="text-xs sm:text-sm text-[#E24B4A] font-bold font-mono tracking-widest flex items-center gap-1.5">
              ● TRAINING LIVE
            </p>
          </div>
        </div>
      </header>

      {/* AI Chat Box Section - Styled neatly with left brand border */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[#E24B4A] text-lg font-bold">✦</span>
          <h3 className="text-xs font-mono tracking-widest text-[#E24B4A] font-bold uppercase">
            AI COACHING INSIGHT & CHAT
          </h3>
        </div>
        <AIChat />
      </div>

      {/* Immersive Stats Deck & Weekly Volume Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stats columns */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Sessions done */}
            <div className="glass-card rounded-xl p-4 text-center border-white/5 flex flex-col justify-between h-28 relative">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block">SESSIONS</span>
              <span className="font-display text-3xl font-bold text-white block">{totalWorkoutsCompleted}</span>
              <span className="text-[8px] text-[#E24B4A] uppercase tracking-wider font-mono block">Completed</span>
            </div>

            {/* Sets logged */}
            <div className="glass-card rounded-xl p-4 text-center border-white/5 flex flex-col justify-between h-28 relative">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block">SETS DONE</span>
              <span className="font-display text-3xl font-bold text-white block">{totalSetsDone}</span>
              <span className="text-[8px] text-green-400 uppercase tracking-wider font-mono block">Logged</span>
            </div>

            {/* Completion rate */}
            <div className="glass-card rounded-xl p-4 text-center border-white/5 flex flex-col justify-between h-28 relative">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block">RATE</span>
              <span className="font-display text-3xl font-bold text-[#E24B4A] block">{completionRate}%</span>
              <span className="text-[8px] text-blue-400 uppercase tracking-wider font-mono block">Success</span>
            </div>
          </div>

          {/* Today's Workout Routine list */}
          <div className="space-y-4">
            <h3 className="font-display text-xl flex items-center text-white font-bold select-none tracking-wider">
              TODAY'S ROUTINE <span className="ml-4 h-px flex-1 bg-white/10"></span>
            </h3>

            <div className="grid gap-3">
              {todaysExercises.map((ex) => {
                const activeSets = completedSets[ex.id] || Array(ex.sets).fill(false);
                const doneCount = activeSets.filter(Boolean).length;
                const isAllDone = doneCount === ex.sets;

                return (
                  <div
                    id={`todays-workout-card-${ex.id}`}
                    key={ex.id}
                    onClick={() => onSelectExercise(ex)}
                    className={`glass-card p-4.5 flex items-center justify-between gap-4 transition-all duration-300 hover:border-white/10 cursor-pointer ${
                      isAllDone ? 'border-l-4 border-l-green-500/80' : 'border-l-4 border-l-[#E24B4A]'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-lg select-none border border-white/5">
                        🏋️
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">{ex.name}</p>
                        <p className="text-[10px] text-white/45 uppercase tracking-wider truncate font-medium mt-0.5">
                          {ex.muscleGroup} &bull; Controlled Power
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-8 shrink-0">
                      <div className="text-center min-w-[55px]">
                        <p className="text-[9px] text-white/40 font-mono tracking-widest">REPS</p>
                        <p className="font-bold font-display text-white text-md tracking-wider">{ex.sets} × {ex.reps.replace('reps', '')}</p>
                      </div>

                      <div className="hidden sm:block text-center">
                        <p className="text-[9px] text-white/40 font-mono tracking-widest">TRACK</p>
                        <div className="flex gap-1 mt-1">
                          {activeSets.map((isDone, index) => (
                            <span 
                              key={index} 
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${isDone ? 'bg-[#E24B4A] accent-glow' : 'bg-white/10'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <button 
                        id={`btn-open-detail-dash-${ex.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectExercise(ex);
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-[#E24B4A] rounded text-[10px] font-bold tracking-widest uppercase transition-all duration-200 hover:scale-105"
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weekly Volume visualization column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-white/5 rounded-2xl h-full">
            <div>
              <h4 className="font-display text-lg text-white/70 tracking-wide uppercase font-semibold">Weekly Volume</h4>
              <p className="text-[10px] text-white/35 mt-0.5 font-mono">OVERALL LOAD PROFILE BY SECURED REPS</p>
            </div>
            
            <div className="flex items-end justify-between h-40 px-2 mt-6">
              <div className="w-8 bg-[#E24B4A]/20 h-20 rounded-t transition-all duration-300 hover:bg-[#E24B4A]/40" title="Monday volume"></div>
              <div className="w-8 bg-[#E24B4A]/40 h-28 rounded-t transition-all duration-300 hover:bg-[#E24B4A]/60" title="Tuesday volume"></div>
              <div className="w-8 bg-[#E24B4A]/30 h-16 rounded-t transition-all duration-300 hover:bg-[#E24B4A]/50" title="Wednesday volume"></div>
              <div className="w-8 bg-[#E24B4A] accent-glow h-36 rounded-t transition-all duration-300" title="Thursday volume: LIVE"></div>
              <div className="w-8 bg-neutral-800 h-12 rounded-t hover:bg-neutral-700" title="Friday plan"></div>
              <div className="w-8 bg-neutral-800 h-10 rounded-t hover:bg-neutral-700" title="Saturday plan"></div>
              <div className="w-8 bg-neutral-800 h-14 rounded-t hover:bg-neutral-700" title="Sunday plan"></div>
            </div>
            
            <div className="flex justify-between mt-3 text-[9px] text-white/30 font-display font-medium px-2 tracking-widest">
              <p>MON</p>
              <p>TUE</p>
              <p>WED</p>
              <p>THU</p>
              <p>FRI</p>
              <p>SAT</p>
              <p>SUN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
