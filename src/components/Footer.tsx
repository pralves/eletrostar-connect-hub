import { Link } from "react-router-dom";
import logo from "@/assets/logo_eletrostar.png";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Eletrostar" className="h-10 w-auto" />
        </a>

        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#servicos" className="hover:text-foreground transition-colors">Serviços</a>
          <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
          <Link to="/politica-de-privacidade" className="hover:text-foreground transition-colors">
            Política de Privacidade
          </Link>
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eletrostar Software e Hardware. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
