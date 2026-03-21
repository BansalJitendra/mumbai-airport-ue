/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-services
 * Base block: tabs
 * Source: https://csmia-mumbai.adaniairports.com/
 * Selector: section.serviceInformationSection .serviceInformationContainer
 *
 * Container block with item type "Tab".
 * Item fields (xwalk):
 *   - title (standalone cell)
 *   - content_heading (group "content") - content_headingType collapsed (Type suffix)
 *   - content_image (group "content")
 *   - content_richtext (group "content")
 *
 * Table structure per library example: 2 data cols per item row
 * Generated: 2026-03-20
 */
export default function parse(element, { document }) {
  // Extract tab headers
  const tabLinks = Array.from(element.querySelectorAll(':scope ul.nav-tabs .nav-item .nav-link'));
  // Extract tab panels
  const tabPanels = Array.from(element.querySelectorAll(':scope .tab-content .tab-pane'));

  const cells = [];

  tabLinks.forEach((tabLink, index) => {
    const tabTitle = (tabLink.textContent || '').trim();
    const panel = tabPanels[index];

    // Build title cell with hint
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:title '));
    titleFrag.appendChild(document.createTextNode(tabTitle));

    // Build content cell with grouped "content" fields
    const contentFrag = document.createDocumentFragment();

    if (panel) {
      // Extract icon links from swiper slides
      const slides = Array.from(panel.querySelectorAll('.swiper-slide'));

      // content_heading - not used for these tabs (no heading in panels)
      // content_image - not used (images are inside links)

      // content_richtext - the icon link grid
      contentFrag.appendChild(document.createComment(' field:content_richtext '));
      const contentDiv = document.createElement('div');

      slides.forEach((slide) => {
        const link = slide.querySelector('a');
        if (link) {
          const clonedLink = link.cloneNode(true);
          contentDiv.appendChild(clonedLink);
          contentDiv.appendChild(document.createElement('br'));
        }
      });

      contentFrag.appendChild(contentDiv);
    }

    cells.push(['Tab', titleFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-services', cells });
  element.replaceWith(block);
}
