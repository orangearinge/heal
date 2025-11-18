# Heal - Your Personal Health Companion

This is a Next.js project for Heal, a web application designed to help you track and understand your health data. It integrates with various wearables and uses AI to provide insights into your well-being.

## ✨ Features

*   **Wearable Integration:** Sync your data from Apple Watch, Garmin, Oura, and Whoop.
*   **AI-Powered Chat:** Ask questions about your health data and get personalized insights.
*   **Data Visualization:** Interactive charts and graphs to visualize your health trends.
*   **User Authentication:** Secure user accounts with Clerk.
*   **Light & Dark Mode:** Switch between light and dark themes.

## 🚀 Getting Started

First, install the dependencies using Bun:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Built With

*   [Next.js](https://nextjs.org/) - React framework for production.
*   [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for robust applications.
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
*   [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
*   [Clerk](https://clerk.com/) - User authentication and management.
*   [Google AI SDK](https://ai.google.dev/docs) - For integrating AI features.
*   [Zustand](https://github.com/pmndrs/zustand) - Small, fast and scalable bearbones state-management for React.
*   [React Flow](https://reactflow.dev/) - For creating node-based UIs.

## 📁 Project Structure

```
/
├── app/                # Next.js App Router pages and layouts
│   ├── (app)/          # Main application routes (e.g., chat, settings)
│   ├── (landing)/      # Landing page routes
│   ├── api/            # API routes
│   └── onboarding/     # Onboarding flow
├── components/         # Shared React components
│   ├── ai-elements/    # Components for the AI chat interface
│   ├── landing/        # Components for the landing page
│   ├── layout/         # Layout components (sidebar, header, etc.)
│   └── ui/             # Generic UI components (buttons, cards, etc.)
├── config/             # Project configuration files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── public/             # Static assets (images, fonts, etc.)
└── ...
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

