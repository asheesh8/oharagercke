/**
 * Single source of truth for all O'Hara & Gercke content.
 * Content + photography recreated from the firm's existing site (oharagercke.com).
 * Used both to seed the database (prisma/seed.ts) and as a read-time fallback
 * when no DATABASE_URL is configured (lib/content.ts).
 */

export type Category = "New Home" | "Renovation" | "Specialty";
export type Region = "Vermont" | "New Hampshire";

export type ProjectImageSeed = { src: string; alt: string };

export type ProjectSeed = {
  slug: string;
  title: string;
  location: string;
  region: Region;
  category: Category;
  excerpt: string;
  description: string;
  credits: { role: string; name: string }[];
  imageCount: number;
  featured: boolean;
  order: number;
};

export type TestimonialSeed = {
  quote: string;
  town: string;
  order: number;
};

export type TeamMemberSeed = {
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string | null;
  order: number;
};

const P = (slug: string) => (n: number) =>
  `/projects/${slug}/${String(n).padStart(2, "0")}.jpg`;

export function projectImages(
  slug: string,
  count: number,
  title: string
): ProjectImageSeed[] {
  const src = P(slug);
  return Array.from({ length: count }, (_, i) => ({
    src: src(i + 1),
    alt: `${title} — ${i === 0 ? "featured view" : `detail ${i + 1}`}`,
  }));
}

export function coverFor(slug: string): string {
  return `/projects/${slug}/01.jpg`;
}

