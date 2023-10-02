const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('Light Controller Connected to MQTT Broker');
    setInterval(() => {
        const currentHour = new Date().getHours();
        let brightness;

        // Adjust brightness based on time of day
        if (currentHour >= 6 && currentHour < 12) {
            brightness = 75; // Morning
        } else if (currentHour >= 12 && currentHour < 18) {
            brightness = 100; // Afternoon
        } else if (currentHour >= 18 && currentHour < 22) {
            brightness = 50; // Evening
        } else {
            brightness = 25; // Night
        }

        const lightStatus = {
            light_id: Math.floor(Math.random() * 1000),
            status: Math.random() >= 0.5 ? 'ON' : 'OFF',
            brightness: brightness,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        client.publish('building/light_status', JSON.stringify(lightStatus));
        console.log(`Published message: ${JSON.stringify(lightStatus)} to topic: building/light_status`);
    }, 5000); // Publish status every 5 seconds
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});

client.on('offline', () => {
    console.log('MQTT client is offline');
});
