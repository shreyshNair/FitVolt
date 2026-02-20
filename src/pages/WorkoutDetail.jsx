import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
    ArrowLeft, Clock, Flame, Dumbbell, Check,
    Play, Trophy, ChevronRight, Star, Timer
} from 'lucide-react'

export default function WorkoutDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state, dispatch } = useApp()
    const plan = state.workoutPlans.find(p => p.id === id)
    const [checked, setChecked] = useState({})
    const [completed, setCompleted] = useState(false)
    const [earnedStats, setEarnedStats] = useState(null)

    if (!plan) {
        return (
            <div className="page-content">
                <header className="page-header">
                    <div className="page-header-left">
                        <button className="page-header-back" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                        </button>
                        <h1 className="page-header-title">Not Found</h1>
                    </div>
                </header>
                <div className="empty-state" style={{ padding: '80px 24px', textAlign: 'center' }}>
                    <Dumbbell size={48} style={{ color: 'var(--text-tertiary)', marginBottom: 16 }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Workout plan not found.</p>
                    <Link to="/workouts" className="btn-primary" style={{ maxWidth: 200, marginTop: 16 }}>
                        Browse Workouts
                    </Link>
                </div>
            </div>
        )
    }

    const toggleExercise = (exId) => {
        setChecked(prev => ({ ...prev, [exId]: !prev[exId] }))
    }

    const checkedCount = Object.values(checked).filter(Boolean).length
    const allChecked = checkedCount === plan.exercises.length

    const handleFinish = () => {
        const fraction = checkedCount / plan.exercises.length
        const duration = Math.round(plan.duration * fraction)
        const cals = Math.round(plan.calories * fraction)
        const pts = Math.round(cals / 10)

        dispatch({
            type: 'COMPLETE_WORKOUT',
            payload: {
                workoutId: plan.id,
                workoutTitle: plan.title,
                duration,
                caloriesBurned: cals,
                exercisesCompleted: checkedCount,
                totalExercises: plan.exercises.length
            }
        })

        setEarnedStats({ duration, cals, pts, exercisesCompleted: checkedCount })
        setCompleted(true)
    }

    if (completed && earnedStats) {
        return (
            <div className="page-content">
                <div className="completion-screen">
                    <div className="completion-icon animate-in">
                        <Trophy size={48} />
                    </div>
                    <h2 className="completion-title animate-in animate-in-delay-1">Workout Complete!</h2>
                    <p className="completion-subtitle animate-in animate-in-delay-2">
                        Great job finishing {plan.title}!
                    </p>

                    <div className="completion-stats animate-in animate-in-delay-3">
                        <div className="completion-stat">
                            <Flame size={20} style={{ color: 'var(--accent)' }} />
                            <div className="completion-stat-value">{earnedStats.cals}</div>
                            <div className="completion-stat-label">Calories</div>
                        </div>
                        <div className="completion-stat">
                            <Clock size={20} style={{ color: 'var(--accent)' }} />
                            <div className="completion-stat-value">{earnedStats.duration}m</div>
                            <div className="completion-stat-label">Duration</div>
                        </div>
                        <div className="completion-stat">
                            <Star size={20} style={{ color: 'var(--accent)' }} />
                            <div className="completion-stat-value">+{earnedStats.pts}</div>
                            <div className="completion-stat-label">Points</div>
                        </div>
                        <div className="completion-stat">
                            <Dumbbell size={20} style={{ color: 'var(--accent)' }} />
                            <div className="completion-stat-value">{earnedStats.exercisesCompleted}/{plan.exercises.length}</div>
                            <div className="completion-stat-label">Exercises</div>
                        </div>
                    </div>

                    <div className="completion-actions animate-in animate-in-delay-4">
                        <Link to="/progress" className="btn-primary">View Progress</Link>
                        <Link to="/workouts" className="btn-secondary">Back to Workouts</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page-content">
            <header className="page-header">
                <div className="page-header-left">
                    <button className="page-header-back" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="page-header-title">{plan.title}</h1>
                </div>
            </header>

            <div className="workout-detail-content">
                {/* Hero */}
                <div className="workout-detail-hero">
                    <img src={plan.image} alt={plan.title} />
                    <div className="workout-detail-hero-overlay" />
                </div>

                {/* Info */}
                <div className="workout-detail-info">
                    <h2 className="workout-detail-title">{plan.title}</h2>
                    <div className="workout-detail-meta">
                        <div className="workout-detail-meta-item">
                            <Clock size={16} /> {plan.duration} mins
                        </div>
                        <div className="workout-detail-meta-item">
                            <Flame size={16} /> {plan.calories} cal
                        </div>
                        <div className="workout-detail-meta-item">
                            <Dumbbell size={16} /> {plan.exercises.length} exercises
                        </div>
                        <div className="workout-detail-meta-item">
                            <Star size={16} /> {plan.difficulty}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="workout-action-btns">
                        <button
                            className="start-workout-btn"
                            onClick={() => navigate('/active-workout', { state: { plan } })}
                        >
                            <Timer size={20} /> Start Timed Workout
                        </button>
                    </div>
                </div>

                {/* Exercise list as bento grid */}
                <div className="exercise-list">
                    {plan.exercises.map((ex, idx) => (
                        <div
                            key={ex.id}
                            className={`exercise-card ${checked[ex.id] ? 'exercise-done' : ''}`}
                            style={{ animationDelay: `${0.05 * idx}s` }}
                        >
                            <div className={`exercise-number ${checked[ex.id] ? 'done' : ''}`}>
                                {checked[ex.id] ? <Check size={14} /> : idx + 1}
                            </div>
                            <div className="exercise-info">
                                <div className="exercise-name">{ex.name}</div>
                                <div className="exercise-desc">{ex.sets} sets × {ex.reps} reps</div>
                            </div>
                            <button
                                className={`exercise-check ${checked[ex.id] ? 'done' : ''}`}
                                onClick={() => toggleExercise(ex.id)}
                            >
                                {checked[ex.id] && <Check size={14} />}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Finish Button */}
                {checkedCount > 0 && (
                    <div style={{ padding: '0 var(--space-4xl) var(--space-4xl)' }}>
                        <button className="btn-primary" onClick={handleFinish}>
                            <Check size={18} />
                            {allChecked ? 'Complete Workout' : `Finish (${checkedCount}/${plan.exercises.length})`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
