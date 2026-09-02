---
name: Zen-Tech Balance
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#434844'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#737873'
  outline-variant: '#c3c8c2'
  surface-tint: '#506356'
  primary: '#4d6054'
  on-primary: '#ffffff'
  primary-container: '#66796c'
  on-primary-container: '#f6fff6'
  inverse-primary: '#b7ccbc'
  secondary: '#51606d'
  on-secondary: '#ffffff'
  secondary-container: '#d4e4f4'
  on-secondary-container: '#576673'
  tertiary: '#0058bc'
  on-tertiary: '#ffffff'
  tertiary-container: '#0070eb'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e8d8'
  primary-fixed-dim: '#b7ccbc'
  on-primary-fixed: '#0d1f15'
  on-primary-fixed-variant: '#384b3f'
  secondary-fixed: '#d4e4f4'
  secondary-fixed-dim: '#b8c8d7'
  on-secondary-fixed: '#0e1d28'
  on-secondary-fixed-variant: '#394955'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#004493'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is built on the philosophy of "Zen-tech"—a harmonious intersection of ancient wellness and modern precision. The target audience includes yoga practitioners seeking technical accuracy without sacrificing the meditative peace of their practice. 

The visual style is **Modern Corporate** with a **Minimalist** soul. It utilizes heavy whitespace to provide mental clarity, while high-tech accents suggest the accuracy of the underlying AI posture-scanning technology. The emotional response should be one of "Trusted Tranquility": the user feels both at peace and confident in the professional, data-driven feedback provided.

## Colors

This design system uses a palette inspired by natural elements and technological precision:

- **Primary (Sage Green):** Used for main actions and brand presence, evoking growth and stability.
- **Secondary (Deep Slate):** Applied to typography and structural elements for a grounded, professional feel.
- **Tertiary (Electric Blue):** Reserved exclusively for "Scan" states, active skeletal overlays, and AI-driven insights to signify high-tech functionality.
- **Neutral (Soft Sand):** The primary background color, providing a warmer, more human alternative to sterile white.

Surface colors should transition from the sand background to pure white for elevated cards to maintain a clean, airy feel.

## Typography

The typography strategy pairs the timeless, authoritative feel of a serif with the functional clarity of a modern sans-serif.

- **Headlines:** Use **Noto Serif** to provide an editorial, sophisticated tone. Use it for page titles, section headers, and important callouts.
- **UI & Body:** Use **Manrope** for its balanced, professional character. It ensures high readability during movement or exercise.
- **Labels:** Small labels and captions should use Manrope with slight tracking (letter spacing) to maintain legibility at small scales.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to evoke a sense of "Breathable Space."

- **Mobile:** A 4-column grid with 20px side margins. Content should be vertically stacked to allow for easy one-handed navigation while holding a yoga pose.
- **Desktop/Tablet:** A 12-column grid. Utilize "Center-focused" layouts for meditative content, and "Asymmetric" layouts for technical dashboards where the camera feed and data insights sit side-by-side.
- **Rhythm:** Use the 8px base unit for all component-level spacing. For section-level spacing, prefer `lg` (48px) and `xl` (80px) to prevent the UI from feeling cluttered.

## Elevation & Depth

This design system utilizes **Ambient Shadows** and **Tonal Layers** to create a soft, non-aggressive hierarchy.

- **Surface Levels:** The base layer is the Soft Sand neutral. Elevated elements like cards use a pure White background.
- **Shadows:** Use extremely diffused shadows with a slight Primary (Sage) tint. Shadows should have a high blur radius (20px+) and low opacity (8-10%) to look like natural light hitting a physical surface.
- **Interaction:** Upon hover or press, elements should not "pop" harshly; instead, they should subtly increase in shadow spread or shift slightly in tonal value, mimicking a soft tactile press.

## Shapes

The shape language is organic and approachable, avoiding sharp edges that might feel aggressive or "un-zen."

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Content sections and main modal cards use "rounded-xl" (1.5rem / 24px) to create a soft, protective frame around the user's data.
- **Icons:** Use a consistent 2px stroke width with rounded caps and joins to match the UI's softness.

## Components

- **Buttons:** Primary buttons use the Sage Green background with white text. Ghost buttons use a subtle Slate border. Avoid heavy gradients.
- **Chips:** Used for yoga difficulty levels (Beginner, Intermediate). Use a low-opacity Sage Green background with dark Slate text.
- **Cards:** White backgrounds with soft ambient shadows. Ensure internal padding is generous (minimum 24px).
- **Input Fields:** Bottom-border only or very light-outlined fields to maintain the minimalist aesthetic. Focus states should use a subtle Electric Blue glow.
- **Scanning Overlay:** For the AI posture correction, use thin Electric Blue lines (1px) with soft glows at joint points. Labels for corrections should be "Floating" with a Backdrop Blur (Glassmorphism) to ensure visibility over the live camera feed.
- **Progress Indicators:** Use circular, organic paths rather than harsh linear bars to track session completion.