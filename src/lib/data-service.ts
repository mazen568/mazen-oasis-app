/* eslint-disable @typescript-eslint/no-unused-vars */
import { Database } from "@/types/database.types";
import { eachDayOfInterval } from 'date-fns';
import { Country } from "../types/types";
import { supabase } from "./supabase";

/////////////
// GET
export async function getCabin(id: number)  {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regular_price, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null
  }

  return data
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded: ${error.message}`);
  }

  return data
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data as Database['public']['Tables']['bookings']['Row'];
}

export async function getBookings(guestId: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, start_date, end_date, number_nights, number_guests, total_price, guest_id, cabin_id, cabins(name, image)'
    )
    .eq('guest_id', guestId)
    .order('start_date');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as Array<
    Pick<
      Database['public']['Tables']['bookings']['Row'],
      'id' | 'created_at' | 'start_date' | 'end_date' | 'number_nights' | 'number_guests' | 'total_price' | 'guest_id' | 'cabin_id'
    > & { cabins: Pick<Database['public']['Tables']['cabins']['Row'], 'name' | 'image'> }
  >;
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabin_id', cabinId)
    .or(`start_date.gte.${todayISO},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookedDates = data
    .map((booking) => {
      if (booking.start_date && booking.end_date) {
        return eachDayOfInterval({
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
        });
      }
      return [];
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Database['public']['Tables']['settings']['Row']> {
  const { data, error } = await supabase.from('settings').select('*').single();



  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
    );
    if (!res.ok) throw new Error("Could not fetch countries");
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch countries");
  }
}


/////////////
// CREATE

export async function createGuest(newGuest: Database['public']['Tables']['guests']['Insert']) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  if (!data) {
    throw new Error('Guest data is null');
  }
  return data as Database['public']['Tables']['guests']['Row'];
}

export async function createBooking(newBooking: Database['public']['Tables']['bookings']['Insert']) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data as Database['public']['Tables']['bookings']['Row'];
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: Database['public']['Tables']['guests']['Update']) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data as Database['public']['Tables']['guests']['Row'];
}

export async function updateBooking(id: number, updatedFields: Database['public']['Tables']['bookings']['Update']) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data as Database['public']['Tables']['bookings']['Row'];
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
