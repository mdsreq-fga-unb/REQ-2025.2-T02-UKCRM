import * as React from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

const defaultRequirements: PasswordRequirement[] = [
  { label: "8 caracteres", validator: (p) => p.length >= 8 },
  { label: "Letras maiúsculas", validator: (p) => /[A-Z]/.test(p) },
  { label: "Letras minúsculas", validator: (p) => /[a-z]/.test(p) },
  { label: "Números", validator: (p) => /\d/.test(p) },
  { label: "Símbolos (!, @, #, $, etc)", validator: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showRequirements?: boolean;
  requirements?: PasswordRequirement[];
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showRequirements = true, requirements = defaultRequirements, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            ref={ref}
            {...props}
            onChange={handleChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        
        {showRequirements && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {requirements.map((req, index) => {
              const isValid = req.validator(password);
              return (
                <span
                  key={index}
                  className={cn(
                    "flex items-center gap-1 transition-colors",
                    isValid ? "text-primary" : "text-destructive"
                  )}
                >
                  {isValid ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {req.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
