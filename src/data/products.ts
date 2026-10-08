import { Product } from '../types';
import { ASSET_IMAGES } from '../assets/images';

export const PRODUCTS: Product[] = [
  {
    id: 'delma-signature-south-sea-necklace',
    name: 'The Delma Signature South Sea Necklace',
    tagline: 'Delma’s flagship creation hand-knotted with AAA South Sea pearls',
    price: 3500,
    originalPrice: 3800,
    category: 'necklaces',
    pearlType: 'South Sea',
    pearlColor: 'Pure White Rose Overtones',
    pearlSize: '10.3 - 17.1 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    availableLengths: ['18 inch (Princess)', '20 inch (Matinee)'],
    rating: 5,
    reviewCount: 48,
    inStock: true,
    stockCount: 4,
    badge: 'Bestseller',
    images: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.hero1,
      ASSET_IMAGES.hero2
    ],
    description: 'Our flagship necklace, strung with AAA-grade South Sea pearls of exceptional size and glow. Each pearl is hand-selected for its mirror-like luster and soft rose overtones, then individually knotted by hand for a graceful drape that moves with you. A timeless heirloom for weddings, milestones, and every moment worth remembering.',
    story: 'The Signature began with a simple question: what would we wear ourselves, every day, for the rest of our lives? It took seasons to answer. We sourced pearls from the clear, nutrient-rich waters where South Sea oysters grow slowly, building layer upon layer of nacre. Only a small fraction of each harvest meets our standard for size, luster, and color. Those chosen few are matched pearl by pearl, then strung and knotted by hand by our artisans. It is the piece that defines Delma, and the one we are proudest to put our name on.',
    details: [
      'GIA certified AAA grade Japanese Akoya pearls',
      'Hand-knotted on pure Japanese silk cord',
      'Patented 18k gold fluted safety ball clasp with safety tongue',
      'Includes Delma Estd. 2003 Certificate of Authenticity & velvet travel case',
      'Complimentary lifetime ultrasonic check and restringing'
    ],
    materials: [
      'Genuine South Sea Pearls',
      'Solid 18k White Gold Clasp (Hallmarked 750)',
      'Natural silk thread, individually knotted'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal to No Visible Blemishes)',
      shape: 'Round to Near-Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines'
    },
    care: [
      'Put your pearls on last, after perfume, hairspray, and makeup, and wipe them with a soft, dry cloth after wearing.',
      'Store flat in the soft pouch or box provided, away from other jewelry that could scratch the surface.',
      'Avoid water, chemicals, and heat. Have the silk restrung and inspected every 1-2 years if worn often.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'lustre-drop-south-sea-earrings',
    name: 'Lustre Drop FW Earrings',
    tagline: 'Sculptural 18k white gold drops adorned with teardrop freshwater pearls',
    price: 127,
    category: 'earrings',
    pearlType: 'Freshwater',
    pearlColor: 'Silvery White with Platinum Overtone',
    pearlSize: '11.0 - 11.5 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    rating: 4.92,
    reviewCount: 32,
    inStock: true,
    stockCount: 100,
    badge: 'New',
    images: [
      ASSET_IMAGES.DangleEarring,
      ASSET_IMAGES.DangleEarring1,
      ASSET_IMAGES.DangleEarring2
    ],
    description: 'An architectural union of organic fluidity and precious metal. Two matched South Sea teardrop pearls sway gracefully beneath bezel-set VS1 brilliant pavé diamonds.',
    story: 'South Sea pearls are cultivated for up to three years in the warm, secluded bays of Northwestern Australia. Each pair is chosen from hundreds of harvest lots to achieve identical tone, curvature, and reflection.',
    details: [
      'Hand-selected matched pair of Australian South Sea pearls',
      'Conflict-free round brilliant diamonds: 0.18 ctw (F/G color, VS clarity)',
      'Comfort-fit French clip backs for secure and balanced evening wear',
      'Engraved Delma crest hallmarking'
    ],
    materials: [
      'Australian South Sea Cultured Pearls',
      '18k White Gold',
      'Natural Natural Brilliant Diamonds (0.18ctw)'
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
      'Dry immediately with a soft cotton cloth.',
      'Never submerge in chemical jewelry dips or steam cleaners.'
    ],
    isFeatured: true,
    isBestseller: false
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
      ASSET_IMAGES.bridal1,
      ASSET_IMAGES.bridal2
    ],
    description: 'Designed specifically for the bride seeking timeless dignity. The Aurora suite features three graduated rows of lustrous Japanese Akoya pearls held by a sculpted Art Deco platinum bar clasp.',
    story: 'First custom-created for a family wedding in 2004, the Aurora suite became Delma’s most celebrated bridal commission. Each piece is crafted upon order in our workshop with personal provenance notes.',
    details: [
      'Graduated multi-strand design with platinum stabilizer bars',
      'Custom hidden box clasp with safety latch',
      'Complimentary bespoke sizing and wedding day concierge packaging',
      'Hand-embroidered silk keepsake pouch'
    ],
    materials: [
      'Akoya Pearls',
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
    care: [
      'Ensure makeup and setting spray are dry before putting on.',
      'Store in the provided breathable silk wedding roll.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'celeste-solitaire-pearl-ring',
    name: 'Celeste Solitaire Pearl Ring',
    tagline: 'Luminous 10mm South Sea pearl cradled in an openwork 18k gold band',
    price: 243,
    category: 'rings',
    pearlType: 'South Sea',
    pearlColor: 'Pure White with Warm Champagne Hue',
    pearlSize: '10.0 - 10.5 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold', '18k Rose Gold'],
    availableSizes: ['5', '6', '7', '8', '9'],
    rating: 4.88,
    reviewCount: 19,
    inStock: true,
    stockCount: 6,
    badge: 'New',
    images: [
      ASSET_IMAGES.GoldRingW,
      ASSET_IMAGES.GoldRing,
      ASSET_IMAGES.GoldRingM
    ],
    description: 'A contemporary tribute to celestial harmony. An exceptionally spherical South Sea pearl rests upon a gentle scalloped cathedral setting designed to capture sunlight from all angles.',
    story: 'Handcrafted by master carvers to ensure the pearl sits securely without bulky prongs, celebrating the organic perfection of the gem uninterrupted.',
    details: [
      'Peg-and-cup secure mounting with internal locking thread',
      'Subtle knife-edge tapered shank for comfortable daily wear',
      'Interior engraving available up to 15 characters'
    ],
    materials: ['Australian South Sea Pearl', '18k Yellow Gold (100% Recycled)'],
    specs: {
      luster: 'Silky Warm Glow',
      surface: 'Clean to the Naked Eye',
      shape: 'Round',
      nacreThickness: '1.8mm',
      origin: 'Broome, Australia'
    },
    care: ['Remove before hand-washing, exercise, or applying hand sanitizers.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'silver-mist-keshi-pearl-necklace',
    name: 'Silver Mist Keshi Pearl Necklace',
    tagline: 'Organic forms, luminous character.',
    price: 1540,
    originalPrice: 3600,
    category: 'necklaces',
    pearlType: 'Freshwater',
    pearlColor: 'Silver, White & Soft Lavender',
    pearlSize: 'Approx. 8–11 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold'],
    availableLengths: ['17 inch', '19 inch'],
    rating: 5.0,
    reviewCount: 14,
    inStock: true,
    stockCount: 2,
    badge: 'Limited Stock',
    images: [
      ASSET_IMAGES.KeshiNecklace,
      ASSET_IMAGES.KeshiNecklace1,
      ASSET_IMAGES.KeshiNecklace2
    ],
    description: 'A graceful strand of Keshi pearls celebrated for their naturally organic shapes and luminous character. Each pearl carries its own individual form, creating a necklace that feels artistic, distinctive, and effortlessly elegant.',
    story: 'No two Keshi pearls are exactly alike. Their naturally irregular forms create a sense of movement throughout the strand, while their soft silver, white, and subtle lavender tones bring a quiet sophistication to the design. The Silver Mist Keshi Pearl Necklace is for those who appreciate the beauty of individuality—the charm of a pearl not defined by perfect symmetry, but by its own natural character.',
    details: [
      'Natural Keshi pearls with organic, irregular shapes',
      'Soft silver, white, and subtle lavender tones',
      'Each pearl has its own unique surface character and form',
      'Designed as an elegant single-strand necklace',
      'Ideal for refined everyday wear or special occasions',
      'A distinctive choice for collectors of naturally expressive pearls'
    ],
    materials: [
      'Keshi pearls',
      'Jewelry-grade clasp and findings'
               ],
    specs: {
      luster: 'Soft to high natural luster',
      surface: 'Natural surface character with organic markings',
      shape: 'Organic / Baroque',
      nacreThickness: 'Predominantly nacre',
      origin: 'Freshwater — cultivated in freshwater lakes, ponds, or rivers'
    },
    care: [
      'Put your necklace on last, after perfume, cosmetics, and hairspray.',
      'Remove before bathing, swimming, exercising, or sleeping.',
      'Gently wipe the pearls with a soft, clean cloth after wearing.',
      'Store separately in a soft pouch or lined jewelry box.',
      'Avoid prolonged contact with perfumes, cosmetics, chlorine, and household chemicals.',
      'Do not use abrasive jewelry cleaners or ultrasonic cleaners.',
      'Handle the organic-shaped pearls gently to preserve their natural surface and luster.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'knot-by-knot-akoya-bracelet',
    name: 'Knot-by-Knot Baroque Pearl Bracelet',
    tagline: 'Classic single-strand bracelet with Delma’s filigree barrel clasp',
    price: 280,
    category: 'bracelets',
    pearlType: 'Freshwater',
    pearlColor: 'Crisp White with Silver Overtones',
    pearlSize: '7.0 - 7.5 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold', 'Sterling Silver 925'],
    availableLengths: ['6.5 inch (Small)', '7.0 inch (Medium)', '7.5 inch (Large)'],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockCount: 9,
    badge: 'New',
    images: [
      ASSET_IMAGES.BaroqueBracelet1,
      ASSET_IMAGES.BaroqueBracelet,
      ASSET_IMAGES.BaroqueBracelet2
    ],
    description: 'An everyday luxury essential. Designed to drape fluidly around the wrist, catching ambient light with every hand gesture.',
    story: 'Knotting bracelets requires the tightest tension control in pearl stringing, preventing rubbing while maintaining tactile softness. Our workshop standard has remained unchanged since 2003.',
    details: [
      'Double hand-knotted between every individual pearl',
      'Vintage-inspired hand-engraved 18k barrel clasp with safety catch',
      'Perfect for stacking with fine gold bangles'
    ],
    materials: ['Akoya Pearls', '18k Yellow Gold Clasp', 'Pure Silk Thread'],
    specs: {
      luster: 'High Gloss',
      surface: 'Clean',
      shape: 'Round',
      nacreThickness: 'Thick (0.45mm)',
      origin: 'Ago Bay, Japan'
    },
    care: ['Clean gently with soft cloth after social events and wear.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'baroque-freshwater-lariat',
    name: 'Mari Mar Elegant Simplicity Necklace',
    tagline: 'Organic freeform South Sea pearls on an adjustable golden slide chain',
    price: 940,
    category: 'necklaces',
    pearlType: 'South Sea',
    pearlColor: 'Natural Pastel Peach & Lavender',
    pearlSize: '12 - 14 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold'],
    availableLengths: ['28 inch (Adjustable Slide)'],
    rating: 4.87,
    reviewCount: 22,
    inStock: true,
    stockCount: 5,
    badge: 'New',
    images: [
      ASSET_IMAGES.MariNecklace,
      ASSET_IMAGES.MariNecklace1,
      ASSET_IMAGES.MariNecklace2
    ],
    description: 'Celebrates the unfiltered poetry of nature. No two baroque ripple pearls are identical; their rippled nacre planes refract mesmerizing pastel halos.',
    story: 'Freshwater pearls formed without a solid bead nucleus develop extraordinary solid-nacre baroque silhouettes. Delma hand-selects these for their flame-like fire.',
    details: [
      'Silicone-grip 18k slide bead allows endless styling lengths',
      'Solid 18k diamond-cut wheat chain for high sparkle',
      'Each baroque pearl is one-of-a-kind in shape'
    ],
    materials: ['Cultured Freshwater Pearls', '18k Yellow Gold Chain'],
    specs: {
      luster: 'Deep Satin Fire',
      surface: 'Textured Rippled Baroque',
      shape: 'Baroque Freeform',
      nacreThickness: '100% Solid Nacre',
      origin: 'Lake Taihu, China'
    },
    care: ['Lay flat to store. Do not suspend continuously on hanging hooks.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'monolith-tahitian-pearl-cufflinks',
    name: 'Monolith South Sea Pearl Bracelet',
    tagline: 'Natural South Sea Pearl Bracelet Good for Men and Women',
    price: 110,
    category: 'mens',
    pearlType: 'South Sea',
    pearlColor: 'Graphite Charcoal & Gunmetal',
    pearlSize: '10.5 - 11.0 mm',
    metal: 'Sterling Silver 925',
    availableMetals: ['Sterling Silver 925', '18k White Gold'],
    rating: 4.96,
    reviewCount: 18,
    inStock: true,
    stockCount: 4,
    badge: 'Heritage Selection',
    images: [
      ASSET_IMAGES.MensBracelet,
      ASSET_IMAGES.MensBracelet1,
      ASSET_IMAGES.MensBracelet2
    ],
    description: 'Sartorial refinement for the discerning gentleman. Two button-shaped Tahitian pearls embedded within substantial brushed sterling silver swivel mounts.',
    story: 'Created by Delma as a tribute to mid-century bespoke menswear tailoring, where pearls were a dignified symbol of power, sea heritage, and understated sophistication.',
    details: [
      'Engine-turned swivel toggle mechanism with crisp click',
      'Anti-tarnish rhodium plating over solid 925 sterling silver',
      'Delivered in embossed Delma calfskin gift box'
    ],
    materials: ['Tahitian Saltwater Cultured Pearls', 'Rhodium Plated Sterling Silver 925'],
    specs: {
      luster: 'High Metallic Sheen',
      surface: 'Clean (<2% natural dimple)',
      shape: 'Button / Symmetrical Oval',
      nacreThickness: '1.4mm',
      origin: 'Rikitea, Gambier Islands'
    },
    care: ['Store cufflinks separated in velvet slots to prevent metal contact with pearls.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'minima-akoya-pearl-studs',
    name: 'Minima South Sea Pearl Studs',
    tagline: 'The consummate pearl stud: matched spherical South Sea pearls',
    price: 210,
    category: 'earrings',
    pearlType: 'South Sea',
    pearlColor: 'Pure White with Cool Silver Glow',
    pearlSize: '7.5 - 8.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', '18k Rose Gold', 'Platinum 950'],
    rating: 4.98,
    reviewCount: 76,
    inStock: true,
    stockCount: 14,
    badge: 'New',
    images: [
      ASSET_IMAGES.StudEarringswhite,
      ASSET_IMAGES.StudEarringswhite1,
      ASSET_IMAGES.StudEarringswhite2
    ],
    description: 'The foundation of every fine jewelry wardrobe. Sourced from the winter harvests of Ago Bay when cooler ocean currents concentrate nacre density for ultimate luster.',
    story: 'Since our opening in 2003, Delma has inspected every pair of studs by hand under north-facing studio daylight, rejecting over 80% to ensure identical brilliance across left and right ears.',
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
    isBestseller: false
  },
  {
    id: 'golden-south-sea-station-bangle',
    name: 'Golden South Sea Bangle',
    tagline: 'Natural golden South Sea pearl ',
    price: 320,
    category: 'bracelets',
    pearlType: 'South Sea',
    pearlColor: 'Deep Champagne Gold (24k Rich)',
    pearlSize: '11.0 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k Rose Gold'],
    availableSizes: ['Small (6.0 in)', 'Medium (6.5 in)', 'Large (7.0 in)'],
    rating: 4.91,
    reviewCount: 16,
    inStock: true,
    stockCount: 3,
    badge: 'Limited Stock',
    images: [
      ASSET_IMAGES.BraceletGold1,
      ASSET_IMAGES.BraceletGold,
      ASSET_IMAGES.BraceletGold2
    ],
    description: 'Breathtaking 100% natural champagne-gold color produced only by the gold-lip Pinctada maxima oyster. Mounted atop a flexible forged gold wire cuff.',
    story: 'No dye or radiation is ever used. The golden hue is pure mother nature, harvested from crystal warm lagoons in Palawan and the Sulu Sea.',
    details: [
      'Natural untreated color guarantee with provenance certificate',
      'Comfort spring-temper cuff slides easily over the wrist',
      'Two flush-set side accent diamonds (0.05 ctw)'
    ],
    materials: ['Natural Golden South Sea Pearl', '18k Yellow Gold', 'Diamonds'],
    specs: {
      luster: 'Rich Velvet Satin',
      surface: 'Clean',
      shape: 'Round',
      nacreThickness: '2.2mm',
      origin: 'Palawan Archipelago, Philippines'
    },
    care: ['Keep separate from harder gemstones such as diamonds and sapphires.'],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'something-blue-pearl-locket-pendant',
    name: 'Something Blue Pearl Locket & Pendant',
    tagline: 'Akoya pearl pendant with an underside bezel holding a Ceylon sapphire',
    price: 1980,
    category: 'gifts',
    pearlType: 'Akoya',
    pearlColor: 'Silvery White with Rose Undertone',
    pearlSize: '9.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', 'Platinum 950'],
    availableLengths: ['16-18 inch adjustable'],
    rating: 5.0,
    reviewCount: 25,
    inStock: true,
    stockCount: 5,
    badge: 'New',
    images: [
      ASSET_IMAGES.bridal,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.earrings
    ],
    description: 'A sentimental treasure for life’s milestone moments. Beneath the pearl cap, a hidden natural royal blue Ceylon sapphire is nestled against the wearer’s skin.',
    story: 'Created by Delma as a celebratory gift for graduates and brides alike, symbolizing fidelity, serenity, and enduring strength through beauty.',
    details: [
      'Concealed genuine round faceted Ceylon sapphire (0.06 ct)',
      'Adjustable 16 to 18 inch cable chain included',
      'Complimentary custom monogram engraving on clasp tag'
    ],
    materials: ['Akoya Pearl', '18k White Gold', 'Natural Ceylon Blue Sapphire'],
    specs: {
      luster: 'AAA Mirror Reflection',
      surface: 'Flawless',
      shape: 'Round',
      nacreThickness: '0.50mm',
      origin: 'Mie, Japan'
    },
    care: ['Clean with delicate polishing cloth provided.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'toi-et-moi-tahitian-akoya-ring',
    name: 'Toi et Moi Twin Pearl Ring',
    tagline: 'Harmonious meeting of dark Tahitian pearl and luminous Akoya pearl',
    price: 260,
    category: 'rings',
    pearlType: 'Tahitian',
    pearlColor: 'Tahitian Charcoal & Akoya White Rose',
    pearlSize: '8.5 mm & 8.5 mm',
    metal: 'Platinum 950',
    availableMetals: ['Platinum 950', '18k Yellow Gold', '18k White Gold'],
    availableSizes: ['5', '6', '7', '8', '9'],
    rating: 4.93,
    reviewCount: 21,
    inStock: true,
    stockCount: 4,
    badge: 'New',
    images: [
      ASSET_IMAGES.TwinRing,
      ASSET_IMAGES.TwinRing1,
      ASSET_IMAGES.TwinRing2
    ],
    description: 'The historic "You and Me" motif re-imagined. Light and shadow intertwined on a fluid crossover bypass band.',
    story: 'Popularized in the 18th century, Delma breathed new life into this romantic silhouette by pairing the two greatest saltwater pearls of the Pacific.',
    details: [
      'Seamlessly matched for size and proportional balance',
      'Solid platinum shank designed for structural longevity',
      'Comfort-fit rounded inner profile'
    ],
    materials: ['Tahitian Pearl', 'Akoya Pearl', 'Solid Platinum 950'],
    specs: {
      luster: 'High Metallic & Mirror',
      surface: 'Clean',
      shape: 'Near Round',
      nacreThickness: 'Thick',
      origin: 'French Polynesia & Japan'
    },
    care: ['Store in its bespoke Delma presentation case.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'cascading-keshi-pearl-drops',
    name: 'Cascading Pearl Drops',
    tagline: 'Shimmering petals of seedless South Sea pearls suspended on fine wire',
    price: 720,
    category: 'earrings',
    pearlType: 'South Sea',
    pearlColor: 'Opalescent Silver with Rainbow Sheen',
    pearlSize: '6 - 9 mm Assorted',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold'],
    rating: 4.89,
    reviewCount: 17,
    inStock: true,
    stockCount: 7,
    badge: 'New',
    images: [
      ASSET_IMAGES.earrings,
      ASSET_IMAGES.earrings1,
      ASSET_IMAGES.earrings2
    ],
    description: 'Feather-light and endlessly kinetic. Keshi pearls form purely of solid nacre when an oyster rejects its nucleus, resulting in unmatched organic iridescence.',
    story: 'Because Keshi pearls have no nucleus, their surface glows with intense crystalline reflections that catch light from across the room.',
    details: [
      'Extremely lightweight for all-day comfort',
      'Delicate hand-wrapped 18k wire links',
      'Total earring drop length: 1.75 inches'
    ],
    materials: ['Natural Non-Nucleated Keshi Pearls', '18k Yellow Gold'],
    specs: {
      luster: 'Superior Intense Sparkle',
      surface: 'Organic Crinkled Flakes',
      shape: 'Freeform Petal / Cornflake',
      nacreThickness: '100% Solid Nacre',
      origin: 'Japan & Australia'
    },
    care: ['Handle gently by the metal wire when putting on.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'nocturne-pearl-bead-mens-bracelet',
    name: 'Nocturne Tahitian Bead Men’s Necklace',
    tagline: 'Tahitian baroque pearls strung with matte black onyx & silver spacers',
    price: 1195,
    category: 'mens',
    pearlType: 'Akoya',
    pearlColor: 'Dark Peacock & Anthracite',
    pearlSize: '9.0 - 10.0 mm',
    metal: 'Sterling Silver 925',
    availableMetals: ['Sterling Silver 925'],
    availableSizes: ['7.5 inch', '8.0 inch', '8.5 inch'],
    rating: 4.85,
    reviewCount: 15,
    inStock: true,
    stockCount: 8,
    badge: 'Heritage Selection',
    images: [
      ASSET_IMAGES.mgNecklace,
      ASSET_IMAGES.mgNecklace1,
      ASSET_IMAGES.mgNecklace2
    ],
    description: 'A modern masculine cadence. Baroque dark pearls contrasted against velvety matte onyx beads and textured silver rondelles.',
    story: 'Crafted for daily resilience using high-strength steel-core aircraft cable and a precision bayonet locking clasp.',
    details: [
      'Multi-strand stainless steel cable prevents accidental breakage',
      'Custom Delma guilloche silver clasp with push-and-twist lock',
      'Natural matte black onyx stones (8mm)'
    ],
    materials: ['Tahitian Baroque Pearls', 'Matte Onyx', '925 Oxidized Silver'],
    specs: {
      luster: 'Subtle Sheen',
      surface: 'Circlé Baroque Rings',
      shape: 'Circled Drop',
      nacreThickness: '1.2mm',
      origin: 'Raiatea, French Polynesia'
    },
    care: ['Avoid wearing while swimming in chlorinated pools.'],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'duchess-bridal-pearl-tiara-comb',
    name: 'Black Stud forged with 18K Gold',
    tagline: 'Stud Black South Sea Pearl and forged with 18 Gold Ring',
    price: 290,
    category: 'rings',
    pearlType: 'Tahitian',
    pearlColor: 'Ivory White',
    pearlSize: '4 - 8 mm Graduated',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold'],
    rating: 4.94,
    reviewCount: 31,
    inStock: true,
    stockCount: 5,
    badge: 'Bestseller',
    images: [
      ASSET_IMAGES.BlackRing2,
      ASSET_IMAGES.BlackRing1,
      ASSET_IMAGES.BlackRing
    ],
    description: 'An ethereal heirloom headpiece. Clusters of pearlescent gems branching out like springtime blossoms, gripping bridal updos with serene grace.',
    story: 'Delma collaborated with premier bridal stylists to create a comb that distributes weight effortlessly without snagging delicate veils.',
    details: [
      'Flexible wire branches can be molded to hair contour',
      'Smooth comb teeth ensure zero pull on wedding hairstyles',
      'Comes in a presentation keepsake box with bridal veil ribbon'
    ],
    materials: ['Cultured Freshwater Pearls', 'Rhodium-Plated Silver Wire', 'Cubic Zirconia'],
    specs: {
      luster: 'Bright Soft Glow',
      surface: 'Smooth',
      shape: 'Near Round to Rice',
      nacreThickness: 'Solid Nacre',
      origin: 'Freshwater Aquaculture'
    },
    care: ['Store flat in presentation box.'],
    isFeatured: false,
    isBestseller: false
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
      ASSET_IMAGES.cleanPearl,
      ASSET_IMAGES.pearlTypes
    ],
    description: 'Formulated exclusively for Delma’s clients. Free from harsh chemicals, alcohol, and ammonia, preserving delicate organic conchiolin protein.',
    story: 'Pearls are alive with organic luster that degrades under standard jewelry cleaners. Delma developed this proprietary botanical formula in 2005.',
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
    isBestseller: false
  }
];
