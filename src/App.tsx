// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import ImageGenerator from "./pages/ImageGenerator";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import ToastContainer from "react-toastify"
import { useEffect, useState } from "react";
import supabase from "./supabasecreate";
// import { supabase } from "./supabasecreate";
// const queryClient = new QueryClient();

const App = () => {
  
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(!!session?.user);
    });

    supabase.auth.getSession().then(({ data }) => {
      setCurrentUser(!!data?.session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  return(
  // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/chat" element={currentUser ? (<Chat />):"Can not get the Page"} />
        <Route path="/image-generator" element={currentUser ? ( <ImageGenerator />):"Can not get the Page"} />
        <Route path="/history" element={currentUser ? (<History />):"Can not get the Page"} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      {/* <ToastContainer/> */}
      </Routes>
    </BrowserRouter>
  // </QueryClientProvider>
)};

export default App;
