import React from 'react';
import { Truck, Smartphone, QrCode, Sparkles, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { buildWhatsappServiceUrl } from '../lib/api.js';

export function Hero({ onShopNow, onOpenTrack, whatsappNumber }) {
  return (
    <section className="relative overflow-hidden border-b border-[#E5DEC9] bg-gradient-to-br from-[#FAF7F0] via-[#F5EFE2] to-[#EDE3CE]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#D95D24]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#0F443E]/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Texte principal */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DED6C1] text-xs sm:text-sm font-semibold text-[#0F443E] shadow-2xs">
              <MapPin className="w-4 h-4 text-[#D95D24]" />
              <span>Daloa Commune & Périphérie · Expédition Issia, Vavoua & alentours</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F443E] leading-[1.12]">
              Commandez en ligne et suivez votre colis en direct avec{' '}
              <span className="text-[#D95D24]">Pèrôkadô</span>.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl leading-relaxed">
              High-Tech, Mode, Parfums, Cadeaux et Maison. Réglez facilement en ligne par{' '}
              <strong className="text-[#0F443E]">Wave</strong> et recevez immédiatement votre{' '}
              <strong className="text-[#0F443E]">référence unique accompagnée d’un Code QR</strong>{' '}
              pour suivre votre marchandise en temps réel jusqu’à la réception.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white font-semibold text-sm sm:text-base shadow-md transition cursor-pointer"
              >
                <span>Découvrir le catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenTrack}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FAF7F0] text-[#0F443E] border border-[#D4CBB4] font-semibold text-sm sm:text-base transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#D95D24]" />
                <span>Suivre ma marchandise</span>
              </button>
            </div>

            {/* Tarifs clairs & règles de livraison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="flex items-start gap-2.5 bg-white/85 border border-[#E5DEC9] rounded-2xl p-3.5">
                <Truck className="w-5 h-5 text-[#D95D24] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#0F443E]">Tarifs Livraison & Expédition</p>
                  <p className="text-xs text-stone-600">
                    1 000 F Daloa Commune · 1 500 F Périphérie · 2 000 F Issia, Vavoua… (selon poids/taille)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/85 border border-[#E5DEC9] rounded-2xl p-3.5">
                <Smartphone className="w-5 h-5 text-[#009EE3] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#0F443E]">Paiement Wave uniquement</p>
                  <p className="text-xs text-stone-600">
                    Paiement en ligne simple, rapide et sécurisé par Wave Côte d’Ivoire
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/85 border border-[#E5DEC9] rounded-2xl p-3.5">
                <QrCode className="w-5 h-5 text-[#0F443E] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#0F443E]">Référence & Code QR</p>
                  <p className="text-xs text-stone-600">
                    Scannez votre Code QR à tout moment pour suivre l’avancement en direct
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte visuelle identité Pèrôkadô */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DEC9] shadow-xl">
              <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F443E] text-[#FAF7F0] text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E0A11B]" />
                <span>Suivi QR en temps réel</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-full rounded-2xl bg-[#FCFBF0] p-6 border border-[#EFE9D8] flex items-center justify-center">
                  <img
                    src="/images/logo-horizontal.png"
                    alt="Pèrôkadô — Boutique officielle"
                    className="max-h-28 sm:max-h-32 w-auto object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 w-full text-left">
                  <div className="rounded-xl bg-[#FAF7F0] p-3 border border-[#EAE2CE]">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#D95D24]">
                      Grille tarifaire
                    </p>
                    <p className="text-xs font-bold text-[#0F443E] mt-1">
                      • Daloa Commune : 1 000 F
                    </p>
                    <p className="text-xs font-bold text-[#0F443E]">
                      • Périphérie : 1 500 F
                    </p>
                    <p className="text-xs font-bold text-[#0F443E]">
                      • Issia, Vavoua… : 2 000 F
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FAF7F0] p-3 border border-[#EAE2CE] flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-[#0F443E]">
                        Colis lourd / volumineux ?
                      </p>
                      <p className="text-xs text-stone-600 mt-1">
                        Le tarif dépend de la taille et du poids de la marchandise.
                      </p>
                    </div>
                    <a
                      href={buildWhatsappServiceUrl(whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#D95D24] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contacter le service client</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
