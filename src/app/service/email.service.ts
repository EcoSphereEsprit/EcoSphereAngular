import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(email: string, subject: string, body: string): Promise<boolean> {
    // Simuler l'envoi d'email (remplacez par une implémentation réelle dans un environnement de production)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Email envoyé à ${email} - Sujet: ${subject} - Contenu: ${body}`);
        resolve(true); // Simuler que l'email a été envoyé avec succès
      }, 2000); // Simuler un délai de 2 secondes pour l'envoi de l'email
    });
  }
  sendSecretCode(email: string, secretCode: string): Promise<boolean> {
    const subject = 'Code secret pour votre commande';
    const body = `Votre code secret est : ${secretCode}. Utilisez ce code pour confirmer votre commande.`;
    return this.sendEmail(email, subject, body);
  }
}