require('moment-precise-range-plugin');
const moment = require('moment');
const EventEmitter = require('events');
class myEmitter extends EventEmitter {}
const emitterObject = new myEmitter();
const [ dateStringInFuture ] = process.argv.slice(2);
const DATE_FORMAT_PATTERN = 'YYYY:MM:DD HH:mm:ss';

const getDateFromDateString = (dateString) => {
    const [ hour, day, month, year ] = dateString.split('-');

    return new Date(Date.UTC(year, month - 1, day, hour));
};

const showRemainingTime = (dateInFuture) => {
    const dateNow = new Date();

    if (dateNow >= dateInFuture) {
        emitterObject.emit('timerEnd');
    } else {
        const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);
        const futureDateFormatted = moment(dateInFuture, DATE_FORMAT_PATTERN);
        const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

        console.clear();
        console.log(diff);
    }
};

const showTimerDone = (timerId) => {
    clearInterval(timerId);
    console.log('Timer finish');
};

const dateInFuture = getDateFromDateString(dateStringInFuture);
const timerId = setInterval( () => {
    emitterObject.emit('timerTick', dateInFuture);
}, 1000);

emitterObject.on('timerTick', showRemainingTime());
emitterObject.on('timerEnd', () => {
    showTimerDone(timerId);
});







// const timer = (hours, minutes, seconds) => {
//     const data = new Date();
//
//     data.setHours(hours);
//     data.setMinutes(minutes);
//     data.setSeconds(seconds);
//
//     return data;
// };
//
// const getTimerDate = timer(0, 0, 2);
//
// emitterObject.on('tick', () => {
//     setInterval(() => {
//         getTimerDate.setSeconds(getTimerDate.getSeconds() - 1);
//         console.log(getTimerDate.toLocaleTimeString());
//     }, 1000);
// });
//
// emitterObject.on('stop', (timerId) => {
//        clearInterval(timerId);
//        console.log('Timer finish');
// });
//
// emitterObject.emit('tick', 'Start timer');
// emitterObject.emit('stop', 'Stop timer');