export const projects: ProjectSeed[] = [
  {
    slug: "new-hampshire-net-zero-lake-house",
    title: "New Hampshire Net Zero Lake House",
    location: "New Hampshire",
    region: "New Hampshire",
    category: "New Home",
    excerpt:
      "A modern house clad in dark siding with black accents, opening to panoramic lake views from every major room.",
    description:
      "This modern house clad in dark siding with black accents punctuated with abundant glazing presents panoramic lake views from every major room. Built to Net Zero standards, it pairs a crisp contemporary silhouette with the warmth and efficiency the firm is known for.",
    credits: [
      { role: "Architect", name: "KOAN Workshop Architects" },
      { role: "Photography", name: "Rob Karosis Photography" },
    ],
    imageCount: 10,
    featured: true,
    order: 1,
  },
  {
    slug: "vermont-lake-house",
    title: "Vermont Lake House",
    location: "Vermont",
    region: "Vermont",
    category: "New Home",
    excerpt:
      "Perched on rock outcroppings, a multi-level lake house with broad views and hardscapes down to the shore.",
    description:
      "Perched on rock outcroppings, this multi-level lake house enjoys broad views and extensive exterior hardscapes down to the lake shore. Careful siting and layered stone terraces knit the home into its dramatic waterfront setting.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Photography", name: "Rob Karosis Photography" },
    ],
    imageCount: 10,
    featured: true,
    order: 2,
  },
  {
    slug: "natatorium-central-vermont",
    title: "Natatorium, Central Vermont",
    location: "Central Vermont",
    region: "Vermont",
    category: "Specialty",
    excerpt:
      "A shingle-clad timber-frame structure housing a year-round pool, wrapped in gorgeous interior detailing.",
    description:
      "Situated in an extraordinary rural setting, a shingle-clad timber-frame structure houses a year-round pool surrounded by gorgeous interior detailing and spacious exterior hardscapes. Folding glass walls open the room entirely to the mountain view beyond.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Photography", name: "Rob Karosis Photography" },
    ],
    imageCount: 10,
    featured: true,
    order: 3,
  },
  {
    slug: "in-town-renovation-hanover-nh",
    title: "In Town Renovation, Hanover, NH",
    location: "Hanover, NH",
    region: "New Hampshire",
    category: "Renovation",
    excerpt:
      "A Hanover residence brought back from serious disrepair, with a glass foyer floor revealing the wine cellar below.",
    description:
      "This Hanover residence had fallen into serious disrepair before its renovation and modernization efforts were undertaken. The front porch with its arch-topped entry door opens into a foyer with a glass floor revealing the wine cellar one story below. Many modern elements spark the stylish interior, and the master balcony and extensive granite terraces overlook a pond to the rear.",
    credits: [
      { role: "Landscape Architect", name: "Janet Cavanaugh Landscape Architect" },
    ],
    imageCount: 10,
    featured: false,
    order: 4,
  },
  {
    slug: "contemporary-residence-hanover-nh",
    title: "Contemporary Residence, Hanover, NH",
    location: "Hanover, NH",
    region: "New Hampshire",
    category: "New Home",
    excerpt:
      "A contemporary home of light woods, high windows and concrete counters, tucked into a mature wooded lot.",
    description:
      "This contemporary residence replaced a small, c. 1950's split level at the same address, in which the owner grew up. Modern elements include light natural woods and painted surfaces, high windows, and wood and concrete countertops, all tucked into the corner of a mature wooded lot.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Landscape Architect", name: "Janet Cavanaugh Landscape Architect" },
      { role: "Interior", name: "DPF Design" },
    ],
    imageCount: 10,
    featured: false,
    order: 5,
  },
  {
    slug: "new-residence-strafford-vt",
    title: "New Residence, Strafford, VT",
    location: "Strafford, VT",
    region: "Vermont",
    category: "New Home",
    excerpt:
      "A hilltop home and guest house joined by a shared porch, framing the Green Mountains through barrel-vaulted ceilings.",
    description:
      "This hilltop home and guest house are connected by a shared porch, and owe their inspiration to the owner's summer visits to a family beach house. The intersecting barrel vaults in the ceilings frame the distant views of the Green Mountains, which are also prominent from the stone terrace adjacent to the screen porch.",
    credits: [{ role: "Architect", name: "Rob Brown Architects" }],
    imageCount: 9,
    featured: true,
    order: 6,
  },
  {
    slug: "renovated-classic-west-windsor-vt",
    title: "Renovated Classic, West Windsor, VT",
    location: "West Windsor, VT",
    region: "Vermont",
    category: "Renovation",
    excerpt:
      "A four-chimney brick colonial renovated with a contemporary post-and-beam ell built from reclaimed materials.",
    description:
      "A classic four-chimney brick colonial was renovated and a contemporary post-and-beam ell and garage were created utilizing reclaimed roof slates and barn siding. A private stone terrace was created with local stone and features a hot tub and outdoor shower.",
    credits: [{ role: "Architect", name: "UK Architects" }],
    imageCount: 10,
    featured: false,
    order: 7,
  },
  {
    slug: "modern-home-northfield-vt",
    title: "Modern Home, Northfield, VT",
    location: "Northfield, VT",
    region: "Vermont",
    category: "Renovation",
    excerpt:
      "An 'old meets new' addition transforming a traditional farmhouse into a three-generation homestead.",
    description:
      "In an enticing “old meets new” undertaking, a modern addition was created to transform a traditional farmhouse into a three-generation homestead. A mix of polished concrete and hardwood floors, radiant heat, fir cabinets and concrete countertops provide contemporary touches to the interior, and bold colors and exposed steel accent the exterior.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Landscape Architect", name: "Janet Cavanaugh Landscape Architect" },
    ],
    imageCount: 9,
    featured: false,
    order: 8,
  },
  {
    slug: "farmhouse-addition-and-cabin-getaway-central-vermont",
    title: "Farmhouse Addition and Cabin Getaway, Central Vermont",
    location: "Central Vermont",
    region: "Vermont",
    category: "Renovation",
    excerpt:
      "A post-and-beam barn added to a renovated farmhouse, with an oak-framed getaway cabin on the property's highest point.",
    description:
      "This Central Vermont retreat was created when an impressive post-and-beam barn was added to a renovated farmhouse. A getaway cabin with oak post-and-beam structure and arched trusses was built on the property's highest point, utilizing local stone for the chimney and porch floor and boasting stunning views of the surrounding mountains.",
    credits: [{ role: "Architect", name: "UK Architects" }],
    imageCount: 10,
    featured: false,
    order: 9,
  },
  {
    slug: "contemporary-small-residence-norwich-vt",
    title: "Contemporary Small Residence, Norwich, VT",
    location: "Norwich, VT",
    region: "Vermont",
    category: "New Home",
    excerpt:
      "An award-winning, highly energy-efficient home mixing concrete, steel, stucco and wood on a ledge outcropping.",
    description:
      "This award-winning contemporary home presents a highly energy-efficient package mixing textures of concrete, steel, stucco and wood. Dramatic windows and a carport supported by ledge outcroppings contribute to the modern feeling. Featured in Vermont Magazine, September/October 2009.",
    credits: [{ role: "Architect", name: "Watershed Studio Architecture" }],
    imageCount: 8,
    featured: false,
    order: 10,
  },
  {
    slug: "artists-studio-norwich-vt",
    title: "Artist's Studio, Norwich, VT",
    location: "Norwich, VT",
    region: "Vermont",
    category: "Specialty",
    excerpt:
      "A painter's studio on a commanding site, with wood-clad cathedral ceilings and a mahogany wrap-around deck.",
    description:
      "The owners selected a commanding site to create their painter's studio, which features wood-clad cathedral ceilings, abundant natural light and splashes of color. A mahogany wrap-around deck with a cable rail system preserves views in all directions.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Landscape Architect", name: "Janet Cavanaugh Landscape Architect" },
    ],
    imageCount: 9,
    featured: false,
    order: 11,
  },
  {
    slug: "timber-framed-retail-west-lebanon-nh",
    title: "Timber Framed Retail, West Lebanon, NH",
    location: "West Lebanon, NH",
    region: "New Hampshire",
    category: "Specialty",
    excerpt:
      "A unique retail space for a feed and supply store, crowned by a timber-trussed roof with metal ties and buckles.",
    description:
      "A local company was inspired to create a unique retail space for its feed and supply store. The timber-trussed roof with metal ties and buckles unfailingly attracts the favorable notice of its customers.",
    credits: [{ role: "Architect", name: "TU Architects" }],
    imageCount: 7,
    featured: false,
    order: 12,
  },
  {
    slug: "fraternity-house-dartmouth-college-hanover-nh",
    title: "Fraternity House, Dartmouth College, Hanover, NH",
    location: "Hanover, NH",
    region: "New Hampshire",
    category: "Renovation",
    excerpt:
      "A dated house on Dartmouth's Fraternity Row revived with a top-to-bottom renovation and code modernization.",
    description:
      "A dated house on Dartmouth's Fraternity Row was brought back to life with a top-to-bottom renovation — including modernized mechanical systems, many code updates and a revitalized exterior.",
    credits: [
      { role: "Architect", name: "Smith & Vansant Architects" },
      { role: "Landscape Architect", name: "Saucier & Flynn Landscape Architects" },
    ],
    imageCount: 10,
    featured: false,
    order: 13,
  },
];

