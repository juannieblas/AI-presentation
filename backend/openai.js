const {Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
    organization: "org-euLnQEbfCpQJuw0NjuX0WJDI",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai