import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileCard() {
  const navigate = useNavigate();

  // --- PASSO 1: O ESTADO (A Lousa) ---
  // Por enquanto, deixamos os dados "chumbados" (fixos) aqui dentro para funcionar hoje.
  // Quando integrar, você pode deixar essas strings vazias "" ou manter como padrão.
  const [userData, setUserData] = useState({
    nome: "Udson Witer", 
    cargo: "Administrador",
    avatar: "" // Se tiver URL de imagem, coloca aqui
  });

  // --- PASSO 2: A CONEXÃO COM O BACKEND (FUTURO) ---
  // Mantenha este bloco comentado até você ter a API do Django pronta.
  /* useEffect(() => {
    async function carregarDadosDoUsuario() {
      try {
        // 1. Troque a URL abaixo pela rota real do seu Django (ex: /api/v1/me/)
        const resposta = await fetch('http://localhost:8000/api/usuario-logado/');
        
        if (resposta.ok) {
          const dados = await resposta.json();
          
          // 2. Atualiza a lousa com os dados que vieram do Django
          // Certifique-se que 'dados.nome' bate com o que o Django envia (ex: first_name)
          setUserData({
            nome: dados.nome,   
            cargo: dados.cargo, 
            avatar: dados.foto_url 
          });
        }
      } catch (erro) {
        console.error("Erro ao conectar com o backend:", erro);
      }
    }

    carregarDadosDoUsuario();
  }, []); // O [] garante que isso só rode 1 vez ao carregar a página
  */

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
        {/* Aqui ele lê o que estiver na 'Lousa' (state) */}
        <AvatarImage src={userData.avatar} alt={userData.nome} />
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {/* Pega as iniciais. Se quiser dinâmico depois, precisa de uma lógica extra de JS */}
          UW
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground">
          {userData.nome}
        </span>
        <span className="text-xs text-muted-foreground">
          {userData.cargo}
        </span>
      </div>
    </div>
  );
}