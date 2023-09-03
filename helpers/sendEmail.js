require("dotenv").config();

/* Initialization */
const ElasticEmail = require("@elasticemail/elasticemail-client");

const client = ElasticEmail.ApiClient.instance;

/* Generate and use your API key */
const apikey = client.authentications["apikey"];
apikey.apiKey = process.env.EMAIL_API;

const emailBody = (name, token) => {
  return `<p>Hello {name}!</p>
	 <p>Thank you for registration.</p>
	 <p>Please, verify your email:</p>
	 <p><a href="http://localhost:3000/api/users/verify/${token}">Verification link</a></p>
	`;
};

const emailsApi = new ElasticEmail.EmailsApi();

const sendEmail = ({ name, email, token }) => {
  const emailData = {
    Recipients: [
      {
        Email: email,
        Fields: {
          name: name,
        },
      },
    ],
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: emailBody(name, token),
        },
        {
          ContentType: "PlainText",
          Charset: "utf-8",
          Content: emailBody(name, token),
        },
      ],
      From: "softly242@gmail.com",
      Subject: "Email verification",
    },
  };

  const callback = (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
      console.log("Email sent.");
    }
  };

  emailsApi.emailsPost(emailData, callback);
};

module.exports = sendEmail;
