import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import supabase from "@/supabasecreate";
import { UserContext } from "@/authcontext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()
const {user,setUser}=useContext(UserContext)
  const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }else {
      localStorage.setItem("username", JSON.stringify(false));
      const username = JSON.parse(localStorage.getItem("username"));
      setUser(username)
      navigate("/");
    //      toast.success("Signed out successfully!", {
    //   position: "bottom-right",
    //   style: {
    //     background: "linear-gradient(to right, #2563eb, #1e40af)", 
    //     color: "#fff",
    //     borderRadius: "0.75rem",
    //     fontWeight: "500",
    //     boxShadow: "0 0 15px rgba(37,99,235,0.3)",
    //   },
    //   progressStyle: { background: "#93c5fd" },
    // });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PitchAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/chat" className="text-foreground/70 hover:text-foreground transition-colors">
              Chat
            </Link>
            <Link to="/image-generator" className="text-foreground/70 hover:text-foreground transition-colors">
              Image Generator
            </Link>
            <Link to="/history" className="text-foreground/70 hover:text-foreground transition-colors">
              History
            </Link>
            <div className="flex items-center ">
              {/* <Link to="/signin">
                <button className="px-4 py-2 rounded-lg text-foreground hover:bg-accent transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity">
                  Get Started
                </button>
              </Link> */}
              <Link to="/signup">
                <button onClick={Logout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity">
                 Log Out
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <Link
              to="/chat"
              className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              to="/image-generator"
              className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Image Generator
            </Link>
            <Link
              to="/history"
              className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-lg text-foreground hover:bg-accent transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity">
                  Get Started
                </button>
              </Link>
              {/* <Link> */}
                <button onClick={Logout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity">
                 Log Out
                </button>
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
