# 💻 Amit Raj — Software Developer Portfolio Website

A modern, high-performance developer portfolio website built with pure HTML5, CSS3, and modern JavaScript. Designed specifically for **Amit Raj**, an 18-year-old B.Tech Computer Science and Engineering (Core) student at **JECRC University**, passionate tech enthusiast, and aspiring **Software Developer**.

---

## 🌟 Highlights & Features

- **⚡ Cyber-Modern Developer Aesthetic**: Dark mode glassmorphism, neon cyan & electric purple glows, and clean typography.
- **✨ Interactive Constellation Background**: Real-time HTML5 Canvas particle mesh that reacts dynamically to mouse movement.
- **⌨️ Dynamic Typing Hero**: Cycles through roles highlighting B.Tech CSE Core at JECRC University, software engineering passions, and hobbies.
- **🎮 Playable Dev Arcade Mini-Game ("Bug Hunter & Code Runner")**:
  - Full playable HTML5 Canvas game right inside your portfolio!
  - Pilot your developer craft, eliminate software bugs, dodge runtime crashes, and collect clean-code cores.
  - Controls: `Arrow keys` / `A` & `D` to steer, `Spacebar` to fire code lasers (with responsive touch controls for mobile).
  - High score tracking saved locally in your browser!
- **🔊 Web Audio API Retro Sound Synthesizer**: Custom synthesized sound effects (lasers, score chimes, explosion tones, button feedback) with an instant mute/unmute toggle in the navbar.
- **🎴 3D Interactive Code Window**: Interactive tilt physics that follow your cursor in 3D perspective.
- **🏏 Hobbies & Interests Showcase**:
  - **Playing Cricket**: Tactical thinking, teamwork, stamina, and composure under pressure.
  - **Watching Movies**: Visual storytelling, cinematic world-building, narrative analysis, and creative inspiration.
  - **Tech Exploring & Programming**: Open-source experimentation, rapid prototyping, and algorithmic problem solving.
- **📫 Direct Contact Section**:
  - Direct 1-click email copy button with tooltip.
  - Quick action button to open **Gmail directly in browser** with recipient `rajamit802212@gmail.com`.
  - Interactive contact form that pre-formats your subject, name, and message into an email ready to send.
- **📱 100% Mobile Responsive**: Seamlessly adapts to mobile phones, tablets, laptops, and ultra-wide screens.
- **🚀 GitHub Pages Ready**: Zero build tools, dependencies, or bundlers required. Upload directly to GitHub to get a live URL in minutes!

---

## 📂 Project Structure

```text
portfolio/
├── index.html        # Main HTML structure and content
├── style.css         # Modern styling, animations, responsive design system
├── script.js         # Canvas particles, typewriter, arcade game, 3D tilt & audio logic
├── .nojekyll         # Tells GitHub Pages not to process files through Jekyll
└── README.md         # Documentation & step-by-step GitHub deployment guide
```

---

## 🚀 How to Upload & Host on GitHub Pages (Step-by-Step)

You can publish this portfolio for free with a live URL (e.g., `https://<your-username>.github.io` or `https://<your-username>.github.io/portfolio`) using **GitHub Pages**!

### Method 1: Using the GitHub Website (Easiest & Fastest — No Git Needed)

1. **Log in to GitHub**:
   - Go to [GitHub.com](https://github.com) and log in to your account.
2. **Create a New Repository**:
   - Click the **`+`** icon in the top right corner and select **New repository**.
   - Name your repository (for example: `portfolio` or `amit-raj-portfolio`).
     > *Pro Tip: If you name your repository `<your-username>.github.io` (replace `<your-username>` with your actual GitHub username), your website URL will simply be `https://<your-username>.github.io`!*
   - Set the repository to **Public**.
   - Do **NOT** check "Add a README file" (we already have one in this folder).
   - Click **Create repository**.
3. **Upload the Files**:
   - On the quick setup page, click the link that says **"uploading an existing file"**.
   - Select and drag all the files from your `portfolio` folder:
     - `index.html`
     - `style.css`
     - `script.js`
     - `README.md`
     - `.nojekyll`
   - In the "Commit changes" box at the bottom, enter a message like `Initial commit: Amit Raj Portfolio`.
   - Click **Commit changes**.
4. **Enable GitHub Pages**:
   - In your GitHub repository, click on **Settings** (tab at the top right).
   - In the left sidebar, click on **Pages** (under "Code and automation").
   - Under **Build and deployment > Branch**:
     - Select branch: **`main`** (or `master`).
     - Select folder: **`/(root)`**.
     - Click **Save**.
5. **Visit Your Live Website**:
   - Wait 1 to 2 minutes for GitHub to build the page.
   - Refresh the **Pages** settings tab.
   - You will see a banner: *"Your site is live at `https://<your-username>.github.io/portfolio/`"*.
   - Click the link to open your live portfolio! 🎉

---

### Method 2: Using Git in Terminal / Command Prompt

If you have Git installed on your computer:

```bash
# 1. Open your terminal in this folder
cd "c:\Users\HP\OneDrive\Desktop\portfolio"

# 2. Initialize a local git repository
git init

# 3. Add all files to staging
git add .

# 4. Commit the files
git commit -m "Launch Amit Raj Portfolio Website"

# 5. Rename primary branch to main
git branch -M main

# 6. Add your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

# 7. Push to GitHub
git push -u origin main
```

Then go to **Settings > Pages > Branch: `main` > Save** on GitHub.

---

## 🛠️ How to Customize Further

- **Add Social Links**: In [index.html](index.html), search for `github.com` and `linkedin.com` to insert your exact LinkedIn and GitHub profile URLs.
- **Add More Projects**: In [index.html](index.html), locate the `<section class="section projects-section" id="projects">` and duplicate any `.project-card` block to add your new projects.
- **Update Skills**: In [index.html](index.html), locate `#skills` to adjust language proficiencies and add new frameworks as you learn them.

---

## 📬 Contact Information

- **Name**: Amit Raj
- **Age**: 18 Years
- **Education**: B.Tech Computer Science & Engineering (Core), JECRC University
- **Gmail**: [rajamit802212@gmail.com](mailto:rajamit802212@gmail.com)
- **Role**: Aspiring Software Developer & Tech Enthusiast
- **Hobbies**: Playing Cricket 🏏 & Watching Movies 🎬
