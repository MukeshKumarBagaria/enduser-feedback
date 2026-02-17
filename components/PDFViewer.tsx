'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

interface PDFViewerProps {
    pdfUrl: string
    themeName: string
    themeColor: 'green' | 'purple' | 'blue'
}

const bgGradients = {
    green: 'from-green-100 to-emerald-100',
    purple: 'from-purple-100 to-violet-100',
    blue: 'from-blue-100 to-indigo-100',
}

const borderColors = {
    green: '#22c55e',
    purple: '#a855f7',
    blue: '#3b82f6',
}

export default function PDFViewer({ pdfUrl, themeName, themeColor }: PDFViewerProps) {
    const { t, language } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [pdfFailed, setPdfFailed] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(isMobileDevice || window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Reset loading state when PDF changes
    useEffect(() => {
        setLoading(true)
        setPdfFailed(false)

        // Timeout to detect if PDF fails to load on mobile
        const timeout = setTimeout(() => {
            if (isMobile && loading) {
                setPdfFailed(true)
                setLoading(false)
            }
        }, 3000)

        return () => clearTimeout(timeout)
    }, [pdfUrl, isMobile])

    const toggleFullscreen = async () => {
        if (!containerRef.current) return

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen()
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const openInNewTab = () => {
        window.open(pdfUrl, '_blank')
    }

    const openText = language === 'hi' ? 'PDF देखें' : 'View PDF'
    const tapToViewText = language === 'hi' ? 'PDF देखने के लिए टैप करें' : 'Tap to View PDF'

    return (
        <div
            ref={containerRef}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${isFullscreen ? 'rounded-none bg-white' : ''}`}
            style={{ borderColor: borderColors[themeColor], borderWidth: '2px' }}
        >
            {/* Header */}
            <div className={`px-3 sm:px-6 py-2.5 sm:py-4 bg-gradient-to-r ${bgGradients[themeColor]} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: borderColors[themeColor] }} />
                    <h3 className="text-sm sm:text-xl font-bold text-slate-800">{themeName}</h3>
                </div>
                <div className="flex items-center gap-2">
                    {/* Open in New Tab Button */}
                    <button
                        onClick={openInNewTab}
                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>{openText}</span>
                    </button>

                    {/* Fullscreen Button - Desktop only */}
                    {!isMobile && (
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-all duration-300 text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span>{t('pdf.fullscreen')}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="relative bg-slate-100" style={{ height: isFullscreen ? 'calc(100vh - 80px)' : isMobile ? '70vh' : '60vh', minHeight: '350px' }}>
                {/* Loading Indicator */}
                {loading && !pdfFailed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-indigo-600"></div>
                            <p className="text-slate-500 text-sm">{language === 'hi' ? 'लोड हो रहा है...' : 'Loading PDF...'}</p>
                        </div>
                    </div>
                )}

                {/* Mobile Fallback - Large clickable area to open PDF */}
                {isMobile && pdfFailed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 z-10">
                        <button
                            onClick={openInNewTab}
                            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                        >
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${borderColors[themeColor]}20` }}
                            >
                                <svg className="w-10 h-10" fill="none" stroke={borderColors[themeColor]} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold text-slate-800 mb-1">{themeName}</p>
                                <p className="text-slate-500 text-sm">{tapToViewText}</p>
                            </div>
                            <div
                                className="px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2"
                                style={{ backgroundColor: borderColors[themeColor] }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                {openText}
                            </div>
                        </button>
                    </div>
                )}

                {/* PDF iframe */}
                <iframe
                    ref={iframeRef}
                    src={pdfUrl}
                    className="w-full h-full"
                    onLoad={() => {
                        setLoading(false)
                        setPdfFailed(false)
                    }}
                    title={`${themeName} PDF Preview`}
                />
            </div>
        </div>
    )
}
