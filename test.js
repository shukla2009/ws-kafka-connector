'use strict'

const brokers = process.env.KAFKA_BROKERS || 'localhost:9092'
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'meetup-producer',
    brokers: [brokers]
})

const producer = kafka.producer()



setInterval(() => {
    
    let topics = []
    let times = Math.round(Math.random() * 10)
    for (let index = 0; index < times; index++) {
        topics.push("A")
    }
    times = Math.round(Math.random() * 10)
    for (let index = 0; index < times; index++) {
        topics.push("B")
    }
    times = Math.round(Math.random() * 10)
    for (let index = 0; index < times; index++) {
        topics.push("C")
    }
    console.log(`Sending Message to Kafka over ${brokers} ${new Date()} ${topics}`)
    producer.send({
        topic: 'test',
        messages: [
            { value: JSON.stringify({ time: Date.now(), topics: topics }) },
        ],
    })
}, 1000)





