'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, FeedbackData } from '@/lib/supabase'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
    green: '#22c55e',
    purple: '#a855f7',
    blue: '#3b82f6',
}

export default function AdminPage() {
    const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    const fetchFeedbacks = async () => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('design_feedback')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) throw supabaseError
            setFeedbacks(data || [])
        } catch (err) {
            console.error('Error fetching feedbacks:', err)
            setError('Failed to load feedback data')
        } finally {
            setLoading(false)
        }
    }

    // Analytics calculations
    const themeStats = feedbacks.reduce((acc, f) => {
        acc[f.preferred_color] = (acc[f.preferred_color] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const pieData = Object.entries(themeStats).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: COLORS[name as keyof typeof COLORS],
    }))

    const departmentStats = feedbacks.reduce((acc, f) => {
        const dept = f.department
        if (!acc[dept]) {
            acc[dept] = { department: dept, green: 0, purple: 0, blue: 0 }
        }
        acc[dept][f.preferred_color]++
        return acc
    }, {} as Record<string, { department: string; green: number; purple: number; blue: number }>)

    const barData = Object.values(departmentStats).slice(0, 10) // Top 10 departments

    const totalSubmissions = feedbacks.length
    const todaySubmissions = feedbacks.filter(f => {
        const today = new Date().toDateString()
        return new Date(f.created_at!).toDateString() === today
    }).length

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Admin Dashboard</h1>
                        <p className="text-slate-500">View all submitted feedback and analytics</p>
                    </div>

                    <button
                        onClick={fetchFeedbacks}
                        className="px-6 py-3 rounded-xl bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 mb-8">
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Total Submissions</p>
                                <p className="text-3xl font-bold text-slate-800">{totalSubmissions}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Today</p>
                                <p className="text-3xl font-bold text-slate-800">{todaySubmissions}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Most Popular</p>
                                <p className="text-3xl font-bold text-slate-800 capitalize">
                                    {pieData.length > 0 ? pieData.reduce((a, b) => a.value > b.value ? a : b).name : '-'}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Departments</p>
                                <p className="text-3xl font-bold text-slate-800">{Object.keys(departmentStats).length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Pie Chart */}
                    <div className="glass-card rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Theme Preference Distribution</h2>
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            color: '#1e293b'
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-slate-400">
                                No data available
                            </div>
                        )}
                    </div>

                    {/* Bar Chart */}
                    <div className="glass-card rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Preferences by Department</h2>
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="department"
                                        stroke="#64748b"
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            color: '#1e293b'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="green" fill={COLORS.green} name="Green" />
                                    <Bar dataKey="purple" fill={COLORS.purple} name="Purple" />
                                    <Bar dataKey="blue" fill={COLORS.blue} name="Blue" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-slate-400">
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Submissions Table */}
                <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">All Submissions</h2>

                    {feedbacks.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-slate-500 font-medium">Name</th>
                                        <th className="text-left py-3 px-4 text-slate-500 font-medium">Department</th>
                                        <th className="text-left py-3 px-4 text-slate-500 font-medium">Preferred Theme</th>
                                        <th className="text-left py-3 px-4 text-slate-500 font-medium">Remarks</th>
                                        <th className="text-left py-3 px-4 text-slate-500 font-medium">Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map((feedback) => (
                                        <tr key={feedback.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-4 text-slate-800">{feedback.name}</td>
                                            <td className="py-4 px-4 text-slate-600">{feedback.department}</td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                                                    style={{
                                                        backgroundColor: `${COLORS[feedback.preferred_color]}15`,
                                                        color: COLORS[feedback.preferred_color]
                                                    }}
                                                >
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: COLORS[feedback.preferred_color] }}
                                                    />
                                                    {feedback.preferred_color.charAt(0).toUpperCase() + feedback.preferred_color.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-slate-500 max-w-xs truncate">
                                                {feedback.remark || '-'}
                                            </td>
                                            <td className="py-4 px-4 text-slate-500">
                                                {new Date(feedback.created_at!).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-400">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No submissions yet</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
