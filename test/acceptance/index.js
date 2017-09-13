import { ClientFunction, Selector } from 'testcafe';

fixture(`Index`).page(`http://localhost:1337/`);

test(`The hero section is visible.`, async (t) => {
  const heroSection = Selector(`.c-hero`);

  await t.expect(heroSection.exists).ok();
});

test(`Click on second hero tab opens second hero content.`, async (t) => {
  const heroTabLink = Selector(`.c-hero .collectorium__tab-link[href="#jsenhanced"]`);
  const heroContent = Selector(`.c-hero #jsenhanced + .collectorium__content`);

  await t
    .expect(heroContent.visible)
    .notOk()
    .click(heroTabLink)
    .expect(heroContent.visible)
    .ok();
});

test(`Click on CSS only tab opens tab.`, async (t) => {
  const getLocationHref = ClientFunction(() => window.location.href);
  const cssTabLink = Selector(`.collectorium__tab-link[href="#tab1-2"]`);
  const cssTabContent = Selector(`#tab1-2 + .collectorium__content`);

  await t
    .expect(cssTabContent.visible)
    .notOk()
    .click(cssTabLink)
    .expect(cssTabContent.visible)
    .ok()
    .expect(getLocationHref())
    .contains(`#tab1-2`);
});

test(`Click on JavaScript tab doesn't affect history.`, async (t) => {
  const getLocationHref = ClientFunction(() => window.location.href);
  const jsTabLink = Selector(`.collectorium__tab-link[href="#tab2-2"]`);
  const jsTabContent = Selector(`#tab2-2 + .collectorium__content`);

  await t
    .expect(jsTabContent.visible)
    .notOk()
    .click(jsTabLink)
    .expect(jsTabContent.visible)
    .ok()
    .expect(getLocationHref())
    .notContains(`#`);
});
