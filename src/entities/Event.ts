export class Event {
  public title: string;
  public price: number;
  public date: Date;
  public description: string;

  constructor(title: string, price: number, date: Date, description: string) {
    this.title = title;
    this.price = price;
    this.date = date;
    this.description = description;
  }
}
