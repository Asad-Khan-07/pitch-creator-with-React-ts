import { Search, FileText, Image, Calendar, MoreVertical, Download, Eye, ArrowBigDownIcon, ArrowDown, ArrowUp, Backpack, Outdent, ArrowRightSquare} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/supabasecreate";
import { jsPDF } from "jspdf";
import { handleExport } from "@/storage";

const History = () => {

const [userhistory,setUserhistory]=useState([])
const [monthhistory,setMonthhistory]=useState([])
const [searchinput,setSearchinput]=useState<string>('')
const [firstfive,setFirstfive]=useState([])
const [searchhistory,setSearchhistory]=useState(undefined)
const [show,setShow]=useState<boolean>(true)
const [segment,setSegment]=useState<boolean>(true)
const [image,setImages]=useState([])








useEffect(() => {
  const history = async () => {
    const user = await supabase.auth.getUser();

    const now:Date = new Date();

    const startOfMonth:string = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    ).toISOString();

    const { data, error } = await supabase
    .from("Model")
      .select("*")
      .eq("User", user.data.user.email)
      .gte("Time", startOfMonth)        
      .lt("Time", startOfNextMonth)     
      .order("Time", { ascending: false });

    if (error) console.log(error.message);
    // console.log(data);
    
    setMonthhistory(data);
  };

  history();
}, []);





  useEffect(()=>{
const history=async ()=> {
  
  const user=await supabase.auth.getUser()


  const { data, error } = await supabase
.from("Model")
.select("*")
.eq("User", user.data.user.email) 
.order("Time", { ascending: false })

setUserhistory(data)
setFirstfive(data.slice(0,5))


if (error) {
  console.log(error.message);
  
}
}
history()
},[])

const searchbtn = () => {
    if (!searchinput.trim()) return;


  const item = userhistory.filter((i) =>
   i.User_Startup===searchinput.toLowerCase()
  );

  if (item.length > 0) {

    setSearchhistory(item)
    setShow(!show)

    
  } else {
    console.log("items not found");
    setSearchhistory("items not found")
  }
};
const Loadmore=()=>{
 
  setFirstfive(userhistory.slice(0));
  
}




  const Fetchimages = async () => {
    const user=await supabase.auth.getUser()
    const { data, error } = await supabase
    
    .from("Images")
      .select("*")
      .eq("User", user.data.user.email)  
      // .eq("Session_id", sessionId)
      .order("created_at", {ascending: false });
      
    if (error) {
      console.log(error.message);
      
      
    }else{
      // console.log(data);

      setImages(data)
      // setFetch(true)
    

    }
  };



useEffect(()=>{
Fetchimages()
},[])


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


          {/* <div className="p-6 mb-8 rounded-lg border border-border bg-card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">

                <input
                  placeholder="Search pitches..."
                  className="w-full h-11 pl-10 pr-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onChange={(e) => { setSearchinput( e.target.value ) }}
              />
              </div>
              <div className="flex gap-2">
        
                <button onClick={searchbtn} className="h-11 px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium inline-flex items-center gap-2">
                  
                                                                
{show === false ? (
  <>
    <ArrowRightSquare /> Back
  </>
) : (
  <>
    <Search className="w-4 h-4" /> Search
  </>
)}

                </button>
              </div>
            </div>
          </div> */}

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
                  <p className="text-3xl font-bold text-foreground">{monthhistory.length}</p>
                </div>
                <Calendar className="w-10 h-10 text-secondary/20" />
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Images Generated</p>
                  <p className="text-3xl font-bold text-foreground">{image.length}</p>
                </div>
                <Image className="w-10 h-10 text-accent-foreground/20" />
              </div>
              
            </div>

          
          </div>





<div className="grid md:grid-cols-2 gap-6">
                {/* <div className="border-4" onClick={()=>{setSegment(true)}}> <button className="outline-4">Pitches</button></div>
                <div className="border-4" ></div> */}
                <button className="border-4"  onClick={()=>{setSegment(true)}}>Pitches</button>
                <button className="border-4"  onClick={()=>{setSegment(false)}}>Imgaes</button>
          </div>



{segment?

    <div className="">
      


           <div className="p-6 mb-8 rounded-lg border border-border bg-card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">

                <input
                  placeholder="Search pitches..."
                  className="w-full h-11 pl-10 pr-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onChange={(e) => { setSearchinput( e.target.value ) }}
              />
              </div>
              <div className="flex gap-2">
        
                <button onClick={searchbtn} className="h-11 px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium inline-flex items-center gap-2">
                  
                                                                
{show === false ? (
  <>
    <ArrowRightSquare /> Back
  </>
) : (
  <>
    <Search className="w-4 h-4" /> Search
  </>
)}

                </button>
              </div>
            </div>
          </div> 




        {(show === true)?
        
          <div className="grid md:grid-cols-2 gap-6">
            {firstfive.map((pitch,i) => (
              <div key={i}  className="overflow-auto rounded-lg border border-border bg-card hover:shadow-lg transition-shadow group">

                <div className="p-6" >
                  <div className="flex items-start justify-between mb-3">
                    <div className="overflow-auto">
                      <h3 className="text-lg font-semibold mb-1">{pitch.User_Startup}</h3>
                      <p className="text-sm text-muted-foreground text-justify flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(pitch.date).toLocaleDateString()}
                        {pitch.Generated_Pitch}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium `}
                    >
                      {pitch.status}
                      
                    </span>
                  
                    <button onClick={() => handleExport(pitch.User_Startup,pitch.Generated_Pitch)} className="flex-1 h-9 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium inline-flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          :<div className="grid md:grid-cols-2 gap-6 ">
            
            {searchhistory.map((pitch,i) => (
              <div  className="overflow-auto rounded-lg border border-border bg-card hover:shadow-lg transition-shadow group">

                <div className="p-6" key={i}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="overflow-auto">
                      <h3 className="text-lg font-semibold mb-1">{pitch.User_Startup}</h3>
                      <p className="text-sm text-muted-foreground text-justify flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(pitch.date).toLocaleDateString()}
                        {pitch.Generated_Pitch}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium `}
                    >
                      {pitch.status}
                      
                    </span>
                  
                    <button onClick={() => handleExport(pitch.User_Startup,pitch.Generated_Pitch)} className="flex-1 h-9 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium inline-flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        }
  </div>
:<div className="grid md:grid-cols-2 gap-6">
            {image.map((pitch,i) => (
              <div key={i}  className="overflow-auto rounded-lg border border-border bg-card hover:shadow-lg transition-shadow group">

                <div className="p-6" >
                  <div className="flex items-start justify-between mb-3">
                    <div className="overflow-auto">
                      {/* <h3 className="text-lg font-semibold mb-1">{pitch.User_Startup}</h3> */}
                      {/* <p className="text-sm text-muted-foreground text-justify flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(pitch.date).toLocaleDateString()}
                        {pitch.Generated_Pitch}
                      </p> */}
                      <img src={pitch.images} alt=""  />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium `}
                    >
                      {/* {pitch.status} */}
                      
                    </span>
                  
                    <button 
     

onClick={async () => {
  try {
    const response = await fetch(pitch.images);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =pitch.images.split("/").pop();
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed", err);
  }
}}

                    className="flex-1 h-9 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium inline-flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Dowload
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
























          {/* Load More */}
            
          {/* {(show === true)?
            <div className="mt-8 flex justify-center ">
            <button onClick={Loadmore} className="px-8 py-3 flex  rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-base font-medium">
             <ArrowDown/>
              Show More Pitches
            </button>
          </div>:""
          } */}
        </div>
      </div>
    </div>
  );
};

export default History;
