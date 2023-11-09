const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const Item = require('../tests/addCart');
const { login } = require('../tests/loginModule');

test.describe('Testing Suites', () => {
    test('Checkout', async () => {
        const browser = await chromium.launch({ headless: false}) ;
        const page = await browser.newPage();

        await page.goto('https://www.jamtangan.com');
        await page.locator('id=driver-highlighted-element-stage').click();
        await page.locator('id=optInText').click();

        await login(page);

        // Closing Iframe
        await page.waitForSelector('#moe-onsite-campaign-65485b626d2ae9684d44e151');
        const iframe = await page.$('#moe-onsite-campaign-65485b626d2ae9684d44e151');
        const frame = await iframe.contentFrame();
        await frame.click('[data-id="CLOSE"]');

        //Adding item to cart
        const addItem = await new Item('Casio G-Shock GA-700-1ADR Digital Analog Dial Black Resin Band', page);
        await addItem.Add();

        // Checking item on the cart
        await addItem.checkCart();
        
        await page.getByTestId('cart-btn-summary-cta').click();

        // Checking summary items
        await expect(await addItem.checkSummaryItem()).toContain('Casio G-Shock GA-700-1ADR Digital Analog Dial Black Resin Band');
        
        await page.waitForTimeout(5000);
    });
})
