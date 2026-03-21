/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: CSMIA Mumbai Airport cleanup.
 * Selectors from captured DOM of https://csmia-mumbai.adaniairports.com/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie/consent banners, feedback widget, accessibility widget
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '.feedbackSection',
      '.accessibilitySection',
      '.searchOverlay',
      '.marqueeSection',
      'noscript',
    ]);

    // Remove swiper navigation buttons and scrollbars (non-authorable UI chrome)
    WebImporter.DOMUtils.remove(element, [
      '.swipperButton',
      '.swiper-button-prev',
      '.swiper-button-next',
      '.swiper-scrollbar',
      '.swiper-notification',
    ]);

    // Remove material icons (arrow_forward etc.) from cards
    WebImporter.DOMUtils.remove(element, [
      '.material-icons',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content: header, footer, nav
    WebImporter.DOMUtils.remove(element, [
      'header.headerSection',
      'footer',
      '.footerSection',
      'iframe',
      'link',
      'noscript',
    ]);

    // Clean up tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-gtm');
    });
  }
}
