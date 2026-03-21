// keep track globally of the number of tab blocks on the page
let tabBlockCnt = 0;

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-services-list';
  tablist.setAttribute('role', 'tablist');
  tablist.id = `tablist-${tabBlockCnt += 1}`;

  // each row has: cell 0 = item name ("Tab"), cell 1 = title ("Services"), cell 2 = content
  const rows = [...block.children];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const itemNameCell = cells[0]; // "Tab"
    const titleCell = cells[1]; // "Services" or "Facilities"
    const id = `tabpanel-${tabBlockCnt}-tab-${i + 1}`;

    // decorate tabpanel
    row.className = 'tabs-services-panel';
    row.id = id;
    row.setAttribute('aria-hidden', !!i);
    row.setAttribute('aria-labelledby', `tab-${id}`);
    row.setAttribute('role', 'tabpanel');

    // build tab button using title cell content
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

    // add the new tab list button, to the tablist
    tablist.append(button);

    // remove item name and title cells from the panel, keeping only the content cell
    if (itemNameCell) itemNameCell.remove();
    if (titleCell) titleCell.remove();
  });

  block.prepend(tablist);
}
