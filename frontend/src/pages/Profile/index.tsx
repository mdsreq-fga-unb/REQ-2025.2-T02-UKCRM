import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Save,
  User,
  Mail,
  Shield,
  Building2,
  Users,
  Calendar,
  Camera,
} from "lucide-react";
import { useProfile, useUpdateProfile } from "./hooks/useProfile";
import {
  profileSchema,
  type ProfileFormValues,
} from "./schemas/profile.schema";
import { getRoleLabel } from "@/constants/roles";

const Profile = () => {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: "",
      password: "",
    },
  });

  // Atualizar formulário quando o perfil carregar
  useEffect(() => {
    if (profile) {
      reset({
        nome: profile.nome,
        password: "",
      });
      setPhotoPreview(profile.photo || null);
    }
  }, [profile, reset]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedPhoto(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    const payload: { nome?: string; password?: string; photo?: File } = {};

    if (data.nome !== profile?.nome) {
      payload.nome = data.nome;
    }

    if (data.password && data.password.length > 0) {
      payload.password = data.password;
    }

    if (selectedPhoto) {
      payload.photo = selectedPhoto;
    }

    if (Object.keys(payload).length > 0) {
      updateProfileMutation.mutate(payload, {
        onSuccess: () => {
          reset({
            nome: data.nome,
            password: "",
          });
          setShowPasswordField(false);
          setSelectedPhoto(null);

          // Mostrar mensagem de sucesso
          if (payload.password) {
            alert(
              "Senha alterada com sucesso! Você será redirecionado para fazer login novamente.",
            );
          } else {
            alert("Perfil atualizado com sucesso!");
          }
        },
        onError: (error) => {
          alert(
            error instanceof Error ? error.message : "Erro ao atualizar perfil",
          );
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
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Meu Perfil" }]}
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
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Meu Perfil" }]}
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Erro ao carregar perfil</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Meu Perfil" }]}
    >
      <div className="space-y-6 animate-fade-in">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Meu Perfil
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie suas informações pessoais
              </p>
            </div>
            <Button type="submit" disabled={updateProfileMutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {updateProfileMutation.isPending
                ? "Salvando..."
                : "Salvar Alterações"}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            {/* Cartão Principal do Perfil */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-muted">
                          <AvatarImage src={photoPreview || ""} alt={profile.nome} />
                          <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                            {getInitials(profile.nome)}
                          </AvatarFallback>
                        </Avatar>
                        <label htmlFor="photo-upload">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute bottom-0 right-0 h-10 w-10 rounded-full p-0 shadow-lg"
                            type="button"
                            asChild
                          >
                            <span className="cursor-pointer flex items-center justify-center">
                              <Camera className="h-4 w-4" />
                            </span>
                          </Button>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Clique no ícone para alterar foto (JPG/PNG, máx. 2MB)
                      </p>
                    </div>

                    {/* Formulário */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nome Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Nome Completo"
                            className="pl-9"
                            {...register("nome")}
                          />
                        </div>
                        {errors.nome && (
                          <p className="text-sm text-red-500">
                            {errors.nome.message}
                          </p>
                        )}
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
                            value={getRoleLabel(profile.role)}
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
                              type="button"
                              onClick={() => setShowPasswordField(true)}
                              className="h-auto p-0"
                            >
                              Alterar senha
                            </Button>
                          )}
                        </div>
                        {showPasswordField && (
                          <>
                            <Input
                              type="password"
                              placeholder="Nova senha (mínimo 8 caracteres)"
                              {...register("password")}
                            />
                            {errors.password && (
                              <p className="text-sm text-red-500">
                                {errors.password.message}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cartões da Barra Lateral */}
            <div className="space-y-6">
              {/* Cartão da Organização */}
              {profile.organization && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="h-5 w-5" />
                      Organização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {profile.organization.logo && (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile.organization.logo} alt={profile.organization.name} />
                          <AvatarFallback>
                            {profile.organization.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <p className="font-medium">{profile.organization.name}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cartão dos Times */}
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
                        <Badge
                          key={team.id}
                          variant="secondary"
                          className="mr-2"
                        >
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

              {/* Cartão da Data de Entrada */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    Membro desde
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{formatDate(profile.joinedAt)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
};

export default Profile;
