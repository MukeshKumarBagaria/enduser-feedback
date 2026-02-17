'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ImageViewer from '@/components/ImageViewer'
import { useLanguage } from '@/lib/LanguageContext'

export default function ReviewPage() {
    const { t, language } = useLanguage()

    const themes = [
        {
            key: 'green' as const,
            name: language === 'hi' ? 'हरा' : 'Green',
            images: ['/green/1.webp', '/green/2.webp', '/green/3.webp', '/green/4.webp'],
            color: 'green' as const
        },
        {
            key: 'purple' as const,
            name: language === 'hi' ? 'बैंगनी' : 'Purple',
            images: ['/purple/1.webp', '/purple/2.webp', '/purple/3.webp', '/purple/4.webp'],
            color: 'purple' as const
        },
        {
            key: 'blue' as const,
            name: language === 'hi' ? 'नीला' : 'Blue',
            images: ['/blue/1.webp', '/blue/2.webp', '/blue/3.webp', '/blue/4.webp'],
            color: 'blue' as const
        },
    ]

    const [currentTheme, setCurrentTheme] = useState(0)

    const handleThemeChange = (index: number) => {
        setCurrentTheme(index)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Track viewed themes
    useEffect(() => {
        const themeKey = themes[currentTheme].color
        const viewedThemes = JSON.parse(sessionStorage.getItem('viewedThemes') || '{}')
        if (!viewedThemes[themeKey]) {
            viewedThemes[themeKey] = true
            sessionStorage.setItem('viewedThemes', JSON.stringify(viewedThemes))
        }
    }, [currentTheme])

    const handleNextTheme = () => {
        if (currentTheme < themes.length - 1) {
            setCurrentTheme(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const isLastTheme = currentTheme === themes.length - 1

    return (
        <main className="min-h-screen p-3 sm:p-4 lg:p-8 pb-24">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                        <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-1 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t('review.backHome')}
                        </Link>
                        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-800">{t('review.title')}</h1>
                    </div>
                </div>

                {/* Theme Tabs - Sticky on Mobile */}
                <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md py-2 mb-4 border-b border-slate-100">
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {themes.map((theme, index) => (
                            <button
                                key={theme.key}
                                onClick={() => handleThemeChange(index)}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm ${currentTheme === index
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                <div
                                    className={`w-3 h-3 rounded-full ${currentTheme === index ? 'ring-2 ring-white/30' : ''}`}
                                    style={{ backgroundColor: theme.color === 'green' ? '#22c55e' : theme.color === 'purple' ? '#a855f7' : '#3b82f6' }}
                                />
                                <span>{theme.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Unified Image Viewer */}
                <div className="mb-8 animate-fade-in-up">
                    <ImageViewer
                        images={themes[currentTheme].images}
                        themeName={themes[currentTheme].name}
                        themeColor={themes[currentTheme].color}
                        priority={true}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                    {!isLastTheme ? (
                        <button
                            onClick={handleNextTheme}
                            className="px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-base bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {t('review.nextTheme') || 'Next Theme'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <Link
                            href="/feedback"
                            className="px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-base bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {t('review.proceedFeedback')}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}
