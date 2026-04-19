import { useState, useEffect } from "react";

/**
 * KvkkBanner — Turkiye KVKK cookie onay banner'i.
 * localStorage'a onay kaydedilir, her ziyarette tekrar gosterilmez.
 */
export function KvkkBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("kvkk-consent");
    if (!accepted) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => {
    window.localStorage.setItem("kvkk-consent", "true");
    window.localStorage.setItem("kvkk-consent-date", new Date().toISOString());
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cerez bildirimi"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-2xl backdrop-blur-md md:bottom-6 md:left-6 md:right-auto"
    >
      <p className="text-xs opacity-80 leading-relaxed">
        Sitemizde deneyiminizi iyilestirmek icin cerez kullaniyoruz. KVKK
        kapsaminda veri isleme politikamizi{" "}
        <a href="/policies/privacy-policy" className="underline underline-offset-2 hover:opacity-100">
          Gizlilik Politikasi
        </a>{" "}
        sayfamizda inceleyebilirsiniz.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="border border-current bg-[var(--color-ink)] text-[var(--color-bg)] px-4 py-2 text-xs uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors"
        >
          Kabul Et
        </button>
        <a
          href="/policies/privacy-policy"
          className="border border-current px-4 py-2 text-xs uppercase tracking-wider hover:opacity-60"
        >
          Detay
        </a>
      </div>
    </div>
  );
}