export const testimonials: TestimonialSeed[] = [
  {
    quote:
      "O'Hara & Gercke demolished our expectations, all for the better. The team is organized, timely and meticulous. They produced an exceptional product and they are all around terrific people. If you recognize that an exceptional process and job experience are as important as the final product, you'll hire O'Hara & Gercke every single time.",
    town: "Hanover, NH",
    order: 1,
  },
  {
    quote:
      "Thanks to you and the rest of the gang at OHG, I have a beautiful house made by skilled and dedicated people.",
    town: "Hanover, NH",
    order: 2,
  },
  {
    quote:
      "I was sitting on our deck and thinking about what a great job you guys did for us.",
    town: "Lyme, NH",
    order: 3,
  },
  {
    quote:
      "Your guys are doing such a great job. They really have been so quiet and courteous, and their work is just beautiful.",
    town: "Wilder, VT",
    order: 4,
  },
  {
    quote:
      "We really enjoy working with your project manager; he is incredibly positive, responsive, creative and communicates very well.",
    town: "Hanover, NH",
    order: 5,
  },
  {
    quote:
      "Every step of the way he was knowledgeable, conscientious, thorough and consistently followed through in tying up loose ends.",
    town: "Lebanon, NH",
    order: 6,
  },
  {
    quote:
      "The place really does look great. You guys have done a wonderful job. You should be proud of what you and your team have done!",
    town: "Stockbridge, VT",
    order: 7,
  },
  {
    quote:
      "We couldn't be happier with how this whole project and process went. You and your team were fantastic to work with.",
    town: "Norwich, VT",
    order: 8,
  },
  {
    quote:
      "You guys have all been great on proactive communication, a rare quality in your business.",
    town: "Thetford, VT",
    order: 9,
  },
  {
    quote:
      "We do, indeed, adore our place, and also so appreciate the ease of working with OHG!",
    town: "Norwich, VT",
    order: 10,
  },
];

