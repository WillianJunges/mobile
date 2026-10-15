<div align="center">

<img src="assets/icon.png" alt="Task List icon" width="100" />

# Task List Mobile

**A simple and clean to-do list app with local persistence, built with React Native and Expo.**

![Expo](https://img.shields.io/badge/Expo-SDK_57-0d1117?style=for-the-badge&logo=expo&logoColor=22C55E)
![React Native](https://img.shields.io/badge/React_Native-0.86-0d1117?style=for-the-badge&logo=react&logoColor=22C55E)
![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=22C55E)
![NativeWind](https://img.shields.io/badge/NativeWind-0d1117?style=for-the-badge&logo=tailwindcss&logoColor=22C55E)
![SQLite](https://img.shields.io/badge/SQLite-0d1117?style=for-the-badge&logo=sqlite&logoColor=22C55E)
![Status](https://img.shields.io/badge/status-in_progress-0d1117?style=for-the-badge&logoColor=22C55E)

</div>

---

## 📖 About

Task List Mobile is a to-do app being developed step by step throughout the semester in the **Mobile Development** course
of the Systems Analysis and Development program at **FATEC**. Each new class adds a feature, so the project keeps growing.

## ✨ Features

- ➕ **Create and edit tasks** — title (required) and optional description, using the same form screen
- ✅ **Mark as done** — toggle a task between pending and completed with a tap
- 🔍 **Filters** — switch between **all**, **pending** and **completed**, with a counter for each one
- 🗑️ **Delete with confirmation** — avoids removing a task by accident
- 💾 **Local persistence** — tasks are saved in SQLite and survive closing the app
- 🌗 **Dark mode** — theme toggle with the chosen theme saved
- 🫙 **Empty states** — friendly messages when a list or filter has no tasks

## 🛠️ Tech Stack

| Purpose | Technology |
|---|---|
| Framework | Expo SDK 57 · React Native 0.86 · TypeScript |
| Navigation | Expo Router (stack, with route params for editing) |
| Styling | NativeWind 4 (Tailwind CSS for React Native) |
| Database | `expo-sqlite` with the Repository Pattern |

## 🧱 Architecture

```
Screens (app/)  →  Hook (useTasks)  →  Repository (taskRepository)  →  SQLite (database)
```

Screens never write SQL: they use the `useTasks` hook, which calls the repository, which talks to the database.
All queries use `?` placeholders (no string concatenation).

## 📁 Project Structure

```
app/
├── _layout.tsx              # stack navigation + theme setup
├── index.tsx                # task list with filters
└── form.tsx                 # create (/form) and edit (/form?id=3) screen
src/
├── components/              # EmptyState, FilterBar, TaskItem, ThemeToggle
├── database/
│   ├── database.ts          # connection (singleton) and migrations
│   └── taskRepository.ts    # CRUD functions
├── hooks/useTasks.ts        # loads tasks, filters and actions
└── types/task.ts            # Task, TaskFilter and input types
```

## 🚀 Getting Started

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone.

## 🗺️ Roadmap

This project is updated as the course goes on — new features will be added during the semester.

## 📜 License

[MIT](LICENSE) © Willian Thiago Junges

---

<div align="center">

Made by [Willian Thiago Junges](https://github.com/WillianJunges) 🟢

</div>
