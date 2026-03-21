/* eslint-disable */
/* global WebImporter */

/**
 * Parser: embed-flight-search
 * Base block: embed
 * Source: https://csmia-mumbai.adaniairports.com/
 * Selector: section.searchFlightSection .searchFlightInner
 *
 * Converts the interactive flight search widget into an embed block.
 * Model fields (xwalk): embed_placeholder (reference), embed_placeholderAlt (collapsed), embed_uri (text)
 * All fields share prefix "embed" → grouped into one cell.
 * Generated: 2026-03-20
 */
export default function parse(element, { document }) {
  // The flight search is a complex interactive form - best represented as an embed
  // pointing to the source URL.
  const sourceUrl = 'https://csmia-mumbai.adaniairports.com/';

  // Build the content cell with field hints
  // embed_placeholder and embed_uri share "embed" prefix → same cell
  // embed_placeholderAlt is collapsed (Alt suffix) → skip
  const frag = document.createDocumentFragment();

  // Field: embed_placeholder (optional poster/placeholder image)
  frag.appendChild(document.createComment(' field:embed_placeholder '));

  // Field: embed_uri (the embed URL)
  frag.appendChild(document.createComment(' field:embed_uri '));
  const link = document.createElement('a');
  link.href = sourceUrl;
  link.textContent = sourceUrl;
  frag.appendChild(link);

  const cells = [[frag]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-flight-search', cells });
  element.replaceWith(block);
}
