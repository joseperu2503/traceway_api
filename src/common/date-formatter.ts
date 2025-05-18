export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('en-En', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static format(date: Date): string {
    return DateFormatter.formatter.format(date);
  }
}
