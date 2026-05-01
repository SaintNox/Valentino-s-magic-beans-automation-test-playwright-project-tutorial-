import {test , expect } from '@playwright/test';

test ('Test case: Item is added to the shopping cart', async ({page}) => {
   
    await page.goto('https://valentinos-magic-beans.click/products');
    // get the first product name and the price by using the first product wrapper (div with padding 6)
    const firstProductWrapper = page.locator('.p-6').first();
    const firstProductName = await firstProductWrapper.getByRole('heading').first().textContent()
    const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent()

    const addToCartButton = firstProductWrapper.getByRole('button',{name: 'Add to cart'})
    await addToCartButton.click();
    
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert the first product is visible in the cart 
    const firstProductNameInCart = page.getByRole('heading', {name: firstProductName!})
    await expect(firstProductNameInCart).toBeVisible();

    // assert the subtotal price is correct by getting the subtotal price and comparing it with the first product price
    const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold') // get the text from the 
    const subtotal = await subTotalWrapper.textContent()
    const expectedSubTotal = Number(subtotal?.substring(1)) //remove the $ sign and convert to number
    const actualSubTotal = Number(firstProductPrice?.substring(1))
    expect(actualSubTotal).toEqual(expectedSubTotal)

    console.log(subtotal, expectedSubTotal)
    await page.pause();
})
