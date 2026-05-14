const fs = require('fs');

let css = fs.readFileSync('assets/css/main.css', 'utf8');

// Define new variables block
const darkThemeVars = `
.portfolio-modern {
  --bg-primary: #0b0f19;
  --bg-secondary: #09111f;
  --card-bg: #111827;
  --text-primary: #f8fafc;
  --text-secondary: #d9e2f2;
  --accent: #149ddd;
  --accent-dark: #0d7cb5;
  --border-color: rgba(255, 255, 255, 0.1);
  --glow-primary: rgba(20, 157, 221, 0.12);
  --glow-secondary: rgba(56, 189, 248, 0.12);
  --glow-strong: rgba(56, 189, 248, 0.28);
  --contrast-color: #ffffff;
  
  color: var(--text-secondary);
  background:
    radial-gradient(circle at top right, var(--glow-primary), transparent 28%),
    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
}

.portfolio-modern.light-theme {
  --bg-primary: #f4f7f9;
  --bg-secondary: #eef2f6;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --accent: #2563eb; /* elegant blue */
  --accent-dark: #1d4ed8;
  --border-color: rgba(0, 0, 0, 0.08);
  --glow-primary: rgba(37, 99, 235, 0.05);
  --glow-secondary: rgba(59, 130, 246, 0.05);
  --glow-strong: rgba(59, 130, 246, 0.15);
  --contrast-color: #ffffff;
}

.portfolio-modern, .portfolio-modern * {
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
`;

// Replace the old .portfolio-modern definition
css = css.replace(/\.portfolio-modern \{\s*--background-color: #0b0f19;[\s\S]*?overflow-x: hidden;\s*\}/, darkThemeVars.trim());

// Replacements
css = css.replace(/#0b0f19/g, 'var(--bg-primary)');
css = css.replace(/#09111f/g, 'var(--bg-secondary)');
css = css.replace(/#111827/g, 'var(--card-bg)');
css = css.replace(/#149ddd/g, 'var(--accent)');
css = css.replace(/#0d7cb5/g, 'var(--accent-dark)');
css = css.replace(/#d9e2f2/g, 'var(--text-secondary)');
css = css.replace(/#f8fafc/g, 'var(--text-primary)');
css = css.replace(/rgba\(20, 157, 221, 0\.12\)/g, 'var(--glow-primary)');
css = css.replace(/rgba\(56, 189, 248, 0\.12\)/g, 'var(--glow-secondary)');
css = css.replace(/rgba\(56, 189, 248, 0\.28\)/g, 'var(--glow-strong)');
css = css.replace(/rgba\(255, 255, 255, 0\.1\)/g, 'var(--border-color)');
css = css.replace(/rgba\(255, 255, 255, 0\.05\)/g, 'var(--border-color)');

fs.writeFileSync('assets/css/main.css', css);
console.log('CSS refactored successfully.');