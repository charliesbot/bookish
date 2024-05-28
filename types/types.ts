export interface BookType {
  id: string;
  authors: string;
  title: string;
  image: string;
}

export type MaybeNull<T> = T | null | undefined;
