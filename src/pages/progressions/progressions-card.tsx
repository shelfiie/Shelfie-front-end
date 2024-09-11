import {LinearProgress, Typography} from "@mui/material"
import {BoxShadow} from "../../components/globals/Box.style"
import {Theme} from "../../styles/theme"
import {
    AllProgressions,
    BookDescriptionNDate,
    BookInfo,
    BookProgression,
    Commentary,
    CompleteProgress,
    PercentageStyle,
    ProgressionDate,
    ProgressionPageCount,
    StatusTag
} from "./progressions.styles"
import {Link} from "react-router-dom"
import {BookData} from "../../types/bookData"
import {filterBookStatus, formatDate} from "../../utils/filters"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useState} from "react";
import {DeleteProgressionDialog} from "./delete-progression-dialog.tsx";

type ProgressionsCardProps = {
    progressions: BookData['progressions'][]
    refetchProgressions?: () => void;
    isEditable: boolean;
}


export const ProgressionsCard = ({ isEditable, progressions, refetchProgressions }: ProgressionsCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleConfirmDeleteDialog = () => setIsDialogOpen(!isDialogOpen);

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
        <AllProgressions id='all-progressions'>
            {sortedProgressions.map((progression: BookData['progressions'], index: number) => (
                <BoxShadow id="progression-card" key={index}
                           display="flex"
                           flexDirection="column"
                           gap={Theme.margins.marginhalfrem}
                           width="max-content"
                           color={Theme.colors.white}
                           padding={Theme.margins.margin1rem}
                           backgroundcolor={Theme.colors.green}
                           borderRadius={Theme.borders.radius}>

                    <BookProgression id="book-progression">
                        <StatusTag>{filterBookStatus(progression?.status)}</StatusTag>

                        <LinearProgress
                            sx={CompleteProgress}
                            variant="determinate" value={progression?.percentage}/>
                        <Typography sx={PercentageStyle}>{progression?.percentage}%</Typography>

                        <ProgressionPageCount>{progression?.page}/{progression?.pageCount}</ProgressionPageCount>
                        {isEditable &&
                            <a onClick={handleConfirmDeleteDialog}>
                                <DeleteRoundedIcon/>
                            </a>
                        }
                    </BookProgression>

                    <Commentary>
                        <p>{progression?.commentary}</p>
                    </Commentary>

                    <BookInfo id="book-info">
                        <img
                            src={progression?.thumbnailUrl ? progression?.thumbnailUrl : progression?.smallThumbnailUrl}/>
                        <BookDescriptionNDate>
                            <h4>{progression?.title}</h4>
                            <p>{progression?.description}
                                <Link to={`/bookdetails/${progression?.googleId}`}>
                                    <span>Ver mais</span>
                                </Link>
                            </p>
                            <ProgressionDate>{formatDate(progression?.createdAt ?? 'Data não disponível')}</ProgressionDate>
                        </BookDescriptionNDate>
                    </BookInfo>
                    <DeleteProgressionDialog
                        refetchProgressions={refetchProgressions}
                        progressionId={progression?.id ?? ''}
                        dialogOpen={isDialogOpen}
                        handleDialog={handleConfirmDeleteDialog}/>
                </BoxShadow>
            ))}

        </AllProgressions>
    )
}
