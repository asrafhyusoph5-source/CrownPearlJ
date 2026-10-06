export interface FAQItem {
  question: string;
  answer: string;
  category: 'Pearl Care & Quality' | 'Orders & Shipping' | 'Bespoke & Sizing' | 'Authenticity & Guarantee';
}

export const FAQS: FAQItem[] = [
  {
    category: 'Pearl Care & Quality',
    question: 'How do I care for my Crown Pearl jewelry daily?',
    answer: 'Always practice the classic rule: "Last on, first off." Put your pearls on after applying perfume, hairspray, makeup, and lotions, as cosmetic acids can dull organic nacre. After wear, wipe gently with the complimentary Delma microfiber cloth to remove skin oils. Never submerge in ultrasonic or steam cleaners.'
  },
  {
    category: 'Pearl Care & Quality',
    question: 'What is the difference between Akoya, South Sea, Tahitian, and Freshwater pearls?',
    answer: 'Akoya pearls (Japan) are prized for the sharpest mirror-like luster and classic white/rose shades. South Sea pearls (Australia/Philippines) are the largest, famous for satin champagne-gold or icy white hues with deep nacre. Tahitian pearls (French Polynesia) are naturally dark, exhibiting exotic peacock, green, and aubergine overtones. Freshwater pearls offer organic shapes, pastels, and solid nacre durability.'
  },
  {
    category: 'Authenticity & Guarantee',
    question: 'Are all Crown Pearl pieces certified authentic?',
    answer: 'Yes. Every Crown Pearl creation arrives with an individually numbered Delma Estd. 2003 Certificate of Authenticity specifying the pearl variety, harvest origin, GIA grading classification (luster, nacre, surface), and gold/platinum hallmark purity.'
  },
  {
    category: 'Authenticity & Guarantee',
    question: 'What does Delma’s Lifetime Pearl Care Service include?',
    answer: 'As an atelier founded over 20 years ago, we stand by our work for life. Crown Pearl clients receive complimentary annual knotting checks, sonic inspection of clasps, gentle cleaning, and one complimentary restringing every 24 months.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What are your shipping and insured delivery terms?',
    answer: 'We provide complimentary fully insured express courier shipping on all orders over $150 worldwide. Each parcel is dispatched in tamper-evident, unmarked discreet packaging with signature required upon delivery.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What is your return and home-examination policy?',
    answer: 'We provide a 30-day in-home examination period. If your piece does not completely captivate you in natural light, you may return it in its original unworn condition with certification intact for a full refund or exchange. Return shipping is fully covered by us.'
  },
  {
    category: 'Bespoke & Sizing',
    question: 'Can I request a custom necklace length or ring size?',
    answer: 'Absolutely. Because every strand is hand-knotted in our atelier, we can customize necklace lengths to your exact collarbone measurements, or tailor ring shanks in half and quarter sizes. Contact our concierge or use the consultation booking tool.'
  },
  {
    category: 'Bespoke & Sizing',
    question: 'How can I inquire or connect with Delma?',
    answer: 'You may connect with Delma directly via Facebook Messenger (@delmapearlonline), WhatsApp (+63 999 991 0270), email (delmapearl17@gmail.com), or visit our store at National Highway, Brgy. San Manuel, Puerto Princesa, Palawan. Delma and our team are delighted to assist with custom pieces, sizing, and pearl selections.'
  }
];
