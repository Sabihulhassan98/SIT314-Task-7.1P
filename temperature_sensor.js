const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com', { qos: 1 });

client.on('connect', () => {
    console.log('Temperature Sensor Connected to MQTT Broker');
    setInterval(() => {
        const temperatureData = {
            sensor_id: Math.floor(Math.random() * 1000),
            temperature: (Math.random() * 10 + 20).toFixed(2), // Random temperature between 20 and 30
        };
        client.publish('building/temperature_data', JSON.stringify(temperatureData), { qos: 1 });
        console.log(`Published data: ${JSON.stringify(temperatureData)} to topic: building/temperature_data`);
    }, 5000); // Publish data every 5 seconds
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});

client.on('offline', () => {
    console.log('MQTT client is offline');
});
