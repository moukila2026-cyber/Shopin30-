import React from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  Truck,
  Cookie,
  Lock,
  CheckCircle2,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { BRAND, formatPhoneDisplay } from '../../shared/catalog.js';

export const COOKIE_CONSENT_STORAGE_KEY = 'pkd_cookie_consent_v1';

export function readCookieConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice) {
  if (typeof window === 'undefined') return;
  const payload = {
    essential: true,
    analytics: choice === 'all',
    choice, // 'all' | 'essential'
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage quota errors
  }
  return payload;
}

const LEGAL_TABS = [
  { id: 'mentions', label: 'Mentions Légales', icon: Scale },
  { id: 'cgv', label: 'Conditions Générales de Vente (CGV)', icon: FileText },
  { id: 'livraison', label: 'Livraison, Garanties & Retours', icon: Truck },
  { id: 'confidentialite', label: 'Confidentialité & Données (ARTCI)', icon: Lock },
  { id: 'cookies', label: 'Politique de Cookies', icon: Cookie },
];

export function LegalModal({ openTab, onClose, onSelectTab, whatsappNumber, onResetCookies }) {
  if (!openTab) return null;

  const phoneDisplay = formatPhoneDisplay(whatsappNumber || BRAND.defaultWhatsapp);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Informations légales et conditions Pèrôkadô"
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5D9D9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="bg-[#232F3E] text-white px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#FF9900] shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-bold">
                Centre Juridique, Sécurité & Transparence — Pèrôkadô
              </h2>
              <p className="text-[11px] text-[#CCCCCC]">
                Commerce électronique en République de Côte d’Ivoire (Loi n°2013-546 & Loi n°2013-450)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 rounded-full hover:bg-[#37475A] text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barre d'onglets */}
        <div className="bg-[#F0F2F2] border-b border-[#D5D9D9] px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto">
          {LEGAL_TABS.map((t) => {
            const Icon = t.icon;
            const active = openTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[#131921] text-white shadow-2xs'
                    : 'bg-white text-[#0F1111] border border-[#D5D9D9] hover:bg-[#EAEDED]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#FF9900]" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenu détaillé */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#333333] leading-relaxed">
          {openTab === 'mentions' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F1111]">
                1. Mentions Légales (Loi ivoirienne n°2013-546 relative aux transactions électroniques)
              </h3>
              <p>
                Le site e-commerce <strong>Pèrôkadô</strong> est édité et exploité à{' '}
                <strong>Daloa (Région du Haut-Sassandra, République de Côte d’Ivoire)</strong>.
              </p>
              <div className="bg-[#F7FAFA] border border-[#D5D9D9] rounded-lg p-4 space-y-1.5 text-xs">
                <p>
                  <strong>Enseigne commerciale :</strong> Pèrôkadô — Boutique Électroménager SMART
                  TECHNOLOGY, High-Tech, Mode, Beauté & Maison
                </p>
                <p>
                  <strong>Site officiel :</strong> https://perokado.com
                </p>
                <p>
                  <strong>E-mail officiel :</strong> perokado.com@gmail.com
                </p>
                <p>
                  <strong>Siège d’exploitation & expédition :</strong> Daloa, Haut-Sassandra, Côte
                  d’Ivoire
                </p>
                <p>
                  <strong>Service Client & Assistance WhatsApp :</strong> {phoneDisplay} (Lundi au
                  Samedi, de 08h00 à 19h30 GMT)
                </p>
                <p>
                  <strong>Conception & Ingénierie logicielle :</strong> {BRAND.studioCredit.name} (
                  {BRAND.studioCredit.phoneDisplay})
                </p>
                <p>
                  <strong>Infrastructure Cloud & Sécurité :</strong> Hébergement applicatif certifié
                  HTTPS/TLS 1.3 (Vercel Inc. & base de données chiffrée PostgreSQL Neon).
                </p>
              </div>
              <p>
                Toute reproduction non autorisée des visuels produits retraités, textes, logos ou
                éléments graphiques de la boutique Pèrôkadô est strictement interdite conformément
                aux dispositions de l’OIPI et de l’Accord de Bangui (OAPI).
              </p>
            </div>
          )}

          {openTab === 'cgv' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F1111]">
                2. Conditions Générales de Vente (CGV)
              </h3>
              <p>
                Les présentes Conditions Générales de Vente régissent l’ensemble des ventes conclues
                en ligne sur la plateforme <strong>Pèrôkadô</strong> auprès des acheteurs situés à
                Daloa et dans toute la Côte d’Ivoire.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Prix affichés :</strong> Tous les prix sont indiqués TTC en{' '}
                  <strong>Francs CFA (FCFA / XOF)</strong>, hors frais de livraison ou d’expédition
                  calculés de manière transparente avant validation finale du panier.
                </li>
                <li>
                  <strong>Paiement sécurisé 100% Wave CI :</strong> Les règlements s’effectuent
                  exclusivement via <strong>Wave Côte d’Ivoire</strong> sur le compte dédié aux
                  encaissements Pèrôkadô (<strong>+225 05 46 69 74 78</strong>, distinct du numéro
                  WhatsApp du Service Client +225 05 01 30 33 43) ou via Wave Business Checkout.
                  Aucune clé ni code secret Mobile Money n’est jamais stocké sur les serveurs de
                  Pèrôkadô.
                </li>
                <li>
                  <strong>Preuve et suivi de commande :</strong> Dès l’enregistrement de la commande,
                  un numéro unique (format <code>PKD-XXXXXX</code>) ainsi qu’un{' '}
                  <strong>Code QR personnel infalsifiable</strong> permettent au client de suivre en
                  direct chaque étape (Vérification → Préparation → En route → Livré).
                </li>
                <li>
                  <strong>Disponibilité des stocks :</strong> Les stocks sont décrémentés
                  automatiquement en temps réel. En cas d’indisponibilité exceptionnelle constatée au
                  contrôle qualité avant départ, le client est intégralement remboursé sur son compte
                  Mobile Money sous 24 heures maximum.
                </li>
              </ul>
            </div>
          )}

          {openTab === 'livraison' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F1111]">
                3. Politique de Livraison, Manutention des Produits Lourds, Garanties & Retours
              </h3>
              <div className="bg-[#FEF8F2] border border-[#F5D3B3] rounded-lg p-4 space-y-2 text-xs">
                <p className="font-bold text-[#B12704]">
                  Grille tarifaire officielle (Aucune livraison gratuite) :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#0F1111]">
                  <li>
                    <strong>Colis standards (petit électroménager, téléphonie, mode, beauté) :</strong>{' '}
                    <strong>1 000 FCFA</strong> dans Daloa Commune · <strong>1 500 FCFA</strong> en
                    Périphérie de Daloa · <strong>2 000 FCFA</strong> en expédition hors de Daloa
                    (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa…).
                  </li>
                  <li>
                    <strong>
                      Produits lourds & grand gabarit (lave-linge, lavantes-séchantes, gazinières /
                      cuisinières avec four, réfrigérateurs, vitrines réfrigérées, congélateurs…) :
                    </strong>{' '}
                    forfait manutention sécurisée de <strong>2 500 FCFA</strong> dans tout Daloa et{' '}
                    <strong>5 000 FCFA</strong> pour toute expédition hors de Daloa.
                  </li>
                </ul>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contrôle avant expédition :</strong> Chaque appareil{' '}
                  <strong>SMART TECHNOLOGY</strong> et article High-Tech est vérifié avant remise au
                  livreur ou à la compagnie de transport.
                </li>
                <li>
                  <strong>Garantie constructeur & SAV :</strong> Les gros appareils électroménagers
                  SMART TECHNOLOGY bénéficient de la garantie constructeur officielle indiquée sur
                  leur fiche (12 à 24 mois selon modèle, hors dommages liés aux surtensions sans
                  régulateur AVR, chocs ou mauvaise installation).
                </li>
                <li>
                  <strong>Échange & Retours (Sous 48h à 7 jours) :</strong> En cas de défaut de
                  conformité constaté à la réception, contactez immédiatement notre Service Client
                  WhatsApp ({phoneDisplay}) muni de votre référence <code>PKD-XXXXXX</code> et de
                  l’emballage d’origine intact pour un échange standard ou remboursement.
                </li>
              </ul>
            </div>
          )}

          {openTab === 'confidentialite' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F1111]">
                4. Protection des Données Personnelles (Conformité Loi n°2013-450 / ARTCI)
              </h3>
              <p>
                Conformément à la{' '}
                <strong>
                  Loi ivoirienne n°2013-450 du 19 juin 2013 relative à la protection des données à
                  caractère personnel
                </strong>{' '}
                (supervisée par l’<strong>ARTCI</strong>), Pèrôkadô ne collecte que les informations
                strictement indispensables au traitement et à la livraison de vos commandes :
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Nom et prénom du destinataire ;</li>
                <li>Numéro de téléphone joignable pour la livraison et le suivi ;</li>
                <li>Ville, quartier, point de repère et référence de transaction Mobile Money.</li>
              </ul>
              <p>
                <strong>Engagement zéro revente :</strong> Vos coordonnées ne sont{' '}
                <strong>jamais vendues, louées ni cédées</strong> à des régies publicitaires tierces.
                Les communications entre votre navigateur et nos serveurs sont intégralement
                chiffrées en HTTPS/TLS et protégées contre les attaques CSRF et injections SQL.
              </p>
              <p>
                <strong>Droits d’accès, de rectification et de suppression :</strong> Vous pouvez
                demander à tout moment la modification ou la suppression de vos données sur simple
                message WhatsApp au <strong>{phoneDisplay}</strong>.
              </p>
            </div>
          )}

          {openTab === 'cookies' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F1111]">
                5. Pourquoi et comment Pèrôkadô utilise-t-il des Cookies & Stockages locaux ?
              </h3>
              <p>
                Contrairement à de nombreux sites qui déposent des dizaines de traceurs publicitaires
                intrusifs, <strong>Pèrôkadô privilégie le respect de votre vie privée</strong> :
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#F2FBF2] border border-[#B7E4B7] space-y-1">
                  <p className="font-bold text-[#007600] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cookies & stockage strictement nécessaires (Toujours actifs)</span>
                  </p>
                  <p className="text-xs text-[#333333]">
                    Sauvegarde de votre <strong>panier d’achat</strong>, de vos{' '}
                    <strong>favoris</strong>, de votre <strong>zone de livraison (Daloa / Expédition)</strong>{' '}
                    et sécurité anti-fraude des sessions. Sans eux, le panier se viderait à chaque
                    actualisation.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F7FAFA] border border-[#D5D9D9] space-y-1">
                  <p className="font-bold text-[#0F1111] flex items-center gap-1.5">
                    <Cookie className="w-4 h-4 text-[#C7511F]" />
                    <span>Mesure d’audience anonyme (Soumise à votre choix)</span>
                  </p>
                  <p className="text-xs text-[#333333]">
                    Permet uniquement de mesurer de façon agrégée la rapidité des pages et les rayons
                    les plus consultés afin d’améliorer le catalogue Pèrôkadô, sans aucun ciblage
                    publicitaire tiers.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onResetCookies?.();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-xs font-bold text-[#0F1111] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Modifier mon choix de cookies maintenant</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pied de modale */}
        <div className="bg-[#F7FAFA] border-t border-[#D5D9D9] px-5 py-3 flex items-center justify-between text-xs text-[#565959]">
          <span>Pèrôkadô — Daloa, Côte d’Ivoire</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#131921] text-white font-bold cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsentBanner({ visible, onAcceptAll, onEssentialOnly, onOpenPolicy }) {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-[#131921] text-white border border-[#37475A] rounded-xl shadow-2xl p-4 sm:p-5 pointer-events-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 text-xs leading-relaxed">
          <p className="font-bold text-sm text-white flex items-center gap-2">
            <Cookie className="w-4 h-4 text-[#FF9900] shrink-0" />
            <span>Respect de votre vie privée & Cookies sur Pèrôkadô</span>
          </p>
          <p className="text-[#DDDDDD]">
            Nous utilisons des stockages techniques indispensables pour mémoriser votre{' '}
            <strong>panier</strong>, votre <strong>zone de livraison</strong> et sécuriser vos
            commandes, ainsi qu’une mesure d’audience anonyme (conformément à la réglementation
            ivoirienne ARTCI).{' '}
            <button
              type="button"
              onClick={onOpenPolicy}
              className="text-[#FF9900] hover:underline font-semibold cursor-pointer"
            >
              En savoir plus
            </button>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onEssentialOnly}
            className="px-3.5 py-2 rounded-full bg-[#232F3E] hover:bg-[#37475A] border border-white/20 text-white text-xs font-semibold transition cursor-pointer"
          >
            Essentiels uniquement
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-xs font-extrabold shadow-xs transition cursor-pointer"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
