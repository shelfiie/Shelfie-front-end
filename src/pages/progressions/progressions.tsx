import { BoxShadow } from "../../components/globals/Box.style"
import { Theme } from "../../styles/theme"
import { Layout } from "../layout"
import { StatusTag } from "./progressions.styles"

export const Progressions = () => {
  return (
    <Layout>
      <h2>Progressões</h2>
      <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>

      <BoxShadow
        padding={Theme.margins.margin1rem}
        backgroundcolor={Theme.colors.green}
        borderRadius={Theme.borders.radius}>
        <img src="https://images-na.ssl-images-amazon.com/images/I/51ZU+Y7MiXL._SX331_BO1,204,203,200_.jpg" />

        <StatusTag>LENDO</StatusTag>
        
      </BoxShadow>
    </Layout>
  )
}
