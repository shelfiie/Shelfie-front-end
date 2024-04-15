import { ReviewContainer } from './index.styles.ts';
import { Heart } from '../globals/Heart.style.tsx';
import { RatingBar } from '../globals/Stars.style.tsx';

export const Review = () => {
    return (
        <ReviewContainer>
            <RatingBar />
            <p>nota</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque molestiae optio molestias dicta nobis. Iste provident vero culpa. A ratione obcaecati iste ullam quo beatae quis error facilis omnis quaerat.</p>
            <div>
                <Heart />
                <p>15 de fevereiro de 2024</p>
            </div>
        </ReviewContainer>
    );
}