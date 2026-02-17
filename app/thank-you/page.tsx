'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

export default function ThankYouPage() {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Success Animation */}
                <div className="relative mb-6 sm:mb-8">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center animate-pulse-slow">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-green-500/20 animate-ping"></div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
                        {t('thankyou.title')}
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 mb-4 sm:mb-6">
                        {t('thankyou.message')}
                    </p>

                    <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">
                        {t('thankyou.appreciate')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {t('thankyou.backHome')}
                        </Link>
                    </div>
                </div>

                {/* Fun fact */}
                <p className="text-slate-400 text-xs sm:text-sm mt-6 sm:mt-8">
                    {t('thankyou.note')}
                </p>
            </div>
        </main>
    )
}
