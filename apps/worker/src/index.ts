import { Kafka } from "kafkajs"

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]

})

async function main() {
    const consumer = kafka.consumer({ groupId: "main-workor" });
    await consumer.connect()
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        // used for acknowledgement of the queues
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                value: message.value?.toString(),
            })
            console.log("processing done")
            await consumer.commitOffsets([{
                topic:TOPIC_NAME,
                partition:partition,
                offset:(parseInt(message.offset)+1).toString()
            }])
        }
    }) 
   
}

main();