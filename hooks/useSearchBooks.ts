import { useEffect, useState } from "react";
import { getBooks } from "../utils/booksApi";
import { BookType } from "../types/types";
import { useDebounce } from "@uidotdev/usehooks";

type UseSearchBooksResponse = {
  books: BookType[];
  loading: boolean;
  error: Error | null;
};

export const useSearchBooks = (query: string): UseSearchBooksResponse => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce<string>(query, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getBooks(query)
        .then((x) => {
          setBooks(x);
        })
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [debouncedSearchTerm]);

  return { books, loading, error };
};
