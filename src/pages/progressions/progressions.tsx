import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions";
import { Layout } from "../layout/layout";
import { ProgressionsCard } from "./progressions-card";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { ProgressionsStyles } from "./progressions.styles";
import { ProgressionSkeleton } from "./progressions-skeleton";

export const Progressions = () => {
  const { progressions, loading } = useFetchAllProgressions();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };

  const paginatedProgressions = progressions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Layout>
      <ProgressionsStyles id="progression-styles">
        <div>
          <h2>Progressões</h2>
          <p>Confira aqui todos os seus comentários feitos durante suas leituras!</p>

          {loading ? <ProgressionSkeleton /> : <ProgressionsCard progressions={paginatedProgressions} />}
        </div>
        <Pagination
          sx={{ alignSelf: 'center' }}
          count={Math.ceil(progressions.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </ProgressionsStyles>
    </Layout>
  );
};
