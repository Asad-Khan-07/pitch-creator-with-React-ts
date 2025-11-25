import { Search, FileText, Image, Calendar, MoreVertical, Download, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/supabasecreate";

const History = () => {

const [userhistory,setUserhistory]=useState([])



  useEffect(()=>{
const history=async ()=> {
  
  const user=await supabase.auth.getUser()

  console.log(user.data.user.email);
  const { data, error } = await supabase
.from("Model")
.select("*")
.eq("User", user.data.user.email) 
.order("Time", { ascending: false })
// .limit(200);
// console.log(data);
setUserhistory(data)
console.log(userhistory);

if (error) {
  console.log(error.message);
  
}
}
history()
},[])

  const pitches = [
    {
      id: 1,
      title: "SaaS Platform Pitch Deck",
      date: "2024-03-15",
      type: "deck",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Product Launch Strategy",
      date: "2024-03-14",
      type: "strategy",
      status: "draft",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Investor Presentation Q1",
      date: "2024-03-10",
      type: "presentation",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Marketing Campaign Pitch",
      date: "2024-03-08",
      type: "campaign",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pitch History
            </h1>
            <p className="text-muted-foreground">
              Access and manage all your created pitches
            </p>
          </div>

          {/* Search and Filters */}
          <div className="p-6 mb-8 rounded-lg border border-border bg-card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  placeholder="Search pitches..."
                  className="w-full h-11 pl-10 pr-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div className="flex gap-2">
                <button className="h-11 px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium">
                  All Types
                </button>
                <button className="h-11 px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pitches</p>
                  <p className="text-3xl font-bold text-foreground">{userhistory.length}</p>
                </div>
                <FileText className="w-10 h-10 text-primary/20" />
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
                <Calendar className="w-10 h-10 text-secondary/20" />
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Images Generated</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                </div>
                <Image className="w-10 h-10 text-accent-foreground/20" />
              </div>
            </div>
          </div>

          {/* Pitch Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {userhistory.map((pitch) => (
              <div  className="overflow-auto rounded-lg border border-border bg-card hover:shadow-lg transition-shadow group">
                {/* <div className="relative">
                  <img
                    src={pitch.thumbnail}
                    alt={pitch.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="h-8 w-8 rounded-md bg-white/90 hover:bg-white text-foreground transition-colors inline-flex items-center justify-center">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div> */}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="overflow-auto  border-2 border-red-300">
                      <h3 className="text-lg font-semibold mb-1">{pitch.User_Startup}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(pitch.date).toLocaleDateString()}
                        {/* {pitch.Generated_Pitch} */}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium `}
                    >
                      {pitch.status}
                      aadad
                    </span>
                  
                    <button className="flex-1 h-9 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium inline-flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="px-8 py-3 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-base font-medium">
              Load More Pitches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
