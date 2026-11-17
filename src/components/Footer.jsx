import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck, Lock } from 'lucide-react';
import { BRAND, formatPhoneDisplay } from '../../shared/catalog.js';

export function Footer({ whatsappNumber, deliveryZones, onOpenTrack }) {
  const cleanWa = String(whatsappNumber || BRAND.defaultWhatsapp).replace(/\D/g, '');
  const waHref = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    'Bonjour Pèrôkadô ! Je souhaite avoir un renseignement sur vos articles.'
  )}`;

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
              Votre boutique e-commerce multi-catégories à Daloa et dans les villes aux alentours.
              Qualité vérifiée, livraison rapide et paiement en toute confiance.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E0A11B] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Paiement à la réception ou Mobile Money</span>
            </div>
          </div>

          {/* Zones de livraison */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E0A11B]" />
              <span>Zones de livraison</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#FAF7F0]/80">
              {(deliveryZones || []).slice(0, 7).map((z) => (
                <li key={z.id} className="flex items-center justify-between gap-2">
                  <span>{z.shortName}</span>
                  <span className="text-[#E0A11B] font-semibold">
                    {z.fee === 0 ? 'Gratuit' : `${z.fee.toLocaleString('fr-FR')} F`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations utiles */}
          <div>
            <h3 className="text-base font-bold text-white mb-3">Service Client</h3>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/80">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrack}
                  className="hover:text-[#E0A11B] transition cursor-pointer"
                >
                  Suivre ma commande en direct
                </button>
              </li>
              <li>Horaires : Lundi – Samedi (08h00 – 19h30)</li>
              <li>Modes de règlement : Espèces, Wave, Orange, MTN, Moov</li>
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

          {/* Contact direct WhatsApp */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Besoin d’un conseil ?</h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80">
              Une question sur un produit, une livraison à Issia, Vavoua, Bouaflé ou un coffret
              cadeau sur mesure ? Écrivez-nous directement.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white text-sm font-bold shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
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

      {/* Bouton flottant WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#1FAF5A] hover:bg-[#18934A] text-white font-bold text-xs sm:text-sm shadow-xl transition"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Aide WhatsApp</span>
      </a>
    </footer>
  );
}
