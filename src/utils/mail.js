const axios = require("axios");

const sendCancelationMail = (eventData, email) => {
  const options = {
    method: "POST",
    url: "https://email-sender1.p.rapidapi.com/",
    params: {
      txt_msg: `Event : ${eventData.name} Canceled.`,
      to: `${email}`,
      from: "Toybanks",
      subject: "Cancelation mail",
      html_msg: `<div>Event ${eventData.name} to be held on ${eventData.dateString} is cancelled.</div><div>Please see your calender to see your latest schedule.</div>`,
    },
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "email-sender1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      useQueryString: true,
    },
    json: true,
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { sendCancelationMail };
