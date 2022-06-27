var Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['istegelsin-case-study']);
    consumer.consume();
}).on('data', function(data) {
    console.log(`received message: ${data.value}`);
});