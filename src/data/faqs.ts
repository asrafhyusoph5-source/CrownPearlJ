export interface FAQItem {
  question: string;
  answer: string;
  category: 'Pearl Care & Quality' | 'Orders & Shipping' | 'Bespoke & Sizing' | 'Authenticity & Guarantee';
}

export const FAQS: FAQItem[] = [
  {
    category: 'Pearl Care & Quality',
    question: 'How do I care for my Crown Pearl jewelry daily?',
    answer: 'Always practice the classic rule: "Last on, first off." Put your pearls on after applying perfume, hairspray, makeup, and lotions, as cosmetic acids can dull organic nacre. After wear, wipe gently with the complimentary Delma microfiber cloth to remove skin oils.'
  },
  {
    category: 'Pearl Care & Quality',
    question: 'What is the difference between Akoya, South Sea, Tahitian, and Freshwater pearls?',
    answer: 'Akoya pearls (Japan) are prized for the sharpest mirror-like luster. South Sea pearls (Australia) are the largest, famous for satin champagne-gold or icy white hues. Tahitian pearls (French Polynesia) are naturally dark with peacock overtones. Freshwater pearls offer organic shapes and solid nacre durability.'
  },
  {
    category: 'Authenticity & Guarantee',
    question: 'Are all Crown Pearl pieces certified authentic?',
    answer: 'Yes. Every Crown Pearl creation arrives with an individually numbered Delma Estd. 2003 Certificate of Authenticity specifying the pearl variety, harvest origin, and GIA grading classification.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What are your shipping and insured delivery terms?',
    answer: 'We provide complimentary fully insured express courier shipping on all orders over $150 worldwide with signature required.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What is your return and home-examination policy?',
    answer: 'We provide a 30-day in-home examination period. If your piece does not completely captivate you in natural light, return it in its original unworn condition for a full refund.'
  }
];
