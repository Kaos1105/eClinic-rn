import { DoctorModel } from "./DoctorModel";

export type AppointmentTimeModal = {
  doctor?: DoctorModel;
  time: string;
  available: boolean;
};
