import { IProduct } from "../variables/types";
import requestApiData from "./requestApiData";

const getIds = (offset = 0) => {
  const body = {
    action: "get_ids",
    params: { offset: offset, limit: 50 },
  };
  const ids = requestApiData(body);

  return ids;
};

const getItems = (ids: number[]) => {
  const body = {
    action: "get_items",
    params: { ids },
  };
  const items = requestApiData(body);
  return items;
};

const getFilteredIds = (field: string, value: string) => {
  try {
    const body = {
      action: "filter",
      params: {},
    };
    body.params[field] = value;
    const items = requestApiData(body);
    return items;
  } catch (error) {
    // getFilteredIds(field,value)
  }
};

const getDataByFilters = async (
  searchValue,
  searchParam,
  setLoading,
  setItems
) => {
  try {
    let value = searchValue;
    if (searchParam === "price") {
      value = parseInt(value as string);
    }
    const ids = await getFilteredIds(searchParam, value as string);
    if (ids.result.length === 0) {
      setLoading(false);
      setItems([]);
      return;
    }
    const items = await getItems(ids.result);
    setItems(items.result);
    setLoading(false);
  } catch (error) {
    console.log(error, "121212");
    getDataByFilters(searchValue, searchParam, setLoading, setItems);
  }
};

const getData = async (offset: number, setLoading, setItems) => {
  setLoading(true);
  try {
    const ids = await getIds(offset);
    const items = await getItems(ids.result);
    const uniqueItems = items.result.reduce(
      (acc: IProduct[], item: IProduct) => {
        if (!acc.some((i) => i.id === item.id)) {
          acc.push(item);
        }
        return acc;
      },
      []
    );

    setItems(uniqueItems);
    setLoading(false);
  } catch (error) {
    console.log(error, "121212");
    getData(offset, setLoading, setItems);
  }
};
export { getIds, getItems, getFilteredIds, getData, getDataByFilters };
