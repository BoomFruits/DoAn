export interface Room {
    id?: number;
    room_No: string;
    capacity: number;
    type: string;
    price: number;
    createdAt?: Date;
    isAvailable: boolean;
    image?: string;
  }
  