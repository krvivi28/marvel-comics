import { baseUrl, getAuthKey } from "../contants/appConstants";

export const fetchAllComics = async (page?: number) => {
  let url = baseUrl + "/v1/public/comics" + getAuthKey();
  if (page) {
    url += `&limit=8&offset=${page}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};

export const fetchComicsByTitle = async (searchInput: string, page: number) => {
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
  return data.data;
};

export const fetchComicsByCharacterFilter = async (
  selectedCharcterIds: any,
  page: number
) => {
  const url =
    baseUrl +
    "/v1/public/comics" +
    getAuthKey() +
    `&characters=${selectedCharcterIds}&limit=8&offset=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};

// export const fetchToatlComics = async () => {
//   const url = baseUrl + "/v1/public/comics" + getAuthKey();
//   const res = await fetch(url);
//   const data = await res.json();
//   return data.data;
// };
