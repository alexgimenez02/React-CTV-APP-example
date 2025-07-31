import { defaultPosterPath } from "../constants"

interface CardProps {
    title: string
    posterPath: string
    isFocused?: boolean
}


const Card = ({ title, posterPath, isFocused }: CardProps) => {
    return <div style={{border: isFocused ? '12px solid gold' : '1px solid black', display: 'flex', flexDirection: 'column', gap: '4px', width: '342px'}}>
        <img style={{height: '514px'}} src={`${defaultPosterPath}/w342${posterPath}`} alt={title}/>
        <p style={{margin: 0, fontSize: '24px', textWrap: 'nowrap', overflow: 'hidden', }}>{title}</p>
    </div>
}

export default Card