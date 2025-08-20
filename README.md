# AugmentShell Website

This is the official website for AugmentShell, built with the Next.js App Router, TypeScript, and Tailwind CSS. It connects to Supabase for backend services and is deployed on Vercel.

---

## ✨ Tech Stack

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

---

## 🚀 Getting Started: Local Development Setup

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (v20.x or higher is recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   [Git](https://git-scm.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:AugmentShell/website.git
    cd website
    ```

2.  **Navigate to the application directory:**
    > **⚠️ Important:** The Next.js project is located in the `app/` sub-directory. All subsequent commands must be run from inside this folder.
    ```bash
    cd app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up your environment variables:**
    *   First, copy the example environment file to create your local version:
        ```bash
        cp env.example .env.local
        ```
    *   Next, log in to the [Supabase Dashboard](https://supabase.com/).
    *   Navigate to the **`FrontEnd-Dev`** project (this is our shared development database).
    *   Go to **Project Settings** > **API**.
    *   Find your **Project URL** and the `public` **anon Key**.
    *   Open the `.env.local` file you just created and paste these values in. It should look like this:
        ```env
        # Supabase Keys
        NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project-url.supabase.co
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You are now ready to start developing! The page will auto-update as you edit the files.

---

## 🛠️ Available Scripts

From within the `app/` directory, you can run the following commands:

| Command         | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `npm run dev`   | Starts the development server on `localhost:3000`.                             |
| `npm run build` | Creates an optimized production build of the application.                      |
| `npm run start` | Starts a production server (requires a build to be run first).                 |
| `npm run lint`  | Runs ESLint to check for code quality and potential errors.                    |
| `npm run format`  | Runs Prettier to automatically format all code files.                        |

**Note:** This project uses **Husky** to power pre-commit hooks. ESLint and Prettier will be run automatically on all staged files before every commit, ensuring code quality and a consistent style across the entire codebase.

---

## ☁️ Deployment & Environments

This project is deployed on **Vercel**. The deployment process is fully automated based on our Git branching strategy.

*   **Production:** (`main` branch)
    *   Any code merged into `main` is automatically deployed to our live domains.
    *   This environment connects to the **production Supabase project**.

*   **Staging / Preview:** (`pre-prod` branch and all other branches)
    *   Pushing to `pre-prod` or any other feature branch generates a unique Preview Deployment URL on Vercel.
    *   All preview deployments connect to the **`FrontEnd-Dev` Supabase project**, providing a safe sandbox for testing.
