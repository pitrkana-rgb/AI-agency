import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

type ContactBody = {
  name: string;
  email: string;
  phone: string;
  company: string;
  project_type: string;
  budget: string;
  message: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body as ContactBody;
    const {
      name,
      email,
      phone,
      company,
      project_type,
      budget,
      message,
    } = body ?? {};

    if (!name || !email || !phone || !message) {
      res.status(400).json({
        error: "Missing required fields: name, email, phone, message",
      });
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      company: company != null ? String(company).trim() : "",
      project_type: project_type != null ? String(project_type) : "",
      budget: budget != null ? String(budget).trim() : "",
      message: String(message).trim(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      res.status(500).json({ error: "Failed to save lead" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    res.status(500).json({
      error: "An unexpected error occurred",
    });
  }
}
