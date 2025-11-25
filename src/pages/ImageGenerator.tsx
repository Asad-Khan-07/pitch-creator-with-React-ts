import { useState } from "react";
import { Sparkles, Download, Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Image Generator
            </h1>
            <p className="text-muted-foreground">
              Create stunning visuals for your pitch presentations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="text-base font-semibold mb-2 block text-foreground">
                    Describe Your Image
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Professional business chart showing growth metrics with teal and coral colors..."
                    className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="style" className="text-sm font-medium mb-1 block text-foreground">Style</label>
                    <input 
                      id="style" 
                      placeholder="Modern, Professional"
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="aspect" className="text-sm font-medium mb-1 block text-foreground">Aspect Ratio</label>
                    <input 
                      id="aspect" 
                      placeholder="16:9"
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>

                <button
                  className="w-full h-12 px-4 py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity text-lg font-medium inline-flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  Generate Image
                </button>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-3 text-sm">Quick Prompts</h3>
                  <div className="space-y-2">
                    {[
                      "Growth chart with upward trend",
                      "Team collaboration illustration",
                      "Technology innovation concept",
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full h-9 px-3 py-2 rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium inline-flex items-center justify-start gap-2"
                        onClick={() => setPrompt(suggestion)}
                      >
                        <Sparkles className="w-3 h-3" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Images */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
                <div className="grid gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-border bg-card group relative">
                      <img
                        src={image}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          className="px-3 py-2 h-9 rounded-md bg-white/90 hover:bg-white text-foreground transition-colors text-sm font-medium inline-flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          className="px-3 py-2 h-9 rounded-md bg-white/90 hover:bg-white text-foreground transition-colors text-sm font-medium"
                        >
                          Use in Pitch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg border border-border bg-gradient-to-br from-primary/5 to-secondary/5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be specific about colors, style, and composition</li>
                  <li>• Mention the mood you want to convey</li>
                  <li>• Include relevant business context</li>
                  <li>• Try different aspect ratios for various uses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
