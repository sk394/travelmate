import { Award, Shield, Users } from 'lucide-react';

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "Finding a local guide through this platform made all the difference. Maria showed us parts of Barcelona we would never have discovered on our own!",
    avatar: "/avatar.png",
    rating: 5,
    type: "traveler",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "As a guide, I've met amazing people from around the world while sharing my love for my city. The verification process was thorough but straightforward.",
    avatar: "/avatar.png",
    rating: 5,
    type: "guide",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Melbourne, Australia",
    text: "Our guide knew exactly where to take us for the best local food and hidden spots. It felt like exploring with a knowledgeable friend rather than a typical tour.",
    avatar: "/avatar.png",
    rating: 5,
    type: "traveler",
  },
]

export const features = [
  {
    icon: Users,
    title: "Local Expertise",
    description:
      "Connect with verified local guides who know their cities inside out and can offer authentic experiences.",
  },
  {
    icon: Shield,
    title: "Secure Verification",
    description: "All guides undergo a thorough verification process to ensure safety and quality experiences.",
  },
  {
    icon: Award,
    title: "Personalized Journeys",
    description: "Enjoy customized itineraries tailored to your interests, not generic tourist routes.",
  },
]

export const destinations = [
  {
    title: "Tokyo, Japan",
    image: "/santorini.jpg",
    description:
      "Explore hidden alleyways, authentic local restaurants, and cultural gems with guides who call Tokyo home.",
    guides: 24,
  },
  {
    title: "Lisbon, Portugal",
    image: "/phoksundo.jpg",
    description:
      "Discover the soul of Lisbon through its fado music, historic neighborhoods, and culinary delights with local experts.",
    guides: 18,
  },
  {
    title: "Marrakech, Morocco",
    image: "/everest.jpg",
    description:
      "Navigate the labyrinthine medina and experience authentic Moroccan hospitality with knowledgeable local guides.",
    guides: 15,
  },
]