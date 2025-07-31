import * as React from "react"
import { useState } from "react"
import { Calendar } from "../ui/calendar"

export default function Calendar03() {
  const [dates, setDates] = useState([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ])

  return (
    <Calendar
      mode="multiple"
      numberOfMonths={1}
      defaultMonth={dates[0]}
      required
      selected={dates}
      onSelect={setDates}
      max={5}
      className="rounded-lg border shadow-sm" />
  );
}
