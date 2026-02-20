import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
    User, Edit, Bell, Heart, Shield, LogOut,
    ChevronRight, Dumbbell, Clock, Flame, Trophy,
    Award, Target, Star
} from 'lucide-react'

export default function Profile() {
    const { state, stats } = useApp()
    const { profile } = state

    return (
        <div className="page-content">
            <header className="page-header">
                <div className="page-header-left">
                    <h1 className="page-header-title">Profile</h1>
                </div>
                <div className="page-header-actions">
                    <Link to="/profile/edit" className="page-header-action" title="Edit Profile">
                        <Edit size={18} />
                    </Link>
                </div>
            </header>

            <div className="profile-content">
                {/* Profile Header */}
                <div className="profile-header animate-in">
                    <div className="profile-avatar">
                        <img src={profile.avatarUrl} alt={profile.fullName} />
                    </div>
                    <h2 className="profile-name">{profile.fullName}</h2>
                    <p className="profile-email">{profile.email}</p>
                </div>

                {/* Bento Stats */}
                <div className="bento-grid bento-4col" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div className="bento-item profile-stat-card animate-in animate-in-delay-1">
                        <div className="profile-stat-icon"><Dumbbell size={18} /></div>
                        <div className="profile-stat-text">
                            <span className="profile-stat-label">Workouts</span>
                            <span className="profile-stat-value">{stats.totalWorkouts}</span>
                        </div>
                    </div>
                    <div className="bento-item profile-stat-card animate-in animate-in-delay-2">
                        <div className="profile-stat-icon"><Clock size={18} /></div>
                        <div className="profile-stat-text">
                            <span className="profile-stat-label">Time</span>
                            <span className="profile-stat-value">{stats.totalMinutes}m</span>
                        </div>
                    </div>
                    <div className="bento-item profile-stat-card animate-in animate-in-delay-3">
                        <div className="profile-stat-icon"><Flame size={18} /></div>
                        <div className="profile-stat-text">
                            <span className="profile-stat-label">Calories</span>
                            <span className="profile-stat-value">{stats.totalCalories}</span>
                        </div>
                    </div>
                    <div className="bento-item profile-stat-card animate-in animate-in-delay-4">
                        <div className="profile-stat-icon"><Star size={18} /></div>
                        <div className="profile-stat-text">
                            <span className="profile-stat-label">Points</span>
                            <span className="profile-stat-value">{stats.points}</span>
                        </div>
                    </div>
                </div>

                {/* Points Card */}
                <div className="bento-item points-card animate-in animate-in-delay-3" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <Trophy size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div className="points-label">FitVolt Points</div>
                        <div className="points-value">{stats.points} points — Level {Math.floor(stats.points / 100) + 1}</div>
                        <div className="points-bar">
                            <div className="points-bar-fill" style={{ width: `${stats.points % 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="profile-menu animate-in animate-in-delay-4">
                    <Link to="/profile/edit" className="profile-menu-item">
                        <div className="profile-menu-icon"><Edit size={18} /></div>
                        <span className="profile-menu-text">Edit Profile</span>
                        <ChevronRight size={18} className="profile-menu-arrow" />
                    </Link>
                    <Link to="/notifications" className="profile-menu-item">
                        <div className="profile-menu-icon"><Bell size={18} /></div>
                        <span className="profile-menu-text">Notifications</span>
                        {stats.unreadCount > 0 && (
                            <span className="nav-badge">{stats.unreadCount}</span>
                        )}
                        <ChevronRight size={18} className="profile-menu-arrow" />
                    </Link>
                    <div className="profile-menu-item">
                        <div className="profile-menu-icon"><Heart size={18} /></div>
                        <span className="profile-menu-text">Health Data</span>
                        <ChevronRight size={18} className="profile-menu-arrow" />
                    </div>
                    <div className="profile-menu-item">
                        <div className="profile-menu-icon"><Shield size={18} /></div>
                        <span className="profile-menu-text">Privacy & Security</span>
                        <ChevronRight size={18} className="profile-menu-arrow" />
                    </div>
                    <div className="profile-menu-item" style={{ color: 'var(--error)' }}>
                        <div className="profile-menu-icon" style={{ color: 'var(--error)' }}><LogOut size={18} /></div>
                        <span className="profile-menu-text">Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
