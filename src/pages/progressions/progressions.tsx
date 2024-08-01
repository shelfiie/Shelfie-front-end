import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions";
import { BookStatus } from "../../types/bookData";
import { ProgressionsCard } from "./progressions-card";

export const Progressions = () => {
    const { progressions } = useFetchAllProgressions();

    return progressions.map((progression) => (
            <ProgressionsCard
                bookId={progression?.bookId}
                googleId={progression?.googleId}
                title={progression?.title}
                commentary={progression?.commentary ?? ''}
                description={progression?.description}
                thumbnailUrl={progression?.thumbnailUrl}
                smallThumbnailUrl={progression?.smallThumbnailUrl}
                percentage={progression?.percentage ?? 0}
                page={progression?.page ?? 0}
                pageCount={progression?.pageCount}
                status={progression?.status || BookStatus.DEFAULT}
                createdAt={progression?.createdAt ?? ''} />
        ))
    

}