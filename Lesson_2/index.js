const EventEmitter = require('events');
class myEmitter extends EventEmitter {}
const emitterObject = new myEmitter();

//создаем массив объектов, описывающий типы запросов посетителей
const requestTypes = [
    {
        type: 'send',
        payload: 'to send a document',
    },
    {
        type: 'receive',
        payload: 'to receive a document',
    },
    {
        type: 'sign',
        payload: 'to sign a document',
    },
];

// генерируем нового посетителя
class Customer {
    constructor({type, payload}) {
        this.type = type;
        this.payload = payload;
    }
}

// генерируем число в случайном диапазоне, для задержки "прихода" посетителя и для случайного выбора его запроса
const generateIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция для задержки появления нового посетителя
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

// функция, эмулирующая приход нового посетителя
const generateNewCustomer = () => {
    const intervalValue = generateIntInRange(1, 5) * 1000; // генерируем псевдослучайное значение задержки "прихода". Преобразуем в секунды
    const { type, payload } = requestTypes[generateIntInRange(0, 2)];// аналогично выбираем значение в массиве объектов

    return delay(intervalValue).then(() => new Customer({ type, payload })); // создаем новый объект посетителя с нужными параметрами
};

//создаем класс для обработки запросов в зависимости от их типа
class Handler {
    static send(payload) {
        console.log('Send request');
        console.log(`Customer need ${payload}`);
    };
    static pay() {
        console.log(`Customer needs to pay for the services`);
    }
    static receive(payload) {
        console.log('receive request');
        console.log(`Customer need ${payload}`);
    };
    static sign(payload) {
        console.log('Sign request');
        console.log(`Customer need ${payload}`);
    };
    static error(err) {
        console.log(new Error(`Pen is missing! ${err}`));
    }
}

// регистрируем события
emitterObject.on('send', Handler.send); // событие send обработает функция send() при его появлении
emitterObject.on('send', Handler.pay);
emitterObject.on('receive', Handler.receive);
emitterObject.on('sign', Handler.sign);
emitterObject.on('sign', Handler.error);

// создаем посетителя, создаем рекурсию для содания потока посетителей

const run = async () => {
    const customer = await generateNewCustomer();
    emitterObject.emit(customer.type, customer.payload);

    run();
};

run();

