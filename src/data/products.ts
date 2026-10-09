import { Product } from '../types';
import { ASSET_IMAGES } from '../assets/images';

export const PRODUCTS: Product[] = [
  {
    id: 'delma-signature-south-sea-necklace',
    name: 'The Delma Signature South Sea Necklace',
    tagline: 'Delma’s flagship creation hand-knotted with AAA South Sea pearls',
    price: 3500,
    originalPrice: 3800,
    category: 'set',
    pearlType: 'South Sea',
    pearlColor: 'Pure White Rose Overtones',
    pearlSize: '10.3 - 17.1 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    availableLengths: ['18 inch (Princess)', '20 inch (Matinee)', '24 inch (Opera)'],
    availableSizes: ['Small (6.0 in)', 'Medium (6.5 in)', 'Large (7.0 in)'],
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
      origin: 'Philippines', 
      includes: 'Necklace, pair of earrings, ring'
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
    id: 'the-clover-teardrop-earrings',
    name: 'The Clover Teardrop Earrings',
    tagline: 'Gold four-leaf clover studs with pearl-white enamel and a luminous teardrop pearl',
    price: 127,
    category: 'earrings',
    pearlType: 'Freshwater',
    pearlColor: 'Cream White with Soft Rose Overtones',
    pearlSize: '10.0 - 12.0 mm',
    metal: '14k Yellow Gold',
    availableMetals: ['Sterling Silver 925', '14k Yellow Gold'],
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
    description: 'Luck at the ear, light below it. The Clover Earrings pair a gold four-leaf clover stud, filled with soft pearlescent enamel, with a glowing teardrop pearl that swings gently as you move. They are sweet without being too sweet, and polished enough for a wedding, a graduation, or a quiet dinner. Easy to wear every day, and a lovely gift for someone who deserves a little good fortune.',
    story: 'The four-leaf clover has long been a symbol of luck, hope, and love. We wanted to turn that old charm into something you could wear close to your face, in soft colors and warm gold.\n\nEach clover is outlined in polished gold and filled with a pearl-white enamel that shimmers like the inside of a shell. Hanging beneath it is a teardrop pearl chosen for its smooth surface and soft rose glow, capped in gold and joined by a delicate link so it moves freely and catches the light.\n\nThe pearls are matched pair by pair for shape, size, and luster, so both ears feel balanced. The result is a pair of earrings that feels light, graceful, and a little bit romantic, made for the moments you want to remember.',
    details: [
      'Matched pair of teardrop cultured pearls, 10.0 - 12.0 mm',
      'Four-leaf clover stud with pearlescent enamel inlay',
      'Polished gold frame and cap with a delicate link',
      'Pearl drop swings gently with movement',
      'Secure post with butterfly backs',
      'Lightweight and comfortable for all-day wear',
      'Suitable for brides, bridesmaids, and everyday wear',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
      'Genuine Freshwater Cultured Teardrop Pearls',
      '18k Gold Vermeil over Sterling Silver 925',
      'Pearlescent Enamel Inlay',
      'Butterfly Backs'
    ],
    specs: {
      luster: 'High (Bright Mirror Glow)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Teardrop',
      nacreThickness: 'Thick (0.40mm+)',
      origin: 'China',
      motif: 'Four-leaf clover with enamel inlay',
      closure: 'Post with butterfly back',
      matching: 'Matched pair for shape, size, and luster'
    },
    care: [
      'Put your earrings on after perfume, hairspray, and makeup so chemicals never touch the pearls or enamel.',
      'Wipe gently with a soft, dry cloth after each wear.',
      'Avoid water, chlorine, and household cleaners. Remove before swimming, showering, or exercising.',
      'Store each earring separately in the soft pouch or box provided, so the enamel and pearls do not get scratched.',
      'Never use ultrasonic or steam cleaners, as they can damage both pearls and enamel.',
      'Polish the gold gently with a soft jewelry cloth.'
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'the-eternal-bloom-bridal-suite',
    name: 'The Eternal Bloom Bridal Suite',
    tagline: 'A matching South Sea pearl necklace, earrings, and ring with diamond-set blossoms, made for the bride',
    price: 2450,
    originalPrice: 2800,
    category: 'set',
    pearlType: 'Akoya',
    pearlColor: 'Pure White with Soft Rose Overtones',
    pearlSize: '8.0 - 11.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
    availableLengths: ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)'],
    availableSizes: ['Small (6.0 in)', 'Medium (6.5 in)', 'Large (7.0 in)'],
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
    description: 'Three pieces, one love story. The Eternal Bloom Bridal Suite brings together a hand-knotted South Sea pearl necklace, a pair of pearl drop earrings, and a pearl solitaire ring, all joined by the same delicate blossom motif set with sparkling stones. The pearls are matched in color and luster so the pieces look made for each other, from the first fitting to the last dance. It is a complete bridal look in one box, and a family heirloom from the day you wear it.',
    story: 'A wedding day asks a lot of its jewelry. It must look beautiful in photographs, feel light after twelve hours, and still mean something thirty years later. This suite was designed with all three in mind.\n\nThe pearls come from South Sea oysters, which grow slowly and build thick layers of nacre, giving each pearl its soft, glowing luster. Only a small share of each harvest is round, clean, and bright enough to become part of a suite. Every pearl across the necklace, earrings, and ring is chosen together, so the color and glow match from one piece to the next.\n\nThe blossom is the thread that ties them together. It appears as the clasp of the necklace, the crown of each earring, and the shoulders of the ring, each petal set with tiny sparkling stones. The necklace is knotted by hand on silk, so it drapes softly at the collarbone and stays protected for years.\n\nWear them all together on the day, then wear them separately for anniversaries, birthdays, and every occasion after. Or pass them on, one piece at a time.',
    details: [
      'Three-piece suite: necklace, drop earrings, and ring',
      'Hand-matched South Sea cultured pearls, 8.0 - 11.0 mm',
      'Necklace hand-knotted on silk with a blossom-motif clasp pavé-set with sparkling stones',
      'Earrings with a floral stud top and a round pearl drop, approx. 25 mm long',
      'Ring with a round pearl and pavé-set accent stones on each shoulder',
      'Solid 18k white gold, hallmarked 750',
      'Necklace available in 16", 18", and 20" lengths',
      'Ring available in US sizes 5 to 9',
      'Pieces are matched for color and luster across the whole suite',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
      'Genuine South Sea Cultured Pearls',
      'Pavé-Set Diamonds',
      'Solid 18k White Gold (Hallmarked 750)',
      'Natural silk thread, individually knotted',
      'Optional: 18k Yellow Gold or Platinum 950'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines, Indonesia',
      includes: 'Necklace, pair of earrings, ring',
      stones: 'Brilliant-cut pavé diamonds',
      closure: 'Post with butterfly back'
    },
    care: [
      'Put your jewelry on last, after perfume, hairspray, and makeup, so chemicals never touch the pearls.',
      'Wipe each piece gently with a soft, dry cloth after wearing to remove skin oils and sweat.',
      'Store the necklace flat, and keep each piece in its own pouch or compartment so pearls and stones do not scratch each other.',
      'Remove the ring before washing hands, swimming, showering, or doing housework.',
      'Never use ultrasonic or steam cleaners, as they can damage pearls.',
      'Have the necklace restrung every 1-2 years if worn often, and have the stone settings checked once a year.'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'the-blossom-golden-pearl-ring',
    name: 'The Blossom Golden Pearl Ring',
    tagline: 'A golden South Sea pearl and a diamond-set flower on a sleek yellow gold band',
    price: 243,
    category: 'rings',
    pearlType: 'South Sea',
    pearlColor: 'Deep Golden',
    pearlSize: '11.0 - 12.0 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold', 'Sterling Silver 925'],
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
    description: 'A golden pearl with a little bloom beside it. The Blossom Ring features a round, deep golden South Sea pearl resting beside a delicate flower of pavé-set diamonds, carried on a smooth, polished yellow gold band. The pearl glows with a warm, buttery luster, while the tiny flower adds a spark of light and a touch of playfulness. It is bold enough to be the star of your hand and graceful enough to wear every day.',
    story: 'We imagined a pearl that had just rolled to a stop beside a flower in the sun. That small moment became this ring.\n\nDeep golden South Sea pearls are among the rarest in the world. They grow slowly in warm waters, and only a small share reach the rich, even color, round shape, and clean surface we look for. For this ring, we chose a pearl with a warm, honey-gold glow that looks beautiful against the metal.\n\nBeside it, a small flower of pavé-set diamonds curls up from the band on a slim, sculpted stem, like a bud reaching toward the light. The band is polished by hand until it is smooth and comfortable on the finger. The result is a ring that feels personal, a little romantic, and made to be worn and noticed.',
    details: [
      'Round golden South Sea cultured pearl, 11.0 - 12.0 mm',
      'Flower motif pavé-set with brilliant-cut diamonds',
      'Solid 18k yellow gold band, hallmarked 750',
      'High-polish finish with a smooth, comfortable inner band',
      'Pearl secured with a firm post and setting',
      'Available in US sizes 5 to 9, with resizing available on request',
      'Suitable as a cocktail ring, anniversary gift, or everyday statement piece',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearl',
    'Pavé-Set Diamonds',
    'Solid 18k Yellow Gold (Hallmarked 750)',
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines, Indonesia',
      stones: 'Brilliant-cut pavé diamonds',
      closure: 'Pearl on post, flower in pavé',
    },
    care: [
    'Put your ring on last, after perfume, hairspray, lotion, and makeup, so chemicals never touch the pearl.',
    'Wipe the pearl and gold gently with a soft, dry cloth after each wear.',
    'Remove before washing hands, swimming, showering, exercising, or doing housework.',
    'Because a ring is exposed to knocks, take it off during any activity where the pearl could be hit or scratched.',
    'Store separately in the soft pouch or box provided, away from harder jewelry.',
    'Never use ultrasonic or steam cleaners, and have the pearl and diamond settings checked by a jeweler once a year.'
    ],
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
    id: 'the-luna-baroque-bracelet',
    name: 'The Luna Baroque Bracelet',
    tagline: 'Sculptural baroque freshwater pearls, hand-knotted with a gold toggle clasp',
    price: 280,
    category: 'bracelets',
    pearlType: 'Freshwater',
    pearlColor: 'Cream White with Soft Peach Overtones',
    pearlSize: '12.0 - 16.0 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '14k Yellow Gold', 'Sterling Silver 925'],
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
    description: 'No two pearls are alike. The Luna Bracelet is made from large baroque freshwater pearls in creamy white with a soft peach glow, each with its own flowing, sculptural shape. Strung close together and finished with a polished gold toggle clasp, it feels relaxed, artistic, and effortlessly chic. Wear it with a white shirt, a linen dress, or stacked with your favorite gold bracelets for a look that is entirely your own.',
    story: 'Baroque pearls are the ones that refuse to be perfectly round. Their name comes from an old word for irregular pearl, and for centuries they were treasured by artists and royalty for their individuality. We think they are the most beautiful pearls of all.\n\nThe Luna Bracelet celebrates that character. Each freshwater pearl is chosen for its rich, satin glow and its flowing, organic form, then arranged so the shapes sit comfortably side by side. Because every pearl grows its own way, every bracelet is slightly different, which makes yours one of a kind.\n\nThe pearls are knotted by hand on silk, with a small knot between each one so they stay protected and move softly on the wrist. A gold toggle clasp finishes the design. It is simple to fasten, secure, and attractive enough to be worn at the front as a detail of its own.',
    details: [
      'Hand-selected baroque freshwater cultured pearls, 12.0 - 16.0 mm',
      'Cream white with soft peach overtones and a satin luster',
      'Each pearl has a unique, sculptural shape',
      'Hand-knotted on silk thread, with a knot between each pearl',
      'Polished gold toggle clasp that can be worn at the front',
      'Available in three lengths',
      'Easy to layer with chains, bangles, and watches',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine Freshwater Cultured Baroque Pearls',
    '18k Gold Vermeil Toggle Clasp (over Sterling Silver 925)',
    'Natural silk thread, individually knotted'
    ],
    specs: {
      luster: 'High (Soft Satin Glow)',
      surface: 'Natural (Light Texture and Ridges, Typical of Baroque)',
      shape: 'Baroque (Irregular, Organic)',
      nacreThickness: 'Very Thick (Nearly Solid Nacre)',
      origin: 'China',
    },
    care: [
    'Put your bracelet on after perfume, hairspray, and lotion so chemicals never touch the pearls.',
    'Wipe gently with a soft, dry cloth after each wear to remove skin oils and sweat.',
    'Avoid water, chlorine, and household cleaners. Do not wear while swimming, showering, or exercising.',
    'Store flat in the soft pouch or box provided, away from harder jewelry that could scratch the pearls.',
    'Never use ultrasonic or steam cleaners, and polish the clasp with a soft jewelry cloth.',
    'Have the silk inspected and restrung every 1-2 years if worn often.'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'the-orchid-bloom-necklace',
    name: 'The Orchid Bloom Necklace (MariMar)',
    tagline: 'Diamond-set petals in full bloom, each holding a South Sea pearl in a different shade',
    price: 940,
    category: 'necklaces',
    pearlType: 'South Sea',
    pearlColor: 'Multicolor (Golden, Silver, Cream Rose, Chocolate)',
    pearlSize: '9.0 - 12.1mm',
    metal: 'Platinum 950',
    availableMetals: ['Platinum 950'],
    rating: 4.87,
    reviewCount: 22,
    inStock: true,
    stockCount: 5,
    badge: 'Limited Stock',
    images: [
      ASSET_IMAGES.MariNecklace,
      ASSET_IMAGES.MariNecklace1,
      ASSET_IMAGES.MariNecklace2
    ],
    description: 'A garden of light worn at the collarbone. The Orchid Bloom is a delicate chain of pavé diamond petals and leaves, with South Sea pearls nestled at its center in golden, silver, cream rose, and deep chocolate tones. A graceful drop flows down from the central bloom, drawing the eye to the neckline. Elegant enough for a wedding or gala, and refined enough to make any evening feel like an occasion.',
    story: 'This necklace began as a single flower. We wondered what it would look like if every petal were set with light, and every heart were a pearl.\n\nSouth Sea pearls naturally grow in a wide palette: warm gold, soft silver, blush cream, and dark, smoky chocolate. Instead of matching them into one color, we chose to celebrate the variety, giving each bloom its own shade so the necklace feels alive and a little different from every angle.\n\nThe petals are pavé-set with hundreds of brilliant diamonds, each placed by hand under magnification. The pearls are chosen one by one for luster, shape, and clean surface, then secured in the center of each flower. The result is a jewel that moves softly with you, catching the light like dew on petals at sunrise.',
    details: [
      'Hand-selected multicolor South Sea cultured pearls, 9.0 - 11.0 mm',
      'Floral and leaf motifs pavé-set with brilliant-cut diamonds',
      'Central bloom with a graceful Y-shaped drop',
      'Each pearl in a different natural color: golden, silver, cream rose, and chocolate',
      'Solid 18k white gold setting, hallmarked 750',
      'Secure lobster clasp with a safety catch',
      'Available in 18" lengths',
      'Delivered in a presentation gift box with a certificate of authenticity'
    ],
    materials: [
    'Genuine South Sea Cultured Pearls',
    'Optional: Platinum 950 or Sterling Silver 925'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round to Near-Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Indonesia / Philippines'
    },
    care: [
    'Put your necklace on last, after perfume, hairspray, and makeup, so chemicals never touch the pearls.',
    'Wipe gently with a soft, dry cloth after each wear to keep the pearls and diamonds bright.',
    'Store in the soft pouch or box provided, separate from other jewelry that could scratch the pearls.',
    'Avoid water, chlorine, and household cleaners. Never use ultrasonic or steam cleaners, as they can damage pearls.',
    'Have the prongs and settings checked by a jeweler once a year to keep every stone secure.'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'the-noir-golden-pearl-bracelet',
    name: 'The Noir Golden Pearl Bracelet',
    tagline: 'One golden South Sea pearl on hand-braided black leather, made for men and women',
    price: 110,
    category: 'mens',
    pearlType: 'South Sea',
    pearlColor: 'Golden Champagne',
    pearlSize: '11.0 - 12.0 mm',
    metal: 'Sterling Silver 925',
    availableMetals: ['Sterling Silver 925'],
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
    description: 'A single golden South Sea pearl, set against dark braided leather. The Sable Bracelet pairs the soft, warm glow of a champagne-gold pearl with the rugged texture of hand-woven black leather, finished with polished ribbed silver accents on either side. It is bold without being loud, easy to wear every day, and sharp enough to dress up with a tailored shirt or a watch. A modern take on pearls, made for anyone who prefers their jewelry understated and full of character.',
    story: 'Pearls are usually shown on silk and gold. We wanted to see what happens when one is placed somewhere less expected.\n\nThe Sable Bracelet began with a golden South Sea pearl, chosen for its warm color and deep, glowing luster. Gold pearls take years to form, and only a small share reach the size and clean surface we look for. Instead of a delicate chain, we set it on a thick braid of black leather, so the pearl stands out with a more relaxed and modern feel.\n\nThe leather is woven by hand, strand over strand, until it is soft, flexible, and strong. Ribbed silver rings frame the pearl on both sides and keep it centered on the wrist, while a secure magnetic clasp makes it easy to put on with one hand. The result is a bracelet that looks good with a linen shirt on the weekend and a suit during the week, and it only gets better as the leather softens with wear.',
    details: [
      'Single golden South Sea cultured pearl, 11.0 - 12.0 mm',
      'Hand-braided genuine black leather, 5 mm width',
      'Polished, ribbed silver end caps on both sides of the pearl',
      'Magnetic clasp with a secure, low-profile fit',
      'Available in four lengths to fit most wrist sizes',
      'Designed to suit men and women alike',
      'Pairs well with watches and other bracelets',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearl',
    'Genuine Braided Leather',
    'Sterling Silver 925, Rhodium Plated',
    'Magnetic Clasp'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines/Indonesia'
    },
    care: [
    'Put your bracelet on after perfume, cologne, and lotion so chemicals never touch the pearl or leather.',
    'Wipe the pearl gently with a soft, dry cloth after wearing to remove sweat and oils.',
    'Keep the leather away from water, since soaking can dry it out or change its shape. If it gets wet, let it air dry naturally.',
    'Do not wear while swimming, showering, or exercising.',
    'Store flat in the soft pouch or box provided, away from sharp or hard jewelry.',
    'Clean the silver caps with a soft polishing cloth, and avoid ultrasonic or steam cleaners.'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'the-halo-pearl-studs',
    name: 'The Halo Pearl Studs',
    tagline: 'Classic round white South Sea pearls on polished white gold posts, made for every day',
    price: 210,
    category: 'earrings',
    pearlType: 'South Sea',
    pearlColor: 'Pure White with Cool Silver Glow',
    pearlSize: '9.0 - 10.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
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
    description: 'The one pair of pearl earrings you will reach for again and again. The Halo Studs feature round, creamy-white South Sea pearls with a deep, satin glow, mounted on polished white gold posts for a clean, close fit. Simple enough for the office, refined enough for a wedding, and comfortable enough to forget you are wearing them. A true wardrobe essential and a gift that never goes out of style.',
    story: 'Every jewelry collection needs a quiet center, a piece that does not ask for attention but earns it anyway. For us, that piece is the pearl stud.\n\nThe Halo Studs begin with South Sea pearls, grown slowly in warm, clear waters where each oyster builds thick layers of nacre over several years. That patience shows in the glow: soft, deep, and luminous rather than glassy. Only a small share of each harvest is round, clean, and bright enough to become a stud, where there is nothing to hide behind.\n\nEach pair is matched carefully for size, color, and luster, so both ears look the same. Then each pearl is mounted on a polished white gold post with a secure butterfly back. The result is a pair of earrings that goes with everything, suits everyone, and gets better the more often you wear it.',
    details: [
      'Matched pair of round South Sea cultured pearls, 9.0 - 10.0 mm',
      'Polished solid 18k white gold posts, hallmarked 750',
      'Secure butterfly backs for a comfortable, steady fit',
      'Smooth, classic dome profile that sits close to the ear',
      'Lightweight enough for all-day wear',
      'Suitable for men and women, and for second or third piercings',
      'Pairs well with other earrings, studs, and small hoops',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearls',
    'Solid 18k White Gold Posts (Hallmarked 750)',
    'Butterfly Backs in 18k White Gold',
    'Optional: 18k Yellow Gold or Platinum 950'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines',
      closure: 'Post with butterfly back',
      matching: 'Matched pair for size, color, and luster'
    },
    care: [
    'Put your earrings on after perfume, hairspray, and makeup so chemicals never touch the pearls.',
    'Wipe gently with a soft, dry cloth after each wear to remove skin oils and sweat.',
    'Avoid water, chlorine, and household cleaners. Remove before swimming, showering, or exercising.',
    'Store in the soft pouch or box provided, away from harder jewelry that could scratch the pearls.',
    'Never use ultrasonic or steam cleaners, as they can damage pearls.',
    'Wipe the posts with a soft cloth after wearing to keep them clean and smooth for your ears.'
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'the-aurora-open-bangle',
    name: 'The Aurora Open Bangle',
    tagline: 'Two golden South Sea pearls on a sculpted gold open cuff, wrapped in blush pink ',
    price: 320,
    category: 'bracelets',
    pearlType: 'South Sea',
    pearlColor: 'Deep Champagne Gold (24k Rich)',
    pearlSize: '10.0 - 11.0 mm',
    metal: 'Platinum 950',
    availableMetals: ['Platinum 950'],
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
    description: 'Two golden pearls facing each other across the wrist. The Aurora Open Bangle features a matched pair of deep golden South Sea pearls, each set on a sculpted gold tip, joined by a soft blush pink band. The open design slips on easily and sits gracefully on the wrist, while the warm glow of the pearls adds a quiet touch of luxury to everything from a simple tee to an evening dress. It is a modern, eye-catching bracelet that feels as comfortable as it looks.',
    story: 'We wanted to design a bracelet that felt like a conversation: two pearls, face to face, with just enough space between them to let the wrist be part of the design.\n\nThe Aurora is named for the warm light at dawn, which is exactly the color of its pearls. Deep golden South Sea pearls are among the rarest in the world. They grow slowly in warm waters, and only a very small share reach the rich, even color and clean surface we require. We match each pair carefully by color, size, and luster so the two sit as true mirror images.\n\nEach pearl is mounted on a sculpted, polished gold tip, shaped to curve naturally with the wrist. A band of soft blush pink, woven by hand, joins the two ends and adds a gentle contrast to the warm gold. The open cuff form means no clasp to fumble with. You simply slip it on, and it stays comfortably in place.',
    details: [
      'Matched pair of golden South Sea cultured pearls, 10.0 - 11.0 mm',
  'Sculpted, high-polish 18k gold pearl mounts',
  'Hand-woven blush pink band with a flexible fit',
  'Open cuff design, easy to slip on and off with no clasp',
  'Gently adjustable to fit most wrist sizes',
  'Available in three sizes',
  'Pairs beautifully with watches, bangles, and stacked bracelets',
  'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearls',
    'Hand-woven pink cord band'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines',
      matching: 'Matched pair for color, size, and luster',
      closure: 'Open cuff, no clasp'
    },
    care: [
    'Put your bangle on after perfume, hairspray, and lotion so chemicals never touch the pearls.',
    'Wipe the pearls and gold gently with a soft, dry cloth after each wear.',
    'Keep the woven band away from water, since soaking can dull the color or loosen the weave. If it gets wet, let it air dry naturally.',
    'Do not wear while swimming, showering, or exercising.',
    'Avoid pulling the cuff wide when putting it on, to keep the fit and the pearl mounts secure.',
    'Store in the soft pouch or box provided, away from harder jewelry that could scratch the pearls.'
    ],
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
    id: 'the-duet-twin-pearl-ring',
    name: 'The Duet Twin Pearl Ring',
    tagline: 'One golden pearl, one dark pearl, wrapped together on a sleek yellow gold open band',
    price: 260,
    category: 'rings',
    pearlType: 'Tahitian',
    pearlColor: 'Golden Champagne and Dark Charcoal Green',
    pearlSize: '8.0 - 9.0 mm',
    metal: '18k Yellow Gold',
    availableMetals: ['18k Yellow Gold', '18k White Gold', 'Sterling Silver 925'],
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
    description: 'Light and shadow, side by side. The Duet Ring pairs a warm golden South Sea pearl with a deep, dark Tahitian pearl, each held at the tip of a slim gold arm that wraps around the finger. The open, crossover design keeps the look light and modern, while the contrast between the two pearls makes it instantly eye-catching. It is a ring about balance: soft and bold, bright and dark, together.',
    story: 'Some of the best things come in pairs that are not alike. We wanted a ring that held two opposites in one gesture.\n\nOn one side sits a golden South Sea pearl, with the warm glow of late afternoon light. On the other sits a Tahitian pearl, dark and glossy, with the quiet depth of still water at night. Both are chosen for their round shape, clean surface, and strong luster, and matched in size so neither one overpowers the other.\n\nA slim band of polished yellow gold curves around the finger and ends in two small cups, each cradling one pearl. The open design means the ring is easy to wear and gently adjustable, and the two pearls seem to float beside each other. It is a ring for anyone who likes jewelry with a story: two origins, two colors, one piece.',
    details: [
      'One golden South Sea pearl and one dark Tahitian pearl, 8.0 - 9.0 mm each',
      'Round shape, matched in size for a balanced look',
      'Open crossover band in polished 18k yellow gold, hallmarked 750',
      'Each pearl held in a slim gold cup on a fine arm',
      'Lightweight and comfortable for everyday wear',
      'Gently adjustable fit within one size up or down',
      'Available in US sizes 5 to 9',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearl (Golden)',
    'Genuine Tahitian Cultured Pearl (Dark)',
    'Solid 18k Yellow Gold (Hallmarked 750)',
    'Optional: 18k White Gold or 18k Rose Gold'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines (South Sea) and French Polynesia (Tahitian)',
      design: 'Open crossover band, toi et moi style',
    },
    care: [
    'Put your ring on last, after perfume, hairspray, lotion, and makeup, so chemicals never touch the pearls.',
    'Wipe the pearls and gold gently with a soft, dry cloth after each wear.',
    'Remove before washing hands, swimming, showering, exercising, or doing housework.',
    'Avoid squeezing or bending the open band, which can loosen the pearl settings.',
    'Store separately in the soft pouch or box provided, away from harder jewelry.',
    'Never use ultrasonic or steam cleaners, and have the settings checked by a jeweler once a year.'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'the-laurel-white-drop-earrings',
    name: 'The Laurel Pearl Drop Earrings',
    tagline: 'Round white South Sea pearls beneath diamond-set laurel leaves on pavé hooks',
    price: 720,
    category: 'earrings',
    pearlType: 'South Sea',
    pearlColor: 'Pure White with Soft Silver Overtones',
    pearlSize: '10.0 - 11.0 mm',
    metal: '18k White Gold',
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
    description: 'A crown of leaves above a perfect pearl. The Laurel Earrings pair round, creamy-white South Sea pearls with a delicate cluster of pavé-set laurel leaves, hung from sparkling hook wires that glitter as they catch the light. Classic, graceful, and made to be noticed quietly, they are an elegant choice for a bride, a guest, or anyone who wants a timeless pair of pearl earrings for everyday and special days alike.',
    story: 'The laurel leaf has been a symbol of honor, victory, and lasting beauty since ancient times. We wanted to bring that tradition to the ear in a way that feels light, modern, and refined.\n\nEach earring begins with a round South Sea pearl, chosen for its smooth surface, deep luster, and soft glow. South Sea pearls grow slowly in warm waters, building thick layers of nacre that give them their rich, satin-like radiance. Only a small share of each harvest is round, clean, and bright enough to meet our standard, and each pair is matched carefully so the two look like mirror images.\n\nAbove each pearl sits a spray of laurel leaves, pavé-set with tiny sparkling stones, and a hook wire with its own line of light along the curve. The result is a pair of earrings that moves softly, frames the face, and looks as good at a wedding as it does with a simple white shirt.',
    details: [
      'Matched pair of round South Sea cultured pearls, 10.0 - 11.0 mm',
      'Laurel leaf cluster pavé-set with brilliant-cut stones',
      'Hook wires set with a line of sparkling stones',
      'Solid 18k white gold, hallmarked 750',
      'Secure hook design that is comfortable for all-day wear',
      'Approximately 30 mm drop length',
      'Suitable for brides, bridesmaids, and everyday wear',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine South Sea Cultured Pearls',
    'Solid 18k White Gold (Hallmarked 750)',
    'Optional: 18k Yellow Gold or Platinum 950'
    ],
    specs: {
      luster: 'Very High (Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Thick (0.50mm+)',
      origin: 'Philippines',
      stones: 'Brilliant-cut pavé diamonds',
      closure: 'Fish hook wire',
      matching: 'Matched pair for size, color, and luster'
    },
    care: [
    'Put your earrings on after perfume, hairspray, and makeup so chemicals never touch the pearls.',
    'Wipe the pearls and stones gently with a soft, dry cloth after each wear.',
    'Avoid water, chlorine, and household cleaners. Remove before swimming, showering, or exercising.',
    'Store each earring separately in the soft pouch or box provided, away from harder jewelry that could scratch the pearls.',
    'Never use ultrasonic or steam cleaners, as they can damage pearls.',
    'Have the settings checked by a jeweler once a year to keep every stone secure.'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'twilight-akoya-uni-necklace',
    name: 'The Twilight Akoya Uni Necklace',
    tagline: 'Silver-grey Akoya pearls with a whisper of lavender, hand-knotted for him and for her',
    price: 1195,
    category: 'mens',
    pearlType: 'Akoya',
    pearlColor: 'Silver Grey with Soft Lavender Overtones',
    pearlSize: '7.0 - 8.0 mm',
    metal: '18k White Gold',
    availableMetals: ['18k White Gold', '18k Yellow Gold', 'Platinum 950'],
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
    description: 'The color of the sky just after sunset, captured in pearl. The Twilight Akoya is a strand of round, mirror-bright pearls in cool silver-grey, each with a soft lavender glow that shifts gently in the light. It sits close to the collarbone with quiet confidence, equally at home over a crisp white shirt, under a tailored jacket, or against an evening gown. Understated enough for every day and striking enough for the moments that matter, it is a necklace made to be worn by anyone, in any way they choose.',
    story: 'Pearls have never belonged to one gender. For centuries they have adorned kings, poets, artists, and icons just as proudly as queens and brides. The Twilight Akoya was created to honor that tradition with a design that feels quiet, confident, and entirely modern.\n\nWe chose Akoya pearls for their sharp, mirror-like luster and their cool, refined tones. Grown in calm, cold waters, Akoya oysters form a smooth, bright nacre prized for its clarity and brilliance. From each harvest, we select only the pearls that are round, clean, and flawlessly matched in size and color, so the strand reads as one unbroken line of light.\n\nEvery pearl is then knotted by hand on silk, with a small knot between each one. It is slow, patient work, but it is what lets the necklace drape smoothly, protects each pearl from its neighbor, and helps the strand last for decades. The result is a piece that does not follow trends or labels. It simply looks right on whoever wears it.',
    details: [
      'Hand-matched Akoya cultured pearls, 7.0 - 8.0 mm',
      'Silver-grey body color with soft lavender overtones',
      'Round shape with sharp, mirror-like luster',
      'Hand-knotted on natural silk thread, with a knot between each pearl',
      'Solid 18k white gold clasp, hallmarked 750',
      'Secure, low-profile clasp that sits comfortably at the back of the neck',
      'Available in 16", 18", 20", and 24" lengths',
      'Designed to suit men and women alike, worn alone or layered',
      'Delivered in a presentation gift box with a care card'
    ],
    materials: [
    'Genuine Akoya Cultured Pearls',
    'Solid 18k White Gold Clasp (Hallmarked 750)',
    'Natural silk thread, individually knotted',
    'Optional: 18k Yellow Gold or Platinum 950 clasp'
    ],
    specs: {
      luster: 'Very High (Sharp Mirror Reflection)',
      surface: 'Clean (Minimal Visible Blemishes)',
      shape: 'Round',
      nacreThickness: 'Medium (0.35mm+)',
      origin: 'Japan',
      color: 'Silver Grey with Lavender Overtones',
      matching: 'Hand-matched for size, color, and luster',
    },
    care: [
    'Put your pearls on last, after cologne, perfume, hairspray, and makeup, so chemicals never touch the surface.',
    'Wipe gently with a soft, dry cloth after each wear to remove skin oils and sweat.',
    'Store flat in the soft pouch or box provided, away from harder jewelry that could scratch the nacre.',
    'Avoid water, chlorine, sweat during workouts, and household cleaners. Never use ultrasonic or steam cleaners.',
    'Keep away from direct heat and very dry environments, which can dull the luster over time.',
    'Have the silk inspected and restrung every 1-2 years if worn often, to keep the strand secure.'
    ],
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
