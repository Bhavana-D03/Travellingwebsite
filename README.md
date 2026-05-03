# NexBlog 🚀

An ultra-modern, premium blog website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Content is managed effortlessly via **Contentstack Headless CMS** providing a seamless connection between robust backend data handling and beautiful frontend aesthetics.

## ✨ Features

- 🌑 **Premium Dark Theme Aesthetics:** A glassmorphic, deep-dark UI enriched with neon accents, dynamic blur effects, and immersive background gradients. 
- ⚡ **Next.js 15 App Router & React Server Components:** Ensuring bleeding-edge performance, optimized data fetching, and robust SEO capabilities. 
- 📑 **Dynamic Contentstack Integration:** Fully hooked up via the Contentstack Delivery API to render real-time CMS updates.
- 👨‍💻 **Dedicated Authors Pipeline:** A beautifully crafted Authors Directory showcasing writers and aggregating their individual articles into dedicated Author Profile pages.
- 🎨 **Dynamic Tailored UI Animations:** Hand-coded CSS animations providing smooth top-down navbar entrances (`slideDown`), and cascading content staging (`fadeInUp`).
- ✍️ **Rich Text Parsing:** High-quality article content payload injection via `dangerouslySetInnerHTML`, formatted flawlessly traversing Tailwind's `prose` plugins.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla + Global specific keyframes)
- **CMS / Data layer:** Contentstack SDK (`contentstack`)

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### 1. Clone & Install Dependencies
First, clone the project locally and install the necessary dependencies:

```bash
npm install
```

### 2. Configure Environment Variables
Inside `lib/contentstack.ts`, the environment connects to Contentstack delivery tokens. For a production deployment, ensure you create a `.env.local` file at the root of your project containing your specific stack configurations:

```env
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=development
```
*(Note: If you have hardcoded API keys mapped inside the `contentstack.ts` local testing block, you can leave them as is for local development).*

### 3. Run the Development Server
Launch the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ CMS Core Architecture Requirements

This application natively consumes two core Content Types from Contentstack:

### 1. `author` (Content Type)
- **Title / Name:** String (`name`)
- **Bio:** Rich Text or String (`bio`)
- **Profile Image:** File / Image type (`profile_image`)

### 2. `blog` (Content Type)
- **Title:** String (`title`)
- **URL:** String (`url`)
- **Featured Image:** File / Image type (`featured_image`)
- **Published Date:** Date (`published_date`)
- **Content:** Rich Text (`content`)
- **Author:** Reference pointing to the `author` content type (`author`)

---

## 📂 Project Structure

```text
├── app/
│   ├── globals.css                # Global styles, Premium animations & specific prose tuning
│   ├── layout.tsx                 # Root Document configuration
│   ├── page.tsx                   # Homepage (Animated Hero + Real-time Blog Grid)
│   ├── authors/                   # Authors Directory
│   │   ├── page.tsx               # Authors Grid Hub
│   │   └── [uid]/page.tsx         # Dynamic Author detail page (Bio & their specific Posts)
│   └── blog/
│       └── [url]/page.tsx         # Dynamic Article post layout 
├── components/
│   └── Navbar.tsx                 # Responsive, animate-slide down glass navbar
├── lib/
│   └── contentstack.ts            # Contentstack SDK Initialization and stubbing
└── tailwind.config.*              # Tailwinds Config
```
