export default function GaugeChart({ percentage = 65 }) {
    // Semi-circle gauge
    const radius = 35
    const circumference = Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className="gauge-container">
            <svg className="gauge-svg" viewBox="0 0 90 55">
                <path
                    className="gauge-bg"
                    d="M 10 50 A 35 35 0 0 1 80 50"
                />
                <path
                    className="gauge-fill"
                    d="M 10 50 A 35 35 0 0 1 80 50"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
        </div>
    )
}
