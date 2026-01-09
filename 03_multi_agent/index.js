import { Agent, tool } from "@openai/agents";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const fetchAvailablePlans = tool({
  name: "fetch_available",
  description: "fetches the available plans for the internet",
  parameters: undefined,
});

const salesAgent = new Agent({
  name: "Sales Agent ",
  instructions: `You are an expert sales agent for an internet broadband company.
    Talk to the user and help them with what they need.`,
});
