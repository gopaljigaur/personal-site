import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const toEmail = req.body.email;
  const fromEmail = process.env.EMAIL_SENDER;
  const ccEmail = process.env.EMAIL_RECIPIENT;
  const templateId = process.env.SENDGRID_TEMPLATE_ID;
  const templateData = {
    name: req.body.name,
    message: req.body.message
  }
  try {
    await sendgrid.send({
      to: toEmail,
      from: fromEmail,
      cc: ccEmail,
      dynamicTemplateData: templateData,
      templateId: templateId,
    });
  } catch (error) {
    res.setHeader(
      'Content-Type',
      'application/json'
    );
    res.setHeader(
      'X-Content-Type-Options',
      'nosniff'
    );
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
  res.setHeader(
    'Content-Type',
    'application/json'
  );
  res.setHeader(
    'X-Content-Type-Options',
    'nosniff'
  );
  return res.status(200).json({ error: "" });
}

export default sendEmail;