import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { MovieRail } from "../components/Rail"
import { useNavigate } from "react-router"
import KeyConfig from "../utils/keyConfigs"

const HomePage = () => {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [focusedRail, setFocusedRail] = useState<number>(0)
    const [previousIndex, setPreviousIndex] = useState<number>(0)
    const { movies, setCurrentMovie, watchList } = useContext(AppContext) 

    const navigate = useNavigate()
    useEffect(() => {
        const offRight = KeyConfig.handleRight(() => {
            if(focusedRail === 0 ? focusedIndex < movies.length : focusedIndex < watchList.length) {
                setFocusedIndex(focusedIndex + 1)
            } 
        })
    
        const offLeft = KeyConfig.handleLeft(() => {
            if(focusedIndex > 0) {
                setFocusedIndex(focusedIndex - 1)
            }
        })
    
        const offEnter = KeyConfig.handleEnter(() => {
            setCurrentMovie(focusedRail === 0 ? movies[focusedIndex] : watchList[focusedIndex])
            navigate(`/hero`)
        })

        const offUp = KeyConfig.handleUp(() => {
            if(focusedRail === 1) {
                setFocusedRail(0)
                const prevIndex = focusedIndex 
                setFocusedIndex(previousIndex)
                setPreviousIndex(prevIndex)
            }
        })

        const offDown = KeyConfig.handleDown(() => {
            if(focusedRail === 0 && watchList.length > 0) {
                setFocusedRail(1)
                const prevIndex = focusedIndex 
                setFocusedIndex(previousIndex)
                setPreviousIndex(prevIndex)
            }
        })

        return  () => {
            offRight()
            offLeft()
            offEnter()
            offUp()
            offDown()
        }
    }, [focusedIndex, movies, focusedRail])

    return <div className="home-page" style={{display: 'flex', flexDirection: 'column', width: 'inherit', height: 'inherit'}}>
        <p style={{fontSize: '32px', marginLeft: '8px'}}>Welcome to the TMDB React APP!</p>
        <MovieRail movies={movies} focusedIndex={focusedRail === 0 ? focusedIndex : previousIndex} isRailFocused={focusedRail === 0} />
        {
            watchList.length > 0 ? 
            (
                <>
                    <p style={{fontSize: '24px', marginLeft: '8px'}}>Watchlist:</p>
                    <MovieRail movies={watchList} focusedIndex={focusedRail === 1 ? focusedIndex : previousIndex} isRailFocused={focusedRail === 1} />
                </>
            ) : null
        }
    </div> 
}

export default HomePage