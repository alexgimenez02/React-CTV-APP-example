import { forwardRef, ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { Movie } from "../api/types"
import Card from "./Card"

interface RailDivProps {
    children: ReactElement | ReactElement[]
}

const RailDiv = forwardRef<HTMLDivElement, RailDivProps>(({children}, ref) => {
    return <div ref={ref} className="rail" style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', margin: 0, gap: '4px'}} >
        {children}
        </div>
})

interface MovieRailProps {
    movies: Movie[]
    focusedIndex: number
    isRailFocused: boolean
}

export const MovieRail = ({movies, focusedIndex, isRailFocused}: MovieRailProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const itemsRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if(!isRailFocused) return

        const handle = requestAnimationFrame(() => {
            if(scrollRef.current) {
                const focusedItem = itemsRefs.current[focusedIndex]
                if (focusedItem) {
                    focusedItem.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
                }
            }
        })
            
        return () => cancelAnimationFrame(handle)
    }, [focusedIndex, isRailFocused])

    useEffect(() => {
        itemsRefs.current = new Array(movies.length).fill(null)
    }, [movies.length])

    return <RailDiv ref={scrollRef}>
        {movies.map((movie, index) => ( 
            <div key={index} ref={(el) => {itemsRefs.current[index] = el}}>
                <Card isFocused={isRailFocused && focusedIndex === index} title={movie.title} posterPath={movie.poster_path}/>
            </div>
        ))}
    </RailDiv>
}