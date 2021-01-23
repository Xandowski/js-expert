class EntityBase {
  #name
  #age
  #gender

  constructor({ name, age, gender}) {
    this.#name = name
    this.#age = age
    this.#gender = gender
  }

  get name() {
    const preffix = this.#gender === "male" ? "Mr." : "Ms."
    return `${preffix} ${this.#name}`
  }

  get birthYear() {
    if(!this.#age) {
      throw new Error('You must define an age first!')
    } else if(this.#age < 0) {
      throw new Error('Invalid age.')
    } else {
      const date = new Date().getFullYear()
      return date - this.#age
    }
  }

  set age(age){
    this.#age = age
  }
}

module.exports = EntityBase