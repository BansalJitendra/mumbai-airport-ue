/* eslint-disable */
/* global WebImporter */

/**
 * Import script for the "homepage" template.
 * Source: https://csmia-mumbai.adaniairports.com/
 * Template: CSMIA Mumbai Airport homepage
 * Generated: 2026-03-20
 */

// PARSER IMPORTS
import embedFlightSearchParser from './parsers/embed-flight-search.js';
import tabsServicesParser from './parsers/tabs-services.js';
import carouselFacilitiesParser from './parsers/carousel-facilities.js';
import cardsOverlayParser from './parsers/cards-overlay.js';
import columnsFeatureParser from './parsers/columns-feature.js';

// TRANSFORMER IMPORTS
import csmiaCleanupTransformer from './transformers/csmia-cleanup.js';
import csmiaSectionsTransformer from './transformers/csmia-sections.js';

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'embed-flight-search': embedFlightSearchParser,
  'tabs-services': tabsServicesParser,
  'carousel-facilities': carouselFacilitiesParser,
  'cards-overlay': cardsOverlayParser,
  'columns-feature': columnsFeatureParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'CSMIA Mumbai Airport homepage - main landing page for the airport website',
  urls: [
    'https://csmia-mumbai.adaniairports.com/',
    'https://csmia-mumbai.adaniairports.com',
  ],
  blocks: [
    {
      name: 'embed-flight-search',
      instances: ['section.searchFlightSection .searchFlightInner'],
    },
    {
      name: 'tabs-services',
      instances: ['section.serviceInformationSection .serviceInformationContainer'],
    },
    {
      name: 'carousel-facilities',
      instances: ['section.airportSection .airportinnerSection .contentRightBlock .airportSlider'],
    },
    {
      name: 'cards-overlay',
      instances: ['section.shopDineSection .cardsSetion'],
    },
    {
      name: 'columns-feature',
      instances: ['section.experienceAirportSection .slideBlock'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: 'section.bannerSection.homepagebanner',
      style: 'dark',
      blocks: [],
      defaultContent: ['section.bannerSection .bannerImage img'],
    },
    {
      id: 'section-2',
      name: 'Flight Search',
      selector: 'section.searchFlightSection',
      style: null,
      blocks: ['embed-flight-search'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Services and Facilities',
      selector: 'section.serviceInformationSection',
      style: null,
      blocks: ['tabs-services'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Welcome Text',
      selector: 'section.airportDetailsSection',
      style: null,
      blocks: [],
      defaultContent: ['.aboutServiceSection .headingTitle', '.aboutServiceSection p'],
    },
    {
      id: 'section-5',
      name: 'Airport Facilities',
      selector: 'section.airportSection',
      style: null,
      blocks: ['carousel-facilities'],
      defaultContent: ['.airportinnerSection .contentLeftBlock h2', '.airportinnerSection .contentLeftBlock p'],
    },
    {
      id: 'section-6',
      name: 'Shop and Dine',
      selector: 'section.shopDineSection',
      style: null,
      blocks: ['cards-overlay'],
      defaultContent: ['.shopDineSection .titleSection h2', '.shopDineSection .titleSection p', '.shopDineSection .titleSection .outlinedButton'],
    },
    {
      id: 'section-7',
      name: 'Experiences at CSMIA',
      selector: 'section.experienceAirportSection',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: ['.experienceAirportSection .titleSection h2', '.experienceAirportSection .titleSection p'],
    },
  ],
};

// TRANSFORMER REGISTRY - Array of transformer functions
// Cleanup runs first, section transformer runs after (adds <hr> and section-metadata)
const transformers = [
  csmiaCleanupTransformer,
  csmiaSectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
