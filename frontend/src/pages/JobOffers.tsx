import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Plus, Calendar, Paperclip, Edit2, Trash2, X, Download } from 'lucide-react';

interface JobOfferAttachment {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
}

interface JobOffer {
    id: number;
    content: string;
    createdAt: string;
    attachments: JobOfferAttachment[];
}

const JobOffers = () => {
    const [jobs, setJobs] = useState<JobOffer[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const role = localStorage.getItem('role');
    const isAdmin = role === 'ADMIN';

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/job-offers');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this job offer?')) {
            try {
                await axios.delete(`/admin/job-offers/${id}`);
                setJobs(jobs.filter(job => job.id !== id));
            } catch (error) {
                console.error('Error deleting job:', error);
                alert('Failed to delete job offer');
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const isImage = (fileType: string) => {
        return fileType.startsWith('image/');
    };

    const handlePreview = (e: React.MouseEvent, file: JobOfferAttachment) => {
        if (isImage(file.fileType)) {
            e.preventDefault();
            setSelectedImage(`http://localhost:8080/uploads/${file.filePath}`);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center px-4 md:px-0">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Internal Job Offers</h2>
                    <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium tracking-tight">Opportunities within our network</p>
                </div>
                {isAdmin && (
                    <Link to="/admin/post-job" className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Job
                    </Link>
                )}
            </div>
            <div className="grid gap-8">
                {jobs.map((job) => (
                    <div key={job.id} className="card p-8 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                                    <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                </div>
                                {new Date(job.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                            </div>
                            {isAdmin && (
                                <div className="flex space-x-1">
                                    <Link
                                        to={`/admin/edit-job/${job.id}`}
                                        className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-xl transition-all"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="prose dark:prose-invert max-w-none mb-6">
                            <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{job.content}</p>
                        </div>

                        {job.attachments && job.attachments.length > 0 && (
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <Paperclip className="w-4 h-4 mr-2 text-primary-600" />
                                    Attachments ({job.attachments.length})
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {job.attachments.map((file) => (
                                        <li key={file.id}>
                                            <a
                                                href={`http://localhost:8080/uploads/${file.filePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => handlePreview(e, file)}
                                                className="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-800 transition-all text-sm group/item"
                                            >
                                                <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg mr-3 border border-slate-100 dark:border-slate-700 group-hover/item:border-primary-200 transition-colors">
                                                    <Paperclip className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-primary-500" />
                                                </div>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{file.fileName}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">{formatFileSize(file.fileSize)} • {file.fileType.split('/')[1]?.toUpperCase() || 'FILE'}</p>
                                                </div>
                                                {isImage(file.fileType) && (
                                                    <span className="text-[10px] font-black uppercase text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity">Preview</span>
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                {jobs.length === 0 && (
                    <div className="text-center py-20 card bg-slate-50/50 dark:bg-slate-900/50 border-dashed">
                        <p className="text-slate-500 dark:text-slate-400 font-bold">No internal job offers published yet.</p>
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <a
                                href={selectedImage}
                                download
                                className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full text-slate-900 dark:text-white shadow-lg transition-all"
                                title="Download image"
                            >
                                <Download className="w-6 h-6" />
                            </a>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full text-slate-900 dark:text-white shadow-lg transition-all"
                                title="Close preview"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-auto max-h-[85vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobOffers;
