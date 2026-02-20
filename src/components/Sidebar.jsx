import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
    Home, Dumbbell, TrendingUp, User, Bell,
    Zap, Settings, HelpCircle
} from 'lucide-react'

const mainNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/notifications', icon: Bell, label: 'Notifications' }
]

export default function Sidebar() {
    const location = useLocation()
    const { state, stats } = useApp()
    const { profile } = state

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <Zap size={20} />
                </div>
                <div className="sidebar-brand-text">
                    <span className="sidebar-brand-name">FitVolt</span>
                    <span className="sidebar-brand-tagline">Workout Tracker</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <span className="nav-section-label">Main Menu</span>
                {mainNavItems.map(({ path, icon: Icon, label }) => {
                    const isActive = path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(path)

                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon className="nav-item-icon" size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                            <span className="nav-item-label">{label}</span>
                            {label === 'Notifications' && stats.unreadCount > 0 && (
                                <span className="nav-badge">{stats.unreadCount}</span>
                            )}
                        </NavLink>
                    )
                })}

                <span className="nav-section-label" style={{ marginTop: 12 }}>Account</span>

                <NavLink
                    to="/profile"
                    className={`nav-item ${location.pathname.startsWith('/profile') ? 'active' : ''}`}
                >
                    <User className="nav-item-icon" size={20} strokeWidth={1.8} />
                    <span className="nav-item-label">My Profile</span>
                </NavLink>

                {/* These are NOT links — just decorative menu items */}
                <div className="nav-item nav-item-static">
                    <Settings className="nav-item-icon" size={20} strokeWidth={1.8} />
                    <span className="nav-item-label">Settings</span>
                </div>
                <div className="nav-item nav-item-static">
                    <HelpCircle className="nav-item-icon" size={20} strokeWidth={1.8} />
                    <span className="nav-item-label">Help & Support</span>
                </div>
            </nav>

            {/* Footer User */}
            <div className="sidebar-footer">
                <NavLink to="/profile" className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        <img src={profile.avatarUrl} alt="User" />
                    </div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{profile.fullName}</div>
                        <div className="sidebar-user-email">{profile.email}</div>
                    </div>
                </NavLink>
            </div>
        </aside>
    )
}
