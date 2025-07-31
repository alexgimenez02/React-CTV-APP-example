import { useEffect, useRef, useState } from "react"
import ProgressBar from "../components/ProgressBar"
import KeyConfig from "../utils/keyConfigs"
import { useNavigate } from "react-router"


const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

type Focusable = 'ProgressBar' | 'Buttons' 

type MuteIcon = '🔇' | '🔊'

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [videoTime, setVideoTime] = useState<string>('00:00')
    const [totalTime, setTotalTime] = useState<string>('00:00')
    const [bufferedTime, setBufferedTIme] = useState<string>('00:00')
    const [focusedLayer, setFocusedLayer] = useState<Focusable>('ProgressBar')
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)
    const [muteIcon, setMuteIcon] = useState<MuteIcon>('🔊')
    const navigate = useNavigate()
    
    const handleTimeUpdate = () => {
        const current = videoRef.current?.currentTime || 0
        setVideoTime(formatTime(current))
    }

    const handleLoadedMetadata = () => {
        const duration = videoRef.current?.duration || 0
        setTotalTime(formatTime(duration))
    }

    const handleProgress = () => {
        const buffered = videoRef.current?.buffered
        const end = buffered?.length ? buffered.end(buffered.length - 1) : 0
        setBufferedTIme(formatTime(end))
    }

    const handleRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 15)
        }
    }

    const handleFastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + 15)
        }
    }

    const handlePlayPause = () => {
        if(videoRef.current) {
            videoRef.current.paused ? videoRef.current.play()! : videoRef.current.pause()!
        }
    }

    const handleMute = () => {
        if(videoRef.current) {
            setMuteIcon(videoRef.current.muted ? '🔊' : '🔇')
            videoRef.current.muted = !videoRef.current.muted

        }
    }
    
    useEffect(() => {
        videoRef.current!.muted = false
        videoRef.current?.play()
    },[])

    useEffect(() => {
        const offDown = KeyConfig.handleDown(() => {
            if(focusedLayer === 'ProgressBar') {
                setFocusedLayer('Buttons')
                setFocusedIndex(0)
            } 
        })

        const offUp = KeyConfig.handleUp(() => {
            if(focusedLayer === 'Buttons') {
                setFocusedLayer('ProgressBar')
                setFocusedIndex(-1)
            }
        })

        const offLeft = KeyConfig.handleLeft(() => {
            if(focusedLayer === 'Buttons') {
                if(focusedIndex > 0) {
                    setFocusedIndex(focusedIndex - 1)
                }
            } else {
                handleRewind()
            }
        })

        const offRight = KeyConfig.handleRight(() => {
            if(focusedLayer === 'Buttons') {
                if(focusedIndex < 3) {
                    setFocusedIndex(focusedIndex + 1)
                }
            } else {
                handleFastForward()
            }
        })

        const offEnter = KeyConfig.handleEnter(() => {
            if(focusedLayer === 'Buttons') {
                switch(focusedIndex) {
                    case 0:
                        handleRewind()
                        break
                    case 1:
                        handlePlayPause()
                        break
                    case 2:
                        handleFastForward()
                        break
                    case 3:
                        handleMute()
                        break
                }
            }
        })

        const offBack = KeyConfig.handleBack(() => {
            if(window.history.length > 2) {
                navigate(-1)
            } else {
                navigate('/home')
            }
        })
        return () => {
            offDown()
            offEnter()
            offLeft()
            offRight()
            offUp()
            offBack()
        }
    }, [focusedIndex, focusedLayer, navigate])

    return <div style={{position: 'relative', backgroundColor: 'black', overflow: 'hidden', width: '100vw', height: '100vh'}}>
            <video 
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onProgress={handleProgress}
                style={{objectFit: 'cover', width: '100%', height: '100%', zIndex: -100}}
                />
            <div className='controls' style={{position: 'absolute', bottom: 0, padding: '16px', width: '100%', zIndex: 1000, backgroundColor: '#ffffffaf'}}>
                <ProgressBar videoTime={videoTime} totalTime={totalTime} bufferedTime={bufferedTime} />
                <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="gb" style={{fontSize: '32px', borderRadius: '16px', margin: 0, padding: 0, border: focusedIndex === 0 ? '8px solid gold' : ''}}>⏪</div>
                    <div className="play_icon" style={{fontSize: '32px', borderRadius: '16px', margin: 0, padding: 0, border: focusedIndex === 1 ? '8px solid gold' : ''}}>▶️</div>
                    <div className="ff" style={{fontSize: '32px', borderRadius: '16px', margin: 0, padding: 0, border: focusedIndex === 2 ? '8px solid gold' : ''}}>⏩</div>
                    <div className="volume" style={{fontSize: '32px', borderRadius: '16px', margin: 0, padding: 0, border: focusedIndex === 3 ? '8px solid gold' : ''}}>{muteIcon}</div>
                </div>
            </div>
        </div>
}


export default VideoPlayer