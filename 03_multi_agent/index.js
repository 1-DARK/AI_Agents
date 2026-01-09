import { Agent, tool, run } from "@openai/agents";
import fs from "node:fs/promises";
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

const processRefund = tool({
  name: "process_refund",
  description: "This tool processes the refund for a customer ",
  parameters: z.object({
    customer_id: z.string().describe("id of the customer"),
    reason: z.string().describe("reason for refund"),
  }),
  execute: async function ({ customer_id, reason }) {
    await fs.appendFile(
      "./refunds.txt",
      `Refund for customer having ID ${customer_id} for ${reason}`,
      "utf-8"
    );
    return { refundIssued: true };
  },
});

const refundAgent = new Agent({
  name: "Refund Agent",
  instructions: `You are expert in issuing refunds to the customer`,
  tools: [processRefund],
});

const salesAgent = new Agent({
  name: "Sales Agent ",
  instructions: `You are an expert sales agent for an internet broadband company.
    Talk to the user and help them with what they need.`,
  tools: [
    fetchAvailablePlans,
    refundAgent.asTool({
      toolName: "refund_expert",
      toolDescription: "Handles refund questions and requests",
    }),
  ],
});

async function runAgent(query = "") {
  const result = await run(salesAgent, query);
  console.log(result.finalOutput);
}

runAgent(
  `I had a plan of 399 and I want to refund that plan and my customerid is cust67 and the issue is i have already the plan?`
);
