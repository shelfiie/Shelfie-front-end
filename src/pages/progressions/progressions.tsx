import { LinearProgress, Typography } from "@mui/material"
import { LinearProgress, Typography } from "@mui/material"
import { BoxShadow } from "../../components/globals/Box.style"
import { Theme } from "../../styles/theme"
import { Layout } from "../layout"
import { BookInfo, BookProgression, Commentary, CompleteProgress, PercentageStyle, ProgressionPageCount, StatusTag } from "./progressions.styles"
import { BookInfo, BookProgression, Commentary, CompleteProgress, PercentageStyle, ProgressionPageCount, StatusTag } from "./progressions.styles"

export const Progressions = () => {
  return (
    <Layout>
      <h2>Progressões</h2>
      <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>

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
          <StatusTag>LENDO</StatusTag>
          {/* <LinearProgressDiv> */}
          <LinearProgress
            sx={CompleteProgress}
            variant="determinate" value={55} />
          <Typography sx={PercentageStyle}>55%</Typography>
          {/* </LinearProgressDiv> */}

          <ProgressionPageCount>50/100</ProgressionPageCount>
        </BookProgression>
        <Commentary>
          <p>Esse livro é muito bom, estou gostando bastante da leitura!</p>
        </Commentary>
        <BookInfo>
          <img src="https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png" />
          <div>
            <h4>título abençoado</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione magni quidem amet voluptatum et. Ab aspernatur architecto dolore suscipit, nostrum consequuntur tempore vero in adipisci vel odit! Facilis, tenetur.</p>
          </div>
        </BookInfo>

        <BookProgression id="book-progression">
          <StatusTag>LENDO</StatusTag>
          {/* <LinearProgressDiv> */}
          <LinearProgress
            sx={CompleteProgress}
            variant="determinate" value={55} />
          <Typography sx={PercentageStyle}>55%</Typography>
          {/* </LinearProgressDiv> */}

          <ProgressionPageCount>50/100</ProgressionPageCount>
        </BookProgression>
        <Commentary>
          <p>Esse livro é muito bom, estou gostando bastante da leitura!</p>
        </Commentary>
        <BookInfo>
          <img src="https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png" />
          <div>
            <h4>título abençoado</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione magni quidem amet voluptatum et. Ab aspernatur architecto dolore suscipit, nostrum consequuntur tempore vero in adipisci vel odit! Facilis, tenetur.</p>
          </div>
        </BookInfo>

      </BoxShadow>
    </Layout>
  )
}
