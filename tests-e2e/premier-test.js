const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('VYN\'S DELIGHTS — Test de base', function () {
  this.timeout(30000); // 30 s : Selenium peut être lent à démarrer
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('ouvre la page d\'accueil et vérifie le titre', async function () {
    await driver.get('http://localhost:5173');
    // Attend que le logo VYN'S DELIGHTS soit présent
    const logo = await driver.wait(
      until.elementLocated(By.css('.vyns-logo')),
      10000
    );
    const texte = await logo.getText();
    assert.ok(texte.includes('VYN'), 'Le logo doit contenir « VYN\'S »');
  });
});