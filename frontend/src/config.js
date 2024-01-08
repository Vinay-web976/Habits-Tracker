export const menuItems = [
  {
    href: "/",
    name: "Home",
    isActive: true,
  },
  {
    href: "/habits",
    name: "Habits",
    isActive: false,
  },
  {
    href: "/entry",
    name: "Entry",
    isActive: false,
  },
];

export const apiBaseUrl = "http://localhost:5555/";

export const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
