import { Movie } from "../api/types"

interface UserDataValues {
    cachedMovies: Movie[]
    lastUpdate: string
    cachedWatchList: Movie[]
    lastOpenedMovie: Movie
}   

export default class UserData {
    static localStorage = window.localStorage.getItem('TMDB_DATA')!
    static get(): UserDataValues | null {
        const userData: UserDataValues = JSON.parse(UserData.localStorage)
        console.log(userData)
        return userData
    }

    static set(name: keyof UserDataValues, value: any) {
        const userData = UserData.get() ?? {} as UserDataValues        
        userData[name] = value
        const stringifiedData = JSON.stringify(userData)
        window.localStorage.setItem('TMDB_DATA', stringifiedData)
    }
}