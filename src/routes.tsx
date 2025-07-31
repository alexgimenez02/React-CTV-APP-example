import { JSX } from "react"
import HomePage from "./pages/Home"
import Boot from "./pages/Boot"
import Hero from "./pages/Hero"
import VideoPlayer from "./pages/Videoplayer"

export interface RouteDefinition {
    path: string
    component: JSX.Element
}
const routes: RouteDefinition[] = [
    {
        path: '',
        component: <Boot />,
    },
    {
        path: 'home',
        component: <HomePage/>,
    }, 
    {
        path: 'hero',
        component: <Hero />
    },
    {
        path: 'player',
        component: <VideoPlayer />
    }
]

export default routes