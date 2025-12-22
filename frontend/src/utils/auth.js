export function isAuthenticated() {
  const token = localStorage.getItem("TOKEN");
  return !!token;
}

export function logout() {
  localStorage.removeItem("TOKEN");
}
