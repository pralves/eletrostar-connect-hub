/**
 * Ponto de entrada da aplicação (composition root).
 *
 * É o ÚNICO lugar que conhece todas as camadas ao mesmo tempo: instancia as
 * implementações concretas (infraestrutura/adapters), injeta-as nos usecases e
 * sobe o servidor HTTP. As demais camadas dependem apenas de abstrações.
 */
import { env } from "./infrastructure/config/env.js";
import { supabase } from "./infrastructure/supabase/client.js";
import { transporter } from "./infrastructure/email/transporter.js";
import { createApp } from "./infrastructure/http/server.js";

import { SupabaseContactRepository } from "./adapters/SupabaseContactRepository.js";
import { NodemailerMailer } from "./adapters/NodemailerMailer.js";
import { SubmitContactMessage } from "./usecases/SubmitContactMessage.js";
import { ContactController } from "./presentation/http/controllers/ContactController.js";

function bootstrap(): void {
  // Adapters (implementações concretas das portas)
  const contactRepository = new SupabaseContactRepository(supabase);
  const mailer = new NodemailerMailer(transporter, {
    from: env.SMTP_USER,
    contactTo: env.CONTACT_TO,
  });

  // Usecases (regra de aplicação) recebendo as portas
  const submitContactMessage = new SubmitContactMessage(contactRepository, mailer);

  // Presentation
  const contactController = new ContactController(submitContactMessage);

  // HTTP
  const app = createApp({ contactController });

  app.listen(env.PORT, () => {
    console.log(`[server] API no ar em http://localhost:${env.PORT} (/api)`);
  });
}

bootstrap();
