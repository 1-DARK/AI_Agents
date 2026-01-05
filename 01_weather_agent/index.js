import { Agent, run } from "@openai/agents";
import dotenv from "dotenv";

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

main(`What is the weather of the delhi`);
