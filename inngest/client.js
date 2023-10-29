// Your inngest-client.js module

const { Inngest } = require("inngest");

// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" ,eventKey:process.env.INNGEST_EVENT_KEY});
console.log(process.env.INNGEST_EVENT_KEY)
inngest.setEventKey('yA46r6OmwIn4u6iInLWNQM_Bv3azjq1mzKvmTwrjsQ-hqVs6xzjSg5_I_WjlhkNmmpk8wflIH2O2B9hsd9insw')
module.exports = {inngest};
