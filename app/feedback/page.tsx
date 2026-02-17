'use client'

import Link from 'next/link'
import FeedbackForm from '@/components/FeedbackForm'
import { useLanguage } from '@/lib/LanguageContext'

export default function FeedbackPage() {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen p-3 sm:p-4 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <Link href="/review" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-1 sm:mb-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('feedback.backReview')}
                    </Link>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">{t('feedback.title')}</h1>
                    <p className="text-slate-500 text-sm sm:text-base">{t('feedback.subtitle')}</p>
                </div>

                {/* Feedback Form */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
                    <FeedbackForm />
                </div>
            </div>
        </main>
    )
}
