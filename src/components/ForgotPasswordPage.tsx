import { useState } from 'react';
import { Package, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

type Page = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings';

interface ForgotPasswordPageProps {
  onNavigate: (page: Page) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Success
    setSuccess(true);
  };

  return (
    <div className="w-full max-w-md">
      {/* Back to Login */}
      <button
        onClick={() => onNavigate('login')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Login</span>
      </button>

      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-blue-500 rounded-2xl p-4 mb-4">
          <Package className="text-white" size={48} />
        </div>
        <h1 className="text-slate-900 mb-2">Reset Password</h1>
        <p className="text-slate-500">Enter your email to receive reset instructions</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
              </div>
              <h3 className="text-green-900 mb-2">Check Your Email</h3>
              <p className="text-green-700 text-sm">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
            </div>

            {/* Return to Login Button */}
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-3 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>

      {/* Additional Help */}
      {!success && (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-slate-600 text-sm">
            Remember your password?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:text-blue-700"
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
