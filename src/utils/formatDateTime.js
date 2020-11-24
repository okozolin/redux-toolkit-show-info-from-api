import Moment from "react-moment";
Moment.globalFormat = "D MMM YYYY";
export const calendarStrings = {
  lastDay: "[Yesterday at] LT",
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  lastWeek: "[last] dddd [at] LT",
  nextWeek: "dddd [at] LT",
  sameElse: "L",
};

export default Moment;
