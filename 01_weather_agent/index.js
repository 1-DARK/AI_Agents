import { Agent, run, tool } from "@openai/agents";
import dotenv from "dotenv";
import { z } from "zod";
import axios from "axios";

dotenv.config();

const getWeatherTool = tool({
  name: "get_weather",
  description: "returns the current weather information for the given city",
  parameters: z.object({
    city: z.string().describe("name of the city"),
  }),
  execute: async function ({ city }) {
    const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
    const response = await axios.get(url, { responseType: "text" });
    return `The weather of ${city} is ${response.data}`;
  },
});

const sendEmailTool = tool({
  name: "send_email",
  description: "This tools send details",
  parameters: z.object({
    toEmail: z.string().describe("email address to"),
    subject: z.string().describe("subject"),
    body: z.string().describe("body of the email"),
  }),
  execute: async function ({ body, subject, toEmail }) {},
});

const agent = new Agent({
  name: "Weather Agent",
  instructions: `
        You are an expert weather agent that helps user to tell weather report
    `,
  tools: [getWeatherTool, sendEmailTool],
});

async function main(query = "") {
  const result = await run(agent, query);
  console.log(`Result:`, result.finalOutput);
}

main(`What is the weather of Goa, Delhi and Patiala?`);
