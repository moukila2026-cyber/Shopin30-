import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Smartphone,
  QrCode,
  Lock,
  Info,
  ChevronUp,
} from 'lucide-react';
import { BRAND, formatPhoneDisplay } from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

export function Footer({
  whatsappNumber,
  shippingDisclaimer,
  deliveryZones,
  onOpenTrack,
  onSelectCategory,
}) {
  const waHref = buildWhatsappServiceUrl(whatsappNumber);

  return (
    <footer className="mt-14 text-white">
      {/* 1. Barre "Retour en haut" emblématique d'Amazon (#37475A) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full py-3.5 bg-[#37475A] hover:bg-[#485769] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        <ChevronUp className="w-4 h-4" />
        <span>Retour en haut</span>
      </button>

      {/* 2. Corps 4 colonnes #232F3E */}
      <div className="bg-[#232F3E]">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Col 1 : Mieux nous connaître */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white">À propos de Pèrôkadô</h3>
            <p className="text-xs text-[#DDDDDD] leading-relaxed">
              Marketplace locale basée à Daloa (Haut-Sassandra) dédiée au High-Tech, à la Mode, à la
              Beauté, aux Cadeaux et à l’Électroménager.
            </p>
            <div className="pt-1 space-y-1.5 text-xs text-[#FF9900] font-semibold">
              <p className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#009EE3] shrink-0" />
                <span>Paiement en ligne uniquement via Wave</span>
              </p>
              <p className="flex items-center gap-2">
                <QrCode className="w-4 h-4 shrink-0" />
                <span>Suivi marchandise en direct par Code QR</span>
              </p>
            </div>
          </div>

          {/* Col 2 : Nos Rayons */}
          <div className="space-y-2">
            <h3 className="font-bold text-base text-white">Nos Rayons</h3>
            <ul className="space-y-1.5 text-xs text-[#DDDDDD]">
              {[
                { id: 'high-tech', label: 'High-Tech, Smartphones & Audio' },
                { id: 'maison', label: 'Maison, Cuisine & Solaire' },
                { id: 'mode', label: 'Mode, Montres & Bagagerie' },
                { id: 'beaute-cadeaux', label: 'Beauté, Parfums & Coffrets' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory?.(cat.id);
                      document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:underline text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 : Tarifs Livraison & Expéditions */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF9900]" />
              <span>Tarifs Livraison & Expédition</span>
            </h3>
            <ul className="space-y-1 text-xs text-[#DDDDDD]">
              {(deliveryZones || []).slice(0, 5).map((z) => (
                <li key={z.id} className="flex items-center justify-between gap-2">
                  <span>{z.shortName}</span>
                  <strong className="text-white">{z.fee.toLocaleString('fr-FR')} F</strong>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#CCCCCC] leading-snug flex items-start gap-1.5 pt-1.5 border-t border-white/10">
              <Info className="w-3.5 h-3.5 text-[#FF9900] shrink-0 mt-0.5" />
              <span>{shippingDisclaimer || BRAND.shippingDisclaimer}</span>
            </p>
          </div>

          {/* Col 4 : Besoin d'aide / Suivi & Service Client */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white">Besoin d’aide ?</h3>
            <ul className="space-y-2 text-xs text-[#DDDDDD]">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrack}
                  className="text-[#FF9900] hover:underline font-bold text-left cursor-pointer"
                >
                  Suivre ma marchandise en direct (Code QR / Réf)
                </button>
              </li>
              <li>Horaires : Lundi – Samedi (08h00 – 19h30)</li>
              <li>Aucune livraison gratuite (selon taille & poids)</li>
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-xs font-bold shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4 text-[#128C7E]" />
              <span>Service Client WhatsApp</span>
            </a>
            <p className="text-xs text-[#CCCCCC] flex items-center gap-1.5 pt-0.5">
              <Phone className="w-3.5 h-3.5 text-[#FF9900]" />
              <span>{formatPhoneDisplay(whatsappNumber || BRAND.defaultWhatsapp)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Sous-barre finale #131921 */}
      <div className="bg-[#131921] border-t border-[#3A4553]">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CCCCCC]">
          <div className="flex items-center gap-3">
            <img
              src="/images/icon-512.png"
              alt="Pèrôkadô"
              className="w-7 h-7 rounded bg-white p-0.5 object-cover"
            />
            <span>
              © {new Date().getFullYear()} <strong>Pèrôkadô</strong> — Daloa, Côte d’Ivoire.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BRAND.studioCredit.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF9900] transition"
            >
              Propulsé par {BRAND.studioCredit.name} ({BRAND.studioCredit.phoneDisplay})
            </a>
          </div>
        </div>
      </div>

      {/* Bouton flottant Service Client WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Service client WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-xl transition"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Service Client</span>
      </a>
    </footer>
  );
}
