import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext(null)

// ---- Default Data ----
const defaultProfile = {
    fullName: 'Jaishree',
    email: 'jaishree123@gmail.com',
    phone: '+91 98765 43210',
    gender: 'Female',
    age: 35,
    weight: 60,
    height: 160,
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face'
}

const defaultWorkoutPlans = [
    {
        id: 'shoulder-beginner',
        category: 'shoulder',
        title: 'Shoulder Beginner',
        duration: 20,
        difficulty: 'Beginner',
        calories: 180,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        exercises: [
            { id: 'sb-1', name: 'Overhead Press', sets: 3, reps: 12 },
            { id: 'sb-2', name: 'Lateral Raises', sets: 3, reps: 15 },
            { id: 'sb-3', name: 'Front Raises', sets: 3, reps: 12 },
            { id: 'sb-4', name: 'Shrugs', sets: 3, reps: 15 }
        ]
    },
    {
        id: 'shoulder-intermediate',
        category: 'shoulder',
        title: 'Shoulder Intermediate',
        duration: 30,
        difficulty: 'Intermediate',
        calories: 260,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        exercises: [
            { id: 'si-1', name: 'Military Press', sets: 4, reps: 10 },
            { id: 'si-2', name: 'Arnold Press', sets: 3, reps: 12 },
            { id: 'si-3', name: 'Cable Lateral Raises', sets: 3, reps: 15 },
            { id: 'si-4', name: 'Reverse Fly', sets: 3, reps: 12 },
            { id: 'si-5', name: 'Face Pulls', sets: 3, reps: 15 }
        ]
    },
    {
        id: 'shoulder-advanced',
        category: 'shoulder',
        title: 'Shoulder Advanced',
        duration: 40,
        difficulty: 'Advanced',
        calories: 350,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
        exercises: [
            { id: 'sa-1', name: 'Barbell Overhead Press', sets: 5, reps: 8 },
            { id: 'sa-2', name: 'Dumbbell Lateral Raises', sets: 4, reps: 12 },
            { id: 'sa-3', name: 'Front Plate Raises', sets: 3, reps: 12 },
            { id: 'sa-4', name: 'Rear Delt Fly', sets: 4, reps: 12 },
            { id: 'sa-5', name: 'Upright Rows', sets: 3, reps: 10 },
            { id: 'sa-6', name: 'Landmine Press', sets: 3, reps: 12 }
        ]
    },
    {
        id: 'chest-blast',
        category: 'chest',
        title: 'Chest Blast',
        duration: 35,
        difficulty: 'Intermediate',
        calories: 320,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        exercises: [
            { id: 'cb-1', name: 'Bench Press', sets: 4, reps: 10 },
            { id: 'cb-2', name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
            { id: 'cb-3', name: 'Cable Fly', sets: 3, reps: 15 },
            { id: 'cb-4', name: 'Push-ups', sets: 3, reps: 20 },
            { id: 'cb-5', name: 'Dips', sets: 3, reps: 12 }
        ]
    },
    {
        id: 'leg-power',
        category: 'legs',
        title: 'Leg Power',
        duration: 45,
        difficulty: 'Intermediate',
        calories: 400,
        image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop',
        exercises: [
            { id: 'lp-1', name: 'Barbell Squats', sets: 4, reps: 10 },
            { id: 'lp-2', name: 'Leg Press', sets: 3, reps: 12 },
            { id: 'lp-3', name: 'Romanian Deadlift', sets: 3, reps: 10 },
            { id: 'lp-4', name: 'Leg Curls', sets: 3, reps: 15 },
            { id: 'lp-5', name: 'Calf Raises', sets: 4, reps: 20 }
        ]
    },
    {
        id: 'back-builder',
        category: 'back',
        title: 'Back Builder',
        duration: 40,
        difficulty: 'Intermediate',
        calories: 310,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
        exercises: [
            { id: 'bb-1', name: 'Lat Pulldown', sets: 4, reps: 12 },
            { id: 'bb-2', name: 'Barbell Rows', sets: 4, reps: 10 },
            { id: 'bb-3', name: 'Seated Cable Row', sets: 3, reps: 12 },
            { id: 'bb-4', name: 'Face Pulls', sets: 3, reps: 15 },
            { id: 'bb-5', name: 'Hyperextensions', sets: 3, reps: 15 }
        ]
    },
    {
        id: 'core-crusher',
        category: 'core',
        title: 'Core Crusher',
        duration: 25,
        difficulty: 'Beginner',
        calories: 200,
        image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&h=300&fit=crop',
        exercises: [
            { id: 'cc-1', name: 'Plank', sets: 3, reps: '60s' },
            { id: 'cc-2', name: 'Crunches', sets: 3, reps: 20 },
            { id: 'cc-3', name: 'Leg Raises', sets: 3, reps: 15 },
            { id: 'cc-4', name: 'Russian Twists', sets: 3, reps: 20 }
        ]
    },
    {
        id: 'arm-day',
        category: 'arms',
        title: 'Arm Day',
        duration: 30,
        difficulty: 'Beginner',
        calories: 220,
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
        exercises: [
            { id: 'ad-1', name: 'Bicep Curls', sets: 3, reps: 12 },
            { id: 'ad-2', name: 'Tricep Dips', sets: 3, reps: 12 },
            { id: 'ad-3', name: 'Hammer Curls', sets: 3, reps: 12 },
            { id: 'ad-4', name: 'Skull Crushers', sets: 3, reps: 10 },
            { id: 'ad-5', name: 'Cable Curls', sets: 3, reps: 15 }
        ]
    }
]

const workoutCategories = [
    { id: 'weight-loss', name: 'Weight Loss', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=300&fit=crop' },
    { id: 'sculpted-body', name: 'Sculpted Body', image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=300&fit=crop' },
    { id: 'upper-body', name: 'Upper Body', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=300&fit=crop' },
    { id: 'core-strength', name: 'Core Strength', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop' },
    { id: 'leg-day', name: 'Leg Day', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=600&h=300&fit=crop' },
    { id: 'full-body', name: 'Full Body', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop' }
]

// ---- Helpers ----
function getDayKey(date) {
    const d = new Date(date)
    const day = d.getDay()
    return day === 0 ? 6 : day - 1
}

function getWeekStart() {
    const now = new Date()
    const day = now.getDay()
    const diff = now.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(now)
    monday.setHours(0, 0, 0, 0)
    monday.setDate(diff)
    return monday.getTime()
}

// ---- Initial state ----
function getInitialState() {
    try {
        const saved = localStorage.getItem('fitvolt-state')
        if (saved) {
            const parsed = JSON.parse(saved)
            return {
                profile: parsed.profile || defaultProfile,
                completedWorkouts: parsed.completedWorkouts || [],
                weeklyGoal: parsed.weeklyGoal || 5,
                points: parsed.points || 0,
                workoutPlans: defaultWorkoutPlans,
                workoutCategories,
                notifications: parsed.notifications || [],
                notificationsReadAt: parsed.notificationsReadAt || null
            }
        }
    } catch (e) { /* ignore */ }

    return {
        profile: defaultProfile,
        completedWorkouts: [],
        weeklyGoal: 5,
        points: 0,
        workoutPlans: defaultWorkoutPlans,
        workoutCategories,
        notifications: [],
        notificationsReadAt: null
    }
}

// ---- Reducer ----
function appReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            return { ...state, profile: { ...state.profile, ...action.payload } }

        case 'COMPLETE_WORKOUT': {
            const { workoutId, workoutTitle, duration, caloriesBurned, exercisesCompleted, totalExercises } = action.payload
            const entry = {
                id: Date.now().toString(),
                workoutId,
                workoutTitle,
                duration,
                caloriesBurned,
                exercisesCompleted,
                totalExercises,
                completedAt: new Date().toISOString()
            }
            const newPoints = state.points + Math.round(caloriesBurned / 10)
            const notification = {
                id: Date.now().toString(),
                title: 'Workout Completed!',
                desc: `Great job! You completed ${workoutTitle} — ${caloriesBurned} cal burned.`,
                time: 'Just now',
                createdAt: new Date().toISOString()
            }
            return {
                ...state,
                completedWorkouts: [entry, ...state.completedWorkouts],
                points: newPoints,
                notifications: [notification, ...state.notifications]
            }
        }

        case 'MARK_NOTIFICATIONS_READ':
            return { ...state, notificationsReadAt: new Date().toISOString() }

        case 'SET_WEEKLY_GOAL':
            return { ...state, weeklyGoal: action.payload }

        default:
            return state
    }
}

// ---- Compute stats ----
function computeStats(state) {
    const now = new Date()
    const weekStart = getWeekStart()

    const thisWeekWorkouts = state.completedWorkouts.filter(
        w => new Date(w.completedAt).getTime() >= weekStart
    )

    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const todayIdx = getDayKey(now)

    // Aggregate calories per day
    const dayCals = [0, 0, 0, 0, 0, 0, 0]
    thisWeekWorkouts.forEach(w => {
        const idx = getDayKey(w.completedAt)
        dayCals[idx] += (w.caloriesBurned || 0)
    })

    const maxCal = Math.max(...dayCals, 100) // min 100 to avoid division by zero

    const weeklyDays = dayLabels.map((label, idx) => ({
        day: label,
        calories: dayCals[idx],
        percent: Math.round((dayCals[idx] / maxCal) * 100),
        isToday: idx === todayIdx,
        active: dayCals[idx] > 0
    }))

    const weeklyCount = thisWeekWorkouts.length
    const weeklyPercent = state.weeklyGoal > 0
        ? Math.min(Math.round((weeklyCount / state.weeklyGoal) * 100), 100)
        : 0

    const totalWorkouts = state.completedWorkouts.length
    const totalCalories = state.completedWorkouts.reduce((s, w) => s + (w.caloriesBurned || 0), 0)
    const totalMinutes = state.completedWorkouts.reduce((s, w) => s + (w.duration || 0), 0)

    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const todayWorkouts = state.completedWorkouts.filter(
        w => new Date(w.completedAt).getTime() >= todayStart.getTime()
    )
    const todayCalories = todayWorkouts.reduce((s, w) => s + (w.caloriesBurned || 0), 0)
    const todayMinutes = todayWorkouts.reduce((s, w) => s + (w.duration || 0), 0)

    // Unread notifications count
    const unreadCount = state.notificationsReadAt
        ? state.notifications.filter(n => new Date(n.createdAt) > new Date(state.notificationsReadAt)).length
        : state.notifications.length

    return {
        weeklyDays,
        weeklyCount,
        weeklyGoal: state.weeklyGoal,
        weeklyPercent,
        totalWorkouts,
        totalCalories,
        totalMinutes,
        todayCalories,
        todayMinutes,
        points: state.points,
        unreadCount
    }
}

// ---- Provider ----
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, null, getInitialState)

    useEffect(() => {
        const toSave = {
            profile: state.profile,
            completedWorkouts: state.completedWorkouts,
            weeklyGoal: state.weeklyGoal,
            points: state.points,
            notifications: state.notifications,
            notificationsReadAt: state.notificationsReadAt
        }
        localStorage.setItem('fitvolt-state', JSON.stringify(toSave))
    }, [state])

    const stats = computeStats(state)

    return (
        <AppContext.Provider value={{ state, dispatch, stats }}>
            {children}
        </AppContext.Provider>
    )
}

// ---- Hook ----
export function useApp() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useApp must be used within AppProvider')
    return ctx
}
