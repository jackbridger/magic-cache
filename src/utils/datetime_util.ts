export class DateTimeUtil {
  static dateWithAddedDays(date: Date, days: number) {
    var d = new Date();
    d.setDate(date.getDate() + days);
    return d;
  }
}
