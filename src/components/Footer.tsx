import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2 text-lg font-bold">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-foreground">Eletro</span>
          <span className="text-gradient">star</span>
        </a>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eletrostar Software e Hardware. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
