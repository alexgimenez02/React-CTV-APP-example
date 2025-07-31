import { Route, Routes } from "react-router"
import routes, { RouteDefinition } from "./routes"
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"
import TMDB from "./api/TMDB"
import { Movie } from "./api/types"
import UserData from "./utils/userData"

interface AppContextProps {
  API: TMDB | undefined
  movies: Movie[]
  setMovies: Dispatch<SetStateAction<Movie[]>>
  currentMovie?: Movie
  setCurrentMovie: Dispatch<SetStateAction<Movie | undefined>>
  watchList: Movie[]
  setWatchList: Dispatch<SetStateAction<Movie[]>>
}

export const AppContext = createContext<AppContextProps>({
  API: undefined,
  movies: [],
  setMovies: () => {},
  setCurrentMovie: () => {},
  watchList: [],
  setWatchList: () => {},
})

const App = () => {
  const API = new TMDB()
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentMovie, setCurrentMovie] = useState<Movie | undefined>(undefined)
  const [watchList, setWatchList] = useState<Movie[]>([])

  useEffect(() => {
    const userData = UserData.get()
    if(userData !== null) {
      if(userData.cachedMovies) {
        setMovies(userData.cachedMovies)
      }
      if(userData.cachedWatchList) {
        setWatchList(userData.cachedWatchList)
      }
    }
  }, [])
  
  return (
    <AppContext value={{API: API, movies: movies, setMovies, currentMovie, setCurrentMovie, watchList, setWatchList}}>

      <div style={{display: 'flex', width: 'inherit', height: 'inherit'}}>
        <Routes>
          {routes.map((route: RouteDefinition) => (
            <Route path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </AppContext>
  )
}

export default App