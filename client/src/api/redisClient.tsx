import { createClient } from "redis";


const redisClient = createClient({
  password: process.env.REDIS_PASSWORD, 
  socket: {
      host: process.env.REDIS_HOST, 
      port: 10786 
  }
})
  .on("error", (err) => console.log("Redis Client", err))
  .connect();

export { redisClient };
