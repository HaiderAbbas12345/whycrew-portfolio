import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, project, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Project Type: ${project || "Not specified"}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Connect to MongoDB and save the submission
    try {
      await connectDB();

      const contactSubmission = await Contact.create({
        name,
        email,
        company: company || undefined,
        project: project || undefined,
        message,
        submittedAt: new Date(),
      });
    } catch (dbError) {
      console.error("Failed to save submission to MongoDB:", dbError);
      // Continue execution to still try sending email
    }

    // Still try to send email with shorter timeout
    if (process.env.RESEND_API_KEY) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: ["developer.yasirofficial@gmail.com"],
            subject: `New Contact Form Submission from ${name}`,
            text: emailContent,
            reply_to: email,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const result = await response.json();
          console.log("📧 Email sent successfully via Resend:", result.id);
        } else {
          const error = await response.json();
          console.error("Resend API error:", error);
        }
      } catch (emailError) {
        console.log(
          "⚠️  Email sending failed (network issue), but submission saved locally"
        );
      }
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
