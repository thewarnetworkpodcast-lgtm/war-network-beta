export function getCurrentUser() {
  if (typeof window === "undefined") return "guest";

  let user = localStorage.getItem("war-user");

  if (!user) {
    user = "user_" + Math.random().toString(36).substring(2, 8);
    localStorage.setItem("war-user", user);
  }

  return user;
}