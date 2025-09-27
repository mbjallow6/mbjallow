# **Personal Portfolio & Blog of Momodou B Jallow**

This repository contains the source code for my personal portfolio, a modern, high-performance website built to showcase my work in software engineering, machine learning, and digital health.

The site is built on a fast, secure, and cost-effective Jamstack architecture, leveraging a Git-based workflow for seamless content management and automated deployments.

---

### **About Me**

I am a technology professional specializing in full-stack development, machine learning, and digital health innovation. Currently pursuing an MS in Digital Transformation at Fachhochschule Dortmund, I combine a background in public health with advanced computer science skills.

My work spans cardiovascular risk assessment tools, IoT healthcare solutions, and blockchain-based patient data management systems. Notable achievements include developing an integrated web platform for HNR CAC progression prediction and founding TheMegatech, a digital solutions company for startups and small businesses.

**Key Qualifications:**

* MS in Digital Transformation (in progress)  
* MS in Business Studies  
* BEng in Computer Science and Technology  
* Various professional certifications in AI, data analysis, and project management

---

### **Core Technologies & Architecture**

This portfolio is built with a focus on performance, security, and maintainability, using a serverless architecture that costs virtually nothing to operate.

| Component | Technology | Purpose |
| :---- | :---- | :---- |
| **Framework** | [Astro](https://astro.build/) | A modern static site generator for building fast, content-focused websites. |
| **Content Management** | (https://decapcms.org/) | A Git-based headless CMS that provides a clean UI for managing content. |
| **Hosting & CI/CD** | [Netlify](https://www.netlify.com/) | Handles automated builds, global CDN deployment, and CMS authentication. |
| **DNS & Security** | [Cloudflare](https://www.cloudflare.com/) | Manages DNS and provides an extra layer of security and performance. |
| **Project Showcase** | ([https://streamlit.io/](https://streamlit.io/)) | Interactive data science projects are built as Python apps and embedded. |

---

### **Daily Development Workflow (For Author)**

This project is designed for a simple and efficient workflow. The custom dev.sh script handles Git operations to prevent common errors.

#### **To Start Developing (Code Changes)**

1. Sync & Start: Open your terminal and run the start command. This will pull the latest content from the CMS and then start the local development server.bash  
   ./dev.sh start  
2. **Code:** Make changes to the Astro components, layouts, or styles. The local server at http://localhost:4321 will hot-reload to show your changes instantly.  
3. **Save Your Work:** When you're done, use the save command with a descriptive commit message. This script will stage, commit, and push your changes to GitHub, triggering a new deployment on Netlify.

./dev.sh save "feat: updated the project page layout"  
\`\`\`

#### **To Add or Edit Content (Blog/Projects)**

This is the primary, code-free workflow for content.

1. **Access the CMS:** Navigate to [**https://mbjallow.com/admin/**](https://www.google.com/search?q=https://mbjallow.com/admin/).  
2. **Log In:** Use the email and password you configured with Netlify Identity.  
3. **Create or Edit:** Select the "Blog" or "Projects" collection, make your changes, and click **"Publish"**.  
4. **Done:** Netlify will automatically detect the change in the GitHub repository, rebuild the site, and deploy the new content within minutes.

---

### **Getting Started (For Others Forking This Repo)**

If you'd like to use this portfolio as a template, follow these steps to get it running.

#### **Prerequisites**

* **Node.js:** Version 18.x or higher.  
* **Git:** For version control.  
* **Accounts:** Free accounts on [GitHub](https://github.com/), [Netlify](https://netlify.com/), and(https://streamlit.io/cloud).

#### **1\. Local Setup**

First, clone the repository and install the necessary dependencies.

Bash

\# Clone your forked repository  
git clone \[https://github.com/YOUR\_USERNAME/mbjallow-portfolio.git\](https://github.com/YOUR\_USERNAME/mbjallow-portfolio.git)

\# Navigate into the project directory  
cd mbjallow-portfolio

\# Install dependencies  
npm install

\# Start the local development server  
npm run dev

Your site is now running locally at http://localhost:4321.

#### **2\. Deployment & CMS Configuration**

To enable the live content management system, you need to deploy the site to Netlify.

1. **Push to GitHub:** Create a new repository on your GitHub account and push the cloned project to it.  
2. **Deploy to Netlify:**  
   * Log in to Netlify and select "Add new site" \> "Import an existing project".  
   * Connect to your Git provider and select your portfolio repository.  
   * Netlify will auto-detect the settings:  
     * **Build command:** npm run build  
     * **Publish directory:** dist  
   * Click "Deploy site".  
3. **Enable Netlify Identity for CMS Login:**  
   * In your new Netlify site's dashboard, go to **Site configuration \> Identity**.  
   * Click **Enable Identity**.  
   * Under **Registration**, set the preference to **Invite only** for security.  
   * Scroll down to **Services** and click **Enable Git Gateway**. This allows Netlify to commit content changes to your repository on your behalf.  
4. **Invite Yourself:**  
   * Go to the **Identity** tab and invite yourself as a user via email.  
   * Accept the invitation from your email to set a password for the CMS.  
5. **Update CMS Config:**  
   * In your code, open public/admin/config.yml.  
   * Ensure the repo field under backend points to your own GitHub repository (e.g., repo: YOUR\_USERNAME/YOUR\_REPO\_NAME).  
   * Commit and push this change.

You can now access your live CMS at https://your-site-name.netlify.app/admin/.

---

### **Project Structure Highlights**

.  
├── public/  
│   └── admin/  
│       ├── config.yml  \# Decap CMS configuration file  
│       └── index.html  \# Loads the CMS application  
├── src/  
│   ├── content/  
│   │   ├── blog/       \# Markdown files for blog posts  
│   │   └── projects/   \# Markdown files for project descriptions  
│   ├── layouts/        \# Main site layouts (e.g., page, post)  
│   └── pages/          \# Astro files that create the site's pages and routes  
├── astro.config.mjs    \# Astro main configuration file  
└── dev.sh              \# Helper script for local development workflow

---

### **Credits and License**

* **Theme:** This portfolio is based on the (https://github.com/stelcodes/multiterm) by Stel Clementine.  
* **License:** This repository is licensed under the **MIT License**. See the LICENSE file for details.

### **Contact**

* **Website:** [mbjallow.com](https://mbjallow.com)  
* **Email:** luka@mbjallow.com  
* **LinkedIn:** [linkedin.com/in/mbjallow6](https://www.google.com/search?q=https://linkedin.com/in/mbjallow6)  
* **GitHub:** [github.com/mbjallow6](https://www.google.com/search?q=https://github.com/mbjallow6)