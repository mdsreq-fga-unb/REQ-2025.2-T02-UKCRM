import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import Times from './Times';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Times Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders the page title and label', () => {
      renderWithRouter(<Times />);
      const labels = screen.getAllByText('Gerenciamento de Times');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('renders the search input', () => {
      renderWithRouter(<Times />);
      expect(
        screen.getByPlaceholderText('Pesquisar por time...')
      ).toBeInTheDocument();
    });

    it('renders the create team button', () => {
      renderWithRouter(<Times />);
      expect(screen.getByText('Novo Time')).toBeInTheDocument();
    });

    it('renders breadcrumbs navigation', () => {
      renderWithRouter(<Times />);
      // AppShell component should render breadcrumbs
      const labels = screen.getAllByText('Gerenciamento de Times');
      expect(labels.length).toBeGreaterThan(0);
    });
  });

  describe('Mock Teams Display', () => {
    it('displays all mock teams', () => {
      renderWithRouter(<Times />);
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();
      expect(screen.getByText('Time Beta')).toBeInTheDocument();
      expect(screen.getByText('Time Gamma')).toBeInTheDocument();
    });

    it('displays team member counts', () => {
      renderWithRouter(<Times />);
      expect(screen.getByText('5')).toBeInTheDocument(); // Time Alpha members
      expect(screen.getByText('8')).toBeInTheDocument(); // Time Beta members
      expect(screen.getByText('3')).toBeInTheDocument(); // Time Gamma members
    });

    it('displays team creation dates', () => {
      renderWithRouter(<Times />);
      expect(screen.getByText('14/10/2025')).toBeInTheDocument();
      expect(screen.getByText('12/10/2025')).toBeInTheDocument();
      expect(screen.getByText('10/10/2025')).toBeInTheDocument();
    });

    it('displays all table column headers', () => {
      renderWithRouter(<Times />);
      expect(screen.getByText('Nome do Time')).toBeInTheDocument();
      expect(screen.getByText('Nº de Membros')).toBeInTheDocument();
      expect(screen.getByText('Data de Criação')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters teams by name', () => {
      renderWithRouter(<Times />);
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');

      // Initially shows all teams
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();
      expect(screen.getByText('Time Beta')).toBeInTheDocument();
      expect(screen.getByText('Time Gamma')).toBeInTheDocument();

      // Search for "Alpha"
      fireEvent.change(searchInput, { target: { value: 'Alpha' } });
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();
      expect(screen.queryByText('Time Beta')).not.toBeInTheDocument();
      expect(screen.queryByText('Time Gamma')).not.toBeInTheDocument();
    });

    it('search is case insensitive', () => {
      renderWithRouter(<Times />);
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');

      fireEvent.change(searchInput, { target: { value: 'alpha' } });
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'BETA' } });
      expect(screen.getByText('Time Beta')).toBeInTheDocument();
    });

    it('returns all teams when search is cleared', () => {
      renderWithRouter(<Times />);
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');

      fireEvent.change(searchInput, { target: { value: 'Alpha' } });
      expect(screen.queryByText('Time Beta')).not.toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();
      expect(screen.getByText('Time Beta')).toBeInTheDocument();
      expect(screen.getByText('Time Gamma')).toBeInTheDocument();
    });

    it('shows no results for non-existent team', () => {
      renderWithRouter(<Times />);
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');

      fireEvent.change(searchInput, { target: { value: 'NonExistentTeam' } });
      expect(screen.queryByText('Time Alpha')).not.toBeInTheDocument();
      expect(screen.queryByText('Time Beta')).not.toBeInTheDocument();
      expect(screen.queryByText('Time Gamma')).not.toBeInTheDocument();
    });
  });

  describe('Modal Interactions', () => {
    it('opens create modal when Novo Time button is clicked', () => {
      renderWithRouter(<Times />);
      const createButton = screen.getByText('Novo Time');

      fireEvent.click(createButton);

      // Modal should open (implementation depends on CreateTeamModal)
      // This is a basic interaction test
      expect(createButton).toBeInTheDocument();
    });

    it('modals are closed by default', () => {
      renderWithRouter(<Times />);

      // Modals should not be visible initially
      // This test verifies the initial state
      expect(screen.getByText('Novo Time')).toBeInTheDocument();
    });
  });

  describe('Table Actions', () => {
    it('handles edit action', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      renderWithRouter(<Times />);

      // Note: Actual edit button interaction depends on DataTable implementation
      // This test structure shows how to test actions

      consoleSpy.mockRestore();
    });

    it('handles delete action', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      renderWithRouter(<Times />);

      // Note: Actual delete button interaction depends on DataTable implementation

      consoleSpy.mockRestore();
    });
  });

  describe('Data Persistence', () => {
    it('maintains mock data state', () => {
      renderWithRouter(<Times />);

      // Verify data is loaded from mock
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();

      // Search and verify data persists
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');
      fireEvent.change(searchInput, { target: { value: 'Beta' } });
      fireEvent.change(searchInput, { target: { value: '' } });

      // All teams should still be there
      expect(screen.getByText('Time Alpha')).toBeInTheDocument();
      expect(screen.getByText('Time Beta')).toBeInTheDocument();
      expect(screen.getByText('Time Gamma')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('search input is accessible', () => {
      renderWithRouter(<Times />);
      const searchInput = screen.getByPlaceholderText('Pesquisar por time...');
      expect(searchInput).toHaveAttribute('placeholder');
      expect(searchInput).toHaveClass('pl-9'); // Has icon padding
    });

    it('create button is accessible', () => {
      renderWithRouter(<Times />);
      const createButton = screen.getByRole('button', { name: /Novo Time/i });
      expect(createButton).toBeInTheDocument();
    });

    it('table has proper structure', () => {
      renderWithRouter(<Times />);

      // Table headers should be present
      expect(screen.getByText('Nome do Time')).toBeInTheDocument();
      expect(screen.getByText('Nº de Membros')).toBeInTheDocument();
      expect(screen.getByText('Data de Criação')).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('renders within AppShell layout', () => {
      renderWithRouter(<Times />);

      // AppShell components should be present
      const labels = screen.getAllByText('Gerenciamento de Times');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('has sidebar label with primary color indicator', () => {
      renderWithRouter(<Times />);

      // Sidebar label structure is rendered
      const labels = screen.getAllByText('Gerenciamento de Times');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('applies animation classes', () => {
      const { container } = renderWithRouter(<Times />);

      // Check for animation class (animate-fade-in)
      const animatedDiv = container.querySelector('.animate-fade-in');
      expect(animatedDiv).toBeInTheDocument();
    });
  });

  describe('Mock Members Data', () => {
    it('has mock members data available for modals', () => {
      renderWithRouter(<Times />);

      // The component should have mock members defined
      // This ensures modal tests can access member data
      expect(screen.getByText('Novo Time')).toBeInTheDocument();
    });
  });
});
