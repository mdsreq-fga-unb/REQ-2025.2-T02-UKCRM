export type Team = {
  id: number;
  name: string;
};

export type Organization = {
  id: number;
  name: string;
};

export type Profile = {
  id: number;
  email: string;
  nome: string;
  role: string;
  organization: Organization | null;
  teams: Team[];
  joinedAt: Date;
};

export type UpdateProfilePayload = {
  nome?: string;
  password?: string;
};
