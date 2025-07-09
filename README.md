---

# Submodules Interactive Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/JavaScript-97.6%25-yellow.svg)](https://developer.mozilla.org/docs/Web/JavaScript)

> **This repository was created for my team to better understand how to work with Git submodules.**

---

## 🌟 Overview

Managing Git submodules can be tricky, especially for teams new to the concept. This interactive tutorial provides hands-on examples and practical guidance to help you confidently add, update, and remove submodules in your projects.

---

## 📚 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Examples](#examples)
- [Tips & Tricks](#tips--tricks)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Step-by-step instructions** for common submodule tasks
- Interactive code examples (JavaScript, HTML, CSS)
- Real-world scenarios and best practices
- Clean, easy-to-follow structure

---

## 🚀 Getting Started

1. **Clone this repository**
   ```sh
   git clone https://github.com/vs-yob/submodules-interactive-tutorial.git
   cd submodules-interactive-tutorial
   ```

2. **Install dependencies** (if applicable)
   ```sh
   npm install
   ```

3. **Open the tutorial**
   - Open `index.html` in your browser, or
   - Run a local server:
     ```sh
     npx serve .
     ```

---

## 🛠 Usage Guide

### Add a Submodule

```sh
git submodule add <repository-url> path/to/submodule
git submodule update --init --recursive
```

### Update a Submodule

```sh
cd path/to/submodule
git checkout main
git pull
cd ../..
git add path/to/submodule
git commit -m "Update submodule"
```

### Remove a Submodule

```sh
git submodule deinit -f path/to/submodule
git rm -f path/to/submodule
rm -rf .git/modules/path/to/submodule
git commit -m "Remove submodule"
```

---

## 📦 Examples

- Adding a utility library as a submodule
- Keeping submodules up-to-date across branches
- Troubleshooting common submodule issues

Find detailed walkthroughs in the [`examples/`](./examples/) directory.

---

## 💡 Tips & Tricks

- Always `git submodule update --init --recursive` after cloning.
- Use descriptive commit messages when updating submodules.
- Regularly check for updates in your submodules.

---

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request with improvements or new examples.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you’d like any section customized or want to add more project-specific details!
