import { PrismaClient } from "@prisma/client";
import {Kafka}from "kafkajs"
const TOPIC_NAME = "zap-events"
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const client = new PrismaClient();

async function main() {

    const producer = kafka.producer();
    await producer.connect()
   

    while (1) {
        const pendingZapRunOutbox = await client.zapRunOutbox.findMany({
            where: {},
            take:10
        })
        await producer.send({
            topic: TOPIC_NAME,
            messages:pendingZapRunOutbox.map(r => (
                {
                    value: r.zapRunId
                }))
        })
        
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingZapRunOutbox.map(r => r.id)
                }
            }
        })
    }
}
