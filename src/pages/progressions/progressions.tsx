import {useFetchAllProgressions} from "../../api/hooks/useFetchProgressions";
import {Layout} from "../layout/layout";
import {ProgressionsCard} from "./progressions-card";
import {AllProgressions, ProgressionsStyles} from "./progressions.styles";
import {ProgressionSkeleton} from "./progressions-skeleton";
import {NoItemsFound} from "../../components/globals/NoItemsFound";
import {BookData} from "../../types/bookData.ts";

export const Progressions = () => {
    const {progressions, loading, refetchProgressions} = useFetchAllProgressions();

    const sortedProgressions = progressions.sort((a: BookData['progressions'], b: BookData['progressions']) => {
        const dateA = new Date(a?.createdAt).getTime();
        const dateB = new Date(b?.createdAt).getTime();

        // Primeiro, compara as datas
        if (dateA !== dateB) {
            return dateB - dateA; // Ordena da data mais recente para a mais antiga
        }
        // Se as datas forem iguais, compara a contagem de páginas
        return (b?.page ?? 0) - (a?.page ?? 0); // Ordena da página com maior contagem para a menor
    })

    return (
        <Layout>
            <ProgressionsStyles id="progression-styles">
                <div>

                    <h2>Progressões</h2>
                    <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>
                </div>

                {loading ? <ProgressionSkeleton/> : progressions && progressions.length > 0 ?
                   <AllProgressions>
                       {
                           sortedProgressions.map((progression, index) => (
                               <ProgressionsCard
                                   progression={progression}
                                   key={index}
                                   isEditable={true}
                                   refetchProgressions={refetchProgressions}/>
                           ))
                       }
                   </AllProgressions>
                    : (<NoItemsFound>Você não tem progressões!</NoItemsFound>)}
            </ProgressionsStyles>
        </Layout>
    );
};
