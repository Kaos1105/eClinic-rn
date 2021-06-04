import { DashboardItemsModel, AppointmentModel } from '../models-demo';
import { doctorsList, campaignList, departmentList } from '../datas';
import moment from 'moment';

export const globalAppointmentDate = moment(new Date()).add(7, 'days').hour(14).minute(30).toDate();

export const globalAppointment: AppointmentModel = {
  title: 'Upcoming appoinment',
  doctor: {
    fullName: 'Dr. Busra Tekin',
    about: 'About',
    title: 'Doctor',
    imageUrl:
      'https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png',
    isOnline: true,
    rating: 5,
    reviews: [],
  },
  appointmentDate: globalAppointmentDate,
  locationName: 'Central Hospital',
};

// export default class DashboardService {
//   public static getDashboardItems(): Promise<DashboardItemsModel> {
//     return new Promise((resolve, reject) => {
//       const model: DashboardItemsModel = {
//         appointment: globalAppointment,
//         campaigns: campaignList,
//         doctors: doctorsList,
//         departments: departmentList,
//       };
//       resolve(model);
//     });
//   }
// }

export default class DashboardService {
  public static getDashboardItems = (): DashboardItemsModel => {
    const model: DashboardItemsModel = {
      appointment: globalAppointment,
      campaigns: campaignList,
      doctors: doctorsList,
      departments: departmentList,
    };
    return model;
  };
}
