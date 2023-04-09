import { NextApiRequest, NextApiResponse } from "next";

interface SubscribeRequest extends NextApiRequest {
  body: {
    tool: string;
    server: string;
  };
}
export default async function handler(req: SubscribeRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  
  const server = req.body.server;
  const tool = req.body.tool;

  // Check if server is a valid IP or URL
  if (!server.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) && !server.match(/^https?:\/\//)) {
    return res.status(400).json({ error: "Invalid server, please enter an IP address or a website" });
  }
  
  // Check if tool is a valid tool
  if (!["webscan", "web-whois"].includes(tool)) {
    return res.status(400).json({ error: "Invalid tool" });
  }

  console.log(`Got ${tool} request on server at ${server}`);

  // Send a get request to the server
  const response = await fetch(`http://127.0.0.1:5000/${tool}?url=${server}`);
  const data = await response.json();

  return res.status(200).json(data);

  // return res.status(200).json({ success: true });
  // return res.redirect("/?success=true").toString();
}