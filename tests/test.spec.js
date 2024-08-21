const { test, expect } = require("@playwright/test");
const { email, password, invalidEmail, invalidPassword} = require("../user");





test('Successful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL("https://netology.ru/profile/9038731");
 });

test('Unsuccessful authorization with invalid password', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(invalidPassword);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByTestId('login-error-hint')).toBeVisible();
});

test('Unsuccessful authorization with invalid email', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(invalidEmail);
  await page.getByPlaceholder('Пароль').click();
  await expect(page.getByTestId('profile-personal-info-avatar-popup').locator('span')).toContainText('Неверный email');
});


