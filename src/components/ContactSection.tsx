import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => null)) as
        | { success: boolean; error?: string }
        | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.error ?? "Falha ao enviar a mensagem.");
      }

      toast({
        title: "Mensagem enviada!",
        description: "Enviamos uma confirmação para o seu e-mail. Entraremos em contato em breve.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Não foi possível enviar",
        description: "Tente novamente ou fale conosco pelo WhatsApp.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Fale <span className="text-gradient">Conosco</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Entre em contato e descubra como podemos ajudar sua empresa.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Phone, label: "Telefone", value: "(21) 3574-9780" },
              { icon: Mail, label: "E-mail", value: "contato@eletrostar.com.br" },
              { icon: MapPin, label: "Endereço", value: "Rua Correa Dutra nº 149, Flamengo, Rio de Janeiro, RJ, CEP 22.210-050" },
              { icon: MessageCircle, label: "WhatsApp Business", value: "(21) 3574-9780", href: "https://wa.me/552135749780" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-muted-foreground">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 p-8 rounded-2xl bg-gradient-card border border-border shadow-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Input
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSending}
              className="bg-muted border-border"
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSending}
              className="bg-muted border-border"
            />
            <Textarea
              placeholder="Sua mensagem"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              disabled={isSending}
              className="bg-muted border-border resize-none"
            />
            <Button type="submit" size="lg" disabled={isSending} className="w-full shadow-glow">
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Mensagem"
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
