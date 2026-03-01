import logo from "@/assets/logo_eletrostar.png";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Eletrostar" className="h-10 w-auto" />
        </a>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eletrostar Software e Hardware. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
