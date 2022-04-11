import sendgrid from "@sendgrid/mail";
import { AkismetClient } from 'akismet-api';
import metaMdx from '../../.contentlayer/generated/Metadata/metadata__meta.mdx.json';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const key = process.env.AKISMET_API_KEY;
const blog = metaMdx.site_url;

const client = new AkismetClient({key, blog});

async function sendEmail(req, res) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  const toEmail = req.body.email;
  const fromEmail = process.env.EMAIL_SENDER;
  const ccEmail = process.env.EMAIL_RECIPIENT;
  const templateId = process.env.SENDGRID_TEMPLATE_ID;
  const templateData = {
    name: req.body.name,
    message: req.body.message
  }
  const comment = {
    ip: ip,
    name: req.body.name,
    email: req.body.email,
    content: req.body.message
  }
  try {
    const isSpam = await client.checkSpam(comment);
    if (isSpam) {
      res.setHeader(
        'Content-Type',
        'application/json'
      );
      res.setHeader(
        'X-Content-Type-Options',
        'nosniff'
      );
      return res.status(403).json({ error: "Spam detected! If this was unintended, please contact me directly via email." });
    }
  } catch (err) {
    console.error('Something went wrong:', err.message);
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