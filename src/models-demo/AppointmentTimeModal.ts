import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { DoctorModel } from './DoctorModel';

export type AppointmentTimeModal = {
  doctor?: CM_EMPLOYEE_ENTITY;
  fromDate?: string;
  toDate?: string;
  time: string;
  available: boolean;
};
