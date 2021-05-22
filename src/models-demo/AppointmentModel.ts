import { DoctorModel } from "./DoctorModel";

export type AppointmentModel = {
  title: string;
  doctor: DoctorModel;
  appointmentDate: Date;
  locationName: string;
};
