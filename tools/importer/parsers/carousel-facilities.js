/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-facilities
 * Base block: carousel
 * Source: https://csmia-mumbai.adaniairports.com/
 * Selector: section.airportSection .airportinnerSection .contentRightBlock .airportSlider
 *
 * Container block with item type "Carousel Facilities Slide".
 * Item fields (xwalk):
 *   - media_image (group "media") - media_imageAlt collapsed (Alt suffix)
 *   - content_text (group "content", richtext)
 *
 * Table structure per library example: 3 cols per item (type | image | text)
 * Generated: 2026-03-20
 */
export default function parse(element, { document }) {
  // Each slide is a .swiper-slide.imageCardContent inside .swiper-wrapper
  const slides = Array.from(element.querySelectorAll(':scope .swiper-wrapper .swiper-slide.imageCardContent'));

  const cells = [];

  slides.forEach((slide) => {
    const link = slide.querySelector('a');
    const img = slide.querySelector('.imageBlock img, img');
    const heading = slide.querySelector('.content h4, h4');
    const description = slide.querySelector('.content p, p');

    // Build media cell (image) with hint
    const mediaFrag = document.createDocumentFragment();
    mediaFrag.appendChild(document.createComment(' field:media_image '));
    if (img) {
      mediaFrag.appendChild(img.cloneNode(true));
    }

    // Build content cell (richtext: heading + description + link) with hint
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content_text '));
    const contentDiv = document.createElement('div');
    if (heading) {
      const h4 = document.createElement('h4');
      h4.textContent = heading.textContent.trim();
      contentDiv.appendChild(h4);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentDiv.appendChild(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href') || '';
      a.textContent = heading ? heading.textContent.trim() : 'Learn More';
      contentDiv.appendChild(a);
    }
    contentFrag.appendChild(contentDiv);

    cells.push(['Carousel Facilities Slide', mediaFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-facilities', cells });
  element.replaceWith(block);
}
