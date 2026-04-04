import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route for sending email
  app.post('/api/send-email', async (req, res) => {
    try {
      const { name, email, phone, packageType, days, delivery, price, message } = req.body;

      // Setup nodemailer with iCloud SMTP
      // Note: User must provide their iCloud email and app-specific password in .env
      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.me.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.ICLOUD_EMAIL,
          pass: process.env.ICLOUD_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.ICLOUD_EMAIL,
        to: 'info@trialshow.cz',
        subject: `Nová rezervace/dotaz od ${name}`,
        text: `
Jméno: ${name}
Email: ${email}
Telefon: ${phone || 'Neuveden'}
Balíček: ${packageType || 'Neuveden'}
Počet dní: ${days || 'Neuveden'}
Doprava: ${delivery === 'dpd' ? 'DPD (500 Kč)' : delivery === 'personal' ? 'Odvoz na místo (750 Kč)' : 'Bez dopravy'}
Odhadovaná cena: ${price || 'Neuvedena'}

Zpráva:
${message}
        `
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Email odeslán' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Chyba při odesílání emailu' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const routeFile = path.join(distPath, req.path, 'index.html');
      if (fs.existsSync(routeFile)) {
        res.sendFile(routeFile);
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
