import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react';

// ⚠️  Demo credentials — replace with JWT auth from Flask backend.
const DEMO_USER = 'admin';
const DEMO_PASS = 'svsteel@2024';

export default function Login() {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        if (creds.username === DEMO_USER && creds.password === DEMO_PASS) {
            sessionStorage.setItem('sv_admin', 'true');
            navigate('/admin');
        } else {
            setError('Invalid username or password.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl border border-[#D1D9E4] shadow-xl p-8 sm:p-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-[#101D32] rounded-xl flex items-center justify-center">
                            <Shield size={18} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="font-heading font-bold text-[#172438] text-base">Admin Login</p>
                            <p className="text-[#4A6080] text-xs">SV Steel Centre Dashboard</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="login-user">Username</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B9C4D0]" />
                                <input id="login-user" type="text" required autoComplete="username"
                                    className="form-input pl-9 text-sm" placeholder="admin"
                                    value={creds.username} onChange={(e) => setCreds({ ...creds, username: e.target.value })} />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="login-pass">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B9C4D0]" />
                                <input id="login-pass" type={showPass ? 'text' : 'password'} required autoComplete="current-password"
                                    className="form-input pl-9 pr-9 text-sm" placeholder="••••••••••"
                                    value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B9C4D0] hover:text-[#263D59] transition-colors"
                                    aria-label={showPass ? 'Hide password' : 'Show password'}>
                                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                        )}

                        <button type="submit" disabled={loading}
                            className="w-full bg-[#101D32] hover:bg-[#263D59] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200">
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    {/* Demo hint */}
                    <div className="mt-6 p-3 bg-[#F3F6FA] border border-[#D1D9E4] rounded-xl text-xs text-[#4A6080]">
                        <strong className="text-[#172438]">Demo credentials:</strong><br />
                        Username: <code className="font-mono">admin</code> &nbsp;/&nbsp; Password: <code className="font-mono">svsteel@2024</code>
                        <br /><span className="text-amber-600 font-medium">Replace with secure auth when connecting Flask backend.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
