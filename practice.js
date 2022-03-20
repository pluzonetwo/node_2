const EventEmitter = require('events');
class myEmitter extends EventEmitter {}
const emitterObject = new myEmitter();

const timer = (hours, minutes, seconds) => {
    const data = new Date();

    data.setHours(hours);
    data.setMinutes(minutes);
    data.setSeconds(seconds);

    return data;
};

const getTimerDate = timer(0, 0, 2);

emitterObject.on('tick', () => {
    setInterval(() => {
        getTimerDate.setSeconds(getTimerDate.getSeconds() - 1);
        console.log(getTimerDate.toLocaleTimeString());
    }, 1000);
});

emitterObject.on('stop', (timerId) => {
    if(timerId === 0) {
        setTimeout(() => {
            clearInterval(timerId);
            console.log('Timer finish');
        });
    }
});

emitterObject.emit('tick', 'Start timer');
emitterObject.emit('stop', 'Stop timer');