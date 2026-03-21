/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-overlay
 * Base block: cards
 * Source: https://csmia-mumbai.adaniairports.com/
 * Selector: section.shopDineSection .cardsSetion
 *
 * Container block with item type "Card".
 * Item fields (xwalk):
 *   - image (standalone, reference)
 *   - text (standalone, richtext)
 *
 * Table structure per library example: 3 cols per item (type | image | text)
 * 3 cards: Food & Beverages, Retail, Duty Free
 * Generated: 2026-03-20
 */
export default function parse(element, { document }) {
  // Each card is a .cardBlock
  const cards = Array.from(element.querySelectorAll(':scope .cardBlock'));

  const cells = [];

  cards.forEach((card) => {
    const link = card.querySelector('a');
    const img = card.querySelector('img.cardImage, img');
    const titleEl = card.querySelector('.cardInfoHead');
    const descEl = card.querySelector('.cardInfoPara');

    // Build image cell with hint
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    if (img) {
      imageFrag.appendChild(img.cloneNode(true));
    }

    // Build text cell (richtext: title + description + link) with hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    const textDiv = document.createElement('div');

    if (titleEl) {
      // Extract text without the material-icons span
      const titleText = titleEl.childNodes[0] ?
        (titleEl.childNodes[0].textContent || '').trim() :
        (titleEl.textContent || '').trim();
      // Check for <strong> wrapped content
      const strong = titleEl.querySelector('strong');
      const h4 = document.createElement('h4');
      h4.textContent = strong ? strong.textContent.trim() : titleText;
      textDiv.appendChild(h4);
    }

    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      textDiv.appendChild(p);
    }

    if (link) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href') || '';
      a.textContent = titleEl ? (titleEl.querySelector('strong') || titleEl).textContent.replace('arrow_forward', '').trim() : 'Learn More';
      textDiv.appendChild(a);
    }

    textFrag.appendChild(textDiv);

    cells.push(['Card', imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-overlay', cells });
  element.replaceWith(block);
}
