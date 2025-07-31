import { CSSProperties, useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { defaultPosterPath } from "../constants"
import KeyConfig from "../utils/keyConfigs"
import { useNavigate } from "react-router"
import UserData from "../utils/userData"
import Separator from "../components/Separator"

const buttonStyle = (isFocused: boolean): CSSProperties => {
    return {
        borderRadius: 16,
        boxSizing: 'content-box',
        border: isFocused ? '3px solid gold' : '1px solid black',
        padding: '12px 24px',
        alignItems: 'center',
        backgroundColor: isFocused ? '#8e9d0672' : '#1501320f',
        fontSize: '24px'
    }
}

type Focusable = 'GoBackButton' | 'WatchNowButton' | 'AddToWatchListButton'

const Hero = () => {
    const { currentMovie, watchList, setWatchList, setCurrentMovie } = useContext(AppContext)
    const [focusedItem, setFocusedItem] = useState<Focusable>('WatchNowButton')
    const [previousFocusedButton, setPreviousFocusedButton] = useState<Focusable>('WatchNowButton')
    const [text, setText] = useState<string>(watchList.some((movie) => movie.id === currentMovie?.id) ? 'Remove from watchlist' : '+ Add to watchlist')
    const navigate = useNavigate()

    useEffect(() => {
        const offLeft = KeyConfig.handleLeft(() => {
            
            if(focusedItem === 'GoBackButton') {
                return
            }
            if(focusedItem === 'AddToWatchListButton') {
                setFocusedItem('WatchNowButton')
            }
        })
    
        const offRight = KeyConfig.handleRight(() => {
            
            if(focusedItem === 'GoBackButton') {
                return
            }
            if(focusedItem === 'WatchNowButton') {
                setFocusedItem('AddToWatchListButton')
            }
        })
    
        const offEnter = KeyConfig.handleEnter(() => {
            
            if(focusedItem === 'GoBackButton') {
                navigate('/home')
            } else if (focusedItem === 'AddToWatchListButton') {
                if(watchList.some((movie) => movie.id === currentMovie?.id)) {
                    const index = watchList.indexOf(currentMovie!)
                    setWatchList(watchList.filter((_,idx) => index !== idx))
                    UserData.set('cachedWatchList',watchList)
                    setText('+ Add to watchlist')
                } else {
                    const modWatchList = watchList
                    modWatchList.push(currentMovie!)
                    setWatchList(modWatchList)
                    UserData.set('cachedWatchList',watchList)
                    setText('Remove from watchlist')
                }
            } else {
                navigate('/player')
            }
        })
    
        const offUp = KeyConfig.handleUp(() => {
            
            if(focusedItem !== 'GoBackButton') {
                setPreviousFocusedButton(focusedItem)
                setFocusedItem('GoBackButton')
            }
        })
    
        const offDown = KeyConfig.handleDown(() => {
            
            if(focusedItem === 'GoBackButton') {
                setFocusedItem(previousFocusedButton)
            }
        })

        return () => {
            offRight()
            offLeft()
            offUp()
            offDown()
            offEnter()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedItem, watchList])

    useEffect(() => {
        if(currentMovie) {
            UserData.set('lastOpenedMovie', currentMovie)
        } else {
            const lastOpenedMovie = UserData.get()?.lastOpenedMovie
            if(lastOpenedMovie){
                setCurrentMovie(lastOpenedMovie)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return currentMovie ? <div style={{position: 'relative', width: '100%', overflow: 'hidden'}}>
        <div className='backdrop' style={{zIndex: -10, width: 'inherit', height: 'inherit', overflow: 'hidden'}}>
            <img src={`${defaultPosterPath}/w1920${currentMovie.backdrop_path}`} style={{zIndex: -10, position: 'absolute'}} alt="hero-backdrop"></img>
        </div> 
        <div className='info_card' style={{display: 'flex', flexDirection: 'column', marginLeft: '32px', justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-start', width: 'fit-content', height: 'fit-content',  backgroundColor: '#fbfbfbdf', padding: '12px 24px', transform: 'translateY(70%)', borderRadius: '16px'}}>
            <div className='GoBackButton' style={{...buttonStyle(focusedItem === 'GoBackButton'), padding: '8px'}}> <p style={{margin: 0}}>{'<- Go back'}</p> </div>
            <div className='textContent' style={{display: 'flex', flexDirection: 'column', paddingLeft: '8px', maxWidth: '1200px'}}>
                <p style={{fontSize: '42px', margin: 0, textWrap: 'wrap', wordBreak: 'break-word'}}>{currentMovie.title}</p>
                <p style={{fontSize: '31px', marginTop: '20px', marginBottom: 0, textWrap: 'wrap', wordBreak: 'break-word'}}>Movie overview:</p>
                <Separator />
                <p style={{fontSize: '24px', margin: 0, textWrap: 'wrap', wordBreak: 'break-word'}}>{currentMovie.overview}</p>
            </div>
            <Separator />
            <div style={{display: 'flex', justifyContent: 'flex-start', gap: '64px', paddingLeft: '16px', paddingTop: '8px'}}>
                <div className='WatchNowButton' style={buttonStyle(focusedItem === 'WatchNowButton')}>Watch now!</div>
                <div className='AddToWatchListButton' style={buttonStyle(focusedItem === 'AddToWatchListButton')}>{text}</div>
            </div>
        </div>
    </div> : <div>ERROR</div>
}


export default Hero