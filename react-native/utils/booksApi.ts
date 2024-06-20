import { BookType } from "../types/types";

function replaceImageZoom(url?: string) {
  if (!url) {
    return "";
  }
  let urlObj = new URL(url);
  let params = urlObj.searchParams;
  params.set("zoom", "4");
  let finalUrl = urlObj.origin + urlObj.pathname + "?" + params.toString();
  finalUrl = finalUrl.replace("http://", "https://");
  return finalUrl;
}

export const getBooks = async (query: string): Promise<BookType[]> => {
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.append("q", query);
  url.searchParams.append("orderBy", "relevance");
  const result = await fetch(url, { method: "GET" });
  const json = await result.json();
  const books: BookType[] = json.items
    .map(({ volumeInfo, id }: any) => ({ volumeInfo, id }))
    .map(({ volumeInfo: info, id }: any) => {
      const images = info.imageLinks;
      const image = images?.thumbnail ?? images?.smallThumbnail;
      return {
        id,
        authors: info.authors?.join(", "),
        title: info.title,
        image: replaceImageZoom(image),
      };
    });

  return books;
};
