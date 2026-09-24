// utils/complaintsSlaUtils.ts
// Utility functions for complaint SLA calculations

/**
 * Calculates SLA value based on segmentId and slaObject.
 * @param {Object|string} slaValue - SLA object or JSON string.
 * @param {string} segmentId - Segment code (e.g., "CS101").
 * @returns {string|null} SLA value for the segment, or null if not found.
 */
export function calculateSlaForRendering(slaValue: Record<string, string> | string, segmentId?: string): string | null {
    if (!slaValue) return null;

    // Parse JSON if needed
    let slaObj = typeof slaValue === 'string' ? JSON.parse(slaValue) : slaValue;

    if (!segmentId || !slaObj) return slaObj?.all || null;

    switch (segmentId) {
        case 'CS101':
            return slaObj.cs101 || slaObj.all || null;
        case 'CS102':
            return slaObj.cs102 || slaObj.all || null;
        case 'CS103':
            return slaObj.cs103 || slaObj.all || null;
        case 'CS104':
            return slaObj.cs104 || slaObj.all || null;
        case 'CS105':
            return slaObj.cs105 || slaObj.all || null;
        case 'CS106':
            return slaObj.cs106 || slaObj.all || null;
        default:
            return slaObj.all || null;
    }
}

/**
 * Calculates expected resolution date/time based on SLA hours.
 * @param {string|number} slaHours - SLA value in hours (string or number).
 * @returns {string} Formatted expected resolution date, or "N/A" if invalid.
 */
export function calculateExpectedResolutionDate(slaHours: string | number): string {
    if (!slaHours || isNaN(Number(slaHours))) return 'N/A';
    const now = new Date();
    const sla = Number(slaHours);
    const expectedDate = new Date(now.getTime() + sla * 60 * 60 * 1000);

    // Format: "Month DD YYYY HH:mm AM/PM"
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return expectedDate.toLocaleString('en-US', options);
}

/**
 * Formats a date to "December 17 2025 11:43 AM" format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatExpectedResolutionDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
}

/**
 * Calculates and formats expected resolution date based on SLA string
 * @param {string} slaString - SLA value as string (e.g., "7 days", "3 hours")
 * @returns {string | null} Formatted expected resolution date or null if invalid
 */
export function calculateExpectedResolutionFromSla(slaString: string): string | null {
    if (!slaString || typeof slaString !== 'string') {
        return "N/A";
    }

    const currentDate = new Date();
    const expectedDate = new Date(currentDate);
    const slaLower = slaString.toLowerCase().trim();

    // Extract number from string (e.g., "7 days" -> 7, "3 hours" -> 3)
    const numberMatch = slaLower.match(/(\d+)/);

    if (!numberMatch) {
        return "N/A";
    }

    const slaValue = Number(numberMatch[1]);

    if (slaLower.includes('day')) {
        // Add days
        expectedDate.setDate(currentDate.getDate() + slaValue);
    } else if (slaLower.includes('hour')) {
        // Add hours
        expectedDate.setHours(currentDate.getHours() + slaValue);
    } else {
        return "N/A";
    }

    // Format the date as "December 17 2025 11:43 AM"
    return formatExpectedResolutionDate(expectedDate);
}
