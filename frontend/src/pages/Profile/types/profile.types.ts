export type Team = {
  id: number;
  name: string;
};

export type Organization = {
  id: number;
  name: string;
  logo?: string | null;
};

export type Profile = {
  id: number;
  email: string;
  nome: string;
  role: string;
  photo?: string | null;
  organization: Organization | null;
  teams: Team[];
  joinedAt: Date;
};

export type UpdateProfilePayload = {
  nome?: string;
  password?: string;
  photo?: File;
};
