import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, User, Mail, Shield, Building2, Users, Calendar } from "lucide-react";
import { useProfile, useUpdateProfile } from "./hooks/useProfile";

const ROLE_LABELS: Record<string, string> = {
  owner: "Proprietário",
  manager: "Gerente",
  coordinator: "Coordenador",
  sdr: "SDR",
  closer: "Closer",
  Admin: "Administrador",
};

const Profile = () => {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState({
    nome: "",
    password: "",
  });

  const [showPasswordField, setShowPasswordField] = useState(false);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        nome: profile.nome,
      }));
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const payload: { nome?: string; password?: string } = {};

    if (formData.nome !== profile?.nome) {
      payload.nome = formData.nome;
    }

    if (formData.password && formData.password.length > 0) {
      payload.password = formData.password;
    }

    if (Object.keys(payload).length > 0) {
      updateProfileMutation.mutate(payload, {
        onSuccess: () => {
          setFormData((prev) => ({ ...prev, password: "" }));
          setShowPasswordField(false);
        },
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoadingProfile) {
    return (
      <AppShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Meu Perfil" },
        ]}
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Meu Perfil" },
        ]}
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Erro ao carregar perfil</p>
        </div>
      </AppShell>
    );
  }

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
          <Button
            onClick={handleSave}
            disabled={updateProfileMutation.isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            {updateProfileMutation.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Profile Card */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar */}
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32 border-4 border-muted">
                      <AvatarImage src="" alt={profile.nome} />
                      <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                        {getInitials(profile.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          name="nome"
                          value={formData.nome || profile.nome}
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
                          disabled
                          value={profile.email}
                          className="pl-9 bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cargo</label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          disabled
                          value={ROLE_LABELS[profile.role] || profile.role}
                          className="pl-9 bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Senha</label>
                        {!showPasswordField && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => setShowPasswordField(true)}
                            className="h-auto p-0"
                          >
                            Alterar senha
                          </Button>
                        )}
                      </div>
                      {showPasswordField && (
                        <Input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Nova senha (mínimo 8 caracteres)"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Organization Card */}
            {profile.organization && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5" />
                    Organização
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{profile.organization.name}</p>
                </CardContent>
              </Card>
            )}

            {/* Teams Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.teams.length > 0 ? (
                  <div className="space-y-2">
                    {profile.teams.map((team) => (
                      <Badge key={team.id} variant="secondary" className="mr-2">
                        {team.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Você não faz parte de nenhum time
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Joined Date Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Membro desde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  {formatDate(profile.joinedAt)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;