import { mocks } from 'mock-browser';

export default function createContext(options = {}, count = 1, tabCount = 3) {
  const mockBrowser = new mocks.MockBrowser();
  const document = mockBrowser.getDocument();
  const context = document.createElement(`div`);

  for (let contextN = 1; contextN <= count; contextN += 1) {
    const collectorium = document.createElement(`div`);
    collectorium.classList.add(`collectorium`);

    for (let i = 1; i <= tabCount; i += 1) {
      const link = document.createElement(`a`);
      link.classList.add(options.classNames.link);
      collectorium.appendChild(link);

      const content = document.createElement(`div`);
      content.classList.add(options.classNames.content);
      collectorium.appendChild(content);
    }

    context.appendChild(collectorium);
  }

  return context;
}
