export type HairstyleData = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  matchScore?: string;
  duration: string;
  maintenance: 'Low' | 'Medium' | 'High';
  hairTypes: string[];
  textures: string[];
  faceShapes: string[];
  occasion: string[];
  whyItMatches?: string;
  hasTutorial: boolean;
};

export const MOCK_HAIRSTYLES: HairstyleData[] = [
  {
    id: 'h_box_braids_01',
    name: 'Knotless Box Braids',
    category: 'Braids',
    image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?auto=format&fit=crop&w=800&q=80',
    description: 'Tension-free, natural-looking braids that start with your own hair. Lightweight and incredibly versatile for styling.',
    duration: '4-6 weeks',
    maintenance: 'Low',
    hairTypes: ['Coily', 'Curly', 'Wavy'],
    textures: ['Medium', 'Thick'],
    faceShapes: ['Oval', 'Round', 'Heart'],
    occasion: ['Everyday', 'Vacation'],
    whyItMatches: 'Great match for your preferred protective styles and low maintenance routine.',
    hasTutorial: false,
  },
  {
    id: 'h_twistout_01',
    name: 'Defined Twist Out',
    category: 'Natural',
    image: 'https://images.unsplash.com/photo-1588691535490-252f5dcb3947?auto=format&fit=crop&w=800&q=80',
    description: 'A beautiful, bouncy style achieved by two-strand twisting wet or damp hair and unraveling once dry.',
    duration: '3-7 days',
    maintenance: 'Medium',
    hairTypes: ['Coily', 'Curly'],
    textures: ['Fine', 'Medium', 'Thick'],
    faceShapes: ['Oval', 'Square', 'Oblong'],
    occasion: ['Everyday', 'Work'],
    whyItMatches: 'Matches your hair texture perfectly and keeps your curls hydrated.',
    hasTutorial: true,
  },
  {
    id: 'h_locs_01',
    name: 'Styled Loc Bun',
    category: 'Locs',
    image: 'https://images.unsplash.com/photo-1594998762507-6f8e709a3dc8?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant updo that gathers your locs into a neat, high or low bun. Perfect for keeping hair off your neck.',
    duration: '1-2 weeks',
    maintenance: 'Low',
    hairTypes: ['Coily'],
    textures: ['Thick'],
    faceShapes: ['Oval', 'Heart', 'Diamond'],
    occasion: ['Work', 'Wedding'],
    whyItMatches: 'Beautifully frames your face shape and stays neat for days.',
    hasTutorial: true,
  },
  {
    id: 'h_cornrows_01',
    name: 'Fulani Braids',
    category: 'Braids',
    image: 'https://images.unsplash.com/photo-1531123414708-f5b24479904d?auto=format&fit=crop&w=800&q=80',
    description: 'A mix of cornrows braided front-to-back with some braided in the opposite direction, often adorned with beads.',
    duration: '3-5 weeks',
    maintenance: 'Low',
    hairTypes: ['Coily', 'Curly'],
    textures: ['Medium', 'Thick'],
    faceShapes: ['Oval', 'Round', 'Square'],
    occasion: ['Everyday', 'Festival'],
    whyItMatches: 'A stunning cultural style that aligns with your love for intricate braids.',
    hasTutorial: false,
  },
  {
    id: 'h_washgo_01',
    name: 'Wash and Go',
    category: 'Natural',
    image: 'https://images.unsplash.com/photo-1576828502267-0707ceea5345?auto=format&fit=crop&w=800&q=80',
    description: 'Rock your natural curl pattern defined with gel or styling cream for maximum volume and bounce.',
    duration: '3-5 days',
    maintenance: 'High',
    hairTypes: ['Coily', 'Curly', 'Wavy'],
    textures: ['Fine', 'Medium', 'Thick'],
    faceShapes: ['Oval', 'Round', 'Oblong', 'Square'],
    occasion: ['Everyday'],
    whyItMatches: 'Showcases your natural volume and requires minimal salon visits.',
    hasTutorial: true,
  },
  {
    id: 'h_passion_01',
    name: 'Passion Twists',
    category: 'Protective',
    image: 'https://images.unsplash.com/photo-1518063319523-b1d5d1d64380?auto=format&fit=crop&w=800&q=80',
    description: 'A beautiful boho look that combines the neatness of two-strand twists with the wavy texture of curly extensions.',
    duration: '4-6 weeks',
    maintenance: 'Low',
    hairTypes: ['Coily', 'Curly', 'Wavy'],
    textures: ['Medium', 'Thick'],
    faceShapes: ['Oval', 'Round', 'Heart'],
    occasion: ['Everyday', 'Vacation'],
    whyItMatches: 'Perfect protective style for retaining length with a romantic flair.',
    hasTutorial: true,
  }
];
