'use client'

import { useState } from 'react'
import { supabase, FeedbackData } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function FeedbackForm() {
    const router = useRouter()
    const { t, language } = useLanguage()

    const themeOptions = [
        { value: 'green' as const, label: language === 'hi' ? 'हरी थीम' : 'Green Theme', color: '#22c55e' },
        { value: 'purple' as const, label: language === 'hi' ? 'बैंगनी थीम' : 'Purple Theme', color: '#a855f7' },
        { value: 'blue' as const, label: language === 'hi' ? 'नीली थीम' : 'Blue Theme', color: '#3b82f6' },
    ]

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        preferred_color: '' as 'green' | 'purple' | 'blue' | '',
        remark: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const isFormValid = formData.name.trim() && formData.department.trim() && formData.preferred_color

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return

        setIsSubmitting(true)
        setError('')

        try {
            const feedbackData: FeedbackData = {
                name: formData.name.trim(),
                department: formData.department.trim(),
                preferred_color: formData.preferred_color as 'green' | 'purple' | 'blue',
                remark: formData.remark.trim() || undefined,
                viewed_green: JSON.parse(sessionStorage.getItem('viewedThemes') || '{}').green || false,
                viewed_purple: JSON.parse(sessionStorage.getItem('viewedThemes') || '{}').purple || false,
                viewed_blue: JSON.parse(sessionStorage.getItem('viewedThemes') || '{}').blue || false,
            }

            const { error: supabaseError } = await supabase
                .from('design_feedback')
                .insert([feedbackData])

            if (supabaseError) throw supabaseError

            router.push('/thank-you')
        } catch (err) {
            console.error('Submission error:', err)
            setError(t('form.errorFailed'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1.5 sm:mb-2">
                    {t('form.name')} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field text-sm sm:text-base"
                    placeholder={t('form.namePlaceholder')}
                    required
                />
            </div>

            {/* Department Field */}
            <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-600 mb-1.5 sm:mb-2">
                    {t('form.department')} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="input-field text-sm sm:text-base"
                    placeholder={t('form.departmentPlaceholder')}
                    required
                />
            </div>

            {/* Preferred Theme Selection */}
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 sm:mb-3">
                    {t('form.preferredTheme')} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {themeOptions.map((theme) => (
                        <label
                            key={theme.value}
                            className={`radio-card ${formData.preferred_color === theme.value ? 'selected' : ''}`}
                            style={formData.preferred_color === theme.value ? { borderColor: theme.color, background: `${theme.color}15` } : {}}
                        >
                            <input
                                type="radio"
                                name="preferred_color"
                                value={theme.value}
                                checked={formData.preferred_color === theme.value}
                                onChange={(e) => setFormData({ ...formData, preferred_color: e.target.value as 'green' | 'purple' | 'blue' })}
                            />
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full ring-2 ring-slate-200"
                                    style={{ backgroundColor: theme.color }}
                                />
                                <span className="font-medium text-slate-700 text-sm sm:text-base">{theme.label}</span>
                            </div>
                            {formData.preferred_color === theme.value && (
                                <div className="absolute top-2 right-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.color }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Remarks Field */}
            <div>
                <label htmlFor="remark" className="block text-sm font-medium text-slate-600 mb-1.5 sm:mb-2">
                    {t('form.feedback') || 'Feedback'} <span className="text-slate-400">({t('form.optional') || 'Optional'})</span>
                </label>
                <textarea
                    id="remark"
                    value={formData.remark}
                    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                    className="input-field min-h-[100px] resize-y text-sm sm:text-base py-3"
                    placeholder={t('form.feedbackPlaceholder') || 'Share your thoughts...'}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm sm:text-base">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="btn-success w-full text-base sm:text-lg py-3 sm:py-4"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white/30 border-t-white"></div>
                        {t('form.submitting')}
                    </span>
                ) : (
                    t('form.submit')
                )}
            </button>
        </form>
    )
}
