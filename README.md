# Learn Lingo🌍

**Learn Lingo** is a web application for a company that provides online foreign language tutoring services.  
The project allows users to browse a list of teachers, filter them by various criteria, add them to favorites, and interact with the service after authentication.

The application is implemented according to the technical requirements and design mockup, using a modern React-based technology stack.

---

## 🔗 Main Pages

### 🏠 Home
- Information about the company’s advantages
- Call to action to start using the service
- Navigation to the Teachers page

### 👩‍🏫 Teachers
- List of teachers (pagination — 4 cards per load)
- Filtering by:
  - teaching language
  - students’ knowledge level
  - price per hour
- Detailed teacher card (Read more)
- Adding teachers to favorites
- Booking a trial lesson via a modal window

### ❤️ Favorites (private page)
- Available only to authenticated users
- Contains a list of teachers added to favorites
- Styling is consistent with the Teachers page

---

## 🔐 Authentication & Firebase Integration

- User registration, login, and logout implemented
- Fetching and storing current user data
- **Firebase Authentication** is used
- User data (favorites) is stored in **Firestore** and linked to `user.uid`
- User state is synchronized using `onAuthStateChanged`

---

## 🧩 Project Structure

```text
src/
│
├── components/        # Повторно використовувані UI-компоненти
│   ├── Header/
│   ├── TeacherCard/
│   ├── Modal/
│   ├── Loader/
│   └── Forms/
│
├── pages/             # Сторінки застосунку
│   ├── Home/
│   ├── Teachers/
│   └── Favorites/
│
├── store/             # Zustand стори
│   ├── authStore.ts
│   ├── useFavoritesStore.ts
│   ├── teachersStore.ts
│   └── modalStore.ts
│
├── firebase/          # Налаштування Firebase
│   └── firebase.ts
│
├── type/              # TypeScript типи
│   └── teacher.ts
│
├── hooks/             # Кастомні хуки
│
├── styles/            # Глобальні стилі
│
├── App.tsx            # Головний компонент
├── main.tsx           # Точка входу
└── router.tsx         # Маршрутизація
```
## Technologies and Libraries

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM v7

### State Management
- Zustand  
  - auth store  
  - favorites store  
  - teachers store  
  - modal store  

### Backend / Database
- Firebase Authentication
- Firebase Firestore
- Firebase Realtime Database

### Forms and Validation
- react-hook-form
- yup
- @hookform/resolvers

### UI / UX
- react-icons
- react-select
- react-hot-toast
- normalize.css

### Tools
- ESLint
- Prettier
- TypeScript ESLint
- GitHub Pages / Netlify

## Features
- User authentication
- Private routes
- Add / remove teachers from favorites
- Persisted state after page reload
- Teachers filtering
- Pagination (Load more)
- Modal windows with closing via:
  - close button
  - backdrop click
  - Esc key

## Layout and Requirements
- Semantic and valid markup
- No console errors
- Full interactivity
- User actions persistence

## 🎨 Design & Requirements

- Developed according to the provided **Figma design** and **technical specification**
- Semantic and valid markup
- No console errors
- Fully interactive UI
- User actions are persisted across sessions

**Figma Design:** [View Mockup](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)  

**Technical Specification:** [View TЗ Document](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)


## Deployment
- The project is deployed and available online  
- Deployment link is available in the repository profile

## Author
ArtemNyow(Artem Lykhatskyi)
Educational project built with React and Firebase
