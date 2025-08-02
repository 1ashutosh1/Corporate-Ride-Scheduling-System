# 🚗 Corporate Ride Scheduling System – Frontend

A cross-platform mobile app for iOS, Android, and Web, built with **Expo + React Native**. This app enables users to register, login, book rides, view and cancel their rides, while admins can approve/reject rides, filter and analyze ride data, and manage their profile—all from a responsive, role-aware drawer menu.

---

## ✨ Features

### 🔐 Authentication & Profiles

- Secure sign up and login with JWT authentication
- Role-based access: customer and admin flows
- Profile management: view name & email, update display name, change password, logout

### 🚕 Ride Booking & Management

- Book a ride: select pickup & dropoff, choose date/time via native picker
- View your rides: status badges (Pending, Approved, Cancelled)
- Cancel any pending ride

### 🛠 Admin Dashboard

- Approve or reject rides in one tap
- Filter rides by status, user, or date-range via dropdowns and date pickers
- Ride analytics: totals, status breakdown, rides per day (with charts)

### 🗺 Navigation

- Role-aware drawer menu for intuitive navigation
- Conditional screens: admin features only for admins

### 📲 UI & Experience

- Responsive design for mobile and web
- Toast notifications for feedback
- Calendar icon and prompt for date selection
- Modern, clean UI with improved date picker styling

---

## 🛠 Tech Stack

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Framework     | Expo (React Native)                |
| UI & Layout   | React Navigation (Stack + Drawer)  |
| State & Auth  | Context API + AsyncStorage + JWT   |
| Networking    | Axios (with token interceptor)     |
| UI Components | React Native core + Vector Icons   |
| Date/Time     | react-native-modal-datetime-picker |
| Dropdown      | react-native-dropdown-picker       |
| Toasts        | react-native-toast-message         |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ v16
- **Expo CLI**: `npm install -g expo-cli`
- **Yarn** or **npm**

### Installation & Run

```bash
# Clone repo & move to frontend
git clone https://github.com/1ashutosh1/Corporate-Ride-Scheduling-System.git
cd Corporate-Ride-Scheduling-System/frontend

# Install dependencies
npm install      # or yarn install

# Copy .env.example → .env and set:
EXPO_PUBLIC_API_BASE_URL=https://corporate-ride-scheduling-system-backend.onrender.com
# or for local development
# EXPO_PUBLIC_API_BASE_URL=http://<your system ip>:<port_number>

# Start in development (native)
npm start

```

---

## 🔧 Folder Structure

```bash
frontend/
  app.json
  eas.json
  index.js
  package.json
  README.md
  assets/
    adaptive-icon.png
    bike-riding.png
    favicon.png
    icon.png
    splash-icon.png
  src/
    App.js
    api/
      index.js
    context/
      AuthContext.js
    navigation/
      AppNavigator.js
      DrawerNavigation.js
    screens/
      AdminDashboardScreen.js
      AnalyticsScreen.js
      BookRideScreen.js
      LoginScreen.js
      MyProfileScreen.js
      MyRidesScreen.js
      SignupScreen.js
    utils/
      Validation.js
```

---

## ✅ Scope for Improvement

| Area                 | Suggestion                                              |
| -------------------- | ------------------------------------------------------- |
| UI polish            | Add animations (Framer Motion), improved theming        |
| Form validation      | Integrate Formik + Yup for richer input validation      |
| Offline support      | Cache rides locally, queue actions when offline         |
| Push notifications   | Real-time updates using Expo Notifications              |
| Graphing             | Replace daily stats list with dynamic charts (Recharts) |

---

## 🤝 Contribution

Contributions are welcome! If you find a bug or have an idea to improve this app, feel free to fork the repo, open a pull request, or raise an issue 🚀

---

## 👨‍💻 Author

Made with ❤️ by [Ashutosh Tripathi](https://github.com/1ashutosh1)

---

## 📄 License

This project is licensed under the MIT License.
