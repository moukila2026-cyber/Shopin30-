import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Smartphone,
  QrCode,
  Info,
  ChevronUp,
  ShieldCheck,
  Truck,
  Scale,
  Cookie,
} from 'lucide-react';
import { BRAND, formatPhoneDisplay } from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

export function Footer({
  whatsappNumber,
  shippingDisclaimer,
  deliveryZones,
  onOpenTrack,
  onSelectCategory,
  onOpenLegal,
  onManageCookies,
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

      {/* 2. Bandeau de réassurance e-commerce */}
      <div className="bg-[#1B2531] border-b border-white/10">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#FF9900] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Garantie Officielle SMART</p>
              <p className="text-[#CCCCCC] text-[11px]">Appareils neufs contrôlés avant départ</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Smartphone className="w-5 h-5 text-[#009EE3] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Paiement 100% Sécurisé</p>
              <p className="text-[#CCCCCC] text-[11px]">Wave CI & Mobile Money chiffré HTTPS</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Truck className="w-5 h-5 text-[#FF9900] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Livraison Daloa & Côte d’Ivoire</p>
              <p className="text-[#CCCCCC] text-[11px]">Standard dès 1 000 F · Lourds 2 500 F / 5 000 F</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <QrCode className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Traçabilité Code QR Direct</p>
              <p className="text-[#CCCCCC] text-[11px]">Suivi temps réel de votre marchandise</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Corps 5 colonnes complet #232F3E */}
      <div className="bg-[#232F3E]">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Col 1 : À propos de Pèrôkadô */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white">À propos de Pèrôkadô</h3>
            <p className="text-xs text-[#DDDDDD] leading-relaxed">
              Votre boutique e-commerce de référence basée à <strong>Daloa (Haut-Sassandra)</strong>,
              spécialisée dans les <strong>Motos & Tricycles</strong>, l’Électroménager{' '}
              <strong>SMART TECHNOLOGY</strong>, le High-Tech, la Mode et la Maison.
            </p>
            <div className="pt-1 space-y-1.5 text-xs text-[#FF9900] font-semibold">
              <p className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#009EE3] shrink-0" />
                <span>Paiement Wave & Mobile Money</span>
              </p>
              <p className="flex items-center gap-2">
                <QrCode className="w-4 h-4 shrink-0" />
                <span>Reçu & Suivi direct par Code QR</span>
              </p>
            </div>
          </div>

          {/* Col 2 : Nos Rayons */}
          <div className="space-y-2">
            <h3 className="font-bold text-base text-white">Nos Rayons</h3>
            <ul className="space-y-1.5 text-xs text-[#DDDDDD]">
              {[
                { id: 'motos-tricycles', label: 'Motos & Tricycles Cargo' },
                { id: 'froid', label: 'Réfrigérateurs & Vitrines SMART' },
                { id: 'lavage-cuisson', label: 'Lave-linge & Gazinières SMART' },
                { id: 'maison', label: 'Petit Électroménager & Maison' },
                { id: 'high-tech', label: 'High-Tech, Smartphones & Audio' },
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
                    className="hover:underline hover:text-white text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 : Tarifs Livraison & Produits lourds */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF9900]" />
              <span>Livraison & Expédition</span>
            </h3>
            <ul className="space-y-1 text-xs text-[#DDDDDD]">
              {(deliveryZones || []).slice(0, 4).map((z) => (
                <li key={z.id} className="flex items-center justify-between gap-2">
                  <span>{z.shortName}</span>
                  <strong className="text-white">{z.fee.toLocaleString('fr-FR')} F</strong>
                </li>
              ))}
              <li className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-[#FF9900]">
                <span>Lourds (Daloa)</span>
                <strong className="text-white">2 500 F</strong>
              </li>
              <li className="flex items-center justify-between gap-2 text-[#FF9900]">
                <span>Lourds (Hors Daloa)</span>
                <strong className="text-white">5 000 F</strong>
              </li>
            </ul>
            <p className="text-[11px] text-[#CCCCCC] leading-snug flex items-start gap-1.5 pt-1 border-t border-white/10">
              <Info className="w-3.5 h-3.5 text-[#FF9900] shrink-0 mt-0.5" />
              <span>{shippingDisclaimer || BRAND.shippingDisclaimer}</span>
            </p>
          </div>

          {/* Col 4 : Informations Légales & Conformité CI */}
          <div className="space-y-2">
            <h3 className="font-bold text-base text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#FF9900]" />
              <span>Informations Légales</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#DDDDDD]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('mentions')}
                  className="hover:underline hover:text-white text-left cursor-pointer"
                >
                  Mentions légales (Loi 2013-546 CI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('cgv')}
                  className="hover:underline hover:text-white text-left cursor-pointer"
                >
                  Conditions Générales de Vente (CGV)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('livraison')}
                  className="hover:underline hover:text-white text-left cursor-pointer"
                >
                  Politique de livraison, SAV & Retours
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('confidentialite')}
                  className="hover:underline hover:text-white text-left cursor-pointer"
                >
                  Confidentialité & Données (ARTCI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('cookies')}
                  className="hover:underline hover:text-white text-left cursor-pointer"
                >
                  Politique de Cookies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onManageCookies?.()}
                  className="inline-flex items-center gap-1 text-[#FF9900] hover:underline font-semibold text-left cursor-pointer"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>Gérer mes préférences cookies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5 : Aide & Service Client */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-base text-white">Service Client</h3>
            <ul className="space-y-2 text-xs text-[#DDDDDD]">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrack}
                  className="text-[#FF9900] hover:underline font-bold text-left cursor-pointer"
                >
                  Suivre mon colis en direct (Code QR)
                </button>
              </li>
              <li>Siège : Daloa, Haut-Sassandra (CI)</li>
              <li>Ouvert : Lun – Sam (08h00 – 19h30)</li>
              <li>
                <a
                  href="mailto:perokado.com@gmail.com"
                  className="hover:underline hover:text-white"
                >
                  perokado.com@gmail.com
                </a>
              </li>
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-xs font-bold shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4 text-[#128C7E]" />
              <span>Assistance WhatsApp</span>
            </a>
            <p className="text-xs text-[#CCCCCC] flex items-center gap-1.5 pt-0.5">
              <Phone className="w-3.5 h-3.5 text-[#FF9900]" />
              <span>{formatPhoneDisplay(whatsappNumber || BRAND.defaultWhatsapp)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sous-barre finale #131921 avec moyens de paiement & liens légaux rapides */}
      <div className="bg-[#131921] border-t border-[#3A4553]">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-6 space-y-4 text-xs text-[#CCCCCC]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/icon-512.png"
                alt="Pèrôkadô"
                className="w-7 h-7 rounded bg-white p-0.5 object-cover"
              />
              <span>
                © {new Date().getFullYear()} <strong>Pèrôkadô</strong> — Commerce électronique à
                Daloa, République de Côte d’Ivoire. Tous droits réservés.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-[#009EE3] text-white font-extrabold">
                WAVE CI
              </span>
              <span className="px-2.5 py-1 rounded bg-[#232F3E] border border-white/15 text-white font-semibold">
                Mobile Money (SasPay)
              </span>
              <span className="px-2.5 py-1 rounded bg-[#232F3E] border border-white/15 text-[#25D366] font-semibold">
                HTTPS / TLS Chiffré
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#AAAAAA]">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <button
                type="button"
                onClick={() => onOpenLegal?.('cgv')}
                className="hover:text-white cursor-pointer"
              >
                CGV
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal?.('mentions')}
                className="hover:text-white cursor-pointer"
              >
                Mentions légales
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal?.('confidentialite')}
                className="hover:text-white cursor-pointer"
              >
                Protection des données (ARTCI)
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal?.('cookies')}
                className="hover:text-white cursor-pointer"
              >
                Cookies
              </button>
            </div>

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
