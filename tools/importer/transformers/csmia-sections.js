/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: CSMIA section breaks and section-metadata.
 * Adds <hr> between sections and section-metadata blocks for styled sections.
 * Source: https://csmia-mumbai.adaniairports.com/
 * Generated: 2026-03-20
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;

  const sections = (payload && payload.template && payload.template.sections) || [];
  if (sections.length < 2) return;

  // Process sections in reverse order to preserve DOM positions
  const sectionEls = [];
  for (const section of sections) {
    const selector = Array.isArray(section.selector) ? section.selector : [section.selector];
    let el = null;
    for (const sel of selector) {
      el = element.querySelector(sel);
      if (el) break;
    }
    sectionEls.push({ config: section, el });
  }

  // Add section breaks (<hr>) between sections (not before the first)
  for (let i = sectionEls.length - 1; i >= 1; i--) {
    const { el } = sectionEls[i];
    if (!el) continue;
    const hr = element.ownerDocument.createElement('hr');
    el.parentNode.insertBefore(hr, el);
  }

  // Add section-metadata blocks for sections with style
  for (let i = sectionEls.length - 1; i >= 0; i--) {
    const { config, el } = sectionEls[i];
    if (!el || !config.style) continue;

    const document = element.ownerDocument;
    const sectionMetadata = WebImporter.Blocks.createBlock(document, {
      name: 'section-metadata',
      cells: [['style', config.style]],
    });

    // Insert section-metadata at the end of the section's content
    // Find the next <hr> or end of main content to place it before
    let nextHr = el.nextElementSibling;
    while (nextHr && nextHr.tagName !== 'HR') {
      nextHr = nextHr.nextElementSibling;
    }

    if (nextHr) {
      nextHr.parentNode.insertBefore(sectionMetadata, nextHr);
    } else {
      // Last section - append to parent
      el.parentNode.appendChild(sectionMetadata);
    }
  }
}
