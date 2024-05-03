import { baseUrl, getAuthKey } from "../contants/appConstants";

export const fetchAllComics = async (page: any) => {
  const url =
    baseUrl + "/v1/public/comics" + getAuthKey() + `&limit=8&offset=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return data.data;
};

export const fetchComicsByTitle = async (searchInput: any, page: any) => {
  const url =
    baseUrl +
    "/v1/public/comics" +
    getAuthKey() +
    `&titleStartsWith=${searchInput}&limit=8&offset=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};

export const fetchAllCharacters = async () => {
  const url = baseUrl + "/v1/public/characters" + getAuthKey();
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return data.data;
};

export const fetchComicsByCharacterFilter = async (
  selectedCharcterIds: any,
  page: any
) => {
  const url =
    baseUrl +
    "/v1/public/comics" +
    getAuthKey() +
    `&characters=${selectedCharcterIds}&limit=8&offset=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return data.data;
};
