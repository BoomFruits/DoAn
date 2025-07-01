export interface Room {
    id: number;
    room_No: string;
    room_Name: string;
    capacity: number;
    type: string;
    price: number;
    isAvailable: boolean;
    bed: number;
    bath: number;
    area: number;
    description: string;
    images: string[];
  }
  