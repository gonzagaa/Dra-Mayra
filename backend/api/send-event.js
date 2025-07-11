import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/send-event", async (req, res) => {
  try {
    const {
      eventName,
      eventId,
      fbc,
      fbp,
      email,
      phone
    } = req.body;

    const hashedEmail = email
      ? crypto.createHash("sha256").update(email).digest("hex")
      : undefined;

    const hashedPhone = phone
      ? crypto.createHash("sha256").update(phone).digest("hex")
      : undefined;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          user_data: {
            em: hashedEmail ? [hashedEmail] : undefined,
            ph: hashedPhone ? [hashedPhone] : undefined,
            fbc,
            fbp
          }
        }
      ]
    };

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
      payload
    );

    res.status(200).json({ success: true, response: response.data });
  } catch (err) {
    console.error("Erro ao enviar evento:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;
