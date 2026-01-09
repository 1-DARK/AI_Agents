import { Agent, tool, run } from "@openai/agents";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const fetchAvailablePlans = tool({
  name: "fetch_available",
  description: "fetches the available plans for the internet",
  parameters: z.object({}),
  execute: async function () {
    return [
      { plan_id: "1", price_inr: 399, speed: "30MB/s" },
      { plan_id: "2", price_inr: 999, speed: "100MB/s" },
      { plan_id: "3", price_inr: 1499, speed: "200MB/s" },
    ];
  },
});

const salesAgent = new Agent({
  name: "Sales Agent ",
  instructions: `You are an expert sales agent for an internet broadband company.
    Talk to the user and help them with what they need.`,
  tools: [fetchAvailablePlans],
});

async function runAgent(query = "") {
  const result = await run(salesAgent, query);
  console.log(result.finalOutput);
}

runAgent(`Hi there,I want to know about your available plans?`);
