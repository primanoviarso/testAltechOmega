const exp = require("constants");
const { expect } = require("playwright/test");

class Item {
    constructor(item, page){
        this.item = item;
        this.page = page;
    }

    async Add() {
        await this.page.getByLabel('search-input').fill(this.item);
        await this.page.keyboard.press('Enter');
        await this.page.click('data-testid=product-card');
        await this.page.click('id=btn-add-to-cart');
        // await this.page.getByTestId('cart-icon').click();
    }

    async checkCart() {
        await this.page.getByTestId('cart-icon').click();

        // const cartItem = await this.page.locator('id=cart-item-0');
        await expect(this.page.locator('id=cart-item-0')).toContainText(this.item);
    }

    async checkSummaryItem() {
        return await this.page.locator('//*[@id="app"]/div/div[2]/main/section[1]/div[3]/div[2]/div/div/div/div[1]/div[2]/div').textContent();
    }
}

module.exports = Item;