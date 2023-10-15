const { Inngest } = require("inngest");
const axios = require('axios')
const { sendEmailToUser } = require("../controllers/sendEmailToUserController");

const inngest = new Inngest({ id: "signup-flow" });
const schedule = inngest.createFunction(
    { id: "schedule" },
    {event:"schedule/create"},
  async  ({ event, step }) => {
    const response = await fetch(`http://localhost:443/api/user/schedule/${event.data.userOption}`); // Replace with your actual server URL
    const Option = await response.json();
    console.log(Option.schedule)
    await step.sleep("wait-a-moment", Option.schedule);
        await step.run("get the data", async () => {
            try {
                const linksResponse = await fetch(`http://localhost:443/api/latestproductlink/user/${event.data.userOption}`);
                const links = await linksResponse.json();
                const scrap = [];
                const urls = links[links.length-1]
              
                  const urlArray = [urls.url, urls.url2, urls.url3,urls.url4,urls.url5];
                  const linkId = urls._id;
                  console.log(urlArray);
                
              
                    try {
                      const scrapResponse = await axios.post("http://localhost:5000/review-count", {
                        urls: urlArray, 
                      });
                      scrap.push(scrapResponse.data.results); 
                    } catch (error) {
                      console.error(error);
                    }
               
                  
                    for (const data of scrap) {
                      try {
                        for (const item of data) {
                  
                          const response = await axios.post("http://localhost:443/api/scrap", {
                            name: item.productName,
                            reviewCount: item.reviewCount,
                            rating: item.rating,
                            productLinkId: linkId, 
                          });
                          console.log("succesfully added scrap data",response.data)
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }
                await sendEmailToUser(event.data.name, event.data.email,Option.email2,Option.email3, scrap);
                console.log(`Email scheduled with cron schedule: ${Option.schedule} for : ${email,Option.email2,Option.email3}`);
              } catch (error) {
                console.error('Error scheduling email:', error);
              }
          });
          await step.sleep("wait-a-moment", Option.schedule);
          await step.run("get the data2", async () => {
            try {
                const linksResponse = await fetch(`http://localhost:443/api/latestproductlink/user/${event.data.userOption}`);
                const links = await linksResponse.json();
                const scrap = [];
                const urls = links[links.length-1]
              
                  const urlArray = [urls.url, urls.url2, urls.url3,urls.url4,urls.url5];
                  const linkId = urls._id;
                  console.log(urlArray);
                
              
                    try {
                      const scrapResponse = await axios.post("http://localhost:5000/review-count", {
                        urls: urlArray, 
                      });
                      scrap.push(scrapResponse.data.results); 
                    } catch (error) {
                      console.error(error);
                    }
               
                  
                    for (const data of scrap) {
                      try {
                        for (const item of data) {
                  
                          const response = await axios.post("http://localhost:443/api/scrap", {
                            name: item.productName,
                            reviewCount: item.reviewCount,
                            rating: item.rating,
                            productLinkId: linkId, 
                          });
                          console.log("succesfully added scrap data",response.data)
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }
                await sendEmailToUser(event.data.name, event.data.email,Option.email2,Option.email3, scrap);
                console.log(`Email scheduled with cron schedule: ${Option.schedule} for : ${email,Option.email2,Option.email3}`);
              } catch (error) {
                console.error('Error scheduling email:', error);
              }
          });
      }
   
   
)

module.exports = {schedule}