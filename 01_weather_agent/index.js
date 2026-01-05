import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const getWeatherTool = tool({
  name: "get_weather",
  description: "Return the weather for a given city.",
  parameters: z.object({
    city: z.string().describe("name of the city"),
  }),
});

const agent = new Agent({
  name: "Weather Agent",
  instructions: `
        You are an expert weather agent that helps user to tell weather report
    `,
});

async function main(query = " ") {
  const result = await run(agent, query);
  console.log(`Result:`, result.finalOutput);
}

main(`What is the weather of the delhi today ?`);
