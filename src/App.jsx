import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import WorkoutDetail from './pages/WorkoutDetail'
import ActiveWorkout from './pages/ActiveWorkout'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Notifications from './pages/Notifications'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/category/:categoryId" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/active-workout" element={<ActiveWorkout />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
