import { useState, useCallback, useMemo } from "react";

export interface Organization {
  id: number;
  nome: string;
  dataCriacao: string;
  dataAtualizacao: string;
  proprietario: string;
}

const mockData: Organization[] = [
  {
    id: 1,
    nome: "Ober",
    dataCriacao: "14/10/2025",
    dataAtualizacao: "15/10/2025",
    proprietario: "José da Silva",
  },
  {
    id: 2,
    nome: "Tech Solutions",
    dataCriacao: "10/09/2025",
    dataAtualizacao: "12/11/2025",
    proprietario: "Maria Santos",
  },
  {
    id: 3,
    nome: "Inovação Digital",
    dataCriacao: "05/08/2025",
    dataAtualizacao: "20/10/2025",
    proprietario: "Carlos Oliveira",
  },
];

export function useOrganizacoesMock() {
  const [organizations, setOrganizations] = useState<Organization[]>(mockData);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = useCallback((data: Omit<Organization, "id" | "dataCriacao" | "dataAtualizacao">) => {
    const newOrg: Organization = {
      id: Math.max(...organizations.map(o => o.id), 0) + 1,
      nome: data.nome,
      proprietario: data.proprietario,
      dataCriacao: new Date().toLocaleDateString("pt-BR"),
      dataAtualizacao: new Date().toLocaleDateString("pt-BR"),
    };

    setOrganizations((prev) => [...prev, newOrg]);
    return Promise.resolve(newOrg);
  }, [organizations]);

  const handleUpdate = useCallback((id: number, data: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === id
          ? { ...org, ...data, dataAtualizacao: new Date().toLocaleDateString("pt-BR") }
          : org
      )
    );
    return Promise.resolve();
  }, []);

  const handleDelete = useCallback((id: number) => {
    setOrganizations((prev) => prev.filter((org) => org.id !== id));
    return Promise.resolve();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setOrganizations(mockData);
      setIsLoading(false);
    }, 500);
  }, []);

  return useMemo(
    () => ({
      organizations,
      isLoading,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [organizations, isLoading, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
