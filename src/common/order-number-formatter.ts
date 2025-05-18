export class OrderFormatter {
  static number(id: number): string {
    return id.toString().padStart(8, '0');
  }
}
