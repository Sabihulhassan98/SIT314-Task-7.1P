const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com', { qos: 1 });

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    setInterval(() => {
        const lightStatus = {
            light_id: Math.floor(Math.random() * 1000),
            status: Math.random() >= 0.5 ? 'ON' : 'OFF',
            brightness: Math.floor(Math.random() * 100),
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        client.publish('building/light_status', JSON.stringify(lightStatus), { qos: 1 });
        console.log(`Published message: ${JSON.stringify(lightStatus)} to topic: building/light_status`);
    }, 1000); // Publish statuses every second, adjust as needed
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});

client.on('offline', () => {
    console.log('MQTT client is offline');
});
