export class Rent {
    location: string;
    pickupDate: string;
    pickupTime: string;
    dropDate: string;
    dropTime: string;
    phone:number;
    category:string;
  
    constructor(location: string, pickupDate: string, pickupTime: string, dropDate: string, dropTime: string, phone:number, category:string) {
      this.location = location;
      this.pickupDate = pickupDate;
      this.pickupTime = pickupTime;
      this.dropDate = dropDate;
      this.dropTime = dropTime;
      this.phone = phone;
      this.category = category;
    }
  }