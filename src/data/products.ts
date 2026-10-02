import { Product } from '../types';
import { ASSET_IMAGES } from '../assets/images';

export const PRODUCTS: Product[] = [
  {
    id: 'delma-signature-akoya-choker',
    name: 'The Delma Signature Akoya Choker',
    tagline: 'Delma’s flagship creation hand-knotted with AAA Japanese Akoya pearls',
    price: 1850,
    originalPrice: 2100,
    category: 'necklaces',
    pearlType: 'Akoya',
    pearlColor: 'Pure White Rose Overtones',
    pearlSize: '8.5 - 9.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    availableLengths: ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)'],
    rating: 4.95,
    reviewCount: 48,
    inStock: true,
    stockCount: 4,
    badge: 'Bestseller',
    images: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.pearlTypes,
      ASSET_IMAGES.workshop
    ],
    description: 'A benchmark in high-jewelry pearl strands, hand-selected by Delma since 2003. Each Akoya pearl is meticulously graded for deep mirror-like metallic luster, velvety rose blush overtones, and pristine spherical symmetry.',
    story: 'Conceived in Delma’s first Manhattan atelier in late 2003, this necklace embodies the atelier’s core ethos: uncompromised hand-knotting using Japanese double-spun silk.',
    details: [
      'GIA certified AAA grade Japanese Akoya pearls',
      'Hand-knotted on pure Japanese silk cord',
      'Patented 18k gold fluted safety ball clasp with safety tongue',
      'Includes Delma Estd. 2003 Certificate of Authenticity & velvet travel case',
      'Complimentary lifetime ultrasonic check and restringing'
    ],
    materials: [
      'Genuine Japanese Saltwater Akoya Pearls',
      'Solid 18k White Gold Clasp (Hallmarked 750)',
      '100% High-Tensile Japanese Silk Cord'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (95%+ blemish free)',
      shape: 'Perfect Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Mie Prefecture, Ago Bay, Japan'
    },
    care: [
      'Last on, first off: apply cosmetics, perfume, and hairspray prior to wearing.',
      'Wipe with the enclosed lint-free microfiber cloth after every wear.',
      'Store flat in the velvet presentation box away from other faceted gemstones.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'lustre-drop-south-sea-earrings',
    name: 'Lustre Drop South Sea Earrings',
    tagline: 'Sculptural 18k white gold drops adorned with teardrop South Sea pearls',
    price: 1250,
    category: 'earrings',
    pearlType: 'South Sea',
    pearlColor: 'Silvery White with Platinum Overtone',
    pearlSize: '11.0 - 11.5 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    rating: 4.92,
    reviewCount: 32,
    inStock: true,
    stockCount: 3,
    badge: 'Limited Stock',
    images: [
      ASSET_IMAGES.earrings,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.pearlTypes
    ],
    description: 'An architectural union of organic fluidity and precious metal. Two matched South Sea teardrop pearls sway gracefully beneath bezel-set VS1 brilliant pavé diamonds.',
    story: 'South Sea pearls are cultivated for up to three years in the warm bays of Northwestern Australia.',
    details: [
      'Hand-selected matched pair of Australian South Sea pearls',
      'Conflict-free round brilliant diamonds: 0.18 ctw (F/G color, VS clarity)',
      'Comfort-fit French clip backs for secure and balanced evening wear',
      'Engraved Delma crest hallmarking'
    ],
    materials: [
      'Australian South Sea Cultured Pearls',
      '18k White Gold',
      'Natural Brilliant Diamonds (0.18ctw)'
    ],
    specs: {
      luster: 'High Silk Sheen',
      surface: 'Very Light Characteristics (<5%)',
      shape: 'Symmetrical Teardrop',
      nacreThickness: 'Extremely Thick (2.0mm+)',
      origin: 'Kimberley Coast, Australia'
    },
    care: [
      'Gently clean with lukewarm water and a drop of pH-neutral soap if needed.',
      'Dry immediately with a soft cotton cloth.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'aurora-bridal-pearl-choker',
    name: 'The Aurora Bridal Pearl Suite',
    tagline: 'Ethereal Akoya pearls woven with delicate diamond dewdrop accents',
    price: 2450,
    originalPrice: 2800,
    category: 'bridal',
    pearlType: 'Akoya',
    pearlColor: 'Iridescent Ivory & Rose',
    pearlSize: '7.5 - 8.0 mm',
    metal: 'Platinum 950',
    availableMetals: ['Platinum 950', '18k White Gold', '18k Yellow Gold'],
    availableLengths: ['15.5 inch (Petite)', '16.5 inch (Standard)', '18 inch (Princess)'],
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    stockCount: 2,
    badge: 'Heritage Selection',
    images: [
      ASSET_IMAGES.bridal,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.workshop
    ],
    description: 'Designed specifically for the bride seeking timeless dignity. The Aurora suite features three graduated rows of lustrous Japanese Akoya pearls held by a sculpted platinum bar clasp.',
    story: 'First custom-created for a family wedding in 2004, the Aurora suite became Delma’s most celebrated bridal commission.',
    details: [
      'Graduated multi-strand design with platinum stabilizer bars',
      'Custom hidden box clasp with safety latch',
      'Complimentary bespoke sizing and wedding day concierge packaging',
      'Hand-embroidered silk keepsake pouch'
    ],
    materials: [
      'Japanese Akoya Pearls',
      'Solid Platinum 950',
      'Fine Natural Diamonds (0.24 ctw)'
    ],
    specs: {
      luster: 'AAA Exceptional Metallic',
      surface: 'Flawless',
      shape: 'Round',
      nacreThickness: 'Very Thick (0.6mm)',
      origin: 'Nagasaki & Mie, Japan'
    },
    care: ['Store in the provided breathable silk wedding roll.'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'tahitian-peacock-empress-collar',
    name: 'Tahitian Peacock Empress Collar',
    tagline: 'Rare dark Tahitian pearls showing deep peacock green, aubergine and blue',
    price: 3200,
    originalPrice: 3600,
    category: 'necklaces',
    pearlType: 'Tahitian',
    pearlColor: 'Exotic Peacock (Green, Blue, Eggplant)',
    pearlSize: '10.0 - 12.0 mm Graduated',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold'],
    availableLengths: ['17 inch', '19 inch'],
    rating: 5.0,
    reviewCount: 14,
    inStock: true,
    stockCount: 2,
    badge: 'Limited Stock',
    images: [
      ASSET_IMAGES.pearlTypes,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.workshop
    ],
    description: 'An arresting collar of dark French Polynesian pearls. Each gem reveals shifting iridescent overtones reminiscent of peacock plumes and deep oceanic depths.',
    story: 'It requires sorting over 3,000 black-lip oysters to match 35 pearls in this color spectrum.',
    details: [
      'Graduated layout from 10.0mm at the clasp to 12.0mm center focal pearl',
      '18k white gold satin-finished magnetic orb clasp with mechanical lock',
      'Individually hand-knotted on charcoal grey reinforced silk thread'
    ],
    materials: ['Cultured Tahitian Black Pearls', '18k White Gold Clasp', 'Silk Thread'],
    specs: {
      luster: 'Exceptional Metallic Iridescence',
      surface: 'Smooth with natural organic markers (<3%)',
      shape: 'Near-Round to Symmetrical Drop',
      nacreThickness: 'Thick (1.2mm+)',
      origin: 'Tuamotu Archipelago, French Polynesia'
    },
    care: ['Store in original Delma soft leather case.'],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'minima-akoya-pearl-studs',
    name: 'Minima Akoya Pearl Studs',
    tagline: 'The consummate pearl stud: matched spherical Japanese Akoya pearls',
    price: 395,
    category: 'earrings',
    pearlType: 'Akoya',
    pearlColor: 'Pure White with Cool Silver Glow',
    pearlSize: '7.5 - 8.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', '18k Rose Gold', 'Platinum 950'],
    rating: 4.98,
    reviewCount: 76,
    inStock: true,
    stockCount: 14,
    badge: 'Bestseller',
    images: [
      ASSET_IMAGES.earrings,
      ASSET_IMAGES.pearlTypes,
      ASSET_IMAGES.hero
    ],
    description: 'The foundation of every fine jewelry wardrobe. Sourced from the winter harvests of Ago Bay when cooler ocean currents concentrate nacre density for ultimate luster.',
    story: 'Delma has inspected every pair of studs by hand under north-facing studio daylight since 2003.',
    details: [
      'Matched for diameter, tone, reflection sharpness, and pin positioning',
      'Heavy gauge 18k posts with oversized comfort butterfly friction backs',
      'Laser engraved Delma hallmark on post'
    ],
    materials: ['Japanese Akoya Pearls', '18k Solid Gold (Hypoallergenic)'],
    specs: {
      luster: 'AAA Super Sharp Mirror',
      surface: 'Flawless (98%+ clean)',
      shape: 'Perfect Round',
      nacreThickness: '0.45mm',
      origin: 'Ago Bay, Japan'
    },
    care: ['Wipe clean after daily wear before returning to jewelry box.'],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'heirloom-pearl-care-concierge-kit',
    name: 'The Delma Heirloom Pearl Care Set',
    tagline: 'Professional botanical cleaning solution, silk chamois, and storage wrap',
    price: 85,
    category: 'gifts',
    pearlType: 'Freshwater',
    pearlColor: 'N/A',
    pearlSize: 'N/A',
    metal: 'Sterling Silver 925',
    availableMetals: ['Sterling Silver 925'],
    rating: 4.97,
    reviewCount: 88,
    inStock: true,
    stockCount: 30,
    badge: 'Heritage Selection',
    images: [
      ASSET_IMAGES.workshop,
      ASSET_IMAGES.pearlTypes,
      ASSET_IMAGES.hero
    ],
    description: 'Formulated exclusively for Delma’s clients. Free from harsh chemicals, alcohol, and ammonia, preserving delicate organic conchiolin protein.',
    story: 'Pearls are alive with organic luster that degrades under standard jewelry cleaners.',
    details: [
      '200ml pH-balanced organic pearl cleansing emulsion',
      'Hand-cut ultra-dense Italian silk polishing shammy',
      'Foldable travel storage wrap with separate anti-rub channels',
      'Instruction handbook by Delma on generational pearl conservation'
    ],
    materials: ['Natural Botanical Emulsion', 'Italian Silk Shammy', 'Microfiber'],
    specs: {
      luster: 'Restores Natural Luster',
      surface: 'Non-Abrasive',
      shape: 'Universal',
      nacreThickness: 'Safe on all nacre thicknesses',
      origin: 'Artisanal Studio, New York'
    },
    care: ['Store solution in a cool, dry cabinet away from direct sunlight.'],
    isFeatured: false,
    isBestseller: true
  }
];
