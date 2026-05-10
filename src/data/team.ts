/** Unsplash URLs sized for full-width editorial use (matches About/Gallery pages). */
export const teamImage = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=85&w=2400`;

export type TeamStill = {
  src: string;
  alt: string;
  aspect: string;
};

export type TeamPortraitChapter = {
  scene: string;
  givenName: string;
  descriptor: string;
  verse: string;
  paragraphs: readonly string[];
  vietnamAnchor: string;
  portrait: { src: string; alt: string };
  secondaryStill?: TeamStill;
};

/** Opening hero / mid-page stills — editorial memory, not stock grid filler. */
export const teamVisuals = {
  hero: teamImage("photo-1528127269322-539801943592"),
  interlude: teamImage("photo-1464822759023-fed622ff2c3b"),
  closing: teamImage("photo-1559827260-dc66d52bef19"),
} as const;

/** Documentary “subjects”: witnesses behind the atlas — roles told as craft, not corporate titles. */
export const teamPortraitChapters: readonly TeamPortraitChapter[] = [
  {
    scene: "01",
    givenName: "Lan",
    descriptor: "Listens through the lens until fog agrees to stay a little longer.",
    verse: "Mountains teach patience to anyone brave enough to wait without checking the time.",
    vietnamAnchor: "Mostly traced along Sapa terraces — mist as co-director, boots never arriving clean.",
    paragraphs: [
      "Lan treats photography like field recording: tripod low, breath slower than the shutter, waiting until a ridge stops pretending to be a postcard. People ask for ‘golden hour’; she waits for the hour when gold feels embarrassed — when cloud bruises the ridgeline and a farmer’s tarp snaps like a gentle cymbal.",
      "Her Vietnam is not iconography. It is condensation on a bus window, plastic stools stacked before dawn, the polite silence between two scooters negotiating a curve that should not exist. The archive she leaves behind is warm because she refuses to steal dignity for contrast.",
    ],
    portrait: {
      src: teamImage("photo-1544005313-94ddf0286df2"),
      alt: "Lan outdoors in soft light, holding a camera at her chest.",
    },
    secondaryStill: {
      src: teamImage("photo-1469474968028-56623f02e42e"),
      alt: "River mist at dawn along an embankment.",
      aspect: "aspect-[16/10]",
    },
  },
  {
    scene: "02",
    givenName: "Minh",
    descriptor: "Writes with appetite — sentences seasoned before geography.",
    verse: "Alley kitchens refuse abstraction; steam insists on specifics.",
    vietnamAnchor: "Saigon and Huế kitchens — charcoal hiss, broth fogging glasses, interviews whispered between batches.",
    paragraphs: [
      "Minh arrives as a guest who refuses to narrate from above. He sits where bowls steam his notebook shut; he learns names before dishes. His Vietnam chapters begin with verbs — frying, folding, laughing at a mistake — because hospitality here corrects your posture before your itinerary.",
      "Exploration, for him, is not discovery as conquest. It is letting a place interrupt your cleverness. When he writes about Vietnam, you taste metal spoons, hear plastic curtains slap rain, feel the shy generosity of someone sliding another stool closer without asking permission.",
    ],
    portrait: {
      src: teamImage("photo-1506794778202-cad84cf45f1d"),
      alt: "Minh smiling slightly, seated in warm indoor light.",
    },
    secondaryStill: {
      src: teamImage("photo-1583417319070-7bcbc71bcbd8"),
      alt: "Evening street scene with lanterns and motion blur.",
      aspect: "aspect-[5/6]",
    },
  },
  {
    scene: "03",
    givenName: "Hải",
    descriptor: "Collects sound the way others collect stamps — proof of honest motion.",
    verse: "The coast keeps time with nets and tide, not notifications.",
    vietnamAnchor: "Recording passes through Phú Yên dawn markets and Central Coast roads — salt as percussion.",
    paragraphs: [
      "Hải walks with microphones like lantern light: close enough to hear intimacy, respectful enough not to stage it. Motorbikes become chords; waves become rests; vendors calling prices overlap like polite jazz. His Vietnam is audible before it is visible — you recognize place when your chest learns its tempo.",
      "He hates ‘immersive’ as marketing. Immersion, for him, is humidity in the mic windscreen, laughter ruined by wind, a dog barking on beat. When we stitch journeys together, his captures remind us exploration is sensory fidelity — not a brand promise.",
    ],
    portrait: {
      src: teamImage("photo-1507003211169-0a1dd7228f2d"),
      alt: "Hải looking thoughtfully past the camera in natural light.",
    },
  },
  {
    scene: "04",
    givenName: "Thu",
    descriptor: "Maps emotion onto geography until both admit they are the same story.",
    verse: "Rain reorganizes cities emotionally before it reorganizes traffic.",
    vietnamAnchor: "Night walks in Đà Nẵng and Hội An — neon dragged through puddles, bridges as emotional hinges.",
    paragraphs: [
      "Thu edits the atlas like a film: pacing matters more than coverage. She refuses to flatten provinces into bullet points; she lets rivers carry paragraphs, lets mountain passes interrupt chapters so breath catches where legs once burned. Her Vietnam rewards curiosity without demanding speed.",
      "She believes travelers deserve intimacy without surveillance — suggestions instead of commands, margins instead of marquees. If Đất Việt feels cinematic, it is because Thu insists every route keeps room for the scene you cannot schedule: an auntie’s joke, a missed turn that becomes the story.",
    ],
    portrait: {
      src: teamImage("photo-1534528741775-53994a69daeb"),
      alt: "Thu turned slightly toward warm light, contemplative portrait.",
    },
    secondaryStill: {
      src: teamImage("photo-1548919973-5cef6c43b3e1"),
      alt: "Urban street at night with reflections on wet pavement.",
      aspect: "aspect-[3/4]",
    },
  },
] as const;

/** Pull quote for the sand-band interlude between chapters. */
export const teamInterludeQuote =
  "We do not ‘lead’ Vietnam from a slide deck — we follow it with notebooks fogged by broth steam, microphones kissed by tide, and lenses cleaned with the hem of a shirt because the moment refused to wait.";
