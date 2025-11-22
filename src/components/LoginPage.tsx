import { useState } from 'react';
import { Package, AlertCircle } from 'lucide-react';

type Page = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!loginId || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials
    if (loginId === 'admin' && password === 'Password123!') {
      onLogin();
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-blue-500 rounded-2xl p-4 mb-4">
          <Package className="text-white" size={48} />
        </div>
        <h1 className="text-slate-900 mb-2">Warehouse Manager</h1>
        <p className="text-slate-500">Sign in to your account</p>
      </div>

      {/* Login Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login ID */}
          <div>
            <label htmlFor="loginId" className="block text-slate-700 mb-2">
              Login ID
            </label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your login ID"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900 text-sm mb-2">Demo Credentials:</p>
        <p className="text-blue-700 text-sm"><strong>Login ID:</strong> admin</p>
        <p className="text-blue-700 text-sm"><strong>Password:</strong> Password123!</p>
      </div>
    </div>
  );
}
