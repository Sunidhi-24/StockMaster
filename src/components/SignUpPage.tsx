import { useState } from 'react';
import { Package, AlertCircle, CheckCircle2 } from 'lucide-react';

type Page = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings';

interface SignUpPageProps {
  onNavigate: (page: Page) => void;
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const validatePassword = (pwd: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation
    if (!loginId || !email || !password || !confirmPassword) {
      newErrors.push('All fields are required');
    }

    if (loginId && loginId.length < 4) {
      newErrors.push('Login ID must be at least 4 characters');
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push('Please enter a valid email address');
    }

    if (password && !validatePassword(password)) {
      newErrors.push('Password must be at least 8 characters and include uppercase, lowercase, number, and special character (!@#$%^&*)');
    }

    if (password !== confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    // Success
    setErrors([]);
    setSuccess(true);
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      onNavigate('login');
    }, 2000);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-blue-500 rounded-2xl p-4 mb-4">
          <Package className="text-white" size={48} />
        </div>
        <h1 className="text-slate-900 mb-2">Create Account</h1>
        <p className="text-slate-500">Sign up for Warehouse Manager</p>
      </div>

      {/* Sign Up Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-green-700 text-sm">Account created successfully!</p>
                <p className="text-green-600 text-xs mt-1">Redirecting to login...</p>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-red-700 text-sm">Please fix the following errors:</p>
              </div>
              <ul className="ml-8 text-red-600 text-sm space-y-1 list-disc">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
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
              placeholder="Choose a unique login ID"
            />
          </div>

          {/* Email */}
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
              placeholder="Create a strong password"
            />
            <p className="text-xs text-slate-500 mt-1">
              Min 8 chars, with uppercase, lowercase, number & special char
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:text-blue-700"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
