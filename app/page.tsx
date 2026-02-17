'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

export default function HomePage() {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8 pb-28 sm:pb-32">
            <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-center">
                {/* Hero Section */}
                <div className="text-center mb-8 sm:mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 text-xs sm:text-sm mb-4 sm:mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {t('home.badge')}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight">
                        {t('home.title')}
                    </h1>

                    <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
                        {t('home.subtitle')}
                    </p>
                </div>

                {/* Info Card */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 animate-slide-up">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">📋</span>
                        {t('home.howItWorks')}
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm sm:text-base">1</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-0.5 sm:mb-1">{t('home.step1.title')}</h3>
                                <p className="text-slate-500 text-xs sm:text-sm">{t('home.step1.desc')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm sm:text-base">2</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-0.5 sm:mb-1">{t('home.step3.title')}</h3>
                                <p className="text-slate-500 text-xs sm:text-sm">{t('home.step3.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Themes Preview */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-600 mb-3 sm:mb-4">{t('home.themesPreview')}</h3>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-green-50 border border-green-200">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500"></div>
                            <span className="text-green-700 font-medium text-sm sm:text-base">{t('home.greenTheme')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-purple-50 border border-purple-200">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500"></div>
                            <span className="text-purple-700 font-medium text-sm sm:text-base">{t('home.purpleTheme')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-50 border border-blue-200">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500"></div>
                            <span className="text-blue-700 font-medium text-sm sm:text-base">{t('home.blueTheme')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky CTA Button at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 sm:p-5 z-50">
                <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-sm sm:text-base">{t('home.duration')}</p>
                    <Link href="/review" className="btn-primary inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
                        {t('home.startReview')}
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </main>
    )
}
