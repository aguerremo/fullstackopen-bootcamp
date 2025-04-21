const { test, expect, beforeEach, describe } = require('@playwright/test')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http:localhost:3003/api/users', {
      data: {
        name: 'Prueba',
        username: 'prueba',
        password: 'prueba1'
      }
    })
    await page.goto('http://localhost:5173')
  })

  describe('Loggin tests', () => {
    test('Wrong user cant login', async ({ page }) => {
      await page.getByTestId('username').fill('errorTest')
      await page.getByTestId('password').fill('error')
      await page.getByRole('button', { name: 'Login' }).click()

      const locator = await page.getByText('Wrong credentials')
      await expect(locator).toBeVisible()
    })

    test('Correct user can login', async ({ page }) => {
      await page.getByTestId('username').fill('prueba')
      await page.getByTestId('password').fill('prueba1')
      await page.getByRole('button', { name: 'Login' }).click()

      const locator = await page.getByText('Blogs')
      await expect(locator).toBeVisible()
    })

  }
  )

  describe('Test when login', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('prueba')
      await page.getByTestId('password').fill('prueba1')
      await page.getByRole('button', { name: 'Login' }).click()
    })
    test('A new blog can be created', async ({ page }) => {

      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('author').fill('Author test 123')
      await page.getByTestId('title').fill('Title Test 123')
      await page.getByTestId('url').fill('Url Test')
      await page.getByRole('button', { name: 'Submit' }).click()


      const locator = await page.getByText('created succesfully')
      await expect(locator).toBeVisible()
    })

  })

  describe('Test when blog created', () => {
    beforeEach(async ({ page, request }) => {
      //Login
      await page.getByTestId('username').fill('prueba')
      await page.getByTestId('password').fill('prueba1')
      await page.getByRole('button', { name: 'Login' }).click()
      //Create a Blog
      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('author').fill('Author test 123')
      await page.getByTestId('title').fill('Title Test 123')
      await page.getByTestId('url').fill('Url Test')
      await page.getByRole('button', { name: 'Submit' }).click()

    })
    test('A new blog can be modified', async ({ page }) => {
      await page.getByRole('button', { name: '❤' }).click()

      const locator = await page.getByText('Likes: 1')
      await expect(locator).toBeVisible()
    })



  })
})