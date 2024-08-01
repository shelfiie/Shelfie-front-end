import { useFetchPaginometer } from '../../api/hooks/useFetchPaginometer';
import { PaginometroDiv } from './paginometro.styles'
// to do

export const Paginometro = () => {
    const { quantity } = useFetchPaginometer();
    return (
        <PaginometroDiv>
            <p>Paginômetro</p>
            <p>{quantity?.paginometer}</p>
        </PaginometroDiv>
    )
}