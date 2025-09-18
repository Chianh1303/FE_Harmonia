export const MOCK_SONGS = [
  {
    id: 1,
    title: "Harmonia Sky",
    artist: "artist1",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    duration: 60,
  },
  {
    id: 2,
    title: "Veloura Dreams",
    artist: "artist1",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
    duration: 60,
  },
  {
    id: 3,
    title: "EchoLux Nights",
    artist: "artist2",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
    duration: 60,
  },
  {
    id: 4,
    title: "Symphoria Flow",
    artist: "artist2",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/Front_Center.wav",
    duration: 60,
  },
  {
    id: 5,
    title: "Neon Waves",
    artist: "artist3",
    cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    duration: 180,
  },
  {
    id: 6,
    title: "Midnight Groove",
    artist: "artist3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
    duration: 195,
  },
];

  export const MOCK_PLAYLISTS = [
    { id: "p1", name: "Top Hits Việt", cover: MOCK_SONGS[0].cover, songs: [1, 2, 3] },
    { id: "p2", name: "Chill & Focus", cover: MOCK_SONGS[1].cover, songs: [2, 4] },
    { id: "p3", name: "EDM Boost", cover: MOCK_SONGS[2].cover, songs: [1, 3, 4] },
    { id: "p4", name: "Acoustic Night", cover: MOCK_SONGS[3].cover, songs: [1, 2] },
    { id: "p5", name: "Electronic Vibes", cover: MOCK_SONGS[4].cover, songs: [5, 6, 1] },
    { id: "p6", name: "Night Sessions", cover: MOCK_SONGS[5].cover, songs: [6, 3, 5] },
  ];
