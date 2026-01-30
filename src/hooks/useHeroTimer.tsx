"use client";

import { useEffect, useState } from "react";

/**
 * Hook for displaying UTC time with zone calculation
 * Updates every minute
 * Format: "Zone 02 __ 14:30"
 */
export function useHeroTimer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Toronto",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };

      const torontoTime = new Date().toLocaleString("en-US", options);
      const hour = parseInt(torontoTime.split(":")[0]);

      // Calculate zone (6 zones, 4 hours each)
      const sector = Math.floor(hour / 4) + 1;
      const sectorFormatted = String(sector).padStart(2, "0");

      setTime(`Zone ${sectorFormatted} __ ${torontoTime}`);
    }

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return time;
}
