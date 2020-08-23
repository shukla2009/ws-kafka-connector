'use strict'
const WebSocket = require('ws');
const ws = new WebSocket(process.env.SOURCE || 'ws://stream.meetup.com/2/rsvps', {
    perMessageDeflate: false
});
const brokers = process.env.KAFKA_BROKERS || 'localhost:9092'
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'meetup-producer',
    brokers: [brokers]
})

const producer = kafka.producer()

const run = async () => {
    // Producing
    await producer.connect()
    ws.on('message', function incoming(data) {
        console.log(`Sending Message to Kafka over ${brokers}`)
        producer.send({
            topic: 'rsvp',
            messages: [
                { value: data },
            ],
        })
    });
}
run()





