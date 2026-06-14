import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Clock, Dumbbell, Sparkles, Award, Star, Zap, Activity } from 'lucide-react';
import { UserProfile, WorkoutDay } from '../types';
import { WEEKLY_PROGRAMS } from '../data';

interface ProgramViewProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function ProgramView({ profile, setProfile }: ProgramViewProps) {
  // Derive current day to expand it on initial mount
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];

  const [expandedDay, setExpandedDay] = useState<string | null>(currentDayName);

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleSelectGoal = (goal: string) => {
    setProfile((prev) => ({
      ...prev,
      fitnessGoal: goal
    }));
  };

  const goals = [
    { 
      key: 'Beginners', 
      label: 'Beginner Prep', 
      desc: 'Form activation, joints adaptation, low fatigue baseline development.' 
    },
    { 
      key: 'Weight Loss', 
      label: 'Weight Loss', 
      desc: 'Metabolic HIIT density, cardiovascular fat burner, calorie crunch.' 
    },
    { 
      key: 'Bodybuilder', 
      label: 'Bodybuilder', 
      desc: 'Sarcoplasmic hypertrophy, maximum isolation volume, muscle pump.' 
    },
    { 
      key: 'Powerlifter', 
      label: 'Powerlifter', 
      desc: 'Maximum neural strength, low reps, heavy compound squats/benches/pulls.' 
    },
    { 
      key: 'Athletic', 
      label: 'Athletic Speed', 
      desc: 'Triple-extension explosiveness, sprint speed, joints elastic springiness.' 
    }
  ];

  // Look up current program; fallback to Bodybuilder if missing
  const currentGoalKey = profile.fitnessGoal || 'Bodybuilder';
  const weeklyProgram: WorkoutDay[] = WEEKLY_PROGRAMS[currentGoalKey] || WEEKLY_PROGRAMS['Bodybuilder'];

  // Detail context for the selected split
  const getGoalThemeInfo = (goalKey: string) => {
    switch (goalKey) {
      case 'Powerlifter':
        return {
          title: 'POWERLIFTER (PRO NEURAL MAXIMAL FORCE)',
          accent: 'Squats, Bench Presses & Deadlifts geared for highest structural output.',
          weeks: 'Week 4 / 12',
          focus: 'Neuromuscular efficiency & maximum load capacity'
        };
      case 'Bodybuilder':
        return {
          title: 'BODYBUILDER (ADVANCED METABOLIC HYPERTROPHY)',
          accent: 'Isolation volume splits designed to stimulate max muscle fiber retention.',
          weeks: 'Week 3 / 8',
          focus: 'Target muscle tension & continuous pump mechanics'
        };
      case 'Beginners':
        return {
          title: 'BEGINNER STRIDE (FORM & ENDURANE ADAPTATION)',
          accent: 'Foundational joint strength, safe biomechanics, and consistent habit baseline.',
          weeks: 'Week 1 / 6',
          focus: 'Perfecting basic patterns & tendon protection'
        };
      case 'Weight Loss':
        return {
          title: 'FAT SHRED (METABOLIC RATE PEAK DENSITY)',
          accent: 'Calorie-burning HIIT complexes designed for high cardiovascular output.',
          weeks: 'Week 5 / 8',
          focus: 'Aerobic threshold expansion & active fat oxidation'
        };
      case 'Athletic':
        default:
        return {
          title: 'ATHLETIC SPEED (ELASTIC PLYOMETRICS & FORCE)',
          accent: 'Agility, sprint endurance, and explosive triple extensions.',
          weeks: 'Week 2 / 8',
          focus: 'Rate of force development & multi-planar agility'
        };
    }
  };

  const themeInfo = getGoalThemeInfo(currentGoalKey);

  return (
    <div id="program-view" className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in text-white select-none">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-display tracking-wider italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#E24B4A]">8-WEEK STRENGTH SPLITS & PLANS</h2>
        <p className="text-xs text-white/40 mt-1 uppercase font-mono tracking-widest font-semibold">Switch your training split pattern to instantly rebuild your customized 7-day routine</p>
      </div>

      {/* CHOOSE YOUR TRAINING SPLIT SCREEN OPTION */}
      <div className="glass-card border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#E24B4A] animate-pulse" />
          <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-white/80">SELECT ATHLETE ROUTINE SPLIT</h3>
        </div>
        
        <p className="text-xs text-white/45 leading-relaxed font-sans">
          Each program dynamically recalibrates your target exercises, rep schemes, rest periods, and active recovery days. Tap any box below to switch:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {goals.map((g) => {
            const isSelected = currentGoalKey === g.key;
            return (
              <button
                id={`btn-split-selector-${g.key}`}
                key={g.key}
                onClick={() => handleSelectGoal(g.key)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#E24B4A]/10 border-[#E24B4A] shadow-md shadow-[#E24B4A]/15 scale-[1.03]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#E24B4A]' : 'text-white/80'}`}>
                    {g.key}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#E24B4A] animate-ping" />
                  )}
                </div>
                <p className="text-[10px] text-white/45 leading-normal font-sans line-clamp-3">
                  {g.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program Introductory Header Card */}
      <div className="glass-card bg-gradient-to-br from-[#121212] to-[#070707] border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-glow">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E24B4A]/10 border border-[#E24B4A]/25 text-[#E24B4A] text-[9px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> ACTIVE WORKOUT STRUCTURE
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide uppercase font-mono">{themeInfo.title}</h3>
          <p className="text-xs text-white/50 max-w-xl leading-relaxed font-sans">
            {themeInfo.accent} Focus on <span className="text-[#E24B4A] font-medium">{themeInfo.focus}</span>. Ensure progressive loads are charted in your active training desk.
          </p>
        </div>
        <div className="bg-white/5 px-5 py-4 rounded-xl border border-white/5 text-center shrink-0 w-full sm:w-auto hover:border-[#E24B4A]/30 transition-all duration-300">
          <span className="text-[9px] text-white/40 font-mono tracking-widest block font-bold">COMPLETION INTERVAL</span>
          <span className="text-[#E24B4A] text-xl font-display tracking-widest block font-bold mt-1 uppercase italic">{themeInfo.weeks}</span>
        </div>
      </div>

      {/* Accordion List for Monday - Sunday */}
      <div className="space-y-3 font-sans">
        {weeklyProgram.map((item) => {
          const isToday = item.day === currentDayName;
          const isExpanded = expandedDay === item.day;

          return (
            <div
              id={`program-accordion-day-${item.day}`}
              key={item.day}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isToday 
                  ? 'border-[#E24B4A] shadow shadow-[#E24B4A]/10 bg-[#E24B4A]/[0.02]' 
                  : 'border-white/5 bg-[#0f0f0f] hover:border-white/10'
              }`}
            >
              {/* Accordion Trigger Header Button */}
              <button
                id={`btn-toggle-day-${item.day}`}
                onClick={() => toggleDay(item.day)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition relative cursor-pointer ${
                  isExpanded ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Date dot marker */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-wider font-mono ${
                    isToday
                      ? 'bg-[#E24B4A] text-white shadow-md shadow-[#E24B4A]/20 accent-glow'
                      : 'bg-white/5 text-white/40'
                  }`}>
                    {item.day.slice(0, 3)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                        {item.day}
                      </h4>
                      {isToday && (
                        <span className="text-[8px] font-mono tracking-widest uppercase bg-[#E24B4A]/15 border border-[#E24B4A]/30 text-[#E24B4A] py-0.5 px-2 rounded-full font-extrabold shadow-glow">
                          TODAY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 font-light mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-white/35 mr-2 uppercase tracking-wider">
                    {item.exercises.length} {item.exercises.length === 1 ? 'Focus' : 'Exercises'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white/40" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  )}
                </div>
              </button>

              {/* Collapsible content pane */}
              {isExpanded && (
                <div 
                  id={`program-expanded-pane-${item.day}`}
                  className="bg-black/20 p-5 border-t border-t-white/5 space-y-4 animate-slide-up"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.exercises.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="glass-card border-white/5 p-4 rounded-lg flex items-start gap-3.5 transition duration-200 hover:border-[#E24B4A]/30 hover:bg-white/[0.01]"
                      >
                        <div className="w-7 h-7 rounded bg-[#E24B4A]/10 border border-[#E24B4A]/20 flex items-center justify-center shrink-0">
                          <Dumbbell className="w-4 h-4 text-[#E24B4A]" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white tracking-wide">{ex.name}</h5>
                          <p className="text-[10px] text-[#E24B4A] font-mono tracking-widest font-bold mt-1">
                            {ex.target.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Program Day action advice */}
                  <div className="pt-2.5 flex items-center gap-3 border-t border-white/5 justify-between text-[11px] text-white/40">
                    <span className="block flex items-center gap-1.5 uppercase font-mono tracking-wider font-semibold">
                      <Clock className="w-4 h-4 text-[#E24B4A]" /> Average Session: 50-65 mins
                    </span>
                    <span className="text-[#E24B4A] block font-mono font-bold uppercase tracking-wider text-[10px]">
                      * Control the eccentric contraction & hydrate well
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
