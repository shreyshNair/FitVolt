import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, User, Phone, Mail, Save, ChevronDown } from 'lucide-react'

export default function EditProfile() {
    const navigate = useNavigate()
    const { state, dispatch } = useApp()
    const { profile } = state

    const [form, setForm] = useState({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender,
        age: profile.age.toString(),
        weight: profile.weight.toString(),
        height: profile.height.toString()
    })

    const [saved, setSaved] = useState(false)

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        setSaved(false)
    }

    const handleSave = (e) => {
        e.preventDefault()
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                gender: form.gender,
                age: parseInt(form.age) || 0,
                weight: parseInt(form.weight) || 0,
                height: parseInt(form.height) || 0
            }
        })
        setSaved(true)
        setTimeout(() => {
            navigate('/profile')
        }, 1200)
    }

    return (
        <div className="page-content">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <button className="page-header-back" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                    </button>
                    <span className="page-header-title">Edit Profile</span>
                </div>
                <div className="page-header-actions" />
            </div>

            <div className="edit-profile-content">
                {/* Avatar Section */}
                <div className="edit-profile-avatar-section animate-in">
                    <div className="edit-avatar-wrapper">
                        <div className="edit-avatar">
                            <img
                                src={profile.avatarUrl}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </div>
                    </div>
                    <span className="edit-avatar-label">{profile.fullName}</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSave}>
                    <div className="form-group animate-in animate-in-delay-1">
                        <label className="form-label">Full Name</label>
                        <div className="form-input-wrapper">
                            <User size={16} className="form-input-icon" />
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group animate-in animate-in-delay-1">
                        <label className="form-label">Email Address</label>
                        <div className="form-input-wrapper">
                            <Mail size={16} className="form-input-icon" />
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group animate-in animate-in-delay-2">
                        <label className="form-label">Phone Number</label>
                        <div className="form-input-wrapper">
                            <Phone size={16} className="form-input-icon" />
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row animate-in animate-in-delay-2">
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <div className="form-input-wrapper">
                                <select
                                    className="form-input form-select"
                                    value={form.gender}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ChevronDown size={14} className="form-select-icon" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Age</label>
                            <div className="form-input-wrapper">
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="Age"
                                    value={form.age}
                                    onChange={(e) => handleChange('age', e.target.value)}
                                    min="10"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row animate-in animate-in-delay-3">
                        <div className="form-group">
                            <label className="form-label">Weight (kg)</label>
                            <div className="form-input-wrapper">
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="Weight"
                                    value={form.weight}
                                    onChange={(e) => handleChange('weight', e.target.value)}
                                    min="20"
                                    max="300"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Height (cm)</label>
                            <div className="form-input-wrapper">
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="Height"
                                    value={form.height}
                                    onChange={(e) => handleChange('height', e.target.value)}
                                    min="100"
                                    max="250"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="animate-in animate-in-delay-4" style={{ marginTop: 8 }}>
                        <button type="submit" className="btn-primary" disabled={saved}>
                            <Save size={16} />
                            {saved ? '✓ Saved!' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
