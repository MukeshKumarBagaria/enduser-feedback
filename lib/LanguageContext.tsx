'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Home page
        'home.badge': 'MP Government User Research',
        'home.title': 'IFMIS NEXT GEN Theme Preference And Feedback Survey',
        'home.subtitle': 'Help us choose the best interface for the MP Government IFMIS NEXT GEN application. Your feedback is crucial for creating an efficient and user-friendly system for all government employees.',
        'home.howItWorks': 'Evaluation Process',
        'home.step1.title': 'Review Three Themes',
        'home.step1.desc': 'View our carefully designed color themes: Green, Purple, and Blue',

        'home.step3.title': 'Submit Your Feedback',
        'home.step3.desc': 'After viewing all themes, share your preference with us',
        'home.themesPreview': 'Themes You\'ll Review',
        'home.greenTheme': 'Green Theme',
        'home.purpleTheme': 'Purple Theme',
        'home.blueTheme': 'Blue Theme',
        'home.startReview': 'Start Review',
        'home.duration': 'Takes approximately 2 minutes',

        // Review page
        'review.backHome': 'Back to Home',
        'review.title': 'Review Themes',
        'review.proceedFeedback': 'Proceed to Feedback',
        'review.previous': 'Previous',
        'review.next': 'Next',
        'review.nextTheme': 'Next Theme',
        'review.viewAll': 'Please view all themes to continue',

        // Progress tracker
        'progress.title': 'Review Progress',
        'progress.green': 'Green',
        'progress.purple': 'Purple',
        'progress.blue': 'Blue',
        'progress.complete': 'All themes reviewed! You can now proceed to feedback.',
        'progress.remaining': 'Please review all remaining themes to unlock the feedback form.',

        // PDF Viewer
        'pdf.fullscreen': 'Fullscreen',
        'pdf.exit': 'Exit',
        'pdf.viewed': 'Viewed',
        'pdf.markViewed': '✓ Mark as Viewed',

        // Feedback page
        'feedback.backReview': 'Back to Review',
        'feedback.title': 'Submit Your Feedback',
        'feedback.subtitle': 'Thank you for reviewing all themes. Please share your preference below.',
        'feedback.allReviewed': 'All Themes Reviewed',
        'feedback.canSubmit': 'You can now submit your feedback',
        'feedback.locked': 'Feedback Locked',
        'feedback.lockDesc': 'Please review all themes before submitting feedback.',
        'feedback.remaining': 'Remaining themes:',
        'feedback.continueReview': 'Continue Review',
        'feedback.alreadySubmitted': 'Already Submitted',
        'feedback.alreadyDesc': 'You have already submitted your feedback in this session.',
        'feedback.viewConfirmation': 'View Confirmation',

        // Form
        'form.name': 'Full Name',
        'form.namePlaceholder': 'Enter your full name',
        'form.department': 'Department',
        'form.departmentPlaceholder': 'Enter your department',
        'form.preferredTheme': 'Preferred Color Theme',
        'form.feedback': 'Provide your valuable feedback to make our IFMIS Next Gen better',
        'form.feedbackPlaceholder': 'Share your thoughts...',
        'form.remarks': 'Suggestion for color',
        'form.remarksOptional': '(optional)',
        'form.submit': 'Submit Feedback',
        'form.submitting': 'Submitting...',
        'form.errorSession': 'You have already submitted feedback in this session.',
        'form.errorFailed': 'Failed to submit feedback. Please try again.',

        // Thank you page
        'thankyou.title': 'Thank You! 🎉',
        'thankyou.message': 'Your feedback has been submitted successfully.',
        'thankyou.appreciate': 'We appreciate you taking the time to review our design themes. Your input will help us create a better user experience.',
        'thankyou.backHome': 'Back to Home',
        'thankyou.note': '💡 Your response is anonymous and helps shape our product design.',

        // Language selector
        'lang.select': 'Select Language',
        'lang.english': 'English',
        'lang.hindi': 'हिंदी',
        'lang.continue': 'Continue',
    },
    hi: {
        // Home page
        'home.badge': 'मप्र शासन उपयोगकर्ता अनुसंधान',
        'home.title': 'IFMIS NEXT GEN थीम वरीयता और फीडबैक सर्वेक्षण',
        'home.subtitle': 'मप्र शासन IFMIS NEXT GEN एप्लिकेशन के लिए सबसे अच्छा इंटरफ़ेस चुनने में हमारी सहायता करें। सभी सरकारी कर्मचारियों के लिए एक कुशल और उपयोगकर्ता के अनुकूल प्रणाली बनाने के लिए आपकी प्रतिक्रिया महत्वपूर्ण है।',
        'home.howItWorks': 'मूल्यांकन प्रक्रिया',
        'home.step1.title': 'तीन थीम देखें',
        'home.step1.desc': 'हमारी सावधानीपूर्वक डिज़ाइन की गई रंग थीम देखें: हरा, बैंगनी, और नीला',

        'home.step3.title': 'अपनी प्रतिक्रिया दें',
        'home.step3.desc': 'सभी थीम देखने के बाद, हमें अपनी पसंद बताएं',
        'home.themesPreview': 'आप जिन थीम की समीक्षा करेंगे',
        'home.greenTheme': 'हरी थीम',
        'home.purpleTheme': 'बैंगनी थीम',
        'home.blueTheme': 'नीली थीम',
        'home.startReview': 'समीक्षा शुरू करें',
        'home.duration': 'लगभग 2 मिनट लगते हैं',

        // Review page
        'review.backHome': 'होम पर वापस जाएं',
        'review.title': 'थीम समीक्षा',
        'review.proceedFeedback': 'फीडबैक दें',
        'review.previous': 'पिछला',
        'review.next': 'अगला',
        'review.nextTheme': 'अगली थीम',
        'review.viewAll': 'कृपया जारी रखने के लिए सभी थीम देखें',

        // Progress tracker
        'progress.title': 'समीक्षा प्रगति',
        'progress.green': 'हरा',
        'progress.purple': 'बैंगनी',
        'progress.blue': 'नीला',
        'progress.complete': 'सभी थीम समीक्षित! अब आप फीडबैक दे सकते हैं।',
        'progress.remaining': 'कृपया फीडबैक फॉर्म अनलॉक करने के लिए शेष थीम देखें।',

        // PDF Viewer
        'pdf.fullscreen': 'पूर्ण स्क्रीन',
        'pdf.exit': 'बाहर निकलें',
        'pdf.viewed': 'देखा गया',
        'pdf.markViewed': '✓ देखा हुआ चिह्नित करें',

        // Feedback page
        'feedback.backReview': 'समीक्षा पर वापस जाएं',
        'feedback.title': 'अपनी प्रतिक्रिया दें',
        'feedback.subtitle': 'सभी थीम देखने के लिए धन्यवाद। कृपया नीचे अपनी पसंद बताएं।',
        'feedback.allReviewed': 'सभी थीम समीक्षित',
        'feedback.canSubmit': 'अब आप अपनी प्रतिक्रिया दे सकते हैं',
        'feedback.locked': 'फीडबैक लॉक है',
        'feedback.lockDesc': 'कृपया फीडबैक देने से पहले सभी थीम देखें।',
        'feedback.remaining': 'शेष थीम:',
        'feedback.continueReview': 'समीक्षा जारी रखें',
        'feedback.alreadySubmitted': 'पहले से सबमिट किया गया',
        'feedback.alreadyDesc': 'आपने इस सत्र में पहले ही अपनी प्रतिक्रिया दे दी है।',
        'feedback.viewConfirmation': 'पुष्टि देखें',

        // Form
        'form.name': 'पूरा नाम',
        'form.namePlaceholder': 'अपना पूरा नाम दर्ज करें',
        'form.department': 'विभाग',
        'form.departmentPlaceholder': 'अपना विभाग दर्ज करें',
        'form.preferredTheme': 'पसंदीदा रंग थीम',
        'form.feedback': 'हमारे IFMIS Next Gen को बेहतर बनाने के लिए अपनी बहुमूल्य प्रतिक्रिया दें',
        'form.feedbackPlaceholder': 'अपने विचार साझा करें...',
        'form.remarks': 'रंग के लिए सुझाव',
        'form.remarksOptional': '(वैकल्पिक)',
        'form.submit': 'प्रतिक्रिया सबमिट करें',
        'form.submitting': 'सबमिट हो रहा है...',
        'form.errorSession': 'आपने इस सत्र में पहले ही प्रतिक्रिया दे दी है।',
        'form.errorFailed': 'प्रतिक्रिया सबमिट करने में विफल। कृपया पुनः प्रयास करें।',

        // Thank you page
        'thankyou.title': 'धन्यवाद! 🎉',
        'thankyou.message': 'आपकी प्रतिक्रिया सफलतापूर्वक सबमिट हो गई है।',
        'thankyou.appreciate': 'हमारी डिज़ाइन थीम की समीक्षा करने के लिए समय निकालने के लिए हम आपकी सराहना करते हैं। आपकी प्रतिक्रिया हमें बेहतर उपयोगकर्ता अनुभव बनाने में मदद करेगी।',
        'thankyou.backHome': 'होम पर वापस जाएं',
        'thankyou.note': '💡 आपकी प्रतिक्रिया गुमनाम है और हमारे उत्पाद डिज़ाइन को आकार देने में मदद करती है।',

        // Language selector
        'lang.select': 'भाषा चुनें',
        'lang.english': 'English',
        'lang.hindi': 'हिंदी',
        'lang.continue': 'जारी रखें',
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language | null>('en')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('selected_language') as Language
        if (saved && (saved === 'en' || saved === 'hi')) {
            setLanguageState(saved)
        }
        setIsLoaded(true)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('selected_language', lang)
    }

    const t = (key: string): string => {
        if (!language) return key
        return translations[language][key as keyof typeof translations['en']] || key
    }

    // Show language selector if no language is selected
    if (isLoaded && !language) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
                    <div className="text-5xl sm:text-6xl mb-4">🌐</div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                        Select Language / भाषा चुनें
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base mb-6">
                        Choose your preferred language
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => setLanguage('en')}
                            className="w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                🇬🇧 English
                            </span>
                        </button>

                        <button
                            onClick={() => setLanguage('hi')}
                            className="w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                🇮🇳 हिंदी
                            </span>
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    // Loading state removed as per user request to improve UX
    // if (!isLoaded) { ... }


    return (
        <LanguageContext.Provider value={{ language: language!, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
