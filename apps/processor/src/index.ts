import { PrismaClient } from "@prisma/client"
import { Kafka } from "kafkajs"

const client = new PrismaClient()
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
})
async function main() {

    const producer = kafka.producer()
    await producer.connect()

    while (1) {
        const pendingRuns = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        })
        await producer.send({
            topic: 'zap-events',
            messages: pendingRuns.map(run => ({value : run.zapRunId})),
        })
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRuns.map((run) => run.id)
                }
            }
        })

    }
}

main();
