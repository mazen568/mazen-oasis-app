
'use client';
import { createContext, useState, useContext } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
    range: DateRange | undefined;
    setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
    resetRange: () => void;

}


export const ReservationContext = createContext<ReservationContextType | null>(null);


export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
    const [range, setRange] = useState<DateRange>();
    function resetRange() {
        setRange(undefined);
    }

    return (
        <ReservationContext.Provider value={{ range, setRange,resetRange }}>
            {children}
        </ReservationContext.Provider>
    )
}


export const useReservation = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error("useReservationContext must be used within a ReservationProvider");
    }
    return context;
}