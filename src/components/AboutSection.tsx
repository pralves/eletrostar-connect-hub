import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Mais de 10 anos de experiência no mercado",
  "Equipe técnica altamente qualificada",
  "Atendimento personalizado e ágil",
  "Parceiros das melhores marcas de tecnologia",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sobre a <span className="text-gradient">Eletrostar</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              A Eletrostar é uma empresa especializada em soluções de software e hardware,
              comprometida em entregar tecnologia de ponta com excelência e inovação.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Atuamos com foco na satisfação dos nossos clientes, oferecendo desde
              desenvolvimento de sistemas até manutenção e suporte técnico completo.
            </p>
            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-square rounded-3xl bg-gradient-card border border-border overflow-hidden flex items-center justify-center shadow-card">
              <div className="text-center p-12">
                <div className="text-7xl font-bold text-gradient mb-4">10+</div>
                <div className="text-xl text-muted-foreground">Anos de experiência</div>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Clientes atendidos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">1000+</div>
                    <div className="text-sm text-muted-foreground">Projetos entregues</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
