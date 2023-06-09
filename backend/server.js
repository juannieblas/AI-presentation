require('dotenv').config()

const express = require('express');
const app = express();
const openai = require('./openai')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/', async (request, response) => {
    return response.send(await openai.listModels().then(response => {
        return response.data
    }))
});

app.post("/code/comment", async (request, response) => {
    return response.send(
        await openai.createEdit({
            model: "code-davinci-edit-001",
            input: request.body.code,
            temperature: 0.5,
            instruction: "Comment the code to describe what should do, function or method level comments, line level comments, avoid necessary comments"
        }).then(response => {
            return response.data.choices[0].text
        })
    )
})

app.post("/code/unit_test_cases", async (request, response) => {
    return response.send(
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `describe the posible unit test cases for the next code:${request.body.code}`,
            temperature: 0.5,
            top_p: 0.9,
            max_tokens: 500
        }).then(async response => {
            return response.data.choices[0].text
        })
    )
})

app.post("/code/commit", async (request, response) => {
    return response.send(
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${request.body.code} Based on the provided Git diff output, please generate a suitable commit message and description using the next guidelines feat: A new feature
            fix: A bug fix
            docs: Documentation only changes
            style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
            refactor: A code change that neither fixes a bug nor adds a feature
            perf: A code change that improves performance
            test: Adding missing tests
            chore: Changes to the build process or auxiliary tools and libraries such as documentation generation.
            return the next format in all responses: title:[type from the guideline][title here], description:[detailed description here]`,
            temperature: 0.5,
            top_p: 0.9,
            max_tokens: 500
        }).then(async response => {
            return response.data.choices[0].text
        })
    )
})


app.post("/chatbot/faq", async (request, response) => {
    return response.send(
        await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: `I am a very smart question answering bot. but I can only solve doubts related to the following text, I will answer using only that information. If you ask me a question outside of that topic I will answer Unknown, if the message is not a question I will answe "Unknown" if youre not sure if the answer can be provided from the TEXT answer "Unknown" if the answer is "Unknown" just return Unknown
            TEXT:RateSpot
            Home
            About
            Services
            Pricing
            Contact
            Create a Free Account
            Empower your mortgage and real estate decisions with cutting-edge precision.
            Ratespot provides advanced analytics to optimize pricing options, estimate competitor's latest rate sheets, and answer price adjustment queries in real time across the most extensive geo coverage.
            
            Search for a zipcode, city or state
            Get started
            A Set of Pricing Tools for Mortgage & Real Estate Industries
            At Ratespot, we understand the importance of accessing reliable, accurate, and up-to-date data in the mortgage and real estate industry, that is why we've developed a free-to-use platform that provides real-time analytics to help you stay competitive in today's market, whether you are a lender looking to optimize your pricing strategies or a borrower looking for the best mortgage rates and terms. Our platform is designed to empower clients to make informed decisions, optimize operations, and thrive in their markets.
            
            Stay ahead of the competition by using our
            logo
            API
            RateSpot's API integration allows you to access all our data in one convenient location.
            
            logo
            Rate Sheets
            Leveraging ML we predict competitor daily rate sheets and how they stack up against other lenders in a given marke
            
            logo
            Historical Feeds
            Collected historical hourly data of live advertised (frontline) prices gives our customers transparency into their price adjustments, timing and lender concentration throughout the day.
            
            Easy Access to Data
            Our easy-to-use platform provides data feeds and insights for retail, institutional lenders and real estate professionals.
            
            Ratespot Previews
            Price Feed is a robust feature offered by Ratespot, providing users with accurate and up-to-date data on mortgage rates. With Price Feed, you gain access to real-time updates on mortgage rates from multiple lenders, ensuring that you stay well-informed and competitive. You can confidently navigate the market by making well-informed decisions based on the latest rates available.
            
            Price Feed
            Rate Sheet
            Historical Data
            API Portal
            API Settings
            Explore our pricing plans
            Flexible pricing options to suit all budgets and requirements
            
            BASIC
            
            Free
            Price feed unlimited + downloads
            50 Rate sheet searches + downloads
            Download sample historical data (last 2 days)
            API sample data (CA & NY)
            Get started
            PREMIUM
            
            $500 USD
            
            Monthly
            
            Includes all the free plan
            Ratesheet unlimited + downloads
            Historical data (past 6 months)
            Access to major zip codes in the API portal (30 states)
            10 Custom filters
            Get started
            ENTERPRISE
            
            Get a qoute
            
            Custom
            
            36 Months of historical data
            Bulk download from our website or Postgres DB
            Direct and scheduled uploads to customers’ data ecosystems
            Unlimited access to ratesheets
            Unlimited custom filters
            Access to all national zip codes in API portal
            Technical and analitycal support
            Contact us
            Let's get in touch!
            We're always happy to hear from you! If you have any questions, comments, or feedback, please don't hesitate to get in touch with us using the form below.
            
            
            RateSpot
            Home
            About
            Services
            Pricing
            Contact
            Privacy Policy
            Create a Free Account
            2023 ©RateSpot All Rights Reserved | Proudly Build In Delaware
            Powered By Rivka Development
            `},{role:"user",content:request.body.message}],
          }).then(async response => {
            return response.data.choices[0].message.content
        })
    )
})


app.listen(5000, () => {
    console.log('App is listening on port 5000');
});