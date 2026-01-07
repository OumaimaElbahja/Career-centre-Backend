import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Paperclip } from 'lucide-react';
import axios from '../api/axios';

const JobForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [existingAttachments, setExistingAttachments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchJob = async () => {
                try {
                    const response = await axios.get('/api/job-offers');
                    const job = response.data.find((j: any) => j.id === parseInt(id));
                    if (job) {
                        setContent(job.content);
                        setExistingAttachments(job.attachments || []);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchJob();
        }
    }, [id, isEdit]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('content', content);
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            if (isEdit) {
                await axios.put(`/admin/job-offers/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/admin/job-offers', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/jobs');
        } catch (err) {
            console.error(err);
            alert('Failed to save job offer.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="text-center py-20 font-bold text-slate-500 dark:text-slate-400">Loading details...</div>;

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-8 font-bold transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            <div className="card p-10">
                <h2 className="text-3xl font-extrabold mb-10 text-slate-900 dark:text-white tracking-tight">
                    {isEdit ? 'Edit Job Offer' : 'Create New Job Offer'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                            Job Description & Details
                        </label>
                        <textarea
                            required
                            rows={10}
                            className="input-field min-h-[250px] resize-none"
                            placeholder="Describe the job opportunity, requirements, and how to apply..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                            Attachments (PDF, Image)
                        </label>

                        {existingAttachments.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Already shared attachments:</p>
                                <ul className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                                    {existingAttachments.map((file) => (
                                        <li key={file.id} className="flex items-center justify-between text-xs font-bold py-3 px-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30 rounded-xl text-primary-700 dark:text-primary-300">
                                            <span className="truncate max-w-[180px] flex items-center">
                                                <Paperclip className="w-3.5 h-3.5 mr-2 opacity-60" />
                                                {file.fileName}
                                            </span>
                                            <span className="text-[10px] opacity-60 uppercase font-black">Shared</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-2xl hover:border-primary-400 dark:hover:border-primary-500/50 transition-colors cursor-pointer group bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                                <div className="flex text-sm text-slate-600 dark:text-slate-400 font-bold">
                                    <label className="relative cursor-pointer rounded-md text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                                        <span>Click to upload {existingAttachments.length > 0 ? 'additional' : ''} files</span>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-500">
                                    PNG, JPG, PDF up to 10MB
                                </p>
                            </div>
                        </div>
                        {files.length > 0 && (
                            <div className="mt-6">
                                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Newly selected files:</p>
                                <ul className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                                    {files.map((file, idx) => (
                                        <li key={idx} className="flex items-center justify-between text-xs font-bold py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            <span className="truncate max-w-[150px]">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                                                className="text-rose-500 hover:text-rose-700 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary justify-center py-4 text-base shadow-xl shadow-primary-500/20 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save className="w-5 h-5 mr-3" />
                            {loading ? 'Saving Changes...' : 'Publish Job Offer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
