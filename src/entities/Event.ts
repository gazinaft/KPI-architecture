export class Event {
  public title: string;
  public price: number;
  public date: Date;
  public description: string;
  public organizer: string;

  constructor(title: string, price: number, description: string, date: Date, organizer: string) {
    this.title = title;
    this.price = price;
    this.date = date;
    this.description = description;
    this.organizer = organizer;
  }
}
