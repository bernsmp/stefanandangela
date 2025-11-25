# Stefan and Angela Leadership Dashboard

A professional, interactive dashboard displaying Cognitive Fingerprint data for Stefan and Angela, plus their Leadership Interface Map.

## Features

- **Leadership Interface Map**: Hero section showcasing how Stefan and Angela work together
- **Individual Fingerprints**: Interactive views for both Stefan and Angela's cognitive fingerprints
- **Comparison View**: Side-by-side comparison highlighting similarities and differences
- **Interactive Elements**: 
  - Search functionality
  - Expandable sections
  - Hover tooltips
  - Smooth animations
  - Responsive design

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add your markdown data files to the `data/` directory:
   - `stefan-fingerprint.md`
   - `angela-fingerprint.md`
   - `leadership-interface-map.md`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dashboard/
├── app/
│   ├── api/data/          # API routes for data loading
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/             # Layout components (Header, Footer)
│   └── ui/                 # Reusable UI components
├── data/                   # Markdown data files
├── lib/                    # Utilities and data parsers
└── public/                 # Static assets
```

## Brand Colors

The dashboard uses Cognitive Fingerprint brand colors:
- Primary gradient: Golden (#fbbf24) to Orange (#f97316)
- Background: White
- Text: Dark gray (#1f2937)

## Deployment

The dashboard is ready for deployment on Vercel:

```bash
npm run build
```

Then deploy to Vercel or your preferred hosting platform.
