import titleize from "titleize";
import * as moment from "moment";

export const rentalType = isShared => {
    return isShared ? "shared" : "entire";
};
export const toUpperCase = value => {
    return value ? titleize(value) : "";
};
export const prettifyDate = date => {
    return moment(date).format("MMM Do YY");
};
export const getRangeOfDates = (start, end, dateFormat = "Y/MM/DD") => {
    const tempDates = [];
    const mEnd = moment(end, dateFormat);
    let mStart = moment(start, dateFormat);
    // Turning startAt and endAt into actualy day, then calculate how many days between start and end
    // E.x: from 3-15 the tempDates array wil be [3,4...,15]
    while (mStart < mEnd) {
        tempDates.push(mStart.format(dateFormat));
        mStart = mStart.add(1, "day");
    }

    tempDates.push(mEnd.format(dateFormat));
    return tempDates;
};
