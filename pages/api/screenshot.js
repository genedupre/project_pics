const puppeteer = require('puppeteer');

export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: "base64" });

    res.status(200).send("data:image/jpeg;base64," + screenshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};