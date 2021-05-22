import { ReviewModel } from "./ReviewModel";

export type DoctorModel = {
  fullName: string;
  title: string;
  imageUrl: string;
  about: string;
  isOnline: boolean;
  rating: number;
  reviews: ReviewModel[];
};
