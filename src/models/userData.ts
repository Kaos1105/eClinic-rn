export interface IUserData {
  phoneNumber: string;
  email: string;
  patientId?: string;
  fullName: string;
  gender: string;
  address: string;
  dateOfBirth: Date | string | undefined;
}
