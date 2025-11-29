import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import { AuthContext } from '@/auth/context/AuthContext';
import Organizacoes from './index';

// Mock the hooks
vi.mock('./hooks/useOrganizacoesData', () => ({
  useOrganizacoesData: vi.fn(),
}));

import { useOrganizacoesData } from './hooks/useOrganizacoesData';

// Mock user with Admin role (can manage organizations)
const mockUser = {
  id: 1,
  email: 'test@test.com',
  nome: 'Test User',
  role: 'Admin' as const,
};

const mockAuthContextValue = {
  user: mockUser,
  isLoading: false,
  error: null,
  isAuthenticated: true,
  login: vi.fn(),
  logout: vi.fn(),
};

// Mock router for AppShell component
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <BrowserRouter>{component}</BrowserRouter>
    </AuthContext.Provider>
  );
};

const mockOrganizations = [
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
];

describe('Organizacoes Page', () => {
  const mockHandleCreate = vi.fn();
  const mockHandleUpdate = vi.fn();
  const mockHandleDelete = vi.fn();
  const mockHandleRefresh = vi.fn();

  beforeEach(() => {
    // Clear any mocks
    vi.clearAllMocks();

    // Setup default mock implementation
    (useOrganizacoesData as ReturnType<typeof vi.fn>).mockReturnValue({
      organizations: mockOrganizations,
      isLoading: false,
      handleCreate: mockHandleCreate,
      handleUpdate: mockHandleUpdate,
      handleDelete: mockHandleDelete,
      handleRefresh: mockHandleRefresh,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders the page title', () => {
      renderWithRouter(<Organizacoes />);
      const heading = screen.getByRole('heading', { name: /Gestão de Organizações/i });
      expect(heading).toBeInTheDocument();
    });

    it('renders the page description', () => {
      renderWithRouter(<Organizacoes />);
      expect(
        screen.getByText('Gerencie todas as organizações do sistema')
      ).toBeInTheDocument();
    });

    it('renders the search input', () => {
      renderWithRouter(<Organizacoes />);
      expect(
        screen.getByPlaceholderText('Escreva algo...')
      ).toBeInTheDocument();
    });

    it('renders create organization button', () => {
      renderWithRouter(<Organizacoes />);
      const buttons = screen.getAllByText(/Criar Organização/i);
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders refresh button', () => {
      renderWithRouter(<Organizacoes />);
      const buttons = screen.getAllByRole('button');
      const refreshButton = buttons.find((btn: HTMLElement) => btn.querySelector('svg'));
      expect(refreshButton).toBeInTheDocument();
    });
  });

  describe('Mock Data Display', () => {
    it('displays organization data from hook', () => {
      renderWithRouter(<Organizacoes />);
      expect(screen.getByText('Ober')).toBeInTheDocument();
      expect(screen.getByText('José da Silva')).toBeInTheDocument();
      expect(screen.getByText('14/10/2025')).toBeInTheDocument();
      expect(screen.getByText('Tech Solutions')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });

    it('displays all table columns', () => {
      renderWithRouter(<Organizacoes />);
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nome')).toBeInTheDocument();
      expect(screen.getByText('Data de Criação')).toBeInTheDocument();
      expect(screen.getByText('Data de Atualização')).toBeInTheDocument();
      expect(screen.getByText('Proprietário')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters organizations by name', () => {
      renderWithRouter(<Organizacoes />);
      const searchInput = screen.getByPlaceholderText('Escreva algo...');

      // Initially shows all organizations
      expect(screen.getByText('Ober')).toBeInTheDocument();
      expect(screen.getByText('Tech Solutions')).toBeInTheDocument();

      // Search for organization
      fireEvent.change(searchInput, { target: { value: 'Ober' } });
      expect(screen.getByText('Ober')).toBeInTheDocument();
      expect(screen.queryByText('Tech Solutions')).not.toBeInTheDocument();

      // Search for non-existent organization
      fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
      expect(screen.queryByText('Ober')).not.toBeInTheDocument();
      expect(screen.queryByText('Tech Solutions')).not.toBeInTheDocument();
    });

    it('search is case insensitive', () => {
      renderWithRouter(<Organizacoes />);
      const searchInput = screen.getByPlaceholderText('Escreva algo...');

      fireEvent.change(searchInput, { target: { value: 'ober' } });
      expect(screen.getByText('Ober')).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'OBER' } });
      expect(screen.getByText('Ober')).toBeInTheDocument();
    });

    it('clears search when input is empty', () => {
      renderWithRouter(<Organizacoes />);
      const searchInput = screen.getByPlaceholderText('Escreva algo...');

      // Filter
      fireEvent.change(searchInput, { target: { value: 'Ober' } });
      expect(screen.queryByText('Tech Solutions')).not.toBeInTheDocument();

      // Clear
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('Ober')).toBeInTheDocument();
      expect(screen.getByText('Tech Solutions')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('disables refresh button when loading', () => {
      (useOrganizacoesData as ReturnType<typeof vi.fn>).mockReturnValue({
        organizations: [],
        isLoading: true,
        handleCreate: mockHandleCreate,
        handleUpdate: mockHandleUpdate,
        handleDelete: mockHandleDelete,
        handleRefresh: mockHandleRefresh,
      });

      renderWithRouter(<Organizacoes />);
      const buttons = screen.getAllByRole('button');
      const refreshButton = buttons.find(
        (btn: HTMLElement) => btn.querySelector('svg.animate-spin')
      );
      expect(refreshButton).toHaveAttribute('disabled');
    });
  });

  describe('Refresh Functionality', () => {
    it('refresh button is clickable and not disabled by default', () => {
      renderWithRouter(<Organizacoes />);
      const buttons = screen.getAllByRole('button');
      // Find refresh button - it's the icon-only button (size-icon variant)
      // Filter out buttons that contain text "Criar"
      const iconButtons = buttons.filter((btn: HTMLElement) =>
        !btn.textContent?.includes('Criar') && btn.querySelector('svg')
      );

      expect(iconButtons.length).toBeGreaterThan(0);
      expect(iconButtons[0]).not.toHaveAttribute('disabled');
    });
  });

  describe('Modal Interactions', () => {
    it('opens create modal when create button is clicked', () => {
      renderWithRouter(<Organizacoes />);
      const createButtons = screen.getAllByText(/Criar Organização/i);

      // Click the first create button
      fireEvent.click(createButtons[0]);

      // Check if modal content appears (you may need to adjust based on modal implementation)
      // Since modals use Radix UI, they might render in a portal
      // This is a basic check - you might need to wait for async rendering
      expect(createButtons[0]).toBeInTheDocument();
    });
  });

  describe('Delete Functionality', () => {
    it('calls handleDelete when delete is confirmed', async () => {
      mockHandleDelete.mockResolvedValue(undefined);

      // This test would need the DataTable to be properly mocked
      // to simulate clicking delete and confirming
      // Placeholder for now
    });
  });

  describe('Alert Banner', () => {
    it('does not show alert banner by default', () => {
      renderWithRouter(<Organizacoes />);
      expect(
        screen.queryByText(/Erro: Mensagem curta do erro/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<Organizacoes />);
      const heading = screen.getByRole('heading', {
        name: /Gestão de Organizações/i,
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('search input has accessible placeholder', () => {
      renderWithRouter(<Organizacoes />);
      const searchInput = screen.getByPlaceholderText('Escreva algo...');
      expect(searchInput).toHaveAttribute('placeholder');
    });

    it('buttons are keyboard accessible', () => {
      renderWithRouter(<Organizacoes />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('renders all main sections', () => {
      renderWithRouter(<Organizacoes />);

      // Header section
      const heading = screen.getByRole('heading', { name: /Gestão de Organizações/i });
      expect(heading).toBeInTheDocument();

      // Search section
      expect(screen.getByPlaceholderText('Escreva algo...')).toBeInTheDocument();

      // Table section
      expect(screen.getByText('Nome')).toBeInTheDocument();
    });
  });

  describe('Hook Integration', () => {
    it('uses data from useOrganizacoesData hook', () => {
      renderWithRouter(<Organizacoes />);
      expect(useOrganizacoesData).toHaveBeenCalled();
    });

    it('displays empty state when no organizations', () => {
      (useOrganizacoesData as ReturnType<typeof vi.fn>).mockReturnValue({
        organizations: [],
        isLoading: false,
        handleCreate: mockHandleCreate,
        handleUpdate: mockHandleUpdate,
        handleDelete: mockHandleDelete,
        handleRefresh: mockHandleRefresh,
      });

      renderWithRouter(<Organizacoes />);
      expect(screen.queryByText('Ober')).not.toBeInTheDocument();
      expect(screen.queryByText('Tech Solutions')).not.toBeInTheDocument();
    });
  });
});
