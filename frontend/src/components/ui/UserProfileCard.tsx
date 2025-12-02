import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileCardProps {
  nome: string;
  cargo: string;
  avatar?: string;
}

export function UserProfileCard({ nome, cargo, avatar = "" }: UserProfileCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <div
      onClick={handleProfileClick}
      className="flex items-center gap-3 cursor-pointer rounded-md p-2 transition-colors hover:bg-sidebar-accent group"
      title="Ir para o Perfil"
    >
      <Avatar className="h-10 w-10 border border-transparent group-hover:border-sidebar-border">
        <AvatarImage src={avatar} alt={nome} />
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {getInitials(nome)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground">
          {nome}
        </span>
        <span className="text-xs text-muted-foreground">
          {cargo}
        </span>
      </div>
    </div>
  );
}