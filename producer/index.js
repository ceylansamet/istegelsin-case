var Kafka = require('node-rdkafka');

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'istegelsin-case-study'
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

module.exports = stream;