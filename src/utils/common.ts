import moment from 'moment';
import { format } from 'node:path';
import reactotron from 'reactotron-react-native';

const splitTimeByInterval = (
  startDate: moment.Moment,
  endDate: moment.Moment,
  intervalHour: number
): string[] => {
  const startTime = startDate.startOf('hour');
  const endTime = endDate.startOf('hour');
  // const selectedDateString = moment(selectedDate).format('DD/MM/YYYY');
  let result = [];
  while (endTime >= startTime) {
    result.push(endTime.format('HH:mm'));
    endTime.subtract(intervalHour, 'hour');
  }
  return result;
};

export { splitTimeByInterval };
