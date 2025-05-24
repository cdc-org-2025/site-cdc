
import db from "../models/index.js";
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

class CandidaturaVagaFormController {
    static async index(req, res) {
        try {
            const { nome, email, mensagem, titulo_vaga } = req.body;
            const anexo = req.file || null;


            const destinatarios = await db.Email.findAll({
                where: { tipo: 'curriculo' }
            });


            if (!destinatarios.length) {
                return res.status(404).json({ error: 'Nenhum email destinatário encontrado' });
            }

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465, // ou 587 se quiser TLS STARTTLS
                secure: true, // true para 465, false para 587
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: "comunicacao@cdc.org.br",
                to: destinatarios.map(d => d.email), // envia para todos do banco
                subject: 'Nova Candidatura Recebida',
                html: `
                <h3>Nova Candidatura Recebida - ${titulo_vaga}</h3>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem}</p>
                `,
                attachments: anexo ? [{
                    filename: anexo.originalname,
                    path: path.resolve(anexo.path)
                }] : []
            };

            await transporter.sendMail(mailOptions);

            // Remove arquivo após envio
            if (anexo) {
                fs.unlinkSync(path.resolve(anexo.path));
            }

            return res.status(201).json({
                success: true,
                message: 'Formulário enviado com sucesso!'
            });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao enviar o formulário' });
        }
    }
}

export default CandidaturaVagaFormController;