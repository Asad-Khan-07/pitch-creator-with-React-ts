import { useEffect, useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import supabase from "@/supabasecreate";
const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const [refresh, setRefresh] = useState(false)
  const sessionId =   localStorage.getItem("chat_session");;


    // setMessages([...messages, { role: "user", content: input }]);
  //   {
  //     role: "assistant",
  //     content: "Hello! I'm your AI pitch assistant. Tell me about your business idea and I'll help you create a compelling pitch.",
  //   },
  // ]);

  // const handleSend = () => {
    
  //   setInput("");
    
  //   // Simulate AI response
  //   setTimeout(() => {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         content: "Great! Let me help you structure that. What's the main problem your business solves?",
  //       },
  //     ]);
  //   }, 1000);
  // };





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
  
  

  
  
  const sent = async () => {

    if (!input.trim()) return;
    
    // const newMessages = [...user, { inp: text }];
    // setUser(newMessages);
    // setText("");
  
    try {
      // 1️⃣ User input save in Userstartup
      // const { error: userError } = await supabase
      //   .from("Userstartup")
      //   .insert([{ role: "user", message: text }]);
  
      // if (userError) console.error("User insert error:", userError);
  
      // 2️⃣ Send to Gemini API
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_AI_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
  You are a business idea generator.
  The user will give you an input idea or topic.
  
  You MUST respond ONLY in Heading wise paragraph format Do not respond in JSON format Do not use any symbol as well:
  {
    "Business Name": "...",
    "Tagline": "...",
    "Solution": "...",
    "Target Audience": "...",
    "Revenue Model": "..."
  }
  
  User input: ${input}
                  `,
                },
              ],
            },
          ],
        }
      );
      
      const aiReply = res.data.candidates[0].content.parts[0].text;
      // const botMsg = { role: "bot", text: aiReply };
      const user=await supabase.auth.getUser()
      // setAireply((prev) => [...prev, botMsg]);
      console.log(aiReply);
      // 3️⃣ AI output save in Generatepitch
      const { error: aiError } = await supabase
        .from("Model")
        .insert([{ User_Startup: input, Generated_Pitch:aiReply, User:user.data.user.email, Session_id:sessionId}]);
        setRefresh(!refresh)
      // if (aiError) console.error("AI insert error:", aiError);
    } catch (error) {
      console.error("Error in sent():", error);
    }
  
  
  
  };
  
  
  
  useEffect(()=>{
    fetchMessages()
    
  },[refresh])
  
  
  const fetchMessages = async () => {
    const user=await supabase.auth.getUser()
    const { data, error } = await supabase
    
    .from("Model")
      .select("*")
      .eq("User", user.data.user.email)  
      .eq("Session_id", sessionId)
      // current logged-in user
      .order("Time", {nullsFirst:true, ascending: false });
      
    if (!error) {
      console.log("Loading.....");
      console.log(data);
      // setMessages(data)
      setMessages([...messages, { role: "user", content: data[0] }]);
      setMessages(
        data
          .map(item => [
            { role: "user", content: item.User_Startup },
            { role: "ai", content: item.Generated_Pitch }
          ])
          .flat()
      );
      ;
      console.log(messages);

    }
  };
    
  
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Pitch Assistant
            </h1>
            <p className="text-muted-foreground">
              Create your perfect pitch through conversation
            </p>
          </div>

          <div className="h-[600px] flex flex-col rounded-lg border border-border bg-card">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  // value={input}
                  onChange={(e) => setInput(e.target.value)}
                  // onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe your business idea..."
                  className="flex-1 h-12 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <button
                  onClick={sent}
                  className="px-6 h-12 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Quick Start</h3>
                  <p className="text-xs text-muted-foreground">
                    "I need a pitch for a SaaS platform"
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Refine Existing</h3>
                  <p className="text-xs text-muted-foreground">
                    "Improve my value proposition"
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent-foreground mt-1" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Get Feedback</h3>
                  <p className="text-xs text-muted-foreground">
                    "Review my pitch deck structure"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
