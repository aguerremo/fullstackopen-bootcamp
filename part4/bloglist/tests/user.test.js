   describe('creating a new user', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('pswd', 10)
    })
   })
  