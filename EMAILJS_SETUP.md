# EmailJS Setup Guide

## Step-by-Step Instructions

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Click "Sign Up" and create a free account (200 emails/month free)

### 2. Connect Your Gmail Account
- In EmailJS Dashboard, go to **Email Services**
- Click **Add New Service**
- Select **Gmail**
- Click **Connect Account** and authorize with your Gmail (chukpozohnt@gmail.com)
- Copy the **Service ID** (looks like: `service_xxxxxxxxx`)

### 3. Create Email Template
- Go to **Email Templates** in the dashboard
- Click **Create New Template**
- Use this template:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}
Job Title: {{job_title}}
Company: {{company}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

- Click **Save**
- Copy the **Template ID** (looks like: `template_xxxxxxxxx`)

### 4. Get Your Public Key
- Go to **Account** → **General** → **API Keys**
- Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxx`)

### 5. Update script.js
Open `script.js` and replace these three values:

```javascript
const publicKey = 'YOUR_PUBLIC_KEY';      // Paste your Public Key here
const serviceId = 'YOUR_SERVICE_ID';      // Paste your Service ID here
const templateId = 'YOUR_TEMPLATE_ID';    // Paste your Template ID here
```

### 6. Test the Form
- Fill out the contact form on your website
- Submit it
- Check your email (chukpozohnt@gmail.com) for the message

## Troubleshooting

- **Form not sending?** Check browser console (F12) for errors
- **Email not received?** Check spam folder, verify Gmail connection in EmailJS
- **Need help?** EmailJS has great documentation at https://www.emailjs.com/docs/

## Template Variables Reference

The following variables are available in your template:
- `{{to_email}}` - Recipient email (chukpozohnt@gmail.com)
- `{{from_name}}` - Sender's full name
- `{{from_email}}` - Sender's email address
- `{{job_title}}` - Sender's job title
- `{{company}}` - Sender's company name
- `{{message}}` - Project details message
- `{{reply_to}}` - Reply-to email (same as from_email)
- `{{subject}}` - Email subject line
