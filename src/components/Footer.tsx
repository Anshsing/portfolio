const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="section-container text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Ansh Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
