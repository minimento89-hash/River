import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleUp: {
          from: { transform: "scale(0.9)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        rotateIn: {
          from: { transform: "rotate(-5deg) scale(0.9)", opacity: "0" },
          to: { transform: "rotate(0deg) scale(1)", opacity: "1" },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        zoomIn: {
          from: { transform: "scale(0.5)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        bounceIn: {
          "0%, 20%, 40%, 60%, 80%, to": {
            "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
          },
          "0%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
          "20%": { transform: "scale3d(1.1, 1.1, 1.1)" },
          "40%": { transform: "scale3d(0.9, 0.9, 0.9)" },
          "60%": { opacity: "1", transform: "scale3d(1.03, 1.03, 1.03)" },
          "80%": { transform: "scale3d(0.97, 0.97, 0.97)" },
          to: { opacity: "1", transform: "scale3d(1, 1, 1)" },
        },
        flipIn: {
          from: {
            transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
          "40%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
            "animation-timing-function": "ease-in",
          },
          "60%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)",
            opacity: "1",
          },
          "80%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)",
          },
          to: {
            transform: "perspective(400px)",
          },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        scaleDown: {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.9)", opacity: "0" },
        },
        slideOutRight: {
          from: { transform: "translateX(0)", opacity: "1" },
          to: { transform: "translateX(100%)", opacity: "0" },
        },
        slideOutLeft: {
          from: { transform: "translateX(0)", opacity: "1" },
          to: { transform: "translateX(-100%)", opacity: "0" },
        },
        zoomOut: {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.5)", opacity: "0" },
        },
        bounceOut: {
          "20%": { transform: "scale3d(0.9, 0.9, 0.9)" },
          "50%, 55%": { opacity: "1", transform: "scale3d(1.1, 1.1, 1.1)" },
          to: { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
        },
        flipOut: {
          from: {
            transform: "perspective(400px)",
            opacity: "1",
          },
          "30%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
            opacity: "1",
          },
          to: {
            transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn calc(0.5s * var(--animation-speed-factor)) ease-out",
        "scale-up": "scaleUp calc(0.5s * var(--animation-speed-factor)) ease-out",
        "rotate-in": "rotateIn calc(0.5s * var(--animation-speed-factor)) ease-out",
        "slide-in-left": "slideInLeft calc(0.5s * var(--animation-speed-factor)) ease-out",
        "slide-in-right": "slideInRight calc(0.5s * var(--animation-speed-factor)) ease-out",
        "zoom-in": "zoomIn calc(0.5s * var(--animation-speed-factor)) ease-out",
        "bounce-in": "bounceIn calc(0.7s * var(--animation-speed-factor)) ease-out",
        "flip-in": "flipIn calc(0.6s * var(--animation-speed-factor)) ease-out",
        "fade-out": "fadeOut calc(0.5s * var(--animation-speed-factor)) ease-out forwards",
        "scale-down": "scaleDown calc(0.5s * var(--animation-speed-factor)) ease-out forwards",
        "slide-out-right": "slideOutRight calc(0.5s * var(--animation-speed-factor)) ease-out forwards",
        "slide-out-left": "slideOutLeft calc(0.5s * var(--animation-speed-factor)) ease-out forwards",
        "zoom-out": "zoomOut calc(0.5s * var(--animation-speed-factor)) ease-out forwards",
        "bounce-out": "bounceOut calc(0.7s * var(--animation-speed-factor)) ease-out forwards",
        "flip-out": "flipOut calc(0.6s * var(--animation-speed-factor)) ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;