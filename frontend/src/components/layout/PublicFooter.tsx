export const PublicFooter = () => {
  return (
    <footer className="border-t pt-8 text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://ukmarketingdigital.com.br">
          UK Marketing Digital. Todos os direitos reservados.
        </a>
      </p>
    </footer>
  );
};
