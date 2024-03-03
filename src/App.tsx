import { useEffect, useState } from "react";

import { getData } from "./api/configApi";
import { Cards } from "./components/Card";
import {
  AppBar,
  Box,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Pagination } from "./components/Pagination";
import { SearchFilters } from "./components/SearchFilters";
import { IProduct } from "./variables/types";

function App() {
  const [items, setItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [getDataBySearch, setGetDataBySearch] = useState<boolean>(false);
  const [pages, setPages] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getData(offset, setLoading, setItems);
  }, []);

  return (
    <div>
      <AppBar position="static" sx={{ mb: "50px" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="div">
            Valantis
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack sx={{ margin: "0 30px" }}>
        <SearchFilters
          setPages={setPages}
          setOffset={setOffset}
          setLoading={setLoading}
          setItems={setItems}
          offset={offset}
          loading={loading}
          setGetDataBySearch={setGetDataBySearch}
          getDataBySearch={getDataBySearch}
        />
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {items && !loading ? (
          <>
            <Stack
              direction="row"
              gap="22px"
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              {items.length !== 0 ? (
                items.map((item) => <Cards key={item.id} {...item} />)
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Typography variant="h6" component="h2" color={"red"}>
                    No have data, try find again
                  </Typography>
                </Box>
              )}
            </Stack>
            {items.length !== 0 && getDataBySearch !== true && (
              <Pagination
                pages={pages}
                setPages={setPages}
                setOffset={setOffset}
                setLoading={setLoading}
                setItems={setItems}
                loading={loading}
                offset={offset}
              />
            )}
          </>
        ) : null}
      </Stack>
    </div>
  );
}

export default App;
