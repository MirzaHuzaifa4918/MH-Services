import React, { useState } from 'react';
import { analyzeProjectRequest } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { CheckCircleIcon, SparklesIcon, MailIcon } from './icons';

// IMPORTANT: Replace this with your actual email address.
const FREELANCER_EMAIL = 'YOUR_EMAIL@example.com';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 text-center">{children}</h2>
);
  
const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mt-4 text-lg leading-8 text-slate-400 text-center max-w-2xl mx-auto">{children}</p>
);

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', details: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [mailtoLink, setMailtoLink] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.details) return;

        setIsLoading(true);
        setSubmitted(false);
        setAnalysisResult(null);

        const result = await analyzeProjectRequest(formData.service, formData.details);
        
        const subject = encodeURIComponent(`New Project Request: ${formData.service} from ${formData.name}`);
        const body = encodeURIComponent(`Hello,

I'd like to request your services for a project.

Service of Interest: ${formData.service}
My Name: ${formData.name}
My Email: ${formData.email}

Project Details:
---
${formData.details}
---
        `);
        setMailtoLink(`mailto:${FREELANCER_EMAIL}?subject=${subject}&body=${body}`);
        
        setAnalysisResult(result);
        setIsLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', service: 'Web Development', details: '' });
    };

    const services = ['Web Development', 'Video Editing', 'Logo Design', 'MS Office'];

    return (
        <section id="contact" className="py-20 sm:py-32 bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>Let's Build Something Together</SectionTitle>
                <SectionSubtitle>
                    Have a project in mind? Fill out the form below and I'll get back to you. The AI will help summarize your request.
                </SectionSubtitle>

                <div className="mt-16 max-w-2xl mx-auto">
                    {!submitted && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                                <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                            </div>
                            <select name="service" value={formData.service} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none">
                                {services.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <textarea name="details" rows={5} placeholder="Tell me about your project..." required value={formData.details} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
                            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {isLoading ? 'Analyzing...' : 'Send & Analyze Request'}
                            </button>
                        </form>
                    )}

                    {isLoading && <div className="text-center mt-8 text-sky-400">AI is analyzing your request...</div>}
                    
                    {submitted && analysisResult && (
                        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-sky-500/30">
                            <div className="flex items-center gap-3">
                                <CheckCircleIcon className="h-8 w-8 text-green-400" />
                                <h3 className="text-xl font-bold text-white">Analysis Complete!</h3>
                            </div>
                            <p className="mt-2 text-slate-300">Your request has been analyzed. Please review the summary below and click the button to send it to me from your email client.</p>
                            
                            <div className="mt-6 space-y-4 border-t border-slate-700 pt-4">
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <h4 className="font-semibold text-sky-400 flex items-center gap-2"><SparklesIcon className="h-5 w-5" /> AI Summary</h4>
                                    <p className="text-slate-300 mt-1">{analysisResult.summary}</p>
                                </div>
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <h4 className="font-semibold text-sky-400">Estimated Complexity</h4>
                                    <p className="text-slate-300 mt-1">{analysisResult.complexity}</p>
                                </div>
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <h4 className="font-semibold text-sky-400">Suggested Follow-up Questions</h4>
                                    <ul className="list-disc list-inside mt-2 text-slate-300 space-y-1">
                                        {analysisResult.clarifyingQuestions.map((q, i) => <li key={i}>{q}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 border-t border-slate-700 pt-6 text-center">
                                <a
                                    href={mailtoLink}
                                    className="inline-flex items-center gap-3 bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                                >
                                    <MailIcon className="h-6 w-6" />
                                    Send Project Details via Email
                                </a>
                                <button onClick={() => setSubmitted(false)} className="mt-4 text-slate-400 hover:text-white transition-colors">
                                    Submit another request
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
