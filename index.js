var modbus = require('jsmodbus');

// create a modbus client
var client = modbus.client.serial.complete({ 
        'port'     : '/dev/ttyUSB0',
        'baudRate' : 115200,
        'dataBits' : 8,
        'stopBits' : 1,
        'parity'   : 'none'
    });

client.connect();

// reconnect with client.reconnect()

client.on('connect', function () {

    // make some calls

    client.readCoils(0, 13).then(function (resp) {

        // resp will look like { fc: 1, byteCount: 20, coils: [ values 0 - 13 ], payload: <Buffer> } 
        console.log(resp);

    }, console.error);

    client.readDiscreteInputs(0, 13).then(function (resp) {

        // resp will look like { fc: 2, byteCount: 20, coils: [ values 0 - 13 ], payload: <Buffer> } 
        console.log(resp);

    }, console.error);

    client.readHoldingRegisters(0, 10).then(function (resp) {

        // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
        console.log(resp); 

    }, console.error);

    client.readInputRegisters(0, 10).then(function (resp) {

        // resp will look like { fc: 4, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
        console.log(resp);

    }, console.error);

    client.writeSingleCoil(5, true).then(function (resp) {

        // resp will look like { fc: 5, byteCount: 4, outputAddress: 5, outputValue: true }
        console.log(resp);

    }, console.error);

    client.writeSingleCoil(5, Buffer.from([0x01])).then(function (resp) {

        // resp will look like { fc: 5, byteCount: 4, outputAddress: 5, outputValue: true }
        console.log(resp);

    }, console.error);

    client.writeSingleRegister(13, 42).then(function (resp) {

        // resp will look like { fc: 6, byteCount: 4, registerAddress: 13, registerValue: 42 }
        console.log(resp);

    }, console.error);

    client.writeSingleRegister(13, Buffer.from([0x00 0x2A])).then(function (resp) {

        // resp will look like { fc: 6, byteCount: 4, registerAddress: 13, registerValue: 42 }
        console.log(resp);

    }, console.error);

    client.writeMultipleCoils(3, [1, 0, 1, 0, 1, 1]).then(function (resp) {

        // resp will look like { fc: 15, startAddress: 3, quantity: 6 }
        console.log(resp); 

    }, console.error);

    client.writeMultipleCoils(3, Buffer.from([0x2B]), 6).then(function (resp) {

        // resp will look like { fc: 15, startAddress: 3, quantity: 6 }
        console.log(resp); 

    }, console.error);

    client.writeMultipleRegisters(4, [1, 2, 3, 4]).then(function (resp) {

        // resp will look like { fc : 16, startAddress: 4, quantity: 4 }
        console.log(resp);

    }, console.error);

    client.writeMultipleRegisters(4, Buffer.from([0x00, 0x01, 0x00, 0x02, 0x00, 0x03, 0x00, 0x04]).then(function (resp) {

        // resp will look like { fc : 16, startAddress: 4, quantity: 4 }
        console.log(resp);

    }, console.error);

});

client.on('error', function (err) {

    console.log(err);

})