export const rooms = [
  {
    id: "atlas-hub",
    name: "Atlas Hub",
    building: "Innovation Center",
    capacity: 20,
    amenities: ["4K display", "Whiteboard", "Video calls", "Quick print access"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "09:00 AM - 10:00 AM" },
      { id: "midday", label: "12:00 PM - 1:00 PM" },
      { id: "afternoon", label: "03:00 PM - 4:00 PM" },
      { id: "evening", label: "06:00 PM - 7:00 PM" }
    ]
  },
  {
    id: "cedar-studio",
    name: "Cedar Studio",
    building: "Arts & Media Wing",
    capacity: 12,
    amenities: ["Recording booth", "Soundproof walls", "Projector", "Standing desk"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "08:30 AM - 9:30 AM" },
      { id: "midday", label: "11:30 AM - 12:30 PM" },
      { id: "afternoon", label: "02:30 PM - 3:30 PM" },
      { id: "evening", label: "05:30 PM - 6:30 PM" }
    ]
  },
  {
    id: "horizon-lab",
    name: "Horizon Lab",
    building: "Engineering Block",
    capacity: 16,
    amenities: ["Dual monitors", "3D printer", "Conference table", "USB-C docking"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "09:30 AM - 10:30 AM" },
      { id: "midday", label: "01:00 PM - 2:00 PM" },
      { id: "afternoon", label: "04:00 PM - 5:00 PM" },
      { id: "evening", label: "07:00 PM - 8:00 PM" }
    ]
  },
  {
    id: "maple-seminar",
    name: "Maple Seminar",
    building: "Business School",
    capacity: 24,
    amenities: ["Presentation screen", "Hybrid setup", "Lecture chairs", "Laptop station"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "10:00 AM - 11:00 AM" },
      { id: "midday", label: "12:30 PM - 1:30 PM" },
      { id: "afternoon", label: "03:00 PM - 4:00 PM" },
      { id: "evening", label: "05:00 PM - 6:00 PM" }
    ]
  },
  {
    id: "north-hall",
    name: "North Hall",
    building: "Science Complex",
    capacity: 18,
    amenities: ["Smartboard", "Lab benches", "Projector", "Storage lockers"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "08:00 AM - 9:00 AM" },
      { id: "midday", label: "11:00 AM - 12:00 PM" },
      { id: "afternoon", label: "02:00 PM - 3:00 PM" },
      { id: "evening", label: "06:30 PM - 7:30 PM" }
    ]
  },
  {
    id: "quartz-collab",
    name: "Quartz Collab",
    building: "Student Center",
    capacity: 10,
    amenities: ["Cafe access", "Collaborative tables", "Whiteboard", "Charging stations"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    timeSlots: [
      { id: "morning", label: "09:00 AM - 10:00 AM" },
      { id: "midday", label: "01:30 PM - 2:30 PM" },
      { id: "afternoon", label: "04:30 PM - 5:30 PM" },
      { id: "evening", label: "07:30 PM - 8:30 PM" }
    ]
  }
];

export const events = rooms;
