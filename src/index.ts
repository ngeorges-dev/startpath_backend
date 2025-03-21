import fastify from "fastify";

const app = fastify();


app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});


app.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})