import { useState } from 'react';
import { Dumbbell, Flame, Zap, Check, ArrowRight, Play } from 'lucide-react';
import { Exercise, GoalType } from '../types';

interface TrainViewProps {
  exercises: Exercise[];
  completedSets: Record<string, boolean[]>;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export default function TrainView({
  exercises,
  completedSets,
  toggleSetCompleted,
  onSelectExercise
}: TrainViewProps) {
  const [activeGoal, setActiveGoal] = useState<GoalType>('strength');

  const goals = [
    { id: 'strength', label: 'STRENGTH', desc: 'Build pure raw power and muscle fiber thickness.', icon: Dumbbell },
    { id: 'fat-loss', label: 'FAT LOSS & HIIT', desc: 'Burn high calories, enhance cardiovascular endurance.', icon: Flame },
    { id: 'athletic', label: 'ATHLETIC SPEED', desc: 'Maximize explosive power, coordination, and agility.', icon: Zap }
  ] as const;

  // Filter exercises by goal
  const filteredExercises = exercises.filter((ex) => ex.targetGoal === activeGoal);

  return (
    <div id="train-view" className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-display tracking-wider text-white italic">GOAL-BASED TRAINING HUBS</h2>
        <p className="text-xs text-white/40 mt-1 uppercase font-mono tracking-widest font-semibold">Select your core training goal to unlock specific exercises</p>
      </div>

      {/* Goal Selector Horizontal Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isActive = activeGoal === goal.id;
          return (
            <button
              id={`tab-goal-${goal.id}`}
              key={goal.id}
              onClick={() => setActiveGoal(goal.id)}
              className={`text-left p-4.5 rounded-xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5 cursor-pointer ${
                isActive 
                  ? 'bg-[#E24B4A]/10 border-[#E24B4A] shadow shadow-[#E24B4A]/10' 
                  : 'glass-card border-white/5 hover:border-white/10'
              }`}
            >
              {/* Backglow element */}
              {isActive && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E24B4A]/5 rounded-full blur-xl pointer-events-none" />
              )}
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-[#E24B4A] text-white' : 'bg-white/5 text-white/40 group-hover:text-white/80'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold font-mono tracking-widest ${isActive ? 'text-[#E24B4A]' : 'text-white/70'}`}>
                    {goal.label}
                  </h4>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-snug">
                    {goal.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Workout Exercise Deck list */}
      <div className="space-y-4">
        <h3 className="font-display text-xl flex items-center text-white font-bold select-none tracking-wider uppercase">
          RECOMMENDED PROTOCOLS ({filteredExercises.length}) <span className="ml-4 h-px flex-1 bg-white/10"></span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {filteredExercises.map((ex) => {
            const activeSets = completedSets[ex.id] || Array(ex.sets).fill(false);
            const completedCount = activeSets.filter(Boolean).length;
            const isFinished = completedCount === ex.sets;

            return (
              <div
                id={`exercise-card-${ex.id}`}
                key={ex.id}
                onClick={() => onSelectExercise(ex)}
                className={`group glass-card border-white/5 hover:border-white/15 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition duration-300 cursor-pointer ${
                  isFinished ? 'border-l-4 border-l-green-500/80 bg-green-500/[0.01]' : 'border-l-4 border-l-[#E24B4A]'
                }`}
              >
                {/* Left side: Exercise Metadata */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold text-[#E24B4A] bg-[#E24B4A]/10 border border-[#E24B4A]/25 px-2 rounded-full">
                      {ex.muscleGroup}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-white/40 font-semibold">
                      REST: {ex.rest}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-[#E24B4A] transition-colors leading-none">
                    {ex.name}
                  </h4>

                  <p className="text-xs text-white/50 max-w-xl leading-relaxed">
                    Target: <strong className="text-white">{ex.sets} sets × {ex.reps}</strong>. 
                    <span className="text-white/40 inline ml-1.5 font-mono">Focus: {ex.defaultTips[0].toLowerCase()}</span>
                  </p>
                </div>

                {/* Right side: Set Completion dots & Guide Action */}
                <div 
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Set Tracker dots */}
                  <div className="flex flex-col items-center sm:items-end gap-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-extrabold">
                      COMPLETION SET-LIST
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeSets.map((isDone, index) => (
                        <button
                          id={`btn-train-set-dot-${ex.id}-${index}`}
                          key={index}
                          onClick={() => toggleSetCompleted(ex.id, index)}
                          className={`w-7.5 h-7.5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center transition cursor-pointer hover:scale-110 ${
                            isDone 
                              ? 'bg-[#E24B4A] border-[#E24B4A] text-white shadow shadow-[#E24B4A]/25 accent-glow' 
                              : 'border-white/10 hover:border-white/30 text-white/50 bg-white/5'
                          }`}
                          title={`Toggle Set ${index + 1}`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : index + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    id={`btn-open-detail-${ex.id}`}
                    onClick={() => onSelectExercise(ex)}
                    className="h-10 px-4 rounded-lg bg-white/5 hover:bg-[#E24B4A] text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 border border-white/5 hover:border-transparent transition-all duration-200 cursor-pointer"
                  >
                    <span>Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E24B4A] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
