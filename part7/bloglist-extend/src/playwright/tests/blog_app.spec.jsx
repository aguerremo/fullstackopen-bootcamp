const { test, expect, beforeEach, describe } = require('@playwright/test')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http:localhost:3003/api/users', {
      data: {
        name: 'Prueba',
        username: 'prueba',
        password: 'prueba1',
      },
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
  })

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

    test('A new blog can be deleted', async ({ page, request }) => {
      await page.getByRole('button', { name: 'Remove Blog' }).click()

      const response = await request.get('http://localhost:3003/api/testing')
      const blogs = await response.json()

      await expect(blogs).toHaveLength(0)
    })
  })

  describe('Different users renders', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/users', {
        data: {
          name: 'User B',
          username: 'userB',
          password: 'userB1',
        },
      })
    })
    test('Only creator can delete the blog', async ({ page }) => {
      //Login with the user A
      await page.getByTestId('username').fill('prueba')
      await page.getByTestId('password').fill('prueba1')
      await page.getByRole('button', { name: 'Login' }).click()

      //Creating a blog with user A
      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('author').fill('Author test 123')
      await page.getByTestId('title').fill('Title Test 123')
      await page.getByTestId('url').fill('Url Test')
      await page.getByRole('button', { name: 'Submit' }).click()

      //Confirm if the blog is created and the button Remove Blog is render
      const locator = await page.getByText('created succesfully')
      const removeButton = await page.getByRole('button', { name: 'Remove Blog' })
      await expect(locator).toBeVisible()
      await expect(removeButton).toBeVisible()

      //Logout user A
      await page.getByRole('button', { name: 'Logout' }).click()

      //Login with the user B
      await page.getByTestId('username').fill('userB')
      await page.getByTestId('password').fill('userB1')
      await page.getByRole('button', { name: 'Login' }).click()

      //Confirm that the button Remove Blog is not render
      const blog = await page.getByText('Title Test 123')
      await expect(blog).toBeVisible()
      await expect(removeButton).toHaveCount(0)
    })
  })

  describe('Blogs ordered by number of likes', () => {
    beforeEach(async ({ page, request }) => {
      await page.getByTestId('username').fill('prueba')
      await page.getByTestId('password').fill('prueba1')
      await page.getByRole('button', { name: 'Login' }).click()
    })
    test('Blogs ordered by number of likes', async ({ page }) => {
      const website = await page.getByText('Blogs')
      await expect(website).toBeVisible()

      //Creating blog A
      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('author').fill('Author A')
      await page.getByTestId('title').fill('Title A')
      await page.getByTestId('url').fill('Url A')
      await page.getByRole('button', { name: 'Submit' }).click()

      await expect(page.getByText('created succesfully')).toBeVisible()

      //Likes blog A

      const blogA = page.locator('[data-testid="blog"]').filter({ hasText: 'Title A' })
      await expect(blogA).toBeVisible()
      await blogA.getByRole('button', { name: '❤' }).click()
      await blogA.getByRole('button', { name: '❤' }).click()
      await expect(blogA.getByText('Likes: 2')).toBeVisible()

      //Creating blog B
      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('author').fill('Author B')
      await page.getByTestId('title').fill('Title B')
      await page.getByTestId('url').fill('Url B')
      await page.getByRole('button', { name: 'Submit' }).click()

      await expect(page.getByText('created succesfully')).toBeVisible()

      // Likes blog B
      const blogB = page.locator('[data-testid="blog"]').filter({ hasText: 'Title B' })
      await expect(blogB).toBeVisible()
      await blogB.getByRole('button', { name: '❤' }).click()
      await blogB.getByRole('button', { name: '❤' }).click()
      await blogB.getByRole('button', { name: '❤' }).click()
      await expect(blogB.getByText('Likes: 3')).toBeVisible()

      await page.reload()

      const blogs = page.locator('[data-testid="blog"]')
      const firstBlog = blogs.nth(0)
      await expect(firstBlog).toContainText('Title B')
    })
  })
})
