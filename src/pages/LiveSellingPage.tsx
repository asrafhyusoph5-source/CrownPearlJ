import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Calendar,
  ShieldCheck,
  Flame,
  ArrowRight,
  Share2,
  Bell,
  PlayCircle,
  Facebook,
  XCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

const FB_PAGE_URL = 'https://www.facebook.com/delmapearlonline';
const FB_LIVE_URL = 'https://www.facebook.com/delmapearlonline/live_videos';
const FB_MESSENGER_URL = 'https://m.me/shoponlineph';

/*
 * ============================================================
 * FACEBOOK LIVE CONFIGURATION
 * ============================================================
 *
 * When Delma starts a new Facebook Live:
 *
 * 1. Open the LIVE video on Facebook.
 * 2. Copy the URL of that specific LIVE video.
 * 3. Paste it below.
 *
 * Example:
 *
 * https://www.facebook.com/delmapearlonline/videos/123456789012345/
 *
 * IMPORTANT:
 * Do NOT use:
 * https://www.facebook.com/delmapearlonline/live_videos
 *
 * That is the list of Live videos, not the individual Live video.
 *
 * Leave this empty when there is no current Live.
 */

const FACEBOOK_CURRENT_LIVE_URL = 'https://www.facebook.com/share/v/1BQjE2tRi4';

export const LiveSellingPage: React.FC = () => {
  const { addToCart } = useShop();

  const [isCopied, setIsCopied] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Facebook Live Selling & Stream – Crown Pearl Palawan';
  }, []);

  /*
   * Facebook's embed player needs the URL of the individual
   * Facebook video, not the /live_videos page.
   */
  const facebookEmbedUrl = FACEBOOK_CURRENT_LIVE_URL
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        FACEBOOK_CURRENT_LIVE_URL
      )}&show_text=false&autoplay=false`
    : '';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    }
  };

  const getClaimMessengerLink = (
    code: string,
    productName: string,
    price: number
  ) => {
    const text = encodeURIComponent(
      `👑 CLAIM FROM FACEBOOK LIVE!

I want to claim:
Item Code: ${code}
Piece: ${productName}
Live Price: $${price.toLocaleString()}

