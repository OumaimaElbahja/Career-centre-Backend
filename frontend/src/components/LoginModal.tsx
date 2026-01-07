import { Link } from 'react-router-dom';
import { LogIn, UserPlus, X, Lock } from 'lucide-react';

const LoginModal = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-primary-600" />
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    Authentication Required
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                    To access our exclusive job offers and global network, please sign in to your account.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/login"
                        className="btn-primary w-full justify-center py-3.5"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="w-full inline-flex items-center justify-center px-5 py-3.5 border border-slate-200 dark:border-slate-800 text-sm font-bold rounded-xl text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link
                        to="/"
                        className="text-sm font-bold text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        Maybe later, take me home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
