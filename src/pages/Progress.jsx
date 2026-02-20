import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CircularProgress from '../components/CircularProgress'
import {
    ArrowLeft, Flame, Clock, Dumbbell, TrendingUp,
    Calendar, Target, Trophy, ChevronRight, Search, Bell
} from 'lucide-react'

export default function Progress() {
    const { state, stats } = useApp()

    const formatDate = (iso) => {
        const d = new Date(iso)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const formatTimeAgo = (iso) => {
        const diff = Date.now() - new Date(iso).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 60) return `${mins}m ago`
        const hrs = Math.floor(mins / 60)
        if (hrs < 24) return `${hrs}h ago`
        const days = Math.floor(hrs / 24)
        return `${days}d ago`
    }

    return (
        <div className="page-content">
            <header className="page-header">
                <div className="page-header-left">
                    <h1 className="page-header-title">Progress</h1>
                </div>
                <div className="page-header-actions">
                    <Link to="/notifications" className="page-header-action">
                        <Bell size={18} />
                        {stats.unreadCount > 0 && <span className="notification-badge" />}
                    </Link>
                </div>
            </header>

            <div className="progress-content">
                {/* Bento Summary Stats */}
                <div className="bento-grid bento-3col" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div className="bento-item bento-stat-card animate-in animate-in-delay-1">
                        <div className="bento-stat-icon-wrap"><Dumbbell size={20} /></div>
                        <div className="bento-stat-number">{stats.totalWorkouts}</div>
                        <div className="bento-stat-text">Total Workouts</div>
                    </div>
                    <div className="bento-item bento-stat-card animate-in animate-in-delay-2">
                        <div className="bento-stat-icon-wrap"><Clock size={20} /></div>
                        <div className="bento-stat-number">{stats.totalMinutes}<span>min</span></div>
                        <div className="bento-stat-text">Workout Time</div>
                    </div>
                    <div className="bento-item bento-stat-card animate-in animate-in-delay-3">
                        <div className="bento-stat-icon-wrap"><Flame size={20} /></div>
                        <div className="bento-stat-number">{stats.totalCalories}</div>
                        <div className="bento-stat-text">Calories Burned</div>
                    </div>
                </div>

                {/* Bento Grid — Charts Row */}
                <div className="bento-grid bento-2col" style={{ marginBottom: 'var(--space-2xl)' }}>
                    {/* Weekly Goal */}
                    <div className="bento-item weekly-progress-card animate-in animate-in-delay-1">
                        <div className="weekly-progress-header">
                            <span className="weekly-progress-title">Weekly Goal</span>
                            <span className="weekly-progress-percent">{stats.weeklyPercent}%</span>
                        </div>
                        <div className="circular-progress-container">
                            <CircularProgress percent={stats.weeklyPercent} />
                            <div className="weekly-progress-info">
                                <p><strong>{stats.weeklyCount}</strong> of {stats.weeklyGoal} workouts completed</p>
                                {stats.weeklyPercent >= 100
                                    ? <span className="weekly-progress-link">🎉 Goal achieved!</span>
                                    : <span className="weekly-progress-link">{stats.weeklyGoal - stats.weeklyCount} more to go</span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Weekly Activity Chart */}
                    <div className="bento-item progress-chart-card animate-in animate-in-delay-2">
                        <div className="weekly-progress-header">
                            <span className="weekly-progress-title">Weekly Activity</span>
                        </div>
                        <div className="chart-bars">
                            {stats.weeklyDays.map((d, idx) => (
                                <div className="chart-bar-wrapper" key={idx}>
                                    <div
                                        className={`chart-bar ${d.active ? 'active' : ''} ${d.isToday ? 'today' : ''}`}
                                        style={{ height: `${Math.max(Math.round((d.percent / 100) * 120), 6)}px` }}
                                    />
                                    <span className={`chart-bar-label ${d.isToday ? 'today' : ''}`}>
                                        {d.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Points Card */}
                <div className="bento-item bento-card bento-points-card animate-in animate-in-delay-3" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <Trophy size={22} style={{ color: 'var(--accent)' }} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{stats.points} Points</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Keep working out to earn more!</div>
                        </div>
                    </div>
                </div>

                {/* Workout History */}
                <div className="animate-in animate-in-delay-4">
                    <div className="section-header">
                        <h3 className="section-title">Workout History</h3>
                    </div>

                    {state.completedWorkouts.length === 0 ? (
                        <div className="bento-item bento-card" style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
                            <Dumbbell size={36} style={{ color: 'var(--text-tertiary)', marginBottom: 12 }} />
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                No workouts yet. Complete a workout to see your history here!
                            </p>
                            <Link to="/workouts" className="btn-primary" style={{ maxWidth: 200, marginTop: 16, display: 'inline-flex' }}>
                                Start Workout
                            </Link>
                        </div>
                    ) : (
                        <div className="history-list">
                            {state.completedWorkouts.slice(0, 12).map((w, idx) => (
                                <div
                                    key={w.id}
                                    className="history-card animate-in"
                                    style={{ animationDelay: `${0.05 * idx}s` }}
                                >
                                    <div className="history-icon">
                                        <Dumbbell size={20} />
                                    </div>
                                    <div className="history-info">
                                        <div className="history-title">{w.workoutTitle}</div>
                                        <div className="history-meta">
                                            {w.caloriesBurned} cal · {w.exercisesCompleted}/{w.totalExercises} exercises · {formatDate(w.completedAt)}
                                        </div>
                                    </div>
                                    <div className="history-duration">{w.duration}m</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
