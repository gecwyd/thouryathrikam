export type StageType = "on-stage" | "off-stage";

export type EventCategory =
  | "Music"
  | "Musical Instruments"
  | "Dance"
  | "Theatre"
  | "Literary & Oratory"
  | "Fine Arts & Visual Arts";

export interface FestivalEvent {
  id: string;
  name: string;
  stageType: StageType;
  category: EventCategory;
  type: "solo" | "group" | "duet";
  gender?: "male" | "female" | "combined" | "open";
  duration?: string;
  participantsCount?: string | number;
  accompanistsCount?: string | number;
  settingTime?: string;
  guidelines: string[];
}

export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "EC1", name: "Electronics & Communication Engineering 1" },
  { code: "EC2", name: "Electronics & Communication Engineering 2" },
  { code: "EEE", name: "Electrical & Electronics Engineering" },
  { code: "ME", name: "Mechanical Engineering" },
  { code: "CEE", name: "Civil Engineering" },
];

export const FESTIVAL_EVENTS: FestivalEvent[] = [
  {
    "id": "light-music",
    "name": "Light Music",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "accompanistsCount": 2,
    "guidelines": [
      "Duration ? 5 minutes",
      "Separate for Male and Female",
      "2 accompanists are allowed"
    ]
  },
  {
    "id": "classical-hindustani-music",
    "name": "Classical Hindustani Music",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Separate for Male and Female",
      "It must be either Hindustani Music"
    ]
  },
  {
    "id": "classical-carnatic-music",
    "name": "Classical Carnatic Music",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Separate for Male and Female",
      "It must be either Carnatic Music"
    ]
  },
  {
    "id": "mappilappattu-group",
    "name": "Mappilappattu (Group)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "5 minutes",
    "participantsCount": 6,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participants: 6 (Male and Female combined)"
    ]
  },
  {
    "id": "mappilappattu-solo",
    "name": "Mappilappattu (Solo)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 5 minutes",
      "Separate for Male and Female"
    ]
  },
  {
    "id": "group-song-indian",
    "name": "Group Song (Indian)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 7,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 6"
    ]
  },
  {
    "id": "group-song-western",
    "name": "Group Song (Western)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 7,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 6"
    ]
  },
  {
    "id": "vocal-western-solo",
    "name": "Vocal Western (Solo)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "4-6 minutes",
    "participantsCount": 1,
    "accompanistsCount": 2,
    "guidelines": [
      "Duration ? 4-6 minutes",
      "Separate for Male and Female",
      "Karoke File must in Mp3 format and it must be submitted before hand."
    ]
  },
  {
    "id": "semiclassical-hindustani-song",
    "name": "Semiclassical Hindustani Song",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "8-10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 8-10 minutes",
      "Separate for Male and Female",
      "Sruthi Box can added",
      "It must be  Hindustani Music"
    ]
  },
  {
    "id": "semiclassical-carnatic-song",
    "name": "Semiclassical Carnatic Song",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "8-10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 8-10 minutes",
      "Separate for Male and Female",
      "Sruthi Box can added",
      "It must be Carnatic Music"
    ]
  },
  {
    "id": "patriotic-song-malayalam",
    "name": "Patriotic Song (Malayalam)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "5 minutes",
    "participantsCount": 7,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participants ? 7"
    ]
  },
  {
    "id": "vanchipattu-group",
    "name": "Vanchipattu (Group)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10"
    ]
  },
  {
    "id": "ganamela",
    "name": "Ganamela",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 3,
    "accompanistsCount": 4,
    "settingTime": "7 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 3",
      "Accompanists ? 4",
      "The instruments should be played by the participants themselves",
      "Setting Time ? 7 minutes"
    ]
  },
  {
    "id": "recitation-solo",
    "name": "Recitation (Solo)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "accompanistsCount": 1,
    "guidelines": [
      "Languages: Malayalam, English, Hindi, Arabic, Urdu, Sanskrit, Tamil",
      "Duration ? 5 minutes",
      "Accompanists ? 1"
    ]
  },
  {
    "id": "gazal-solo",
    "name": "Gazal (Solo)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "accompanistsCount": 2,
    "guidelines": [
      "Duration ? 10 minutes",
      "Accompanists ? 2 (Harmonium and Tabla)",
      "Filmy Gazals are not allowed"
    ]
  },
  {
    "id": "keyboard-solo",
    "name": "Keyboard - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "guitar-solo",
    "name": "Guitar - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "violin-solo",
    "name": "Violin - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "tabla-solo",
    "name": "Tabla - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "flute-solo",
    "name": "Flute- Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "Melodica-solo",
    "name": "Melodica- Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "harmonica-solo",
    "name": "Harmonica- Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "drums-solo",
    "name": "Drums - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "veena-solo",
    "name": "Veena - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "melodica-solo",
    "name": "Melodica - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "mridangam-solo",
    "name": "Mrindangam - Solo",
    "stageType": "on-stage",
    "category": "Musical Instruments",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 10 minutes",
      "Setting Time ? 5 minutes",
      "The music instruments should be carried by the participants",
      "It can Carnatic or Western. No mixing of two styles."
    ]
  },
  {
    "id": "kathakali-solo",
    "name": "Kathakali (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "15 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 15 minutes",
      "Separate for Male and Female"
    ]
  },
  {
    "id": "bharatanatyam-solo",
    "name": "Bharatanatyam (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "15 minutes",
    "participantsCount": 1,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 15 minutes",
      "Accompanists ? 3"
    ]
  },
  {
    "id": "mohiniyattom-solo",
    "name": "Mohiniyattom (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "female",
    "duration": "15 minutes",
    "participantsCount": 1,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 15 minutes",
      "Accompanists ? 3"
    ]
  },
  {
    "id": "Cinematic-dance-solo",
    "name": "Cinematic Dance (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 5 minutes",
      "File must in Mp3 format and it must be submitted before hand"
    ]
  },
  {
    "id": "Group-dance-group",
    "name": "Group Dance (Classical)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 7,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 10 minutes",
      "A team of 7 members is chosen for participation.",
      "Judging of this item will be on the basis of quality of dancing, makeup and costumes."
    ]
  },
  {
    "id": "Duet-dance",
    "name": "Duet Dance",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "duet",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 2,
    "accompanistsCount": 1,
    "guidelines": [
      "Duration ? 5 minutes",
      "File must in Mp3 format and it must be submitted before hand",
      "?Preference:(Boy,Boy),(Girl,Boy),(Girl, Girl)"
    ]
  },
  {
    "id": "keralanadanam-solo",
    "name": "Keralanadanam (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "15 minutes",
    "participantsCount": 1,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 15 minutes",
      "Accompanists ? 3"
    ]
  },
  {
    "id": "folk-dance-solo",
    "name": "Folk Dance (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Separate for Male and Female",
      "For various dance items non students shall be allowed to provide background music"
    ]
  },
  {
    "id": "koodiyattom",
    "name": "Koodiyattom",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "30 minutes",
    "participantsCount": 7,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 30 minutes",
      "Participants ? 7",
      "Setting Time ? 5 minutes"
    ]
  },
  {
    "id": "chakyarkoothu-male",
    "name": "Chakyarkoothu (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "male",
    "duration": "20 minutes",
    "participantsCount": 1,
    "accompanistsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 20 minutes",
      "Participant ? 1",
      "Accompanists ? 1",
      "Setting Time ? 5 minutes"
    ]
  },
  {
    "id": "nangyarkoothu-female",
    "name": "Nangyarkoothu (Female)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "female",
    "duration": "20 minutes",
    "participantsCount": 1,
    "accompanistsCount": 1,
    "settingTime": "5 minutes",
    "guidelines": [
      "Duration ? 20 minutes",
      "Participant ? 1",
      "Accompanists ? 1",
      "Setting Time ? 5 minutes"
    ]
  },
  {
    "id": "thiruvathirakali-female",
    "name": "Thiruvathirakali (Female)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "female",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10",
      "Traditional form of Thiruvathirakali not any other form of Kaikottikali"
    ]
  },
  {
    "id": "oppana-female",
    "name": "Oppana (Female)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "female",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10"
    ]
  },
  {
    "id": "margamkali-female",
    "name": "Margamkali (Female)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "female",
    "duration": "10 minutes",
    "participantsCount": 7,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 7"
    ]
  },
  {
    "id": "kolkali-male",
    "name": "Kolkali (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 12,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 12",
      "Traditional folk art Kolkali not Kolattam"
    ]
  },
  {
    "id": "duffmutte-male",
    "name": "Duffmutte (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10"
    ]
  },
  {
    "id": "parichamutte-male",
    "name": "Parichamutte (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 8,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 8"
    ]
  },
  {
    "id": "poorakali-male",
    "name": "Poorakali (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 12,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 12"
    ]
  },
  {
    "id": "arbanamutte-male",
    "name": "Arbanamutte (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10"
    ]
  },
  {
    "id": "vattapatte-male",
    "name": "Vattapatte (Male)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "male",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10"
    ]
  },
  {
    "id": "step-n-synchro",
    "name": "Step N Synchro",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 2,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participants ? 2",
      "Pairs can be same gender or different genders"
    ]
  },
  {
    "id": "theme-dance",
    "name": "Theme Dance",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10",
      "Theme will be provided prior"
    ]
  },
  {
    "id": "nostalgia",
    "name": "Nostalgia",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 10",
      "Songs must be that of before 1980",
      "Remix are not allowed",
      "Meant for Final years"
    ]
  },
  {
    "id": "spot-dance",
    "name": "Spot Dance",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Participant ? 1",
      "Songs will be played on the spot"
    ]
  },
  {
    "id": "chavittunadakam",
    "name": "Chavittunadakam",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration: 10 minutes",
      "Participants: 10",
      "Non-students are allowed to provide background music (vocal & instrumental)",
      "Grace time of 30 seconds shall be given",
      "File must be in MP3 format and submitted beforehand"
    ]
  },
  {
    "id": "ottanthullal",
    "name": "Ottanthullal",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration: 10 minutes",
      "Solo performance",
      "Non-students are allowed to provide background music (vocal & instrumental)",
      "Grace time of 30 seconds shall be given"
    ]
  },
  {
    "id": "western-dance-solo",
    "name": "Western Dance (Solo)",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Solo performance",
      "Duration: 5 minutes",
      "File must be in MP3 format and submitted beforehand"
    ]
  },
  {
    "id": "digital-painting",
    "name": "Digital Painting",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "1 hour",
    "participantsCount": 1,
    "guidelines": [
      "Duration will not be more than 1 hour",
      "Only MS Paint can be used",
      "Resolution: 300 ppi; Canvas size: 1080 x 1080 px; Format: JPG",
      "No external images allowed",
      "Standard colour mode can be RGB grayscale or CMYK system",
      "Laptops must be brought by the participants themselves; mobile phones are not allowed"
    ]
  },
  {
    "id": "calligraphy",
    "name": "Calligraphy",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "1 hour",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Duration will not be more than 1 hour",
      "Bring own calligraphy pens, ink, and drawing materials",
      "Paper supplied at the venue; mobile phones are not allowed"
    ]
  },
  {
    "id": "film-song-solo",
    "name": "Film Song (Solo)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Solo performance",
      "Duration: 5 minutes",
      "Karaoke file must be in MP3 format and submitted beforehand"
    ]
  },
  {
    "id": "film-song-duet",
    "name": "Film Song (Duet)",
    "stageType": "on-stage",
    "category": "Music",
    "type": "duet",
    "gender": "open",
    "duration": "5 minute",
    "participantsCount": 2,
    "guidelines": [
      "Number of participants: 2",
      "Duration: 5 minutes",
      "Karoke File must in Mp3 format and it must be submitted before hand"
    ]
  },
  {
    "id": "nadanpattu",
    "name": "Nadanpattu",
    "stageType": "on-stage",
    "category": "Music",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 7,
    "guidelines": [
      "Team of up to 7 members",
      "Duration: 10 minutes",
      "Tradition of the folk song to be revealed on stage (Anushtana Pattukal, Festival Songs, Kaali Pattu)",
      "Background music and karaoke prohibited",
      "Maximum 3 instruments allowed; participants must play them themselves"
    ]
  },
  {
    "id": "elocution",
    "name": "Elocution",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Topic will be informed beforehand",
      "Time duration: Restricted to 10 minutes",
      "Languages: Malayalam, English, Hindi, Sanskrit, Arabic"
    ]
  },
  {
    "id": "extempore",
    "name": "Extempore",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "3 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Subjects announced 5 minutes before competition",
      "Each participant gets 3 minutes to speak",
      "Languages: Malayalam, English, Tamil, Sanskrit, Hindi",
      "Mobile phones are not allowed"
    ]
  },
  {
    "id": "film-review",
    "name": "Film Review",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "5-10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Review based on film screened prior to the competition",
      "Time allowed: 5 to 10 minutes",
      "Review can be delivered in English or Malayalam"
    ]
  },
  {
    "id": "fancy-dress",
    "name": "Fancy Dress",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "solo",
    "gender": "open",
    "duration": "3 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Solo performance; maximum allotted time: 3 minutes",
      "Dress must be carried by participants",
      "Background music and dialogues are allowed",
      "Costume should not completely mask performance; movements required",
      "Judged on costume presentation and character portrayal"
    ]
  },
  {
    "id": "anchoring-competition",
    "name": "Anchoring Competition",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Topic will be informed on the spot",
      "5 minutes preparation time; 5 minutes performance time",
      "Languages: English, Malayalam"
    ]
  },
  {
    "id": "western-dance",
    "name": "Western Dance",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": "2026-08-09T18:30:00.000Z",
    "guidelines": [
      "Duration ? 10 minutes",
      "Participants ? 8-10"
    ]
  },
  {
    "id": "kathak-dance",
    "name": "Kathak",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Grace time of 30 seconds shall be given",
      "For various dance items non students shall be allowed to provide background music(both vocal & Instrumental)",
      "File must in Mp3 format and it must be submitted before hand"
    ]
  },
  {
    "id": "kuchipudi-dance",
    "name": "Kuchipudi",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "solo",
    "gender": "combined",
    "duration": "10 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 10 minutes",
      "Grace time of 30 seconds shall be given",
      "For various dance items non students shall be allowed to provide background music(both vocal & Instrumental)",
      "File must in Mp3 format and it must be submitted before hand"
    ]
  },
  {
    "id": "fashion-show",
    "name": "Fashion Show",
    "stageType": "on-stage",
    "category": "Dance",
    "type": "group",
    "gender": "combined",
    "duration": "15 minutes",
    "participantsCount": 10,
    "guidelines": [
      "Duration ? 15 minutes",
      "Participants ? 10",
      "Theme will be provided prior"
    ]
  },
  {
    "id": "drama",
    "name": "Drama (English / Malayalam)",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "group",
    "gender": "combined",
    "duration": "30 minutes",
    "participantsCount": 7,
    "accompanistsCount": 3,
    "settingTime": "10 minutes",
    "guidelines": [
      "Duration ? 30 minutes",
      "Participants ? 7",
      "Accompanists ? 3",
      "Setting Time ? 10 minutes",
      "Language: English or Malayalam"
    ]
  },
  {
    "id": "skit",
    "name": "Skit (English / Malayalam)",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "group",
    "gender": "combined",
    "duration": "8-10 minutes",
    "participantsCount": 6,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 8-10 minutes",
      "Participants ? 6",
      "Accompanists ? 3",
      "Language: English or Malayalam"
    ]
  },
  {
    "id": "mime",
    "name": "Mime",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "group",
    "gender": "combined",
    "duration": "5 minutes",
    "participantsCount": 6,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participants ? 6"
    ]
  },
  {
    "id": "kadhaprasangam",
    "name": "Kadhaprasangam",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "solo",
    "gender": "open",
    "duration": "15 minutes",
    "participantsCount": 1,
    "accompanistsCount": 3,
    "guidelines": [
      "Duration ? 15 minutes",
      "Participant ? 1",
      "Accompanists ? 3"
    ]
  },
  {
    "id": "monoact",
    "name": "Monoact",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participant ? 1"
    ]
  },
  {
    "id": "mimicry",
    "name": "Mimicry",
    "stageType": "on-stage",
    "category": "Theatre",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Duration ? 5 minutes",
      "Participant ? 1"
    ]
  },
  {
    "id": "debate",
    "name": "Debate",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "group",
    "gender": "open",
    "duration": "4-5 minutes",
    "participantsCount": 2,
    "guidelines": [
      "Duration: 4?5 minutes",
      "Participants: Each department shall be represented by one team consisting of two participants",
      "Language: English and Malayalam will be conducted as separate competitions",
      "Topic provided at venue on the spot",
      "One speaks in favour, one speaks against",
      "Judged on content, clarity, presentation, relevance, confidence, and skills"
    ]
  },
  {
    "id": "quiz",
    "name": "Quiz",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "group",
    "gender": "open",
    "participantsCount": 2,
    "guidelines": [
      "Team: 2 participants",
      "The Quizmaster's decision will be final",
      "The quiz will consist of multiple rounds.",
      "Tie - breaker will be conducted if required.",
      "No prompting or external assistance is permitted.",
      "Participants must maintain discipline and decorum.",
      "Mobile phones and electronic devices are not allowed.",
      "Questions will be based on General Knowledge & Current Affairs."
    ]
  },
  {
    "id": "aksharashloka",
    "name": "Aksharashloka",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Repetition of previously recited verses is not allowed",
      "Time limit as decided by the organisers"
    ]
  },
  {
    "id": "essay-writing",
    "name": "Essay Writing",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Topic given 10 minutes before competition",
      "Writing materials provided by the Union"
    ]
  },
  {
    "id": "short-story-writing",
    "name": "Short Story Writing",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Topic given 10 minutes before competition",
      "Story must be original and written on the spot",
      "Writing materials provided by the Union"
    ]
  },
  {
    "id": "poetry-writing",
    "name": "Poetry Writing",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Topic given 10 minutes before competition",
      "No external assistance allowed",
      "Judges decision is final",
      "Original work only; materials provided by Union"
    ]
  },
  {
    "id": "speech-competition",
    "name": "Speech Competition",
    "stageType": "off-stage",
    "category": "Literary & Oratory",
    "type": "solo",
    "gender": "open",
    "duration": "5 minutes",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 5 minutes",
      "Topic given 5 minutes before competition",
      "Speech delivered on the spot without external assistance"
    ]
  },
  {
    "id": "rangoli",
    "name": "Rangoli",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2.5 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Maximum Duration: 2.5 hours",
      "Participants must bring all required colour powder and tools themselves",
      "Adhesive materials strictly prohibited"
    ]
  },
  {
    "id": "water-colour-painting",
    "name": "Water Colour Painting",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Paper provided by Union; bring watercolour materials and tools",
      "Topic given 5 minutes before competition"
    ]
  },
  {
    "id": "oil-colour-painting",
    "name": "Oil Colour Painting",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "3 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 3 hours",
      "Paper provided by Union; bring oil colours and painting tools",
      "Topic given 5 minutes before competition"
    ]
  },
  {
    "id": "cartoon-drawing",
    "name": "Cartoon Drawing",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "1 hour",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 1 hour",
      "Paper provided by Union; bring drawing tools",
      "Topic given 10 minutes before competition"
    ]
  },
  {
    "id": "pencil-drawing",
    "name": "Pencil Drawing",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Paper provided by Union; bring drawing tools",
      "Only pencil drawing allowed",
      "Topic given 10 minutes before competition"
    ]
  },
  {
    "id": "embroidery",
    "name": "Embroidery",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Duration: 2 hours",
      "Cloth provided by organisers; bring embroidery materials and tools",
      "Reference picture provided at the spot"
    ]
  },
  {
    "id": "poster-making",
    "name": "Poster Making",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2.5 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2.5 hours",
      "Paper provided by Union; bring drawing/colouring materials",
      "Topic given 10 minutes before competition"
    ]
  },
  {
    "id": "spot-photography",
    "name": "Spot Photography",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2-2.5 hours",
    "participantsCount": 1,
    "guidelines": [
      "Duration: 2?2.5 hours",
      "Individual participation",
      "No editing or filters allowed",
      "Theme/topic given on the spot",
      "Judges decision shall be final and binding",
      "Mobile phone photography only; bring own phone",
      "Both colour and black-and-white photographs are allowed.",
      "The photograph must be captured during the competition period"
    ]
  },
  {
    "id": "face-painting",
    "name": "Face Painting",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "group",
    "gender": "open",
    "duration": "1.5 hours",
    "participantsCount": "1 participant + 1 assistant",
    "guidelines": [
      "1 participant + 1 assistant (model)",
      "Time limit: 1.5 hours",
      "Bring all required skin-safe materials",
      "Theme/reference provided at the spot"
    ]
  },
  {
    "id": "mehendi",
    "name": "Mehendi",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "1.5 hours",
    "participantsCount": 1,
    "guidelines": [
      "Duration: 1.5 hours",
      "Mehendi provided by organisers",
      "Hand prints, moulds, and reference designs are strictly not allowed",
      "Design must extend at least 6 inches onto the forearm"
    ]
  },
  {
    "id": "collage-making",
    "name": "Collage Making",
    "stageType": "off-stage",
    "category": "Fine Arts & Visual Arts",
    "type": "solo",
    "gender": "open",
    "duration": "2 hours",
    "participantsCount": 1,
    "guidelines": [
      "Individual participation",
      "Time limit: 2 hours",
      "Bring scissors, glue, paper cuttings, and required materials",
      "Topic given on the spot"
    ]
  }
];
