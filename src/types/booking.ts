import { Cabin } from "./cabin";

export interface Booking {
	id: string | number;
	guestId: string | number;
	startDate: string;
	endDate: string;
	numNights: number;
	totalPrice: number;
	numGuests: number;
	status?: string;
	created_at: string;
	cabins: Cabin;
}
