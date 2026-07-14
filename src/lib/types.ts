import { Database } from "../lib/database.types";

export type Booking = Database['public']['Tables']['bookings']['Row']

export type Settings = Database['public']['Tables']['settings']['Row'];

export type Cabin = Database['public']['Tables']['cabins']['Row'];

export type Guest = Database['public']['Tables']['guests']['Row'];

export type BookingData = {
    start_date: string | undefined;
    end_date: string | undefined;
    cabin_id: number;
    number_nights: number;
    cabin_price: number;
};

export interface Country {
    name: string;
    flag: string
}
