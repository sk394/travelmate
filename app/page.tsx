"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ChevronLeft, ChevronRight, Globe, Heart, Lock, MapPin, Menu, Search, Star, X } from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { destinations, features, testimonials } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { FloatingElement } from "@/components/parallax/floating-element";
import { ParallaxImage, ParallaxSection } from "@/components/parallax/parallax-section";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function Page() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Animation refs and controls
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const destinationsRef = useRef(null)
  const guideSignupRef = useRef(null)

  useInView(heroRef, { once: true, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  const destinationsInView = useInView(destinationsRef, { once: true, amount: 0.3 })
  const guideSignupInView = useInView(guideSignupRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">TravelMate</h1>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-sm font-semibold hover:text-primary text-white transition-colors">
              How It Works
            </Link>
            <Link href="#destinations" className="text-sm font-semibold text-white hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="#become-guide" className="text-sm font-semibold text-white hover:text-primary transition-colors">
              Become a Guide
            </Link>
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>
              Login
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#destinations"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                href="#become-guide"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Guide
              </Link>
              <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://y9vk39wmwt.ufs.sh/f/EbGPEGinfpJXl2qs1HGYq31RifGp8KVr9FH4wvXhTNmIkAbC" type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          <FloatingElement className="absolute top-1/4 left-1/5 opacity-30">
            <Globe className="h-16 w-16 text-white" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-1/3 right-1/4 opacity-20" xOffset={-15} yOffset={25} duration={4}>
            <MapPin className="h-20 w-20 text-white" />
          </FloatingElement>
        </div>

        <div className="container relative z-30 mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Experience <span className="bg-gradient-to-l from-purple-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">Local</span> with{" "}
                <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">Personal</span> Guides
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Connect with verified local guides for authentic, personalized travel experiences. Discover hidden gems
                and create memories that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Find a Guide
                </Link>
                <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-gray-800")}>
                  Become a Guide
                </Link>

              </div>
              <div className="mt-6 text-center sm:text-left">
                <p className="text-sm text-white/80 italic">&quot;Be a proud guide, be a proud traveler&quot;</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:w-1/2"
            >

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Explore with a Local Guide</h2>
                <div className="w-full max-w-lg mb-6">
                  <div className="flex items-center space-x-1">
                    <GooglePlacesAutocomplete
                      selectProps={{
                        styles: {
                          container: (provided) => ({
                            ...provided,
                            minWidth: "70%",
                          }),
                          control: (provided) => ({
                            ...provided,
                            color: 'blue',
                            border: 'white',
                            width: "100%",
                            height: '36px',
                            minHeight: '36px',
                            boxShadow: 'none',  // Remove default focus shadow
                            '&:hover': {
                              border: 'none'  // Keep consistent on hover
                            }
                          }),
                          input: (provided) => ({
                            ...provided,
                            ":focus-visible": { outline: 'none' },
                          }),
                          menu: (provided) => ({
                            ...provided,
                            color: 'black',
                            width: '70%',
                          }),
                        },
                        placeholder: "Where do you want to go?",
                      }}
                    />
                    <Link href="/traveler">
                      <Button className=" bg-white text-black hover:bg-white/90  h-10 rounded-xl">
                        <Search className="mr-2 h-4 w-4" /> Find Guides
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center text-white/90 ">
                  <MapPin className="mr-2 h-4 w-4" />
                  <p>Popular Destinations: Paris, Tokyo, New York, Rome, Sydney</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connect with local guides in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Search Destinations</h3>
              <p className="text-gray-600">Browse our network of verified local guides in your chosen destination.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Plan</h3>
              <p className="text-gray-600">Message guides directly to create your perfect personalized experience.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Experience</h3>
              <p className="text-gray-600">Meet your guide and discover authentic local experiences together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section id="features" ref={featuresRef} className="py-16 md:py-24 bg-[conic-gradient(var(--tw-gradient-stops))] from-[#4f46e5] via-[#818cf8] to-[#c7d2fe] relative overflow-hidden">
        {/* Parallax Background Elements */}
        <ParallaxSection className="absolute inset-0 opacity-5 overflow-hidden" offset={-100}>
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary"></div>
        </ParallaxSection>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={featuresInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-50">Why Choose <span className="text-white">Local Guides</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience destinations through the {" "}<span className="text-white"> eyes of those who know them best</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-blend-color-dodge rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-md transition-shadow"
              >
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center antialiased">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section id="testimonials" ref={testimonialsRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={testimonialsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-teal-900">Hear from Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stories from guides and travelers who have connected through our platform
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={testimonialsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-sky-50 rounded-2xl shadow-lg p-8 md:p-10"
            >
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {testimonials[currentTestimonial].type === "guide" ? "Local Guide" : "Traveler"}
                  </span>
                </div>

                <div className="mb-6 flex items-center justify-center">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-700 text-center mb-8 italic">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>

                <div className="flex items-center">
                  <Image
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-gray-600 font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${index === currentTestimonial ? "bg-primary" : "bg-gray-300"}`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Destinations Section */}
      <motion.section
        id="destinations"
        ref={destinationsRef}
        className="py-16 md:py-24 bg-sky-50 relative overflow-hidden"
      >
        {/* Parallax Background Elements */}
        <ParallaxSection className="absolute inset-0 opacity-5 overflow-hidden" offset={-100}>
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary"></div>
        </ParallaxSection>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={destinationsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-teal-500">Popular Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover places through the eyes of local guides who call them home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.title}
                initial={{ y: 50, opacity: 0 }}
                animate={destinationsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-64 overflow-hidden">
                    <ParallaxImage
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.title}
                      width={400}
                      height={300}
                      className="w-full h-64 "
                      speed={0.2}
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-1 font-bold text-primary">
                      {destination.guides} Guides
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <Button className="w-full">Find a Guide</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={destinationsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              View All Destinations
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Become a Guide Section */}
      <motion.section id="become-guide" ref={guideSignupRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={guideSignupInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-black/60">Become a Local Guide</h2>
              <p className="text-lg text-gray-600 mb-6">
                Share your passion for your hometown, meet travelers from around the world, and earn income doing what
                you love.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold dark:text-black/60">Share Your Knowledge</h3>
                    <p className="text-gray-600">
                      Showcase the hidden gems and local favorites that make your city special.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold dark:text-black/60">Flexible Schedule</h3>
                    <p className="text-gray-600">Create experiences and accept bookings that fit your availability.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold dark:text-black/60">Secure Verification</h3>
                    <p className="text-gray-600">
                      Our thorough verification process ensures safety for both guides and travelers.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/login?role=guide">
                <Button size="lg" variant="outline">Apply to Be a Guide</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={guideSignupInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-sky-50 rounded-xl p-8 shadow-lg dark:text-black/60 font-mono">
                <h3 className="text-xl font-bold mb-6 text-center ">Guide Verification Process</h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Application</h4>
                      <p className="text-sm text-gray-600">Complete your profile with your expertise and experience.</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Identity Verification</h4>
                      <p className="text-sm text-gray-600">Secure verification of your identity and credentials.</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Background Check</h4>
                      <p className="text-sm text-gray-600">Safety screening to ensure a secure community.</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Approval</h4>
                      <p className="text-sm text-gray-600">
                        Once approved, create experiences and connect with travelers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center text-sm text-gray-600">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Your information is securely encrypted and protected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        {/* Parallax Background Elements */}
        <ParallaxSection className="absolute inset-0 opacity-10 overflow-hidden" offset={-50}>
          <div className="grid grid-cols-6 grid-rows-3 gap-4 w-full h-full scale-125">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="bg-white rounded-full"></div>
            ))}
          </div>
        </ParallaxSection>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Local?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join our community of proud guides and travelers. Discover authentic experiences that go beyond the
              tourist trail.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8">
                Find a Guide
              </Button>
              <Button size="lg" variant="secondary" className="px-8">
                Become a Guide
              </Button>
            </div>
            <p className="mt-8 text-white/80 italic">&quot;Be a proud guide, be a proud traveler&quot;</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 ">
        <div className="container mx-auto px-4 py-12 ">
          <div className="grid grid-cols-3 justify-items-end items-center">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Globe className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">TravelMate</span>
              </Link>
              <p className="mb-6">
                TravelMate connects adventurous travelers with knowledgeable local guides around the world. Our mission is to create authentic,
                unforgettable experiences by bridging cultures and fostering meaningful connections.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">For Travelers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Find a Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">For Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Become a Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guide Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Verification Process
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guide Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} TravelMate. All rights reserved.</p>
            <p className="text-sm mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500 inline" /> by{" "}
              <Link href="https://www.skhadka.me" className="hover:text-white transition-colors">
                Suman
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>

  );
}