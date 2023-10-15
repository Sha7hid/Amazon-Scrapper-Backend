// Your inngest-client.js module

const { Inngest } = require("inngest");

// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" ,eventKey:process.env.INNGEST_EVENT_KEY});
console.log(process.env.INNGEST_EVENT_KEY)
inngest.setEventKey()
module.exports = {inngest};
