export class Event {
  public id: number;
  public title: string;
  public price: number;
  public description: string;
  public date: Date;
  public organizer: string;

  constructor(id: number, title: string, price: number, description: string, date: Date, organizer: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.date = date;
    this.organizer = organizer;
  }
}
