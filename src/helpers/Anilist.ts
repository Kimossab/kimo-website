import axios, { type AxiosResponse } from "axios";

export const searchGraphql = `
query ($search: String) {
  Page(page: 1, perPage: 10) {
    media(search: $search, type:ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        extraLarge
        large
        medium
      }
      bannerImage
    }
  }
}
`;
interface MediaTitle {
  romaji: string;
  english: string;
}
interface MediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
}
interface Media {
  id: number;
  title: MediaTitle;
  coverImage: MediaCoverImage;
  bannerImage: string;
}
interface MediaList {
  media: Media[];
}
interface PageResponse<T> {
  Page: T;
}

export const searchByQuery = async (
  search: string
): Promise<PageResponse<MediaList> | null> => {
  const response = await axios.post<
    string,
    AxiosResponse<{ data: PageResponse<MediaList> }>
  >(
    "https://graphql.anilist.co",
    JSON.stringify({
      query: searchGraphql,
      variables: { search },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data.data;
};
