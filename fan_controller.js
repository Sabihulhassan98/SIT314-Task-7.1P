const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('Fan Controller Connected to MQTT Broker');
    client.subscribe('building/temperature_data', (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', (topic, message) => {
    if (topic === 'building/temperature_data') {
        const temperatureData = JSON.parse(message.toString());
        console.log(`Received temperature data: ${JSON.stringify(temperatureData)} from topic: ${topic}`);
        
        // Implement logic to respond to temperature data
        if (temperatureData.temperature > 25) {
            // If temperature is greater than 25, turn on the fan
            const fanStatus = {
                device_id: 'fan1',
                status: 'ON'
            };
            client.publish('building/fan_status', JSON.stringify(fanStatus));
            console.log(`Published fan status: ${JSON.stringify(fanStatus)} to topic: building/fan_status`);
        }
    }
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});

client.on('offline', () => {
    console.log('MQTT client is offline');
});
