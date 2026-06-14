import React, { useState } from 'react';
import { User, Award, Shield, Settings, Bell, HelpCircle, Flame, Check, CheckCircle2, Save } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function ProfileView({ profile, setProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);
  const fitnessGoals = ['Beginners', 'Weight Loss', 'Bodybuilder', 'Powerlifter', 'Athletic'];

  const handleToggleSetting = (key: keyof UserProfile['settings']) => {
    setProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !prev.settings[key]
      }
    }));
  };

  const handleSelectGoal = (goal: string) => {
    setProfile((prev) => ({
      ...prev,
      fitnessGoal: goal
    }));
  };

  const getInitials = (nameString: string) => {
    if (!nameString) return 'FW';
    const parts = nameString.trim().split(/\s+/);
    if (parts.length === 0) return 'FW';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || '')).substring(0, 2).toUpperCase();
  };

  const triggerSaveNotification = () => {
    setIsEditing(false);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
    }, 3000);
  };

  // Convert settings labels for easy scanning
  const settingItems = [
    { key: 'restTimerAlerts', label: 'Rest Timer Alerts', desc: 'Alert when workout rest interval elapses.' },
    { key: 'videoTutorials', label: 'Instructional Videos Autoplay', desc: 'Pre-load YouTube clips during workouts.' },
    { key: 'aiCoachReminders', label: 'AI Health Coaching Reminders', desc: 'Push reminders for daily streak targets.' },
    { key: 'weeklyCheckIn', label: 'Weekly Performance Summaries', desc: 'E-mail custom progress breakdowns.' }
  ] as const;

  return (
    <div id="profile-view" className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-display tracking-wider text-white italic">ATHLETE BIO & SETTINGS</h2>
          <p className="text-xs text-white/40 mt-1 uppercase font-mono tracking-widest font-semibold">Tune your personal goal paths and workout configurations</p>
        </div>
        
        <div className="flex items-center gap-2 self-center sm:self-auto">
          {showSavedFeedback && (
            <span className="text-[10px] font-mono uppercase bg-green-500/10 border border-green-500/30 text-green-400 py-1 px-3 rounded-lg animate-pulse flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> CHANGES INSTANTLY SAVED
            </span>
          )}
          <button
            id="btn-toggle-edit-profile"
            onClick={() => {
              if (isEditing) {
                triggerSaveNotification();
              } else {
                setIsEditing(true);
              }
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              isEditing 
                ? 'bg-[#E24B4A] hover:bg-red-600 text-white shadow shadow-[#E24B4A]/40 scale-102 hover:scale-105 accent-glow' 
                : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5" /> Finish Editing
              </>
            ) : (
              <>
                <Settings className="w-3.5 h-3.5 text-[#E24B4A]" /> Tweak Bio Metrics
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Profile Header Avatar Card & Level progress */}
      <div className="glass-card border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Avatar frame */}
          <div className="w-18 h-18 rounded-full red-gradient text-white font-display text-2xl flex items-center justify-center shadow-lg shadow-[#E24B4A]/25 ring-4 ring-white/5 shrink-0 select-none animate-pulse">
            {getInitials(profile.name)}
          </div>
          <div className="space-y-1.5 w-full">
            <div className="flex flex-wrap items-center gap-2.5">
              {isEditing ? (
                <div className="flex flex-col gap-1 w-full max-w-xs">
                  <span className="text-[8.5px] font-mono text-white/40 uppercase tracking-widest">Edit Athlete Name</span>
                  <input
                    id="input-edit-profile-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value || '' }))}
                    className="bg-black/40 border border-white/10 text-white rounded px-3 py-1.5 font-sans text-base font-bold focus:outline-none focus:border-[#E24B4A] focus:ring-1 focus:ring-[#E24B4A] w-full"
                    placeholder="E.g. Fitness Warrior"
                    maxLength={30}
                  />
                </div>
              ) : (
                <h3 className="text-2xl font-bold text-white tracking-wide">{profile.name}</h3>
              )}
              
              {!isEditing && (
                <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold bg-[#E24B4A]/10 border border-[#E24B4A]/25 text-[#E24B4A] py-1 px-3 rounded-full shadow-glow select-none">
                  {profile.fitnessGoal.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs">
              {isEditing ? (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded px-2 py-1">
                  <Award className="w-3.5 h-3.5 text-[#E24B4A]" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-extrabold">Athlete Level:</span>
                  <input
                    id="input-edit-profile-level"
                    type="number"
                    min={1}
                    max={150}
                    value={profile.level}
                    onChange={(e) => setProfile(prev => ({ ...prev, level: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-14 bg-black/40 border border-white/10 text-white rounded px-1.5 py-0.5 text-xs text-center font-mono focus:outline-none focus:border-[#E24B4A]"
                  />
                </div>
              ) : (
                <p className="text-xs text-white/50 flex items-center gap-1.5 font-mono select-none">
                  <Award className="w-3.5 h-3.5 text-[#E24B4A]" /> LEVEL {profile.level} &bull; ACTIVE ATHLETE
                </p>
              )}
            </div>
          </div>
        </div>

        {/* XP Tracking bar right side */}
        <div className="w-full md:max-w-xs space-y-2 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-white/45 text-[9px] tracking-widest uppercase font-extrabold select-none">XP progress</span>
            {isEditing ? (
              <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-2 py-0.5">
                <input
                  id="input-edit-xp-current"
                  type="number"
                  min={0}
                  value={profile.xp}
                  onChange={(e) => setProfile(prev => ({ ...prev, xp: Math.max(0, parseInt(e.target.value) || 0) }))}
                  className="w-14 bg-transparent text-white text-center font-mono text-[11px] focus:outline-none"
                  title="Current XP"
                />
                <span className="text-white/30 text-[10px] select-none">/</span>
                <input
                  id="input-edit-xp-next"
                  type="number"
                  min={100}
                  value={profile.xpNext}
                  onChange={(e) => setProfile(prev => ({ ...prev, xpNext: Math.max(100, parseInt(e.target.value) || 1000) }))}
                  className="w-14 bg-transparent text-white text-center font-mono text-[11px] focus:outline-none"
                  title="Next Level XP Target"
                />
                <span className="text-white/40 text-[9px] font-bold select-none">XP</span>
              </div>
            ) : (
              <span className="font-mono text-white font-semibold text-xs">{profile.xp} / {profile.xpNext} XP</span>
            )}
          </div>
          {/* Progress outer track */}
          <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden border border-white/5">
            <div 
              id="profile-xp-progress"
              className="h-full red-gradient rounded-full transition-all duration-500  accent-glow"
              style={{ width: `${Math.min(100, (profile.xp / profile.xpNext) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-white/35 block text-right font-mono select-none">
            Level up to unlock high-tier olympic coaching tips
          </span>
        </div>
      </div>

      {/* Grid statistics highlights */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card border-white/5 rounded-xl p-4 text-center">
          <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold select-none">WORKOUTS DONE</span>
          {isEditing ? (
            <div className="relative mt-2">
              <input
                id="input-edit-workouts-completed"
                type="number"
                min={0}
                value={profile.workoutsCompleted}
                onChange={(e) => setProfile(prev => ({ ...prev, workoutsCompleted: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full bg-black/40 border border-white/10 text-white text-center rounded px-2 py-1 font-mono text-xs focus:outline-none focus:border-[#E24B4A]"
              />
            </div>
          ) : (
            <span className="text-white text-xl sm:text-2xl font-display font-medium block mt-1">{profile.workoutsCompleted}</span>
          )}
        </div>
        
        <div className="glass-card border-white/5 rounded-xl p-4 text-center">
          <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold select-none">DIET / WEIGHT</span>
          {isEditing ? (
            <div className="relative mt-2">
              <input
                id="input-edit-weight-progress"
                type="text"
                value={profile.weightProgress}
                onChange={(e) => setProfile(prev => ({ ...prev, weightProgress: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 text-white text-center rounded px-2 py-1 font-mono text-[10px] focus:outline-none focus:border-[#E24B4A]"
                placeholder="76.4 kg (73 kg Target)"
                maxLength={25}
              />
            </div>
          ) : (
            <span className="text-white text-sm sm:text-base font-bold block mt-3 font-mono">{profile.weightProgress}</span>
          )}
        </div>

        <div className="glass-card border-white/5 rounded-xl p-4 text-center">
          <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold select-none">STREAK DAYS</span>
          {isEditing ? (
            <div className="relative mt-2 flex items-center justify-center gap-1">
              <span className="text-xs select-none">🔥</span>
              <input
                id="input-edit-streak"
                type="number"
                min={0}
                value={profile.streak}
                onChange={(e) => setProfile(prev => ({ ...prev, streak: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-16 bg-black/40 border border-white/10 text-white text-center rounded px-1.5 py-1 font-mono text-xs focus:outline-none focus:border-[#E24B4A]"
              />
            </div>
          ) : (
            <span className="text-[#E24B4A] text-xl sm:text-2xl font-display font-medium block mt-1 accent-glow">🔥 {profile.streak}</span>
          )}
        </div>
      </div>

      {/* Fitness goal active selector */}
      <div className="glass-card border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
        <h4 className="text-sm font-bold text-white tracking-widest uppercase font-mono select-none">
          TARGET FITNESS GOAL
        </h4>
        <p className="text-xs text-white/50 leading-relaxed font-sans select-none">
          This dynamically informs the AI Coach's feedback priority, exercise weight setups, and target progression patterns.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fitnessGoals.map((g) => {
            const isSelected = profile.fitnessGoal === g;
            return (
              <button
                id={`btn-select-goal-${g}`}
                key={g}
                onClick={() => handleSelectGoal(g)}
                className={`flex items-center justify-between p-3.5 rounded-lg border font-bold text-xs uppercase tracking-wider transition duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-[#E24B4A]/10 border-[#E24B4A] text-white shadow shadow-[#E24B4A]/15 scale-102 font-bold'
                    : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10'
                }`}
              >
                <span>{g}</span>
                {isSelected && <CheckSquareIcon />}
              </button>
            );
          })}
        </div>
      </div>

      {/* App configuration options toggles */}
      <div className="glass-card border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
        <h4 className="text-sm font-bold text-white tracking-widest uppercase font-mono select-none">
          COACHING SETTINGS & PREFERENCES
        </h4>

        <div className="divide-y divide-white/5">
          {settingItems.map((item) => {
            const isChecked = profile.settings[item.key];
            return (
              <div 
                id={`setting-row-${item.key}`}
                key={item.key}
                onClick={() => handleToggleSetting(item.key)}
                className="flex items-center justify-between py-4.5 cursor-pointer first:pt-0 last:pb-0 group"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-semibold text-white block group-hover:text-[#E24B4A] transition-colors">
                    {item.label}
                  </span>
                  <p className="text-xs text-white/40 leading-snug font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Switch button tracker */}
                <button
                  id={`btn-setting-toggle-${item.key}`}
                  type="button"
                  className={`w-11 h-6 rounded-full p-1 relative flex items-center transition ease-in-out duration-300 pointer-events-none ${
                    isChecked ? 'bg-[#E24B4A] accent-glow' : 'bg-neutral-800'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 rounded-full bg-white shadow-md transform transition duration-300 ${
                      isChecked ? 'translate-x-5' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Small helper Check SVG
function CheckSquareIcon() {
  return (
    <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
      <Check className="w-3 h-3 text-white stroke-[3px]" />
    </div>
  );
}
