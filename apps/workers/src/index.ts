import { PrismaClient } from "@prisma/client";
import {Kafka}from "kafkajs"
const TOPIC_NAME = "zap-events"
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const client = new PrismaClient();

async function main() {
    
    const consumer = kafka.consumer({groupId:"main-worker"});
    await consumer.connect()
   
    
    await consumer.subscribe({ topic: 'zap-events', fromBeginning: true })

    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
              partition,
            value: message.value?.toString(),
            })
            await new Promise(r => setTimeout(r, 1000)
                
                await consumer.commitOffsets({
                    
                })
        },
      })
}
