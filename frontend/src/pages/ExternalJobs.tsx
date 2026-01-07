import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Calendar, ExternalLink, MapPin, Briefcase, Trash2 } from 'lucide-react';

const ExternalJobs = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const role = localStorage.getItem('role');
    const isAdmin = role === 'ADMIN';

    const handleDismiss = (id: string) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/external-job-offers');
                setJobs(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load external job offers.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-secondary-500 font-medium">Loading external opportunities...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-medium">{error}</div>;
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="px-4 md:px-0">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">External Opportunities</h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium tracking-tight">Discover more opportunities across the web</p>
            </div>
            <div className="grid gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="card p-6 border-l-4 border-l-secondary-500 dark:border-l-secondary-400 hover:border-l-primary-600 transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{job.role}</h3>
                                <p className="text-primary-600 dark:text-primary-400 font-bold mb-6 flex items-center">
                                    {job.company_name}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 font-bold mb-2">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
                                            <Briefcase className="w-4 h-4 text-slate-500" />
                                        </div>
                                        {job.employment_type || 'N/A'}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
                                            <MapPin className="w-4 h-4 text-slate-500" />
                                        </div>
                                        {job.location || 'Remote'}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mr-3">
                                            <Calendar className="w-4 h-4 text-slate-500" />
                                        </div>
                                        {new Date(job.date_posted).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-full md:w-auto space-y-3">
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full justify-center"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Source
                                </a>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDismiss(job.id)}
                                        className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 dark:border-slate-800 text-sm font-bold rounded-xl text-rose-600 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Dismiss
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {jobs.length === 0 && (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-16 card border-dashed">No external jobs found at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ExternalJobs;
