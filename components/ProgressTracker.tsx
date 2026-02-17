'use client'

import { useLanguage } from '@/lib/LanguageContext'

interface ProgressTrackerProps {
    viewedThemes: {
        green: boolean
        purple: boolean
        blue: boolean
    }
}

export default function ProgressTracker({ viewedThemes }: ProgressTrackerProps) {
    const { t, language } = useLanguage()

    const themes = [
        { key: 'green' as const, label: t('progress.green'), color: '#22c55e' },
        { key: 'purple' as const, label: t('progress.purple'), color: '#a855f7' },
        { key: 'blue' as const, label: t('progress.blue'), color: '#3b82f6' },
    ]

    const viewedCount = Object.values(viewedThemes).filter(Boolean).length
    const pendingText = language === 'hi' ? 'लंबित' : 'Pending'

    return (
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-700">{t('progress.title')}</h3>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {viewedCount}/3
                </span>
            </div>

            {/* Progress Steps - Clean Layout */}
            <div className="relative">
                {/* Connecting Line - Behind circles */}
                <div className="absolute top-5 left-[16.66%] right-[16.66%] h-1 flex z-0">
                    <div className={`flex-1 h-full rounded-full transition-all duration-500 ${viewedThemes.green && viewedThemes.purple ? 'bg-gradient-to-r from-green-500 to-purple-500' : viewedThemes.green ? 'bg-green-500' : 'bg-slate-200'}`} />
                    <div className={`flex-1 h-full rounded-full transition-all duration-500 ${viewedThemes.purple && viewedThemes.blue ? 'bg-gradient-to-r from-purple-500 to-blue-500' : viewedThemes.blue ? 'bg-blue-500' : 'bg-slate-200'}`} />
                </div>

                {/* Steps */}
                <div className="flex justify-between relative z-10">
                    {themes.map((theme, index) => {
                        const isViewed = viewedThemes[theme.key]
                        return (
                            <div key={theme.key} className="flex flex-col items-center" style={{ width: '33.33%' }}>
                                {/* Circle */}
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-md ${isViewed
                                        ? 'text-white'
                                        : 'bg-white border-2 border-amber-400 text-amber-500'
                                        }`}
                                    style={isViewed ? {
                                        background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}cc 100%)`,
                                        boxShadow: `0 4px 15px ${theme.color}40`
                                    } : {}}
                                >
                                    {isViewed ? (
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Label with color dot */}
                                <div className="flex flex-col items-center mt-3">
                                    <div
                                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mb-1"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                    <span className={`text-xs sm:text-sm font-medium text-center ${isViewed ? 'text-slate-700' : 'text-slate-400'}`}>
                                        {theme.label}
                                    </span>
                                    {!isViewed && (
                                        <span className="text-[10px] sm:text-xs text-amber-500 font-medium mt-0.5">
                                            {pendingText}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Status Message */}
            <div className="pt-4 sm:pt-6 mt-4 border-t border-slate-200">
                {viewedCount === 3 ? (
                    <p className="text-green-600 text-center font-medium text-sm sm:text-base">
                        ✓ {t('progress.complete')}
                    </p>
                ) : (
                    <p className="text-slate-500 text-center text-sm sm:text-base">
                        {t('progress.remaining')}
                    </p>
                )}
            </div>
        </div>
    )
}
