import { PropsWithChildren, createContext, useContext, useState } from "react";
import { BookType, MaybeNull } from "../types/types";

type AppContextType = {
  bookQuote: MaybeNull<String>;
  book: MaybeNull<BookType>;
  updateBookQuote: (quote: String) => void;
  updateBook: (book: BookType) => void;
};

export const AppContext = createContext<MaybeNull<AppContextType>>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [bookQuote, setBookQuote] = useState<MaybeNull<String>>(null);
  const [book, setBook] = useState<MaybeNull<BookType>>(null);

  const updateBookQuote = (quote: String) => {
    setBookQuote(quote);
  };

  const updateBook = (book: BookType) => {
    setBook(book);
  };

  return (
    <AppContext.Provider
      value={{ bookQuote, book, updateBookQuote, updateBook }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within a AppProvider");
  }
  return context;
};
