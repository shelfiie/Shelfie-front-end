// to - do
import { BookData } from "./bookData";

export interface BookProgressionData {
  id: string;
  userId: string;
  book: BookData;
  progression: number;
  createdAt: Date;
  updatedAt: Date;
}