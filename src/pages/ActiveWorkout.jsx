import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
    ArrowLeft, Pause, Play, SkipForward, StopCircle,
    Trophy, Flame, Clock, Star, Dumbbell, Check
} from 'lucide-react'

export default function ActiveWorkout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { dispatch } = useApp()
    const plan = location.state?.plan

    const [seconds, setSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [currentExIdx, setCurrentExIdx] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [earnedStats, setEarnedStats] = useState(null)
    const timerRef = useRef(null)

    // Timer
    useEffect(() => {
        if (completed || isPaused) return
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
        return () => clearInterval(timerRef.current)
    }, [isPaused, completed])

    if (!plan) {
        return (
            <div className="page-content">
                <header className="page-header">
                    <div className="page-header-left">
                        <button className="page-header-back" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                        </button>
                        <h1 className="page-header-title">Active Workout</h1>
                    </div>
                </header>
                <div className="empty-state" style={{ padding: '80px 24px', textAlign: 'center' }}>
                    <Dumbbell size={48} style={{ color: 'var(--text-tertiary)', marginBottom: 16 }} />
                    <p style={{ color: 'var(--text-secondary)' }}>No workout selected. Choose a workout to start.</p>
                    <Link to="/workouts" className="btn-primary" style={{ maxWidth: 200, marginTop: 16 }}>
                        Browse Workouts
                    </Link>
                </div>
            </div>
        )
    }

    const formatTime = (s) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    }

    const currentEx = plan.exercises[currentExIdx]
    const isLastExercise = currentExIdx >= plan.exercises.length - 1

    const handleNext = () => {
        if (isLastExercise) {
            handleFinish()
        } else {
            setCurrentExIdx(i => i + 1)
        }
    }

    const handleFinish = () => {
        clearInterval(timerRef.current)
        const durationMin = Math.max(1, Math.round(seconds / 60))
        const fraction = (currentExIdx + 1) / plan.exercises.length
        const cals = Math.round(plan.calories * fraction)
        const pts = Math.round(cals / 10)

        dispatch({
            type: 'COMPLETE_WORKOUT',
            payload: {
                workoutId: plan.id,
                workoutTitle: plan.title,
                duration: durationMin,
                caloriesBurned: cals,
                exercisesCompleted: currentExIdx + 1,
                totalExercises: plan.exercises.length
            }
        })

        setEarnedStats({ duration: durationMin, cals, pts, done: currentExIdx + 1 })
        setCompleted(true)
    }

    // Completion screen
    if (completed && earnedStats) {
        return (
            <div className="page-content">
                <div className="completion-screen">
                    <div className="completion-icon animate-in">
                        <Trophy size={48} />
                    </div>
                    <h2 className="completion-title animate-in animate-in-delay-1">Workout Complete!</h2>
                    <p className="completion-subtitle animate-in animate-in-delay-2">
                        You smashed {plan.title} in {formatTime(seconds)}!
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
                            <div className="completion-stat-value">{earnedStats.done}/{plan.exercises.length}</div>
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

            <div className="active-workout-content">
                {/* Timer Ring */}
                <div className="active-workout-timer animate-in">
                    <div className="timer-value">{formatTime(seconds)}</div>
                    <div className="timer-label">{isPaused ? 'Paused' : 'Elapsed'}</div>
                </div>

                {/* Current Exercise */}
                <h2 className="active-exercise-name animate-in animate-in-delay-1">
                    {currentEx.name}
                </h2>
                <p className="active-exercise-detail animate-in animate-in-delay-2">
                    {currentEx.sets} sets × {currentEx.reps} reps
                </p>

                {/* Controls */}
                <div className="workout-controls animate-in animate-in-delay-3">
                    <button
                        className="control-btn control-btn-danger"
                        onClick={handleFinish}
                        title="Stop Workout"
                    >
                        <StopCircle size={24} />
                    </button>
                    <button
                        className="control-btn control-btn-primary"
                        onClick={() => setIsPaused(p => !p)}
                        title={isPaused ? 'Resume' : 'Pause'}
                    >
                        {isPaused ? <Play size={28} /> : <Pause size={28} />}
                    </button>
                    <button
                        className="control-btn control-btn-secondary"
                        onClick={handleNext}
                        title={isLastExercise ? 'Finish' : 'Next Exercise'}
                    >
                        {isLastExercise ? <Check size={24} /> : <SkipForward size={24} />}
                    </button>
                </div>

                {/* Progress Dots */}
                <div className="exercise-progress-dots animate-in animate-in-delay-4">
                    {plan.exercises.map((_, idx) => (
                        <div
                            key={idx}
                            className={`progress-dot ${idx < currentExIdx ? 'completed' : ''} ${idx === currentExIdx ? 'current' : ''}`}
                        />
                    ))}
                </div>

                <p style={{
                    color: 'var(--text-tertiary)', fontSize: '0.75rem',
                    marginTop: 'var(--space-lg)'
                }}>
                    Exercise {currentExIdx + 1} of {plan.exercises.length}
                </p>
            </div>
        </div>
    )
}
