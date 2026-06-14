import { useState, useEffect } from 'react';
import { X, Play, Clock, Award, Sparkles, Youtube, CheckCircle } from 'lucide-react';
import { Exercise } from '../types';

interface DetailSheetProps {
  exercise: Exercise;
  onClose: () => void;
  completedSets: Record<string, boolean[]>;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
}

export default function DetailSheet({
  exercise,
  onClose,
  completedSets,
  toggleSetCompleted
}: DetailSheetProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [aiTips, setAiTips] = useState<string>('');
  const [isLoadingTips, setIsLoadingTips] = useState(false);

  const activeSets = completedSets[exercise.id] || Array(exercise.sets).fill(false);
  const completedCount = activeSets.filter(Boolean).length;

  useEffect(() => {
    // Reset video state
    setIsPlayingVideo(false);

    // Fetch AI coaching tips on load
    const fetchCoachingTips = async () => {
      setIsLoadingTips(true);
      setAiTips('');
      try {
        const response = await fetch('/api/trainer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: `Could you give me some quick, energetic, expert tips on form correction and avoiding injury specifically for ${exercise.name}? Keep the focus on maximizing power and safety.`,
            context: `${exercise.name} targeting ${exercise.muscleGroup}`
          })
        });

        if (!response.ok) throw new Error();
        const data = await response.json();
        setAiTips(data.answer);
      } catch (err) {
        // Fallback to static tips combined in data
        setAiTips(exercise.defaultTips.join(' '));
      } finally {
        setIsLoadingTips(false);
      }
    };

    fetchCoachingTips();
  }, [exercise]);

  return (
    <div 
      id="detail-sheet-backdrop"
      className="fixed inset-0 bg-[#0f0f0f]/85 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="detail-sheet-container"
        className="w-full sm:max-w-2xl bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-slide-up shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-white/5 bg-white/[0.02]">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#E24B4A] font-bold">
              {exercise.muscleGroup}
            </span>
            <h2 className="text-2xl font-display uppercase tracking-wider text-white italic leading-none mt-1">
              {exercise.name}
            </h2>
          </div>
          <button
            id="close-sheet-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 text-white/40 hover:text-white flex items-center justify-center transition hover:scale-105 cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Video Placeholder or Real Embedded Youtube Video */}
          <div className="w-full rounded-xl overflow-hidden bg-black aspect-video relative group border border-white/5 shadow-lg">
            {isPlayingVideo && exercise.videoUrlPlaceholder ? (
              <iframe
                id="exercise-video-iframe"
                src={`https://www.youtube.com/embed/${exercise.videoUrlPlaceholder}?autoplay=1&mute=1`}
                title={`${exercise.name} video guide`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div 
                id="video-poster"
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative"
                onClick={() => setIsPlayingVideo(true)}
              >
                {/* Background artistic mesh simulation or screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-[#E24B4A]/10 mix-blend-color-burn" />
                
                {/* Centered Play Button */}
                <div className="w-16 h-16 rounded-full bg-[#E24B4A]/90 text-white flex items-center justify-center shadow-lg shadow-[#E24B4A]/40 group-hover:scale-110 group-hover:bg-[#E24B4A] transition-all duration-300 z-10">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                
                <div className="mt-4 z-10">
                  <span className="text-xs uppercase tracking-widest text-white font-bold font-mono">
                    Watch Instructional Guide
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#E24B4A] flex items-center justify-center gap-1.5 mt-1 font-bold">
                    <Youtube className="w-4 h-4 text-red-500" /> STREAM DEMONSTRATION
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card border-white/5 rounded-xl p-3 text-center">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold">TARGET ENGINE</span>
              <span className="text-white text-xs font-semibold block mt-1 truncate">{exercise.muscleGroup}</span>
            </div>
            <div className="glass-card border-white/5 rounded-xl p-3 text-center">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold">SETS × REPS</span>
              <span className="text-[#E24B4A] text-xs font-bold block mt-1">{exercise.sets} × {exercise.reps}</span>
            </div>
            <div className="glass-card border-white/5 rounded-xl p-3 text-center">
              <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider block font-bold">REST LENGTH</span>
              <span className="text-white text-xs font-semibold block mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white/40" /> {exercise.rest}
              </span>
            </div>
          </div>

          {/* Set Tracker Dots Section */}
          <div className="glass-card border-white/5 rounded-xl p-5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">
                  SET COMPLETION TRACKER
                </h4>
                <p className="text-[10px] text-white/40 mt-0.5 leading-snug">
                  Touch each index to complete. Aim for progressive overload metrics!
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#E24B4A]/10 border border-[#E24B4A]/25 text-[#E24B4A] px-2.5 py-1 rounded-full shadow-glow">
                {completedCount} / {exercise.sets} EXP DONE
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              {activeSets.map((isDone, idx) => (
                <button
                  id={`btn-set-dot-${exercise.id}-${idx}`}
                  key={idx}
                  onClick={() => toggleSetCompleted(exercise.id, idx)}
                  className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-[#E24B4A] border-[#E24B4A] text-white shadow-md shadow-[#E24B4A]/25 scale-105 accent-glow'
                      : 'border-white/10 hover:border-white/30 bg-white/5 text-white/40 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold leading-none">{idx + 1}</span>
                  <span className="text-[8px] font-mono uppercase tracking-widest mt-0.5 font-bold">
                    {isDone ? 'DONE' : 'SET'}
                  </span>
                </button>
              ))}
            </div>

            {completedCount === exercise.sets && (
              <div className="mt-4 flex items-center gap-2 text-xs text-green-400 justify-center bg-green-500/10 border border-green-500/20 py-2 rounded-lg animate-pulse">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="font-semibold uppercase tracking-wider font-mono text-[10px]">Exercise Maximized (+50 XP Secured)</span>
              </div>
            )}
          </div>

          {/* AI Coaching Tips fetched server-side */}
          <div className="border-l-4 border-[#E24B4A] rounded-r-xl bg-white/[0.03] border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#E24B4A] animate-pulse" />
              <h4 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                AI FORM ADVICE & TRICKS
              </h4>
            </div>

            {isLoadingTips ? (
              <div className="space-y-2 py-1">
                <div className="h-3 w-11/12 bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-3 w-full bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-3 w-10/12 bg-white/5 rounded-md animate-pulse"></div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light select-text">
                {aiTips}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
