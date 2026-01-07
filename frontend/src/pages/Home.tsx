import { ArrowRight, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to the</span>{' '}
                    <span className="block text-primary-600 xl:inline">Career Centre</span>
                </h1>
                <p className="max-w-md mx-auto text-base text-slate-500 dark:text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-medium">
                    Connect with top employers, find exclusive opportunities, and launch your career journey today.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <Link to="/jobs" className="btn-primary py-4 px-10 text-lg shadow-xl shadow-primary-500/20">
                        Get Started
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                <div className="card p-8 border-l-4 border-l-primary-600">
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                        <Briefcase className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-extrabold mb-4 text-slate-900 dark:text-white">Internal Opportunities</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                        Access exclusive job offers curated specifically for our students. From internships to full-time positions.
                    </p>
                    <Link to="/jobs" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-bold hover:translate-x-1 transition-transform">
                        View Internal Jobs <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="card p-8 border-l-4 border-l-secondary-500">
                    <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mb-6">
                        <Globe className="w-7 h-7 text-secondary-600" />
                    </div>
                    <h3 className="text-xl font-extrabold mb-4 text-slate-900 dark:text-white">Global Network</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                        Browse thousands of external job listings from our partner network.
                    </p>
                    <Link to="/external-jobs" className="inline-flex items-center text-secondary-600 dark:text-secondary-400 font-bold hover:translate-x-1 transition-transform">
                        Explore External Jobs <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
