import { DoctorModel } from "../models-demo";
import { doctorsList } from "../datas";

export default class DoctorsService {
  public static getDoctors(): Promise<DoctorModel[]> {
    return new Promise((resolve, reject) => {
      resolve(doctorsList);
    });
  }
}
