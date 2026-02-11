import { saveSession, getSession, clearSession } from "./session.js";

export function login() {
  // TEMP redirect (real OAuth endpoint in Phase 2.5)
  window.location.href = "/pages/auth-callback.html?user=demo&role=pilot";
}

export function logout() {
  clearSession();
  window.location.href = "/pages/index.html";
}

export function isLoggedIn() {
  return !!getSession();
}

export function getUser() {
  return getSession();
}
