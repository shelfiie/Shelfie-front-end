import { LinearProgress, Typography } from "@mui/material"
import { BoxShadow } from "../../components/globals/Box.style"
import { Theme } from "../../styles/theme"
import { AllProgressions, BookInfo, BookProgression, Commentary, CompleteProgress, PercentageStyle, ProgressionPageCount, StatusTag } from "./progressions.styles"
import { Link } from "react-router-dom"
import { BookData } from "../../types/bookData"

type ProgressionsCardProps = {
  progressions: BookData['progressions'][]
}


export const ProgressionsCard = ({ progressions }: ProgressionsCardProps) => {
  return (
    <AllProgressions id='all-progressions'>
      {progressions.map((progression: BookData['progressions'], index: number) => (
        <BoxShadow id="progression-card" key={index}
          index={index}
          display="flex"
          flexDirection="column"
          gap={Theme.margins.marginhalfrem}
          width="max-content"
          color={Theme.colors.white}
          padding={Theme.margins.margin1rem}
          backgroundcolor={Theme.colors.green}
          borderRadius={Theme.borders.radius}>

          <BookProgression id="book-progression">
            <StatusTag>{progression?.status}</StatusTag>

            <LinearProgress
              sx={CompleteProgress}
              variant="determinate" value={progression?.percentage} />
            <Typography sx={PercentageStyle}>{progression?.percentage}%</Typography>

            <ProgressionPageCount>{progression?.page}/{progression?.pageCount}</ProgressionPageCount>
          </BookProgression>

          <Commentary>
            <p>{progression?.commentary}</p>
          </Commentary>

          <BookInfo>
            <img src={progression?.thumbnailUrl ? progression?.thumbnailUrl : progression?.smallThumbnailUrl} />
            <div>
              <h4>{progression?.title}</h4>
              <p>{progression?.description}
                <Link to={`/bookdetails/${progression?.googleId}`}>
                  <span>Ver mais</span>
                </Link>
              </p>
            </div>
          </BookInfo>
        </BoxShadow>
      ))}
    </AllProgressions>
  )
}
