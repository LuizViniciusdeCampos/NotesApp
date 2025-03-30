import type { Note } from "./types"

export const availableTags = ["Travel", "Paris", "London", "Miami", "Roma", "Hotel", "Experience", "Dinner", "Food"]

export const initialNotes: Note[] = [
  {
    id: "note-1",
    title: "Hotel Quartier Latin",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id blandit augue. Maecenas eu consequat nisi. Sed bibendum cursus nunc id varius. Mauris fringilla sed neque vitae ultrices. Donec tellus est, accumsan quis sagittis sed, aliquet nec enim. Morbi quis elementum augue. Ut imperdiet tempor interdum. Morbi aliquet, diam et posuere suscipit, urna mauris pellentesque risus, sodales finibus lectus justo tincidunt felis. Praesent lacinia sodales elit, vitae convallis magna molestie vitae. Aliquam elementum pulvinar felis eget tincidunt. Cras placerat, lectus vel pretium ornare, leo risus maximus augue, non varius libero erat facilisis orci. Phasellus dapibus imperdiet turpis, in suscipit lacus imperdiet id.\n\nMaecenas ut interdum orci, sit amet hendrerit ex. Donec tincidunt, turpis eget porttitor blandit, ex nunc bibendum leo, quis suscipit ipsum nulla quis nunc. Mauris ut erat sed ipsum gravida luctus. Suspendisse hendrerit nulla sed libero mattis scelerisque. Cras ultricies ex nec nibh aliquam consectetur. Morbi ex ante, aliquam in euismod non, cursus nec elit. Aenean quis placerat neque, sit amet eleifend felis. Sed ac tristique lorem. Donec vestibulum ac sapien non volutpat.",
    tags: ["Paris", "Hotel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-2",
    title: "Hotel Quartier Latin",
    content: "Notes about the hotel in Paris.",
    tags: ["Paris", "Hotel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-3",
    title: "Hotel Quartier Latin",
    content: "More details about the hotel.",
    tags: ["Paris", "Hotel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-4",
    title: "London Trip Planning",
    content: "Planning details for the London trip next month.",
    tags: ["London", "Travel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-5",
    title: "Miami Beach Restaurants",
    content: "List of restaurants to try in Miami Beach.",
    tags: ["Miami", "Food"],
    createdAt: new Date(Date.now() - 1000 * 60 * 40),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-6",
    title: "Roma Sightseeing",
    content: "Must-visit places in Roma for the upcoming vacation.",
    tags: ["Roma", "Travel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 50),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: false,
  },
  {
    id: "note-7",
    title: "Dinner Party Ideas",
    content: "Menu planning and decoration ideas for the dinner party.",
    tags: ["Dinner", "Food"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3),
    archived: true,
  },
  {
    id: "note-8",
    title: "Paris Travel Itinerary",
    content: "Day-by-day itinerary for the Paris trip including museums, restaurants, and activities.",
    tags: ["Paris", "Travel"],
    createdAt: new Date(Date.now() - 1000 * 60 * 70),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    archived: true,
  },
  {
    id: "note-9",
    title: "Food Festival Notes",
    content: "Notes from the international food festival with favorite dishes and recipes to try.",
    tags: ["Food", "Experience"],
    createdAt: new Date(Date.now() - 1000 * 60 * 80),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    archived: true,
  },
]

