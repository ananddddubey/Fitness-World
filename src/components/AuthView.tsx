import React, { useState } from 'react';
import { Dumbbell, Eye, EyeOff, Lock, User, AlertCircle, Loader } from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess: (token: string, user: { id: string; username: string; profile: any; completedSets: any }) => void;
}

export default function AuthView({ onAuthSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Success
      onAuthSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,211,153,0.15),rgba(255,255,255,0))] p-6">
      <div className="w-full max-w-md bg-zinc-950/80 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 animate-pulse">
            <Dumbbell className="w-8 h-8 text-black stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            FITNESS <span className="text-emerald-400">WORLD</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {isLogin ? 'Welcome back, champ. Get ready to grind.' : 'Build your profile and start your journey.'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-2xl flex items-start gap-3 text-red-400 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="grind_master"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold rounded-2xl py-4 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 text-base mt-2 active:scale-[0.98]"
          >
            {loading ? (
              <Loader className="w-6 h-6 animate-spin text-black" />
            ) : isLogin ? (
              'Enter the Gym'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-zinc-400 hover:text-emerald-400 font-bold transition-colors text-sm"
            disabled={loading}
          >
            {isLogin ? "New to Fitness World? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
