import React from "react"

interface ProgressBarProps {
    videoTime: string
    totalTime: string
    bufferedTime: string
    color?: string
}

const ProgressBar = ({ videoTime, totalTime, bufferedTime, color = 'red' }: ProgressBarProps) => {
    const current = timeStringToSeconds(videoTime)
    const total = timeStringToSeconds(totalTime)
    const buffered = timeStringToSeconds(bufferedTime)

    const progressPercent = (current / total) * 100
    const bufferedPercent = (buffered / total) * 100

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '99%' }}>
            <div style={{ minWidth: 50 }}>{videoTime}</div>

            <div style={{ flex: 1, position: 'relative', height: 8, background: '#888', borderRadius: 4, overflow: 'hidden' }}>
                {/* Buffered track */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${bufferedPercent}%`,
                    backgroundColor: '#bbb'
                }} />

                {/* Progress bar */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: color
                }} />

                {/* Head circle */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: `calc(${progressPercent}% - 6px)`,
                    transform: 'translateY(-50%)',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 0 4px rgba(0,0,0,0.4)'
                }} />
            </div>

            <div style={{ minWidth: 50 }}>{totalTime}</div>
        </div>
    )
}

// Utility outside the component
const timeStringToSeconds = (time: string): number => {
    const [minutes, seconds] = time.split(':').map(Number)
    return minutes * 60 + seconds
}

export default ProgressBar
