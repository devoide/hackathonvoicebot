const startDate = new Date(2024, 4, 20);
const endDate = new Date(2024, 11, 31);


function generateRandomDates(count) {
    const randomDates = [];
    for (let i = 0; i < count; i++) {
        const randomTimestamp = Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime();
        const randomDate = new Date(randomTimestamp);
        randomDates.push(randomDate);
    }
    return randomDates;
}

