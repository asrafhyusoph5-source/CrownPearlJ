import React, { useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';


export const PearlGuidePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pearl Education & Care Guide – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Delma Gemological Academy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] font-semibold">
            The Connoisseur’s Guide to Cultured Pearls
          </h1>
          <p className="text-sm text-[#3B4A50]">
            Pearls may look similar at first glance, but each type has its own story.
            The water where it grows, the mollusk that produces it, and the way the pearl develops all influence its size, shape, color, surface, and luster.
          </p>
          <p className="text-sm text-[#3B4A50]">
            Understanding these differences can help you choose a pearl that matches your taste, style, and budget.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[440px] border border-[#E5E7EB]">
          <img src={ASSET_IMAGES.pearlTypes} alt="Crown Pearl varieties" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <img
  src={ASSET_IMAGES.pearlAkoya}
  alt="Akoya Pearl"
  className="w-full h-56 object-cover"
/>
            <h3 className="font-serif text-xl font-semibold text-[#111]">South Sea Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Born in the warm waters of the ocean and sea
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Cultivated in large saltwater oysters, particularly the Pinctada maxima.
              They are associated with the warm waters of regions such as the Philippines, Indonesia, and Australia.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            They are among the largest cultured pearls and are admired for their naturally soft, luxurious luster. They can appear in beautiful white, silver, cream, and golden tones.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose South Sea?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              If you are looking for a larger pearl with a luxurious presence and naturally elegant appearance, South Sea Pearls are a remarkable choice.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <img
  src={ASSET_IMAGES.pearlAkoya}
  alt="Akoya Pearl"
  className="w-full h-56 object-cover"
/>
            <h3 className="font-serif text-xl font-semibold text-[#111]">Akoya Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Born in the warm waters of the ocean and sea
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Cultured in saltwater oysters, primarily associated with Japan and other parts of Asia.
              They are generally smaller than South Sea Pearls but are especially valued for their bright, sharp luster and classic appearance.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Akoya Pearls are commonly round and are often found in white and cream shades, sometimes with delicate pink or silver overtones.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose Akoya?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             A wonderful choice for customers who love the classic, refined look of a traditional round pearl with brilliant shine.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Freshwater Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Grown in freshwater rivers, lakes, and ponds
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Unlike saltwater pearls, Freshwater Pearls are cultivated in freshwater mussels. They can be grown in rivers, lakes, ponds, and other freshwater environments, particularly in China.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Freshwater Pearls come in an impressive variety of shapes, sizes, and natural colors. Many are known for their soft, creamy appearance and excellent value.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose Freshwater?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             Ideal for customers who want beautiful, versatile pearls with many shapes and styles to choose from, often at a more accessible price.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Tahitian Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Born in the tropical saltwater of the South Pacific
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Tahitian Pearls are cultivated in saltwater oysters, particularly the black-lipped oyster Pinctada margaritifera. They are strongly associated with French Polynesia and the tropical waters of the South Pacific.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Despite often being called “black pearls,” their natural colors can range from dark gray and charcoal to green, blue, silver, and peacock-like overtones.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose Tahitian?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             For those who prefer something bold and distinctive, Tahitian Pearls offer naturally darker colors and captivating overtones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Baroque Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Nature's beauty without a perfect shape
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Baroque is not a specific place where a pearl comes from. Instead, it describes a pearl with an irregular, non-symmetrical shape.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Baroque Pearls can come from both freshwater and saltwater environments. Their unusual curves, wrinkles, contours, and organic forms make each pearl different from the next.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose Baroque?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             Perfect for customers who appreciate individuality and want a pearl that feels artistic, natural, and truly one of a kind.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Keshi Pearls</h3>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Small in formation, remarkable in luster
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Keshi Pearls are naturally formed without a traditional pearl nucleus. They can occur in both saltwater and freshwater pearl cultivation.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Because they are composed almost entirely of nacre, Keshi Pearls can display an exceptionally beautiful luster. Their shapes are often irregular, giving them a distinctive natural character.
            </p>
            <b className="text-xs text-[#3B4A50] leading-relaxed">
              Why choose Keshi?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             For pearl lovers who appreciate strong luster, organic shapes, and the unique character created by nature.
            </p>
          </div>

        </div>
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] font-semibold">
            Choose the Pearl That Tells Your Story
          </h1>
            <b className="text-sm text-[#3B4A50]">
              There is no single pearl that is perfect for everyone.
            </b>
            <p className="text-sm text-[#3B4A50]">
              Some customers are drawn to the impressive presence of a South Sea Pearl. Others prefer the classic brilliance of Akoya, the versatility of Freshwater, the dramatic character of Tahitian, or the individuality of Baroque pearls.
            </p>
            <p className="text-sm text-[#3B4A50]">
            Knowing where a pearl comes from and how it is formed allows you to look beyond its appearance and understand what you are truly purchasing.
            </p>
            <b className="text-sm text-[#3B4A50]">
              A pearl is more than something that shines — it is a natural creation shaped by water, time, and nature.
            </b>
        </div>
        
      </div>
    </div>
  );
};
