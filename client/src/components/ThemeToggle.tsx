import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ThemeToggle — Botão de alternância entre tema claro e escuro.
 * Ícone de sol/lua com transição suave.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable || !toggleTheme) return null;

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 hover:bg-[#B87333]/10 focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 ${className}`}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
    >
      <div className="relative w-5 h-5">
        {/* Sol - visível no dark mode */}
        <Sun
          className={`absolute inset-0 w-5 h-5 text-[#B87333] transition-all duration-300 ${
            theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
          }`}
        />
        {/* Lua - visível no light mode */}
        <Moon
          className={`absolute inset-0 w-5 h-5 text-[#1C3D5A] transition-all duration-300 ${
            theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
}
