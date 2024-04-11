import { useEffect, useState } from 'react';
import StarOutline from '../../assets/icons/estrela-linha.png'
import FullStar from '../../assets/icons/estrela-preenchida.png'
// to do
export const RatingBar = () => {
    const [ isClicked, setIsClicked ] = useState(false);
    const [ src, setSrc ] = useState(StarOutline)
    const [defaultRating, setDefaultRating] = useState(0); 
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        if(isClicked){
            setSrc(FullStar);
        } else {
            setSrc(StarOutline);
        }
    }, [isClicked])

    return (
        <div>
            {maxRating.map((rating, index) => {
                return (
                    <img 
                        key={index}
                        onClick={handleClick}
                        src={rating <= index ? FullStar : StarOutline}
                        alt="star"
                    />
                )
            })}
        </div>
    )
}