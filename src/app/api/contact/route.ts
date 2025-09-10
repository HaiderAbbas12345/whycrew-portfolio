import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Simple fetch-based email sending to avoid Resend SDK issues

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, project, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Project Type: ${project || 'Not specified'}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
    `.trim()

    // Log the submission (always useful for debugging)
    console.log('New contact form submission:', { name, email, company, project })

    // Save to local file since network connectivity is having issues
    const fs = require('fs').promises
    const path = require('path')
    
    try {
      // Create submissions directory if it doesn't exist
      const submissionsDir = path.join(process.cwd(), 'submissions')
      await fs.mkdir(submissionsDir, { recursive: true })
      
      // Save submission to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `contact-${timestamp}.txt`
      const filepath = path.join(submissionsDir, filename)
      
      const fileContent = `
CONTACT FORM SUBMISSION
======================
Date: ${new Date().toISOString()}
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Project Type: ${project || 'Not specified'}

Message:
${message}

Reply-to: ${email}
======================
      `.trim()
      
      await fs.writeFile(filepath, fileContent, 'utf8')
      console.log(`✅ Contact form saved to: ${filepath}`)
      console.log('📧 IMPORTANT: New contact form submission from:', name, '(' + email + ')')
      console.log('📁 Check the submissions/ folder for the full details')
      
    } catch (fileError) {
      console.error('Failed to save submission to file:', fileError)
    }

    // Still try to send email with shorter timeout
    if (process.env.RESEND_API_KEY) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
        
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: ['developer.yasirofficial@gmail.com'],
            subject: `New Contact Form Submission from ${name}`,
            text: emailContent,
            reply_to: email,
          }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)
        
        if (response.ok) {
          const result = await response.json()
          console.log('📧 Email sent successfully via Resend:', result.id)
        } else {
          const error = await response.json()
          console.error('Resend API error:', error)
        }
      } catch (emailError) {
        console.log('⚠️  Email sending failed (network issue), but submission saved locally')
      }
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}