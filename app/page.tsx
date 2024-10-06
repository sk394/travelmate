import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {MapPin, Search, Star} from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils";
import FooterAll from "@/components/footer/footer-all";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="relative h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/travel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Navbar */}
        <header className="relative z-10 flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold text-white">TravelMate</h1>
          <Link href="/login" className={cn(buttonVariants({variant: "outline"}))}>
             Login
          </Link>
        </header>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Explore with a Local Guide</h2>
          
          <div className="w-full max-w-lg mb-6">
            <div className="flex">
              <Input 
                type="text" 
                className="rounded-l-md border-white bg-white/20 text-white placeholder-white/70 focus:bg-white/30 focus:placeholder-white/50"
                placeholder="Where do you want to go?" 
              />
              <Button className="rounded-l-none bg-white text-black hover:bg-white/90">
                <Search className="mr-2 h-4 w-4" /> Find Guides
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-white/90">
            <MapPin className="mr-2 h-4 w-4" />
            <p>Popular Destinations: Paris, Tokyo, New York, Rome, Sydney</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"TravelMate made our trip unforgettable! Our local guide showed us hidden gems we would have never found on our own."</p>
                  <p className="font-semibold">- Happy Traveler {i}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">About TravelMate</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              TravelMate connects adventurous travelers with knowledgeable local guides around the world. Our mission is to create authentic, unforgettable experiences by bridging cultures and fostering meaningful connections.
            </p>
            <Button>Learn More About Us</Button>
          </div>
        </div>
      </section>
      <Separator />
      {/* Footer */}
      <FooterAll />
    </div>

  );
}