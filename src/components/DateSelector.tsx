/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { differenceInDays, isPast, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import type { Cabin, Settings } from "@/lib/types";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { useReservation } from "./ReservationContext";
import { isSameDay } from "date-fns/fp";

function isAlreadyBooked(
    range: DateRange,
    datesArr: Date[]
) {
    const { from, to } = range;

    if (!from || !to) return false;

    return datesArr.some((date) =>
        isWithinInterval(date, {
            start: from,
            end: to,
        })
    );
}

interface DateSelectorProps {
    settings: Settings
    cabin: Cabin
    bookedDates: Date[]
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {

    const { range, setRange, resetRange } = useReservation();
    const displayedRange = range && isAlreadyBooked(range, bookedDates) ? null : range;
    const { min_booking_length: minBookingLength, max_booking_length: maxBookingLength } = settings
    
    const { regular_price: regularPrice, discount } = cabin;
    const numNights =
    displayedRange && displayedRange.from && displayedRange.to
      ? differenceInDays(displayedRange.to, displayedRange.from)
      : 0;    const cabinPrice = numNights & ((regularPrice ?? 0) - (discount ?? 0));

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 place-self-center"
                mode="range"
                selected={range}
                onSelect={(selectedRange) => {
                    console.log(selectedRange);
                    setRange(selectedRange);
                }}
                min={(minBookingLength ?? 0) + 1}
                max={maxBookingLength ?? 0}
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
                captionLayout="dropdown"
                numberOfMonths={2}
                disabled={(curDate)=>isPast(curDate) || bookedDates.some(date=>isSameDay(date,curDate))}
            />

            <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <p className="flex gap-2 items-baseline">
                        {(discount ?? 0) > 0 ? (
                            <>
                                <span className="text-2xl">${(regularPrice ?? 0) - (discount ?? 0)}</span>
                                <span className="line-through font-semibold text-primary-700">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-2xl font-semibold">${cabinPrice}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range?.from || range?.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;