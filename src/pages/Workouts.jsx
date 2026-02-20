import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Search, Bell, ChevronRight, Dumbbell } from 'lucide-react'

export default function Workouts() {
    const { state, stats } = useApp()
    const { workoutCategories, workoutPlans } = state

    return (
        <div className="page-content">
            <header className="page-header">
                <div className="page-header-left">
                    <h1 className="page-header-title">Workouts</h1>
                </div>
                <div className="page-header-actions">
                    <button className="page-header-action"><Search size={18} /></button>
                    <Link to="/notifications" className="page-header-action">
                        <Bell size={18} />
                        {stats.unreadCount > 0 && <span className="notification-badge" />}
                    </Link>
                </div>
            </header>

            <div className="workout-page-content">
                <div className="workout-page-header">
                    <h1>Find Your Workout</h1>
                    <p>Choose from our curated workout programs designed for every fitness level.</p>
                </div>

                {/* Categories as bento grid */}
                <div className="workout-category-list">
                    {workoutCategories.map((cat, idx) => (
                        <Link
                            to={`/workouts/${workoutPlans.find(p => p.category === cat.id.replace('-', ''))?.id || workoutPlans[0].id}`}
                            key={cat.id}
                            className="workout-category-card animate-in"
                            style={{ animationDelay: `${0.08 * idx}s` }}
                        >
                            <img src={cat.image} alt={cat.name} />
                            <div className="workout-category-overlay">
                                <span className="workout-category-name">{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* All Workout Plans */}
                <div style={{ padding: 'var(--space-3xl) var(--space-4xl)' }}>
                    <div className="section-header">
                        <h3 className="section-title">All Programs</h3>
                        <span className="section-link">{workoutPlans.length} programs</span>
                    </div>

                    <div className="bento-grid bento-2col">
                        {workoutPlans.map((plan, idx) => (
                            <Link
                                to={`/workouts/${plan.id}`}
                                key={plan.id}
                                className="bento-item bento-workout-card animate-in"
                                style={{ animationDelay: `${0.05 * idx}s` }}
                            >
                                <div className="bento-workout-card-img">
                                    <img src={plan.image} alt={plan.title} />
                                    <div className="bento-workout-card-badge">{plan.difficulty}</div>
                                </div>
                                <div className="bento-workout-card-body">
                                    <h4 className="bento-workout-card-title">{plan.title}</h4>
                                    <div className="bento-workout-card-meta">
                                        {plan.duration} mins · {plan.exercises.length} exercises · {plan.calories} cal
                                    </div>
                                </div>
                                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
