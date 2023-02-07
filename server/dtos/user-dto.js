class UserDto {
  email
  nickname
  id
  isActivated
  roles

  constructor(model) {
    this.email = model.email
    this.nickname = model.nickname
    this.id = model.id
    this.isActivated = model.isActivated
    this.roles = model.roles
  }
}

export { UserDto }
