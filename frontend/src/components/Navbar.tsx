import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Briefcase, Globe, User, LayoutDashboard, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar = () => {
    const navigate = useNavigate();
    const { isDark, toggleDarkMode } = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const isAdmin = role === 'ADMIN';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Career<span className="text-primary-600">Centre</span>
                            </span>
                        </Link>

                        <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
                            <Link to="/jobs" className="nav-link">
                                Internal Jobs
                            </Link>
                            <Link to="/external-jobs" className="nav-link">
                                Global Network
                            </Link>
                            {isAdmin && (
                                <Link to="/admin/post-job" className="nav-link text-primary-600 dark:text-primary-400 font-semibold">
                                    <LayoutDashboard className="w-4 h-4 mr-1 inline" />
                                    Post Job
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-slate-800 transition-all font-medium flex items-center gap-2"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            <span className="hidden lg:block text-xs uppercase tracking-wider">{isDark ? 'Light' : 'Dark'}</span>
                        </button>

                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {token ? (
                                <div className="flex items-center space-x-4">
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{email?.split('@')[0]}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{role?.toLowerCase()}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-primary"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-primary"
                                    >
                                        Join Now
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2">
                    <Link to="/jobs" className="block nav-link">Internal Jobs</Link>
                    <Link to="/external-jobs" className="block nav-link">Global Network</Link>
                    {isAdmin && <Link to="/admin/post-job" className="block nav-link text-primary-600">Post Job</Link>}
                    <hr className="dark:border-slate-800" />
                    {token ? (
                        <button onClick={handleLogout} className="w-full btn-primary justify-center">Logout</button>
                    ) : (
                        <div className="space-y-2">
                            <Link to="/login" className="block text-center nav-link">Login</Link>
                            <Link to="/register" className="w-full btn-primary justify-center">Join Now</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
