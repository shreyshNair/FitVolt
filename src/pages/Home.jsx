import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GaugeChart from '../components/GaugeChart'
import {
    Heart, Timer, Flame, ChevronRight, Star,
    TrendingUp, Dumbbell, Calendar, Search, Bell, MessageCircle, Target, Zap
} from 'lucide-react'

const bodyParts = [
    { id: 'all', label: 'All',  },
    { id: 'legs', label: 'Leg',  },
    { id: 'shoulder', label: 'Shoulder',   },
    { id: 'chest', label: 'Chest',   },
    { id: 'back', label: 'Back',   },
    { id: 'core', label: 'Core',  },
    { id: 'arms', label: 'Arms',   }
]

export default function Home() {
    const { state, stats } = useApp()
    const { profile, workoutPlans } = state
    const [activeFilter, setActiveFilter] = useState('all')

    const filtered = activeFilter === 'all'
        ? workoutPlans
        : workoutPlans.filter(p => p.category === activeFilter)

    const calorieGoal = 800
    const caloriePercent = Math.min((stats.todayCalories / calorieGoal) * 100, 100)

    return (
        <div className="page-content">
            {/* Header */}
            <header className="page-header">
                <div className="page-header-left">
                    <h1 className="page-header-title">Dashboard</h1>
                </div>
                <div className="page-header-actions">
                    <button className="page-header-action"><Search size={18} /></button>
                    <Link to="/notifications" className="page-header-action">
                        <Bell size={18} />
                        {stats.unreadCount > 0 && <span className="notification-badge" />}
                    </Link>
                </div>
            </header>

            {/* Dashboard Bento */}
            <div className="dashboard-content">
                {/* Greeting */}
                <div className="bento-greeting animate-in">
                    <div className="home-avatar">
                        <img src={profile.avatarUrl} alt={profile.fullName} />
                    </div>
                    <div className="home-greeting-text">
                        <h2>Hi! {profile.fullName} </h2>
                        <p>Welcome to FitVolt — let's crush your goals today!</p>
                    </div>
                </div>

                {/* Bento Grid — Top Stats */}
                <div className="bento-grid bento-4col">
                    {/* Calories — spans 2 cols */}
                    <div className="bento-item bento-span-2 calories-card animate-in animate-in-delay-1">
                        <div className="calories-label">
                            <Flame size={14} />
                            CALORIES BURNED TODAY
                        </div>
                        <div className="calories-content">
                            <div className="calories-text">
                                <h3>Your Daily Calories</h3>
                                <div className="calories-value">
                                    {stats.todayCalories}<span>Kcal</span>
                                </div>
                            </div>
                            <GaugeChart percent={caloriePercent} />
                        </div>
                    </div>

                    {/* Heart Rate */}
                    <div className="bento-item stat-card animate-in animate-in-delay-2">
                        <div className="stat-header">
                            <span className="stat-label">Heart Rate</span>
                            <div className="stat-icon"><Heart size={16} /></div>
                        </div>
                        <div className="stat-value">112 <span>BPM</span></div>
                    </div>

                    {/* Workout Time */}
                    <div className="bento-item stat-card animate-in animate-in-delay-3">
                        <div className="stat-header">
                            <span className="stat-label">Workout Time</span>
                            <div className="stat-icon"><Timer size={16} /></div>
                        </div>
                        <div className="stat-value">{stats.todayMinutes || 0}<span>min</span></div>
                    </div>
                </div>

                {/* Bento Grid — Middle */}
                <div className="bento-grid bento-4col">
                    {/* Weekly Goal */}
                    <div className="bento-item bento-card animate-in animate-in-delay-1">
                        <div className="bento-card-header">
                            <Target size={18} className="bento-card-icon" />
                            <span className="bento-card-title">Weekly Goal</span>
                        </div>
                        <div className="bento-goal-ring">
                            <div className="bento-goal-value">{stats.weeklyCount}/{stats.weeklyGoal}</div>
                            <div className="bento-goal-label">workouts</div>
                        </div>
                        <div className="bento-goal-bar">
                            <div className="bento-goal-bar-fill" style={{ width: `${stats.weeklyPercent}%` }} />
                        </div>
                    </div>

                    {/* Total Workouts */}
                    <div className="bento-item bento-card animate-in animate-in-delay-2">
                        <div className="bento-card-header">
                            <Dumbbell size={18} className="bento-card-icon" />
                            <span className="bento-card-title">Total Workouts</span>
                        </div>
                        <div className="bento-big-number">{stats.totalWorkouts}</div>
                        <div className="bento-big-label">all time</div>
                    </div>

                    {/* Trainer */}
                    <div className="bento-item bento-span-2 bento-card bento-card-row animate-in animate-in-delay-3">
                        <div className="trainer-avatar">
                            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face" alt="Coach" />
                        </div>
                        <div className="trainer-info">
                            <div className="trainer-name">Coach Alex</div>
                            <div className="trainer-status">
                                <span style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: 'var(--accent)', display: 'inline-block'
                                }} />
                                New Feedback available
                            </div>
                        </div>
                        <button className="trainer-chat-btn"><MessageCircle size={18} /></button>
                    </div>
                </div>

                {/* Bento Grid — Workout Section */}
                <div className="bento-section animate-in animate-in-delay-4">
                    <div className="section-header">
                        <h3 className="section-title">Body Focus</h3>
                        <Link to="/workouts" className="section-link">See all <ChevronRight size={14} /></Link>
                    </div>

                    <div className="body-focus-pills">
                        {bodyParts.map(bp => (
                            <button
                                key={bp.id}
                                className={`body-focus-pill ${activeFilter === bp.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(bp.id)}
                            >
                                <span className="body-focus-pill-icon">{bp.emoji}</span>
                                {bp.label}
                            </button>
                        ))}
                    </div>

                    <div className="bento-workout-list">
                        {filtered.slice(0, 5).map((plan, idx) => (
                            <Link
                                to={`/workouts/${plan.id}`}
                                key={plan.id}
                                className="workout-list-card animate-in"
                                style={{ animationDelay: `${0.05 * idx}s` }}
                            >
                                <div className="workout-list-thumb">
                                    <img src={plan.image} alt={plan.title} />
                                </div>
                                <div className="workout-list-info">
                                    <div className="workout-list-title">{plan.title}</div>
                                    <div className="workout-list-meta">
                                        {plan.duration} mins · {plan.exercises.length} Exercises
                                    </div>
                                    <div className="workout-list-rating">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <span key={s} className={`star ${s <= 3 ? '' : 'empty'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
