export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Aurora Wireless Headphones",
    price: 249,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800&auto=format&fit=crop",
    tagline: "Studio-grade sound, all day comfort.",
    description:
      "Immersive 40mm drivers with active noise cancellation and 40 hours of battery. Engineered for creators who live inside their soundscape.",
    features: ["Active Noise Cancellation", "40h battery life", "Hi-Res Audio certified", "Multipoint Bluetooth 5.3"],
  },
  {
    id: 2,
    name: "Nimbus Smart Watch",
    price: 329,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
    tagline: "Your health, beautifully quantified.",
    description:
      "A featherweight titanium case wraps a vibrant AMOLED display. Tracks sleep, heart, oxygen, and stress with clinical accuracy.",
    features: ["AMOLED always-on", "Titanium chassis", "7-day battery", "ECG + SpO2"],
  },
  {
    id: 3,
    name: "Orbit Mechanical Keyboard",
    price: 179,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop",
    tagline: "Type like it's the future.",
    description:
      "Hot-swappable switches, aluminum frame, and per-key RGB. Wireless low-latency mode gets you competitive without cables.",
    features: ["Hot-swap sockets", "Per-key RGB", "2.4GHz wireless", "PBT double-shot keycaps"],
  },
  {
    id: 4,
    name: "Lumen Desk Lamp",
    price: 129,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop",
    tagline: "Sculpted light for focused minds.",
    description:
      "Tunable white from 2700K to 6500K with automatic circadian adjustments. Wireless charging pad built into the base.",
    features: ["Circadian tuning", "Wireless charging base", "Touch dimming", "Anti-glare optics"],
  },
  {
    id: 5,
    name: "Prism 4K Webcam",
    price: 199,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&auto=format&fit=crop",
    tagline: "Broadcast-quality video, everywhere.",
    description:
      "Sony sensor, AI framing, and dual beamforming mics. Plug in and look like a pro on any call, stream, or shoot.",
    features: ["4K60 capture", "AI auto-framing", "Dual mics", "USB-C plug & play"],
  },
  {
    id: 6,
    name: "Tempo Portable Speaker",
    price: 149,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop",
    tagline: "Room-filling sound in your palm.",
    description:
      "360-degree acoustics, IP67 waterproof shell, and 24 hours of playback. Pair two for true stereo separation.",
    features: ["360° sound", "IP67 waterproof", "24h battery", "Stereo pairing"],
  },
];
