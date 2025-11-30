import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, User, Mail, Shield } from "lucide-react";

const Profile = () => {
  // Simulando dados iniciais
  const [formData, setFormData] = useState({
    nome: "Udson Witer",
    email: "udson@exemplo.com",
    cargo: "Administrador", 
  });

  const [isLoading, setIsLoading] = useState(false);

  // Função para digitar nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função fake de salvar
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert("Dados salvos com sucesso!"); 
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AppShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Meu Perfil" },
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Meu Perfil
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie suas informações pessoais
            </p>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Foto */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-muted">
                <AvatarImage src="" alt={formData.nome} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  UW
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            </div>

            {/* Formulário */}
            <div className="flex-1 space-y-6 max-w-2xl">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    name="nome"
                    value={formData.nome} 
                    onChange={handleChange}
                    className="pl-9" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    className="pl-9" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cargo</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    disabled 
                    value={formData.cargo} 
                    className="pl-9 bg-muted/50" 
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;