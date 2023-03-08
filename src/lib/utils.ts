export function isExpired(currentDate:any, expiresDateNormalized:any) {
    const currentDateNormalized = new Date(currentDate).getTime();
    const expiresDate = new Date(expiresDateNormalized).getTime();

    return currentDateNormalized > expiresDate;
    }

export function daysRemaining(currentDate:any, expiresDate:any) {
    const currentDateNormalized = new Date(currentDate).getTime();
    const expiresDateNormalized = new Date(expiresDate).getTime();

    const timeDiff = expiresDateNormalized - currentDateNormalized;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysRemaining;
    }