import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ColorPalette from "./pages/Colorplatter";
import ImageGenerator from "./pages/ImageGenerator";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import { lazy, Suspense, useContext, useState } from "react";
import { UserContext } from "./authcontext";
import { ToastContainer } from "react-toastify";
import { Sparkles } from "lucide-react";

const App = () => {
  const username = JSON.parse(localStorage.getItem("username"));
  const [user, setUser] = useState(username);
     const Blog = lazy(() => {
    return new Promise((resolve:any) => {
      setTimeout(() => resolve(import("./pages/Chat")), 2000);
    });
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
     <ToastContainer/>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
  path="/chat"
  element={
    user ? (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center flex-col justify-around bg-gradient-to-b from-background to-accent">
                        <div className="icon-load ">
                        <Sparkles size={100} className="text-primary" />
                        </div>
                        <p className="text-2xl font-bold  text-center  bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Create your perfect pitch through conversation
                        </p>
                        <div className="intro"></div>
        </div>
        }
      >
        <Blog />
      </Suspense>
    ) : (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">401</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Authentication is required
          </p>
          <a
            href="/signin"
            className="text-primary underline hover:text-primary/90"
          >
            Return to Sign in
          </a>
        </div>
      </div>
    )
  }
/>

          <Route
            path="/image-generator"
            element={
              user ? (
                <ImageGenerator />
              ) : (
                <div className="flex min-h-screen items-center justify-center bg-muted">
                  <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">401</h1>
                    <p className="mb-4 text-xl text-muted-foreground">
                      Authentication is required
                    </p>
                    <a
                      href="/signin"
                      className="text-primary underline hover:text-primary/90"
                    >
                      Return to Sign in
                    </a>
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/history"
            element={
              user ? (
                <History />
              ) : (
                <div className="flex min-h-screen items-center justify-center bg-muted">
                  <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">401</h1>
                    <p className="mb-4 text-xl text-muted-foreground">
                      Authentication is required
                    </p>
                    <a
                      href="/signin"
                      className="text-primary underline hover:text-primary/90"
                    >
                      Return to Sign in
                    </a>
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/color"
            element={
              user ? (
                < ColorPalette/>
              ) : (
                <div className="flex min-h-screen items-center justify-center bg-muted">
                  <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">401</h1>
                    <p className="mb-4 text-xl text-muted-foreground">
                      Authentication is required
                    </p>
                    <a
                      href="/signin"
                      className="text-primary underline hover:text-primary/90"
                    >
                      Return to Sign in
                    </a>
                  </div>
                </div>
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
