const { test, expect } = require('@playwright/test');

test('ページが表示されるかにゃ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/.*/); // 必要に応じて修正にゃ
});

test('検索ボタン押して表示が変わるかにゃ', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.click('#searchButton'); // IDが正しいことを確認にゃ
  await expect(page.locator('#pokemonCard')).toBeVisible();
});