export const team: TeamMemberSeed[] = [
  {
    name: "Kevin O'Hara",
    role: "Principal",
    email: "kevin@oharagercke.com",
    bio: "Co-founded O'Hara & Gercke in 2002 with a focus on residential construction and an uncompromising standard of craft.",
    photo: null,
    order: 1,
  },
  {
    name: "James Gercke",
    role: "Principal",
    email: "jgercke@oharagercke.com",
    bio: "Co-founded the firm in 2002, guiding projects from early budgeting through meticulous execution.",
    photo: null,
    order: 2,
  },
  {
    name: "Zach Mitchell",
    role: "Principal",
    email: "zach@oharagercke.com",
    bio: "Joined as a principal in 2022, expanding the firm's management and construction capabilities.",
    photo: null,
    order: 3,
  },
];

export const siteSettings = {
  companyName: "O'Hara & Gercke, Inc.",
  tagline:
    "O'Hara & Gercke, Inc. is a general contractor located in Hartford, Vermont. We work directly with our clients and their architects to define, budget and implement the projects they want to build.",
  heroHeadline: "Building the homes the Upper Valley remembers.",
  heroSubhead:
    "A general contractor in Vermont & New Hampshire, working hand in hand with clients and architects to define, budget and build with craft and care.",
  address: "205 Billings Farm Rd, Suite 3A, White River Junction, VT 05001",
  phone: "802.291.9990",
  email: "office@oharagercke.com",
  heroVideo: "/hero.mp4",
  heroPoster: "/projects/natatorium-central-vermont/01.jpg",
};

export const stats = [
  { value: 2002, label: "Established", isYear: true },
  { value: 24, suffix: "+", label: "Years of craft" },
  { value: 3, label: "Principal builders" },
  { value: 13, label: "Signature projects" },
];

export const approach = [
  {
    title: "Effective communication",
    detail:
      "Clear, proactive conversation from first sketch to final walkthrough — a rarity our clients notice.",
  },
  {
    title: "Rigorous planning",
    detail:
      "We join early to offer technical input and budget guidance long before ground is broken.",
  },
  {
    title: "Transparent budgeting",
    detail:
      "Honest numbers and schedules you can trust, kept current at every stage of the build.",
  },
  {
    title: "Outstanding execution",
    detail:
      "Meticulous, quiet, courteous crews delivering work that is simply beautiful.",
  },
];

export const sustainability = [
  {
    title: "LEED Silver Certified",
    detail: "Third-party verified sustainable building performance.",
  },
  {
    title: "Net Zero & Passive House",
    detail: "Homes that make as much energy as they use — or nearly so.",
  },
  {
    title: "Efficiency VT — Best of the Best",
    detail: "Awarded for Energy Efficient New Construction.",
  },
  {
    title: "Energy Star Partner",
    detail: "A trusted partner for high-performance homebuilding.",
  },
];

export const sustainabilityTechniques = [
  "Solar design",
  "Green roofs",
  "Advanced insulation",
  "Heat-recovery ventilation",
  "Geothermal heating",
  "Masonry heaters",
  "Low-VOC coatings",
];

export const aboutStory = {
  heading: "Creating an optimal building experience",
  paragraphs: [
    "O'Hara & Gercke was established in 2002 by Kevin O'Hara and James Gercke to focus on residential construction. In 2022, Zach Mitchell joined as a principal, expanding the firm's management and construction capabilities.",
    "We emphasize effective communication, rigorous planning, transparency in budgeting and scheduling, attentive project management and outstanding execution. We typically participate in the earliest stages of a project to offer technical input and budget guidance.",
    "Sustainable construction is central to our work. We have built to Passive House and Net Zero standards, earned Efficiency VT's “Best of the Best” award for Energy Efficient New Construction, and completed LEED Silver certified homes.",
  ],
};

export const seedData = {
  projects,
  testimonials,
  team,
  siteSettings,
  stats,
  approach,
  sustainability,
  sustainabilityTechniques,
  aboutStory,
};
