/* CheckMyBurnout.com — AdSense placeholder
   Replace .adsense-slot divs with real <ins class="adsbygoogle"> units once approved.
   Paste your AdSense <script> tag in each page <head> where marked. */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.adsense-slot').forEach(slot => {
      if (!slot.textContent.trim())
        slot.textContent = `Ad · ${slot.dataset.slot || ''} · ${slot.dataset.size || 'responsive'}`;
    });
  });
})();
