/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-feature
 * Base block: columns
 * Source: https://csmia-mumbai.adaniairports.com/
 * Selector: section.experienceAirportSection .slideBlock
 *
 * Columns block - NO field hints required (Columns exception).
 * Two-column layout: large image on left, heading + description + CTA on right.
 *
 * Table structure per library example: 2 columns per row
 * Generated: 2026-03-20
 */
export default function parse(element, { document }) {
  // Left column: desktop image
  const img = element.querySelector('.leftImgSection img.desktopViewImg, .leftImgSection img');

  // Right column: heading + description + CTA
  const rightSection = element.querySelector('.rightContentSection');
  const heading = rightSection ? rightSection.querySelector('h2, .headingTitle') : null;
  const description = rightSection ? rightSection.querySelector('p') : null;
  const ctaLink = rightSection ? rightSection.querySelector('a.outlinedButton, a') : null;

  // Build left cell (image)
  const leftFrag = document.createDocumentFragment();
  if (img) {
    leftFrag.appendChild(img.cloneNode(true));
  }

  // Build right cell (text content)
  const rightFrag = document.createDocumentFragment();
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    rightFrag.appendChild(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    rightFrag.appendChild(p);
  }
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href || ctaLink.getAttribute('href') || '';
    a.textContent = ctaLink.textContent.trim();
    rightFrag.appendChild(a);
  }

  const cells = [[leftFrag, rightFrag]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
