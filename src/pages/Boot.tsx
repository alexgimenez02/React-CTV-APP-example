import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router"
import UserData from "../utils/userData"

const Boot = () => {
    const { API, setMovies } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
      const fetchMovies = async () => {
        const userData = UserData.get()
        const now = new Date()
        let lastUpdate: Date = new Date()

        if(userData !== null) {
          if(userData.lastUpdate) {
            lastUpdate = new Date(userData.lastUpdate)
          }
          if(now.getTime() - lastUpdate.getTime() / (1000 * 60 * 60) >= 2 || userData.cachedMovies.length === 0 ) {
            const movies = await API?.getMovies()
            if(movies) {
              UserData.set('lastUpdate', new Date().getTime())
              UserData.set('cachedMovies', movies)
              setMovies(movies)
            } else {
              return
            }
          } else {
            setMovies(userData.cachedMovies)
          }
        } else {
          const movies = await API?.getMovies()
          if(movies) {
            UserData.set('cachedMovies', movies)
            UserData.set('lastUpdate', new Date().getTime())
            setMovies(movies)
          }
        }

      navigate('/home')
    }

    void fetchMovies()
  }, [])
    const boxSize = '800px'
    return <div className="boot-page" style={{width: 'inherit', height: 'inherit', display: 'flex', justifyContent: 'center'}}>
        <div style={{ alignSelf: 'center', width: boxSize, height: boxSize}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="#FF156D" stroke="#FF156D" stroke-width="15" transform-origin="center" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></path></svg>
            <p style={{fontSize: '46px', textAlign: 'center', margin: 0}}>Loading...</p>
        </div>
    </div> 
}

export default Boot