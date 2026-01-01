import React, { useState } from "react";
import { RefreshCw, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import supabase from "@/supabasecreate";

export default function GenerateColor() {
  const [history, setHistory] = useState([]);
  const [color, setColor] = useState([]);

  const randomHex = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const generateRandomColor = () => {
    const newGroup = Array.from({ length: 5 }, randomHex);
    setHistory((prev) => [newGroup, ...prev]);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  };

  const Saved = async (color: any) => {
    const btn = document.querySelectorAll(".btn")[1];
    const attribute = btn.getAttribute("title");
    const user = await supabase.auth.getUser();
    console.log(user.data.user.email);
    console.log(attribute);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <Navbar />

      <div className="w-full mt-20 p-5 flex md:flex-row flex-col justify-around ">
        <div className="rounded-3xl h-[650px] shadow-2xl bg-card p-5 overflow-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Random Color Generator
            </h1>

            <button
              onClick={generateRandomColor}
              className=" inline-flex items-center px-3 py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90  font-semibold rounded-2xl shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300 group"
            >
              {" "}
              <RefreshCw
                className="group-hover:rotate-180 transition-transform duration-500"
                size={26}
              />{" "}
              Generate New Color{" "}
            </button>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 w-full mt-10 gap-4 justify-items-center">
            {history.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex gap-3 flex-col justify-center p-4 rounded-xl bg-muted"
              >
                <div>
                  {group.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => copyToClipboard(color)}
                      className="btn w-12 h-12 rounded-lg shadow-md text-xs text-transparent hover:scale-110 transition show"
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {color}
                      <span className="text-transparent block">Copied</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-evenly">
                  <span className="mt-2 text-sm text-gray-500">
                    {" "}
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    <Save
                      className="cursor-pointer text-[#089fafe6]"
                      onClick={() => {
                        Saved(color);
                      }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl h-[650px] shadow-2xl bg-card p-5 overflow-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Saved Generated Color
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
