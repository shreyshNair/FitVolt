import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import {
    ArrowLeft, Bell, Dumbbell, Trophy, Flame,
    MoreVertical, CheckCircle, Star
} from 'lucide-react'

function getNotifIcon(title) {
    if (title?.includes('Workout')) return <Dumbbell size={18} />
    if (title?.includes('Points')) return <Star size={18} />
    if (title?.includes('Goal')) return <Trophy size={18} />
    return <Bell size={18} />
}

export default function Notifications() {
    const { state, dispatch } = useApp()
    const { notifications } = state

    // Mark notifications as read when user visits this page
    useEffect(() => {
        dispatch({ type: 'MARK_NOTIFICATIONS_READ' })
    }, [dispatch])

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayNotifs = notifications.filter(n => new Date(n.createdAt) >= today)
    const earlierNotifs = notifications.filter(n => new Date(n.createdAt) < today)

    const formatTime = (iso) => {
        const d = new Date(iso)
        const diff = Date.now() - d.getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 1) return 'Just now'
        if (mins < 60) return `${mins}m ago`
        const hrs = Math.floor(mins / 60)
        if (hrs < 24) return `${hrs}h ago`
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <div className="page-content">
            <header className="page-header">
                <div className="page-header-left">
                    <h1 className="page-header-title">Notifications</h1>
                </div>
                {notifications.length > 0 && (
                    <div className="page-header-actions">
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                            All read
                        </span>
                    </div>
                )}
            </header>

            <div className="notifications-content">
                {notifications.length === 0 ? (
                    <div className="bento-item bento-card" style={{ textAlign: 'center', padding: 'var(--space-5xl) var(--space-2xl)' }}>
                        <Bell size={40} style={{ color: 'var(--text-tertiary)', marginBottom: 16 }} />
                        <h3 style={{ fontWeight: 600, marginBottom: 8 }}>No notifications yet</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            Complete a workout to receive notifications here.
                        </p>
                    </div>
                ) : (
                    <>
                        {todayNotifs.length > 0 && (
                            <div className="animate-in">
                                <h3 className="notification-section-title">Today</h3>
                                <div className="notification-list">
                                    {todayNotifs.map((n, idx) => (
                                        <div
                                            key={n.id}
                                            className="notification-card animate-in"
                                            style={{ animationDelay: `${0.05 * idx}s` }}
                                        >
                                            <div className="notification-icon-wrapper">
                                                {getNotifIcon(n.title)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-title">{n.title}</div>
                                                <div className="notification-desc">{n.desc}</div>
                                                <div className="notification-time">{formatTime(n.createdAt)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {earlierNotifs.length > 0 && (
                            <div className="animate-in animate-in-delay-2">
                                <h3 className="notification-section-title">Earlier</h3>
                                <div className="notification-list">
                                    {earlierNotifs.map((n, idx) => (
                                        <div
                                            key={n.id}
                                            className="notification-card animate-in"
                                            style={{ animationDelay: `${0.05 * idx}s` }}
                                        >
                                            <div className="notification-icon-wrapper">
                                                {getNotifIcon(n.title)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-title">{n.title}</div>
                                                <div className="notification-desc">{n.desc}</div>
                                                <div className="notification-time">{formatTime(n.createdAt)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
