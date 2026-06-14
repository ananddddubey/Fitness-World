import { useState, useEffect } from 'react';
import { Dumbbell, Sparkles, ChevronLeft, Calendar, Award } from 'lucide-react';
import { EXERCISES, WEEKLY_PROGRAMS, INITIAL_PROFILE } from './data';
import { Exercise, UserProfile } from './types';
import Navigation from './components/Navigation';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';
import TrainView from './components/TrainView';
import ProgramView from './components/ProgramView';
import ProfileView from './components/ProfileView';
import DetailSheet from './components/DetailSheet';

export default function App() {
  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const saved = localStorage.getItem('fw_show_landing');
    return saved ? JSON.parse(saved) : true;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('fw_active_tab');
    return saved || 'dashboard';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fw_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Keep track of which sets have been logged completed
  // Format: { [exerciseId]: [set0_done, set1_done, set2_done, ...] }
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(() => {
    const saved = localStorage.getItem('fw_completed_sets');
    if (saved) return JSON.parse(saved);

    // Initialize set arrays based on exercise counts
    const initial: Record<string, boolean[]> = {};
    EXERCISES.forEach((ex) => {
      initial[ex.id] = Array(ex.sets).fill(false);
    });
    return initial;
  });

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fw_show_landing', JSON.stringify(showLanding));
  }, [showLanding]);

  useEffect(() => {
    localStorage.setItem('fw_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('fw_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fw_completed_sets', JSON.stringify(completedSets));
  }, [completedSets]);

  // Handle set toggling completion
  const toggleSetCompleted = (exerciseId: string, setIndex: number) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseId] ? [...prev[exerciseId]] : [];
      
      // Ensure it has adequate slots
      const matchingEx = EXERCISES.find((ex) => ex.id === exerciseId);
      const targetSetsCount = matchingEx ? matchingEx.sets : 4;
      
      while (current.length < targetSetsCount) {
        current.push(false);
      }

      const wasAlreadyAllDone = current.filter(Boolean).length === targetSetsCount;
      current[setIndex] = !current[setIndex];
      const isNowAllDone = current.filter(Boolean).length === targetSetsCount;

      // Rewards gamification: Award XP and Workout completion counters on finishing exercises!
      if (!wasAlreadyAllDone && isNowAllDone) {
        setProfile((prevProf) => {
          let newXp = prevProf.xp + 100;
          let newLevel = prevProf.level;
          if (newXp >= prevProf.xpNext) {
            newXp = newXp - prevProf.xpNext;
            newLevel += 1;
          }
          return {
            ...prevProf,
            xp: newXp,
            level: newLevel,
            workoutsCompleted: prevProf.workoutsCompleted + 1,
            streak: prevProf.streak + (prevProf.streak === 0 ? 1 : 0) // Boost streak initial if 0
          };
        });
      }

      return {
        ...prev,
        [exerciseId]: current
      };
    });
  };

  const handleStartTraining = () => {
    setShowLanding(false);
    setActiveTab('dashboard');
  };

  const handleViewPrograms = () => {
    setShowLanding(false);
    setActiveTab('program');
  };

  // Render respective tabs content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            exercises={EXERCISES}
            completedSets={completedSets}
            toggleSetCompleted={toggleSetCompleted}
            onSelectExercise={(ex) => setSelectedExercise(ex)}
            totalWorkoutsCompleted={profile.workoutsCompleted}
            streakDays={profile.streak}
          />
        );
      case 'train':
        return (
          <TrainView
            exercises={EXERCISES}
            completedSets={completedSets}
            toggleSetCompleted={toggleSetCompleted}
            onSelectExercise={(ex) => setSelectedExercise(ex)}
          />
        );
      case 'program':
        return <ProgramView profile={profile} setProfile={setProfile} />;
      case 'profile':
        return <ProfileView profile={profile} setProfile={setProfile} />;
      default:
        return (
          <DashboardView
            exercises={EXERCISES}
            completedSets={completedSets}
            toggleSetCompleted={toggleSetCompleted}
            onSelectExercise={(ex) => setSelectedExercise(ex)}
            totalWorkoutsCompleted={profile.workoutsCompleted}
            streakDays={profile.streak}
          />
        );
    }
  };

  if (showLanding) {
    return (
      <LandingView
        onStartTraining={handleStartTraining}
        onViewPrograms={handleViewPrograms}
      />
    );
  }

  return (
    <div id="full-app-root" className="min-h-screen bg-[#070707] text-white flex flex-col font-sans">
      
      {/* Sidebar Desktop Structure vs Bottom Mobile structure */}
      <div className="flex-1 flex flex-col sm:flex-row pb-18 sm:pb-0">
        
        {/* Navigation components sticky sidebar desktop / bottom mobile */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Primary Screen Area Panel */}
        <main className="flex-1 min-w-0 sm:ml-64 p-4 sm:p-8 md:p-10 relative bg-linear-to-b from-black via-[#070707] to-[#0d0a0a]">
          
          {/* Top visual navigation header bar - Desktop standard utility credits */}
          <header className="hidden sm:flex justify-between items-center mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <button 
                id="btn-back-to-landing"
                onClick={() => setShowLanding(true)}
                className="text-xs font-mono font-bold text-white/40 hover:text-white flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#E24B4A]" /> Landing Intro
              </button>
              <span className="text-white/20">/</span>
              <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-[#E24B4A]">
                {activeTab} module
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Profile Pill */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-[#E24B4A] shadow shadow-[#E24B4A]/50 animate-pulse" />
                <span className="text-xs font-semibold text-white/55 font-sans tracking-wide">
                  Level {profile.level} &bull; {profile.xp} / {profile.xpNext} XP
                </span>
              </div>
            </div>
          </header>

          {/* Active module selection viewport */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Sliding Dialog Sheet Bottom drawer overlay */}
      {selectedExercise && (
        <DetailSheet
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          completedSets={completedSets}
          toggleSetCompleted={toggleSetCompleted}
        />
      )}
    </div>
  );
}
