"use client";

import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Building2, Briefcase, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterFormProps {
  variant?: 'simple' | 'full'; // simple = email only, full = all fields
  className?: string;
  onSuccess?: () => void;
}

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Real Estate',
  'Other',
];

const INTERESTS = [
  'Web Development',
  'Mobile Apps',
  'E-commerce',
  'Digital Marketing',
  'Cloud Solutions',
  'AI & Machine Learning',
  'Cybersecurity',
  'DevOps',
  'UI/UX Design',
  'Data Analytics',
];

export default function NewsletterForm({ variant = 'simple', className = '', onSuccess }: NewsletterFormProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    jobRole: '',
    industry: '',
    interests: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset status after 5 seconds
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName || undefined,
          lastName: formData.lastName || undefined,
          interests: formData.interests,
          languagePreference: locale as 'en' | 'fr' | 'ar',
          sourcePage: pathname,
          locale,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          jobRole: '',
          industry: '',
          interests: [],
        });
        onSuccess?.();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Translations
  const t = {
    en: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Stay updated with our latest insights, projects, and industry trends',
      email: 'Email Address',
      emailPlaceholder: 'your.email@company.com',
      firstName: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      jobRole: 'Job Role',
      industry: 'Industry',
      interests: 'Interests',
      selectIndustry: 'Select your industry',
      selectInterests: 'Select your areas of interest',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      successMessage: 'Successfully subscribed! Check your email for confirmation.',
      errorMessage: 'Subscription failed. Please try again.',
      required: 'Required',
      optional: 'Optional',
    },
    fr: {
      title: 'Abonnez-vous à Notre Newsletter',
      subtitle: 'Restez informé de nos dernières actualités, projets et tendances',
      email: 'Adresse Email',
      emailPlaceholder: 'votre.email@entreprise.com',
      firstName: 'Prénom',
      lastName: 'Nom',
      company: 'Entreprise',
      jobRole: 'Poste',
      industry: 'Industrie',
      interests: 'Centres d\'intérêt',
      selectIndustry: 'Sélectionnez votre industrie',
      selectInterests: 'Sélectionnez vos domaines d\'intérêt',
      subscribe: 'S\'abonner',
      subscribing: 'Abonnement en cours...',
      successMessage: 'Abonnement réussi ! Vérifiez votre email pour confirmation.',
      errorMessage: 'Échec de l\'abonnement. Veuillez réessayer.',
      required: 'Requis',
      optional: 'Optionnel',
    },
    ar: {
      title: 'اشترك في نشرتنا الإخبارية',
      subtitle: 'ابق على اطلاع بأحدث رؤانا ومشاريعنا واتجاهات الصناعة',
      email: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'your.email@company.com',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      company: 'الشركة',
      jobRole: 'المسمى الوظيفي',
      industry: 'الصناعة',
      interests: 'الاهتمامات',
      selectIndustry: 'اختر صناعتك',
      selectInterests: 'اختر مجالات اهتمامك',
      subscribe: 'اشترك',
      subscribing: 'جاري الاشتراك...',
      successMessage: 'تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني للتأكيد.',
      errorMessage: 'فشل الاشتراك. يرجى المحاولة مرة أخرى.',
      required: 'مطلوب',
      optional: 'اختياري',
    },
  };

  const labels = t[locale as keyof typeof t] || t.en;

  if (variant === 'simple') {
    // Simple variant: Email only (for footer, etc.)
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder={labels.emailPlaceholder}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !formData.email}
              className="px-6 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {labels.subscribe}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Status Messages */}
          <div role="status" aria-live="polite" aria-atomic="true">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <p>{labels.successMessage}</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5" />
                  <p>{errorMessage || labels.errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    );
  }

  // Full variant: All fields
  return (
    <div className={className}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            {labels.title}
          </h2>
          <p className="text-neutral-400">{labels.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (Required) */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {labels.email} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder={labels.emailPlaceholder}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                {labels.firstName}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                {labels.lastName}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Company & Job Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                {labels.company}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                {labels.jobRole}
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={formData.jobRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {labels.industry}
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              disabled={loading}
              className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all disabled:opacity-50"
            >
              <option value="">{labels.selectIndustry}</option>
              {INDUSTRIES.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Interests (Multi-Select) */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              {labels.interests}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INTERESTS.map(interest => (
                <label
                  key={interest}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg cursor-pointer hover:border-gold-400/30 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-gold-400 focus:ring-gold-400/50"
                  />
                  <span className="text-sm text-neutral-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !formData.email}
            className="w-full py-4 text-lg bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {labels.subscribing}
              </>
            ) : (
              <>
                {labels.subscribe}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          {/* Status Messages */}
          <div role="status" aria-live="polite" aria-atomic="true">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <p>{labels.successMessage}</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                >
                  <AlertCircle className="w-6 h-6" />
                  <p>{errorMessage || labels.errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}