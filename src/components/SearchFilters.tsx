import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { getData, getDataByFilters} from "../api/configApi";
import { IProduct } from "../variables/types";

type TSearch = string | number;
interface ISearchProps {
  setPages: (pages: number) => void;
  setOffset: (offset: number) => void;
  setLoading: (loading: boolean) => void;
  setItems: (items: IProduct[]) => void;
  setGetDataBySearch: (getDataBySearch: boolean) => void;
  getDataBySearch: boolean;
  offset: number;
  loading: boolean;
}

export const SearchFilters = ({
  setPages,
  setLoading,
  setOffset,
  setItems,
  setGetDataBySearch,
  getDataBySearch,
  offset,
  loading,
}: ISearchProps) => {
  const [searchParam, setSearchParam] = useState("price");
  const [searchValue, setSearchValue] = useState<TSearch>("");

  const handleSearchParamChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParam(event.target.value);
    setSearchValue("");
  };
  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (searchParam === "price") {
      if (event.target.value === "" || /^[0-9\b]+$/.test(event.target.value)) {
        setSearchValue(event.target.value);
      }
    } else setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    setPages(1);
    setOffset(0);
    setLoading(true);
    setGetDataBySearch(true);
    getDataByFilters(searchValue,searchParam,setLoading,setItems)
  };
  const handleReset = () => {
    setGetDataBySearch(false);
    getData(offset, setLoading, setItems);
  };

  return (
    <Stack spacing={2} sx={{ marginBottom: "20px" }}>
      <Typography variant="h4" component="div">
        Filters
      </Typography>
      <RadioGroup
        value={searchParam}
        onChange={handleSearchParamChange}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel value="price" control={<Radio />} label="price" />
        <FormControlLabel value="name" control={<Radio />} label="name" />
        <FormControlLabel value="brand" control={<Radio />} label="brand" />
      </RadioGroup>

      <TextField
        value={searchValue}
        onChange={handleSearchValueChange}
        placeholder={`search by ${searchParam}`}
      />
      <Stack flexDirection="row" gap="20px">
        <Button
          variant="contained"
          sx={{ width: 100 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Search
        </Button>
        <Button
          variant="contained"
          sx={{ width: 100, backgroundColor: "GrayText" }}
          onClick={handleReset}
          disabled={!getDataBySearch}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};
