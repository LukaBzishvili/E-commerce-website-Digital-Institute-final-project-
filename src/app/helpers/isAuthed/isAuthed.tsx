import { redirect } from "next/navigation";

export const isAuthedGuard = (isAuthed: boolean) => {
  const windowPath = window.location.pathname;
  if (
    !isAuthed &&
    windowPath !== "/pages/Login" &&
    windowPath !== "/pages/Register"
  ) {
    return redirect("/pages/Login");
  } else if (
    (isAuthed && windowPath == "/pages/Login") ||
    (isAuthed && windowPath == "/pages/Register")
  ) {
    return redirect("/");
  }
};