Please confirm availability and payment details. Thank you!`
    );

    return `${FB_MESSENGER_URL}?text=${text}`;
  };

  // Handpicked live specials from existing products
  const liveItems = [
    {
      code: 'LIVE-01',
      product: PRODUCTS[0],
      liveDiscountPrice: PRODUCTS[0].price * 0.9,
      badge: 'Opening Feature',
      stockStatus: 'Only 2 Available'
    },
    {
      code: 'LIVE-02',
      product: PRODUCTS[1],
      liveDiscountPrice: PRODUCTS[1].price * 0.88,
      badge: 'Bestseller Drop',
      stockStatus: '3 Pairs Ready'
    },
    {
      code: 'LIVE-03',
      product: PRODUCTS[2],
      liveDiscountPrice: PRODUCTS[2].price * 0.85,
      badge: 'Exotic Peacock Tone',
      stockStatus: 'One-of-a-Kind'
    },
    {
      code: 'LIVE-04',
      product: PRODUCTS[3],
      liveDiscountPrice: PRODUCTS[3].price * 0.92,
      badge: 'Live Exclusive Mount',
      stockStatus: 'Custom Sizing Included'
    },
    {
      code: 'LIVE-05',
      product: PRODUCTS[5],
      liveDiscountPrice: PRODUCTS[5].price * 0.88,
      badge: 'Deep Gold Lustre',
      stockStatus: 'Only 1 Left'
    },
    {
      code: 'LIVE-06',
      product: PRODUCTS[6],
      liveDiscountPrice: PRODUCTS[6].price * 0.9,
      badge: 'Statement Piece',
      stockStatus: 'Rare Harvest'
    }
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* =====================================================
            LIVE VIDEO PLAYER
        ====================================================== */}

        <section className="bg-gradient-to-r from-[#111111] via-[#1A2327] to-[#3B4A50] text-white rounded-3xl overflow-hidden shadow-xl">

          {/* Header */}
          <div className="px-6 pt-6 sm:px-10 sm:pt-10">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-heading font-semibold uppercase tracking-widest">

                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>

                <span>
                  {FACEBOOK_CURRENT_LIVE_URL
                    ? 'Delma is Live Now'
                    : 'Crown Pearl Live'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <Facebook className="w-4 h-4" />
                <span>Facebook Live</span>
              </div>

            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mt-5">
              Watch Live Pearl Showcases & Claim Exclusive Drops
            </h1>

            <p className="text-sm sm:text-base text-[#C9D1D3] font-light leading-relaxed max-w-3xl mt-4">
              Experience real-time pearl showcases, luster checks,
              natural daylight comparisons, and exclusive pieces
              presented directly by Delma.
            </p>

          </div>

          {/* =================================================
              VIDEO AREA
          ================================================== */}

          <div className="p-4 sm:p-8">

            {FACEBOOK_CURRENT_LIVE_URL && !videoError ? (

              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">

                <div className="aspect-video">

                  <iframe
                    src={facebookEmbedUrl}
                    className="w-full h-full"
                    style={{
                      border: 'none',
                      overflow: 'hidden'
                    }}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title="Crown Pearl Facebook Live"
                    onError={() => setVideoError(true)}
                  />

                </div>

                {/* LIVE indicator */}
                <div className="absolute top-4 left-4 pointer-events-none">

                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">

                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />

                    LIVE

                  </div>

                </div>

              </div>

            ) : (

              /* ===============================================
                 NO LIVE / FALLBACK
              ================================================ */

              <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center text-center p-6 sm:p-10">

                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">

                  {videoError ? (
                    <XCircle className="w-10 h-10 text-red-400" />
                  ) : (
                    <PlayCircle className="w-10 h-10 text-[#7FC8C0]" />
                  )}

                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">

                  {videoError
                    ? 'Facebook Live Could Not Be Embedded'
                    : 'The Next Crown Pearl Live Showcase'}

                </h2>

                <p className="text-sm text-[#C9D1D3] max-w-xl mt-3">

                  {videoError
                    ? 'You can still watch the livestream directly on our official Facebook page.'
                    : 'When Delma is live, the current Facebook Live video will appear here.'}

                </p>

                <a
                  href={FB_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-heading font-semibold uppercase text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Radio className="w-4 h-4" />
                  <span>Watch on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

              </div>

            )}

          </div>

          {/* =================================================
              ACTION BAR
          ================================================== */}

          <div className="px-6 pb-6 sm:px-10 sm:pb-10">

            <div className="flex flex-wrap items-center gap-3">

              <a
                href={FB_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-heading font-semibold uppercase text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Radio className="w-4 h-4" />
                <span>Watch on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={FB_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#0084FF] hover:bg-[#0073e6] text-white font-heading font-semibold uppercase text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Delma</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {isCopied ? 'Link Copied!' : 'Share Stream'}
                </span>
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            LIVE SCHEDULE
        ====================================================== */}

        <section className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-xs">

          <div className="text-center max-w-2xl mx-auto space-y-2">

            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              Live Schedule
            </span>

            <h2 className="font-serif text-3xl text-[#111111] font-semibold">
              Upcoming Pearl Showcases
            </h2>

            <p className="text-xs sm:text-sm text-[#3B4A50]">
              Follow Delma on Facebook so you don't miss the next
              live pearl showcase.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            <div className="flex items-start justify-between gap-4 p-5 bg-[#FAFAF8] rounded-xl border border-gray-200">

              <div className="flex gap-3">

                <Calendar className="w-5 h-5 text-[#7FC8C0] shrink-0" />

                <div>
                  <div className="font-heading font-semibold text-sm text-[#111111]">
                    Wednesday Night Drop
                  </div>

                  <div className="text-xs text-[#3B4A50] mt-1">
                    Freshwater & Akoya Everyday Classics
                  </div>
                </div>

              </div>

              <span className="text-xs font-heading font-bold text-[#7FC8C0] whitespace-nowrap">
                7:00 PM
              </span>

            </div>

            <div className="flex items-start justify-between gap-4 p-5 bg-[#FAFAF8] rounded-xl border border-gray-200">

              <div className="flex gap-3">

                <Calendar className="w-5 h-5 text-[#7FC8C0] shrink-0" />

                <div>
                  <div className="font-heading font-semibold text-sm text-[#111111]">
                    Saturday Grand Gala
                  </div>

                  <div className="text-xs text-[#3B4A50] mt-1">
                    Golden South Sea & Tahitian High Jewelry
                  </div>
                </div>

              </div>

              <span className="text-xs font-heading font-bold text-[#7FC8C0] whitespace-nowrap">
                7:30 PM
              </span>

            </div>

          </div>

          <div className="text-center mt-6">

            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#7FC8C0] hover:text-[#3B4A50] uppercase font-heading tracking-wider font-semibold transition-colors"
            >
              <Bell className="w-4 h-4" />
              Follow @delmapearlonline on Facebook
              <ExternalLink className="w-3 h-3" />
            </a>

          </div>

        </section>

        {/* =====================================================
            HOW LIVE SELLING WORKS
        ====================================================== */}

        <section className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-xs space-y-8">

          <div className="text-center max-w-2xl mx-auto space-y-2">

            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              Interactive Live Protocol
            </span>

            <h2 className="font-serif text-3xl text-[#111111] font-semibold">
              How Live Selling & Claiming Works
            </h2>

            <p className="text-xs sm:text-sm text-[#3B4A50]">
              Simple steps for viewers to secure authenticated,
              one-of-a-kind pearl creations during our streams.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#FAFAF8] p-6 rounded-xl border border-gray-200 space-y-3">

              <span className="w-8 h-8 rounded-full bg-[#3B4A50] text-white flex items-center justify-center font-heading font-bold text-xs">
                1
              </span>

              <h3 className="font-serif text-lg font-semibold text-[#111111]">
                Watch & Comment "MINE"
              </h3>

              <p className="text-xs text-[#3B4A50] leading-relaxed">
                When Delma showcases a piece you love,
                comment <strong>MINE [Item Code]</strong> in the
                Facebook Live chat.
              </p>

            </div>

            <div className="bg-[#FAFAF8] p-6 rounded-xl border border-gray-200 space-y-3">

              <span className="w-8 h-8 rounded-full bg-[#0084FF] text-white flex items-center justify-center font-heading font-bold text-xs">
                2
              </span>

              <h3 className="font-serif text-lg font-semibold text-[#111111]">
                Lock In via Messenger
              </h3>

              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Send a message to Delma through Messenger
                with your item code to confirm your claim.
              </p>

            </div>

            <div className="bg-[#FAFAF8] p-6 rounded-xl border border-gray-200 space-y-3">

              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-heading font-bold text-xs">
                3
              </span>

              <h3 className="font-serif text-lg font-semibold text-[#111111]">
                Certificate & Dispatch
              </h3>

              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Receive your documentation, jewelry packaging,
                and courier tracking information after your
                purchase is confirmed.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            LIVE SHOWCASE PRODUCTS
        ====================================================== */}

        <section className="space-y-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E7EB] pb-4 gap-4">

            <div>

              <div className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-red-600 mb-1">

                <Flame className="w-4 h-4" />

                <span>Featured Tonight on Stream</span>

              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
                Live Showcase Pieces
              </h2>

            </div>

            <div className="text-xs text-[#3B4A50]">
              Prices reflect special live-stream broadcast incentives.
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {liveItems.map((item) => (

              <div
                key={item.code}
                className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md hover:border-[#7FC8C0] transition-all flex flex-col justify-between"
              >

                <div>

                  <div className="relative aspect-square bg-[#F3F4F6] overflow-hidden">

                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-3 left-3 bg-[#111111] text-white px-3 py-1 rounded-md text-xs font-heading font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">

                      <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />

                      <span>{item.code}</span>

                    </div>

                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-md text-[10px] font-heading font-bold tracking-wider uppercase shadow-md">
                      {item.stockStatus}
                    </div>

                  </div>

                  <div className="p-5 space-y-2">

                    <div className="flex items-center justify-between text-[11px] font-heading uppercase tracking-wider text-[#7FC8C0] font-semibold">

                      <span>
                        {item.product.pearlType} · {item.product.pearlSize}
                      </span>

                      <span className="text-gray-400">
                        {item.badge}
                      </span>

                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#111111] line-clamp-1">
                      {item.product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 pt-1">

                      <span className="font-heading font-bold text-xl text-red-600 tabular-nums">
                        ${Math.round(item.liveDiscountPrice).toLocaleString()}
                      </span>

                      <span className="text-xs text-gray-400 line-through tabular-nums">
                        ${item.product.price.toLocaleString()}
                      </span>

                      <span className="text-[10px] font-heading uppercase text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Live Special
                      </span>

                    </div>

                  </div>

                </div>

                <div className="p-5 pt-0 space-y-2 border-t border-gray-100 mt-2">

                  <a
                    href={getClaimMessengerLink(
                      item.code,
                      item.product.name,
                      Math.round(item.liveDiscountPrice)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs font-heading font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Claim on Messenger</span>
                  </a>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() => addToCart(item.product)}
                      className="flex-1 py-2 bg-[#FAFAF8] hover:bg-[#111111] hover:text-white text-[#3B4A50] border border-[#C9D1D3] text-xs font-heading uppercase tracking-wider font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <Link
                      to={`/product/${item.product.id}`}
                      className="px-3 py-2 bg-white hover:bg-gray-100 text-[#3B4A50] border border-gray-200 text-xs font-heading uppercase rounded transition-colors"
                      title="View piece details"
                    >
                      Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =====================================================
            VIP CONCIERGE
        ====================================================== */}

        <section className="bg-white rounded-2xl border border-[#7FC8C0]/40 p-8 sm:p-12 shadow-sm text-center space-y-4">

          <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#7FC8C0] flex items-center justify-center mx-auto">

            <ShieldCheck className="w-6 h-6" />

          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold">
            Can't Catch the Live Broadcast?
          </h2>

          <p className="text-xs sm:text-sm text-[#3B4A50] max-w-xl mx-auto">
            Our atelier concierge is available 7 days a week.
            Request a private 1-on-1 video call to view any
            necklace, earrings, or ring before ordering.
          </p>

          <div className="pt-2">

            <a
              href={FB_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B4A50] hover:bg-[#111111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#7FC8C0]" />

              <span>
                Message Delma Directly on Facebook
              </span>

              <ArrowRight className="w-4 h-4 ml-1" />

            </a>

          </div>

        </section>

      </div>
    </div>
  );
};
