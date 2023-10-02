const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    
    client.subscribe('building/light_status', { qos: 1 }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    
    client.subscribe('building/temperature_data', { qos: 1 }, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', (topic, message) => {
    const parsedMessage = JSON.parse(message.toString());
    
    if (topic === 'building/light_status') {
        console.log(`Received light status: ${JSON.stringify(parsedMessage)} from topic: ${topic}`);
    } else if (topic === 'building/temperature_data') {
        console.log(`Received temperature data: ${JSON.stringify(parsedMessage)} from topic: ${topic}`);
    }
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});

client.on('offline', () => {
    console.log('MQTT client is offline');
});
