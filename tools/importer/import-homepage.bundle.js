var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/embed-flight-search.js
  function parse(element, { document }) {
    const sourceUrl = "https://csmia-mumbai.adaniairports.com/";
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(" field:embed_placeholder "));
    frag.appendChild(document.createComment(" field:embed_uri "));
    const link = document.createElement("a");
    link.href = sourceUrl;
    link.textContent = sourceUrl;
    frag.appendChild(link);
    const cells = [[frag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "embed-flight-search", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-services.js
  function parse2(element, { document }) {
    const tabLinks = Array.from(element.querySelectorAll(":scope ul.nav-tabs .nav-item .nav-link"));
    const tabPanels = Array.from(element.querySelectorAll(":scope .tab-content .tab-pane"));
    const cells = [];
    tabLinks.forEach((tabLink, index) => {
      const tabTitle = (tabLink.textContent || "").trim();
      const panel = tabPanels[index];
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(" field:title "));
      titleFrag.appendChild(document.createTextNode(tabTitle));
      const contentFrag = document.createDocumentFragment();
      if (panel) {
        const slides = Array.from(panel.querySelectorAll(".swiper-slide"));
        contentFrag.appendChild(document.createComment(" field:content_richtext "));
        const contentDiv = document.createElement("div");
        slides.forEach((slide) => {
          const link = slide.querySelector("a");
          if (link) {
            const clonedLink = link.cloneNode(true);
            contentDiv.appendChild(clonedLink);
            contentDiv.appendChild(document.createElement("br"));
          }
        });
        contentFrag.appendChild(contentDiv);
      }
      cells.push(["Tab", titleFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-services", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-facilities.js
  function parse3(element, { document }) {
    const slides = Array.from(element.querySelectorAll(":scope .swiper-wrapper .swiper-slide.imageCardContent"));
    const cells = [];
    slides.forEach((slide) => {
      const link = slide.querySelector("a");
      const img = slide.querySelector(".imageBlock img, img");
      const heading = slide.querySelector(".content h4, h4");
      const description = slide.querySelector(".content p, p");
      const mediaFrag = document.createDocumentFragment();
      mediaFrag.appendChild(document.createComment(" field:media_image "));
      if (img) {
        mediaFrag.appendChild(img.cloneNode(true));
      }
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content_text "));
      const contentDiv = document.createElement("div");
      if (heading) {
        const h4 = document.createElement("h4");
        h4.textContent = heading.textContent.trim();
        contentDiv.appendChild(h4);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        contentDiv.appendChild(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.textContent = heading ? heading.textContent.trim() : "Learn More";
        contentDiv.appendChild(a);
      }
      contentFrag.appendChild(contentDiv);
      cells.push(["Carousel Facilities Slide", mediaFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-facilities", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-overlay.js
  function parse4(element, { document }) {
    const cards = Array.from(element.querySelectorAll(":scope .cardBlock"));
    const cells = [];
    cards.forEach((card) => {
      const link = card.querySelector("a");
      const img = card.querySelector("img.cardImage, img");
      const titleEl = card.querySelector(".cardInfoHead");
      const descEl = card.querySelector(".cardInfoPara");
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      if (img) {
        imageFrag.appendChild(img.cloneNode(true));
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const textDiv = document.createElement("div");
      if (titleEl) {
        const titleText = titleEl.childNodes[0] ? (titleEl.childNodes[0].textContent || "").trim() : (titleEl.textContent || "").trim();
        const strong = titleEl.querySelector("strong");
        const h4 = document.createElement("h4");
        h4.textContent = strong ? strong.textContent.trim() : titleText;
        textDiv.appendChild(h4);
      }
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        textDiv.appendChild(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.textContent = titleEl ? (titleEl.querySelector("strong") || titleEl).textContent.replace("arrow_forward", "").trim() : "Learn More";
        textDiv.appendChild(a);
      }
      textFrag.appendChild(textDiv);
      cells.push(["Card", imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse5(element, { document }) {
    const img = element.querySelector(".leftImgSection img.desktopViewImg, .leftImgSection img");
    const rightSection = element.querySelector(".rightContentSection");
    const heading = rightSection ? rightSection.querySelector("h2, .headingTitle") : null;
    const description = rightSection ? rightSection.querySelector("p") : null;
    const ctaLink = rightSection ? rightSection.querySelector("a.outlinedButton, a") : null;
    const leftFrag = document.createDocumentFragment();
    if (img) {
      leftFrag.appendChild(img.cloneNode(true));
    }
    const rightFrag = document.createDocumentFragment();
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      rightFrag.appendChild(h2);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      rightFrag.appendChild(p);
    }
    if (ctaLink) {
      const a = document.createElement("a");
      a.href = ctaLink.href || ctaLink.getAttribute("href") || "";
      a.textContent = ctaLink.textContent.trim();
      rightFrag.appendChild(a);
    }
    const cells = [[leftFrag, rightFrag]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/csmia-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        ".feedbackSection",
        ".accessibilitySection",
        ".searchOverlay",
        ".marqueeSection",
        "noscript"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".swipperButton",
        ".swiper-button-prev",
        ".swiper-button-next",
        ".swiper-scrollbar",
        ".swiper-notification"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".material-icons"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.headerSection",
        "footer",
        ".footerSection",
        "iframe",
        "link",
        "noscript"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("onclick");
        el.removeAttribute("data-track");
        el.removeAttribute("data-gtm");
      });
    }
  }

  // tools/importer/transformers/csmia-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const sections = payload && payload.template && payload.template.sections || [];
    if (sections.length < 2) return;
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
    for (let i = sectionEls.length - 1; i >= 1; i--) {
      const { el } = sectionEls[i];
      if (!el) continue;
      const hr = element.ownerDocument.createElement("hr");
      el.parentNode.insertBefore(hr, el);
    }
    for (let i = sectionEls.length - 1; i >= 0; i--) {
      const { config, el } = sectionEls[i];
      if (!el || !config.style) continue;
      const document = element.ownerDocument;
      const sectionMetadata = WebImporter.Blocks.createBlock(document, {
        name: "section-metadata",
        cells: [["style", config.style]]
      });
      let nextHr = el.nextElementSibling;
      while (nextHr && nextHr.tagName !== "HR") {
        nextHr = nextHr.nextElementSibling;
      }
      if (nextHr) {
        nextHr.parentNode.insertBefore(sectionMetadata, nextHr);
      } else {
        el.parentNode.appendChild(sectionMetadata);
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "embed-flight-search": parse,
    "tabs-services": parse2,
    "carousel-facilities": parse3,
    "cards-overlay": parse4,
    "columns-feature": parse5
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "CSMIA Mumbai Airport homepage - main landing page for the airport website",
    urls: [
      "https://csmia-mumbai.adaniairports.com/",
      "https://csmia-mumbai.adaniairports.com"
    ],
    blocks: [
      {
        name: "embed-flight-search",
        instances: ["section.searchFlightSection .searchFlightInner"]
      },
      {
        name: "tabs-services",
        instances: ["section.serviceInformationSection .serviceInformationContainer"]
      },
      {
        name: "carousel-facilities",
        instances: ["section.airportSection .airportinnerSection .contentRightBlock .airportSlider"]
      },
      {
        name: "cards-overlay",
        instances: ["section.shopDineSection .cardsSetion"]
      },
      {
        name: "columns-feature",
        instances: ["section.experienceAirportSection .slideBlock"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: "section.bannerSection.homepagebanner",
        style: "dark",
        blocks: [],
        defaultContent: ["section.bannerSection .bannerImage img"]
      },
      {
        id: "section-2",
        name: "Flight Search",
        selector: "section.searchFlightSection",
        style: null,
        blocks: ["embed-flight-search"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Services and Facilities",
        selector: "section.serviceInformationSection",
        style: null,
        blocks: ["tabs-services"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Welcome Text",
        selector: "section.airportDetailsSection",
        style: null,
        blocks: [],
        defaultContent: [".aboutServiceSection .headingTitle", ".aboutServiceSection p"]
      },
      {
        id: "section-5",
        name: "Airport Facilities",
        selector: "section.airportSection",
        style: null,
        blocks: ["carousel-facilities"],
        defaultContent: [".airportinnerSection .contentLeftBlock h2", ".airportinnerSection .contentLeftBlock p"]
      },
      {
        id: "section-6",
        name: "Shop and Dine",
        selector: "section.shopDineSection",
        style: null,
        blocks: ["cards-overlay"],
        defaultContent: [".shopDineSection .titleSection h2", ".shopDineSection .titleSection p", ".shopDineSection .titleSection .outlinedButton"]
      },
      {
        id: "section-7",
        name: "Experiences at CSMIA",
        selector: "section.experienceAirportSection",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: [".experienceAirportSection .titleSection h2", ".experienceAirportSection .titleSection p"]
      }
    ]
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
