const { test, expect } = require('@playwright/test');

test('ポケモン検索ボタン押したら表示されるにゃ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#searchInput', 'pikachu');
  await page.click('#searchButton');
  await expect(page.locator('#pokemonCard')).toBeVisible();
});