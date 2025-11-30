import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import Login from "./index";
import { AuthProvider } from "@/auth/context/AuthContext";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("Page Rendering", () => {
    it("renders the UK-CRM title", () => {
      renderWithProviders(<Login />);
      expect(screen.getByText("UK-CRM")).toBeInTheDocument();
    });

    it("renders the UK logo", () => {
      renderWithProviders(<Login />);
      const logos = screen.getAllByAltText(/UK/i);
      expect(logos.length).toBeGreaterThan(0);
    });

    it("renders the welcome message", () => {
      renderWithProviders(<Login />);
      expect(screen.getByText("Bem-vindo de volta")).toBeInTheDocument();
    });

    it("renders the email input field", () => {
      renderWithProviders(<Login />);
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it("renders the password input field", () => {
      renderWithProviders(<Login />);
      expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    });

    it("renders the login button", () => {
      renderWithProviders(<Login />);
      expect(
        screen.getByRole("button", { name: /^Login$/i })
      ).toBeInTheDocument();
    });

    it("renders the voltar button", () => {
      renderWithProviders(<Login />);
      expect(
        screen.getByRole("button", { name: /Voltar/i })
      ).toBeInTheDocument();
    });
  });

  describe("Form Inputs", () => {
    it("allows typing in the email field", () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;

      fireEvent.change(emailInput, {
        target: { value: "test@example.com" },
      });

      expect(emailInput.value).toBe("test@example.com");
    });

    it("allows typing in the password field", () => {
      renderWithProviders(<Login />);
      const passwordInput = screen.getByLabelText("Senha") as HTMLInputElement;

      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(passwordInput.value).toBe("password123");
    });

    it("password field is type password by default", () => {
      renderWithProviders(<Login />);
      const passwordInput = screen.getByLabelText("Senha") as HTMLInputElement;

      expect(passwordInput.type).toBe("password");
    });
  });

  describe("Password Visibility Toggle", () => {
    it("toggles password visibility when eye icon is clicked", () => {
      renderWithProviders(<Login />);
      const passwordInput = screen.getByLabelText("Senha") as HTMLInputElement;
      const toggleButton = screen.getByRole("button", {
        name: /Mostrar senha/i,
      });

      expect(passwordInput.type).toBe("password");

      fireEvent.click(toggleButton);

      expect(passwordInput.type).toBe("text");

      fireEvent.click(toggleButton);

      expect(passwordInput.type).toBe("password");
    });

    it("changes aria-label when password visibility is toggled", () => {
      renderWithProviders(<Login />);
      const toggleButton = screen.getByRole("button", {
        name: /Mostrar senha/i,
      });

      fireEvent.click(toggleButton);

      expect(
        screen.getByRole("button", { name: /Ocultar senha/i })
      ).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("shows error when submitting with empty fields", async () => {
      renderWithProviders(<Login />);
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText("Por favor, preencha todos os campos")
        ).toBeInTheDocument();
      });
    });

    it("shows error when submitting with only email", async () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(emailInput, {
        target: { value: "test@example.com" },
      });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText("Por favor, preencha todos os campos")
        ).toBeInTheDocument();
      });
    });

    it("shows error when submitting with only password", async () => {
      renderWithProviders(<Login />);
      const passwordInput = screen.getByLabelText("Senha");
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText("Por favor, preencha todos os campos")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Mock Authentication", () => {
    it("successfully logs in with correct mock credentials", async () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText("Senha");
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(emailInput, {
        target: { value: "udsonwiter@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(loginButton);

      await waitFor(
        () => {
          expect(mockNavigate).toHaveBeenCalledWith("/");
        },
        { timeout: 2000 }
      );
    });

    it("shows error with incorrect mock credentials", async () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText("Senha");
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(emailInput, {
        target: { value: "wrong@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(loginButton);

      await waitFor(
        () => {
          expect(
            screen.getByText("Credenciais inválidas")
          ).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it("shows loading state during login", async () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText("Senha");
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(emailInput, {
        target: { value: "udsonwiter@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(loginButton);

      expect(screen.getByText(/Entrando.../i)).toBeInTheDocument();

      await waitFor(
        () => {
          expect(mockNavigate).toHaveBeenCalledWith("/");
        },
        { timeout: 2000 }
      );
    });
  });

  describe("Navigation", () => {
    it("navigates back when voltar button is clicked", () => {
      renderWithProviders(<Login />);
      const voltarButton = screen.getByRole("button", { name: /Voltar/i });

      fireEvent.click(voltarButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("External Links", () => {
    it("renders UK Marketing Digital link with correct attributes", () => {
      renderWithProviders(<Login />);
      const link = screen.getByRole("link", { name: /UK Marketing Digital/i });

      expect(link).toHaveAttribute("href", "https://ukmarketingdigital.com.br");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Accessibility", () => {
    it("has proper labels for form inputs", () => {
      renderWithProviders(<Login />);

      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    });

    it("has proper autocomplete attributes", () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /Senha/i
      ) as HTMLInputElement;

      expect(emailInput.autocomplete).toBe("email");
      expect(passwordInput.autocomplete).toBe("current-password");
    });

    it("disables form inputs during loading", async () => {
      renderWithProviders(<Login />);
      const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /Senha/i
      ) as HTMLInputElement;
      const loginButton = screen.getByRole("button", { name: /^Login$/i });

      fireEvent.change(emailInput, {
        target: { value: "udsonwiter@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(loginButton);

      expect(emailInput.disabled).toBe(true);
      expect(passwordInput.disabled).toBe(true);

      await waitFor(
        () => {
          expect(mockNavigate).toHaveBeenCalledWith("/");
        },
        { timeout: 2000 }
      );
    });
  });
});
