import { NavLink, useLocation } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, User } from 'lucide-react'

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workouts', icon: Dumbbell, label: 'Workout' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Account' }
]

export default function BottomNav() {
    const location = useLocation()

    // Hide nav on active workout page
    if (location.pathname === '/active-workout') return null

    return (
        <nav className="bottom-nav">
            {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path ||
                    (path !== '/' && location.pathname.startsWith(path))

                return (
                    <NavLink
                        key={path}
                        to={path}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon className="nav-item-icon" size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                        <span className="nav-item-label">{label}</span>
                    </NavLink>
                )
            })}
        </nav>
    )
}
