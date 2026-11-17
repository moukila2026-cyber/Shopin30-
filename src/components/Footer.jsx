import React from 'react';
import { MapPin, Phone, MessageCircle, Smartphone, QrCode, Lock, Info } from 'lucide-react';
import { BRAND, formatPhoneDisplay } from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

export function Footer({ whatsappNumber, shippingDisclaimer, deliveryZones, onOpenTrack }) {
  const waHref = buildWhatsappServiceUrl(whatsappNumber);

  return (
    <footer className="bg-[#0F443E] text-[#FAF7F0] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Identité */}
          <div className="space-y-4">
            <div className="inline-block bg-[#FAF7F0] px-4 py-2.5 rounded-2xl">
              <img
                src="/images/logo-horizontal.png"
                alt="Logo Pèrôkadô"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed">
              Votre boutique e-commerce multi-catégories à Daloa avec expédition rapide vers Issia,
              Vavoua et toutes les villes aux alentours.
            </p>
            <div className="space-y-1.5 text-xs text-[#E0A11B] font-semibold">
              <p className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Paiement en ligne par Wave uniquement</span>
              </p>
              <p className="flex items-center gap-2">
                <QrCode className="w-4 h-4 shrink-0" />
                <span>Référence + Code QR de suivi en direct</span>
              </p>
            </div>
          </div>

          {/* Grille Livraison & Expédition */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E0A11B]" />
              <span>Livraison & Expéditions</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#FAF7F0]/85">
              {(deliveryZones || []).slice(0, 6).map((z) => (
                <li key={z.id} className="flex items-center justify-between gap-2">
                  <span>{z.shortName}</span>
                  <span className="text-[#E0A11B] font-semibold">
                    {z.fee.toLocaleString('fr-FR')} F
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#FAF7F0]/70 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-white/10">
              <Info className="w-3.5 h-3.5 text-[#E0A11B] shrink-0 mt-0.5" />
              <span>{shippingDisclaimer || BRAND.shippingDisclaimer}</span>
            </p>
          </div>

          {/* Informations utiles */}
          <div>
            <h3 className="text-base font-bold text-white mb-3">Suivi & Infos</h3>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/80">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrack}
                  className="hover:text-[#E0A11B] transition cursor-pointer font-semibold text-left"
                >
                  Suivre ma marchandise en direct (Code QR / Réf)
                </button>
              </li>
              <li>Horaires : Lundi – Samedi (08h00 – 19h30)</li>
              <li>Règlement en ligne : Wave Côte d’Ivoire uniquement</li>
              <li>Aucune livraison gratuite</li>
              <li className="pt-1">
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F0]/60 hover:text-white transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Espace équipe (/admin)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact direct Service Client */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Service Client Pèrôkadô</h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed">
              Le coût de livraison ou d’expédition dépend de la taille et du poids de votre
              marchandise. Contactez notre service client pour tout renseignement ou colis spécial.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white text-sm font-bold shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter le Service Client</span>
            </a>
            <p className="text-xs text-[#FAF7F0]/75 flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-[#E0A11B]" />
              <span>{formatPhoneDisplay(whatsappNumber || BRAND.defaultWhatsapp)}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF7F0]/70">
          <p>© {new Date().getFullYear()} Pèrôkadô — Daloa, Côte d’Ivoire. Tous droits réservés.</p>
          <a
            href={BRAND.studioCredit.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E0A11B] transition font-medium"
          >
            Conçu par {BRAND.studioCredit.name} · WhatsApp {BRAND.studioCredit.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Bouton flottant Service Client WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Service client WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#1FAF5A] hover:bg-[#18934A] text-white font-bold text-xs sm:text-sm shadow-xl transition"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Service Client</span>
      </a>
    </footer>
  );
}
