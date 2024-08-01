import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions";
import { Layout } from "../layout";
import { ProgressionsCard } from "./progressions-card";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { ProgressionsStyles } from "./progressions.styles";

export const Progressions = () => {
  const { progressions } = useFetchAllProgressions();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

          <ProgressionsCard progressions={paginatedProgressions} />
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
