// eslint-disable-next-line import/no-unresolved
import { moveInstrumentation } from '../../scripts/scripts.js';

// keep track globally of the number of tab blocks on the page
let tabBlockCnt = 0;

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-services-list';
  tablist.setAttribute('role', 'tablist');
  tablist.id = `tablist-${tabBlockCnt += 1}`;

  const rows = [...block.children];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    // UE renders 2 cells [title, content]; local preview has 3 [item-name, title, content]
    const hasItemName = cells.length > 2;
    const itemNameCell = hasItemName ? cells[0] : null;
    const titleCell = hasItemName ? cells[1] : cells[0];
    const id = `tabpanel-${tabBlockCnt}-tab-${i + 1}`;

    row.className = 'tabs-services-panel';
    row.id = id;
    row.setAttribute('aria-hidden', !!i);
    row.setAttribute('aria-labelledby', `tab-${id}`);
    row.setAttribute('role', 'tabpanel');

    const button = document.createElement('button');
    button.className = 'tabs-services-tab';
    button.id = `tab-${id}`;
    button.textContent = titleCell ? titleCell.textContent.trim() : `Tab ${i + 1}`;
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');

    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      row.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });

    moveInstrumentation(titleCell, button);
    tablist.append(button);

    if (itemNameCell) {
      moveInstrumentation(itemNameCell, null);
      itemNameCell.remove();
    }
    titleCell.remove();
  });

  block.prepend(tablist);
}
