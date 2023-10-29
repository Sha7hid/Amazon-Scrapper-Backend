// Your inngest-client.js module

const { Inngest } = require("inngest");

// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" ,eventKey:process.env.INNGEST_EVENT_KEY});
console.log(process.env.INNGEST_EVENT_KEY)
inngest.setEventKey('iUkU9GwsxJL2D5VbY444cz0DE95M-K-7Hox6aVcenM0LPSObgA7V3kN0qQNzwXyaTqfzrEusNgjYu3AZWeBzZw')
module.exports = {inngest};
