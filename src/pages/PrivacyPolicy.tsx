import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            A <strong className="text-foreground">Eletrostar Software e Hardware</strong> está comprometida com a proteção da sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Informações Coletadas</h2>
            <p>Podemos coletar as seguintes informações quando você utiliza nosso site ou serviços:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Informações da empresa</li>
              <li>Dados de navegação (cookies, endereço IP)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Responder a solicitações e orçamentos</li>
              <li>Enviar comunicações relevantes sobre nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Compartilhamento de Dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para a prestação dos nossos serviços ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Segurança</h2>
            <p>
              Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              Nosso site pode utilizar cookies para melhorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Seus Direitos</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Contato</h2>
            <p>
              Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato conosco através da seção de contato do nosso site.
            </p>
          </section>

          <p className="text-sm border-t border-border pt-6 mt-8">
            Última atualização: Março de 2026.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
