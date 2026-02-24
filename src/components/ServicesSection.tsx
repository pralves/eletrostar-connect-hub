import { motion } from "framer-motion";
import { Code, Monitor, Server, Shield, Cpu, Wrench } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento de Software",
    description: "Sistemas personalizados, aplicações web e mobile sob medida para otimizar seus processos.",
  },
  {
    icon: Monitor,
    title: "Infraestrutura de TI",
    description: "Planejamento, implantação e gerenciamento de toda a infraestrutura tecnológica da sua empresa.",
  },
  {
    icon: Server,
    title: "Servidores e Redes",
    description: "Configuração e manutenção de servidores, redes corporativas e soluções em nuvem.",
  },
  {
    icon: Shield,
    title: "Segurança Digital",
    description: "Proteção de dados, firewalls, antivírus corporativo e políticas de segurança da informação.",
  },
  {
    icon: Cpu,
    title: "Hardware Especializado",
    description: "Venda, montagem e manutenção de computadores, notebooks e equipamentos de alta performance.",
  },
  {
    icon: Wrench,
    title: "Suporte Técnico",
    description: "Atendimento rápido e eficiente para resolver problemas técnicos e manter sua operação ativa.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Soluções completas em software e hardware para impulsionar seu negócio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
