

async function login(page) {
    await page.locator('id=login-button').click();
    await page.fill('[name="username"]', ''); /*You need to create account first*/
    await page.keyboard.press('Enter');
    await page.fill('[name="password"]', ''); /*You need to create account first*/
    await page.keyboard.press('Enter');
  }

module.exports = {login};