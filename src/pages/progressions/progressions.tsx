import { LinearProgress, Typography } from "@mui/material"
import { BoxShadow } from "../../components/globals/Box.style"
import { Theme } from "../../styles/theme"
import { Layout } from "../layout"
import { AllProgressions, BookInfo, BookProgression, Commentary, CompleteProgress, PercentageStyle, ProgressionPageCount, StatusTag } from "./progressions.styles"
import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions"
import { limitedDescription } from "../../utils/filterDescription"
import { Link } from "react-router-dom"

export const Progressions = () => {
  
  const { progressions } = useFetchAllProgressions();

  return (
    <Layout>
      <h2>Progressões</h2>
      <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>

      <AllProgressions id='all-progressions'>
        {progressions && progressions.map((progression) => {
          return (
            <BoxShadow
              display="flex"
              flexDirection="column"
              gap={Theme.margins.marginhalfrem}
              width="35%"
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
                <Link to={`/bookdetails/${progression?.googleId}`}>
                  <img src={progression?.thumbnailUrl ? progression?.thumbnailUrl : progression?.smallThumbnailUrl} />
                </Link>
                <div>
                  <h4>{progression?.title}</h4>
                  <p>{limitedDescription(progression?.description ?? "")}</p>
                </div>
              </BookInfo>
            </BoxShadow>
          )
        })}
      </AllProgressions>
    </Layout>
  )
}
