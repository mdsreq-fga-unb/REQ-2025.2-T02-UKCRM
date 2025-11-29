import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router";
import Landing from "./index";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Landing Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Rendering", () => {
    it("renders the UK-CRM title", () => {
      renderWithRouter(<Landing />);
      const titles = screen.getAllByText("UK-CRM");
      expect(titles.length).toBeGreaterThan(0);
    });

    it("renders the UK logo", () => {
      renderWithRouter(<Landing />);
      const logos = screen.getAllByAltText(/UK/i);
      expect(logos.length).toBeGreaterThan(0);
    });

    it("renders the welcome message", () => {
      renderWithRouter(<Landing />);
      expect(screen.getByText("Bem-vindo ao UK-CRM")).toBeInTheDocument();
    });

    it("renders the UK Marketing Digital link", () => {
      renderWithRouter(<Landing />);
      const links = screen.getAllByRole("link", {
        name: /UK Marketing Digital/i,
      });
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute(
          "href",
          "https://ukmarketingdigital.com.br"
        );
      });
    });

    it("renders the login button in header", () => {
      renderWithRouter(<Landing />);
      const loginButtons = screen.getAllByRole("button", { name: /Login/i });
      expect(loginButtons.length).toBeGreaterThan(0);
    });

    it("renders the começar agora button", () => {
      renderWithRouter(<Landing />);
      expect(
        screen.getByRole("button", { name: /Começar Agora/i })
      ).toBeInTheDocument();
    });
  });

  describe("Features Section", () => {
    it("renders the teams management feature", () => {
      renderWithRouter(<Landing />);
      expect(
        screen.getByText("Gerenciamento de Times")
      ).toBeInTheDocument();
    });

    it("renders the sales funnel feature", () => {
      renderWithRouter(<Landing />);
      expect(screen.getByText("Funis de Vendas")).toBeInTheDocument();
    });

    it("renders the organizations management feature", () => {
      renderWithRouter(<Landing />);
      expect(
        screen.getByText("Gestão de Organizações")
      ).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("navigates to login when header login button is clicked", () => {
      renderWithRouter(<Landing />);
      const loginButton = screen.getAllByRole("button", { name: /Login/i })[0];

      fireEvent.click(loginButton);

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("navigates to login when começar agora button is clicked", () => {
      renderWithRouter(<Landing />);
      const startButton = screen.getByRole("button", {
        name: /Começar Agora/i,
      });

      fireEvent.click(startButton);

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  describe("External Links", () => {
    it("opens UK Marketing Digital website in new tab", () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      renderWithRouter(<Landing />);
      const saibaMaisButton = screen.getByRole("button", {
        name: /Saiba Mais/i,
      });

      fireEvent.click(saibaMaisButton);

      expect(mockOpen).toHaveBeenCalledWith(
        "https://ukmarketingdigital.com.br",
        "_blank"
      );
    });
  });

  describe("Footer", () => {
    it("renders the current year in footer", () => {
      renderWithRouter(<Landing />);
      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(
          new RegExp(`© ${currentYear} UK Marketing Digital`, "i")
        )
      ).toBeInTheDocument();
    });

    it("renders contact information", () => {
      renderWithRouter(<Landing />);
      expect(
        screen.getByText("contato@ukmarketingdigital.com.br")
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper alt text for images", () => {
      renderWithRouter(<Landing />);
      const logos = screen.getAllByAltText(/UK/i);
      logos.forEach((logo) => {
        expect(logo).toHaveAttribute("alt");
      });
    });

    it("has accessible links with rel attributes", () => {
      renderWithRouter(<Landing />);
      const externalLinks = screen.getAllByRole("link", {
        name: /UK Marketing Digital/i,
      });
      externalLinks.forEach((link) => {
        if (link.getAttribute("target") === "_blank") {
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
      });
    });
  });
});
