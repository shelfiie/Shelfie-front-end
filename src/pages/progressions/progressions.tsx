import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions";
import { Layout } from "../layout/layout";
import { ProgressionsCard } from "./progressions-card";

import { ProgressionsStyles } from "./progressions.styles";
import { ProgressionSkeleton } from "./progressions-skeleton";

export const Progressions = () => {
  const { progressions, loading } = useFetchAllProgressions();
  
  return (
    <Layout>
      <ProgressionsStyles id="progression-styles">
        <div>
          <h2>Progressões</h2>
          <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>

          {loading ? <ProgressionSkeleton /> : <ProgressionsCard progressions={progressions} />}
        </div>
      </ProgressionsStyles>
    </Layout>
  );
};
