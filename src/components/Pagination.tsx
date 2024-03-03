import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { getData } from "../api/configApi";
import { IProduct } from "../variables/types";

interface PaginationProps {
  pages: number;
  loading: boolean;
  setPages: (pages: number) => void;
  setOffset: (pages: number) => void;
  setItems: (items: IProduct[]) => void;
  setLoading: (boolean: boolean) => void;
  offset: number;
}

export const Pagination = ({
  pages,
  loading,
  setPages,
  setOffset,
  offset,
  setItems,
  setLoading,
}: PaginationProps) => {
  const handlePageChange = (value: number, off: number) => {
    setPages(pages + value);
    setOffset(offset + off);
    getData(offset + off, setLoading, setItems);
  };

  return (
    <Box>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        useFlexGap
        flexWrap="wrap"
        sx={{ margin: "20px 0" }}
      >
        <IconButton
          onClick={() => handlePageChange(-1, -50)}
          disabled={pages === 1 || loading}
        >
          <ChevronLeft />
        </IconButton>
        <div>{pages}</div>
        <IconButton onClick={() => handlePageChange(1, 50)} disabled={loading}>
          <ChevronRight />
        </IconButton>
      </Stack>
    </Box>
  );
};
