const axios = require('axios')

const routes = [
  'http://localhost:3333/calc/add/4/3',
  'http://localhost:3333/calc/sub/4/3',
  'http://localhost:3333/calc/mul/4/3',
  'http://localhost:3333/calc/div/4/3',
  'http://localhost:3333/calc/mod/4/3',
  'http://localhost:3333/calc/add/0/2',
  'http://localhost:3333/calc/sub/10/2',
  'http://localhost:3333/calc/mul/0/4', // 0 return undefined . . .
  'http://localhost:3333/calc/div/10/2',
  'http://localhost:3333/calc/mod/13/4',
  'http://localhost:3333/calc/mo/13/4',
  'http://localhost:3333/calc/mod/Z/4',
  'http://localhost:3333/calc/'
]

const getJson = async (route) => {
  try {
    const response = await axios.get(route)
    const result = response.data.result
    const error = response.data.error
    if (result) {
      return result
    } else if (error) {
      return error
    }
  } catch (e) {
    throw new Error('cannot get json')
  }
}

const main = async (routes) => {

  let promises = []
  for (const route of routes) {
    promises.push(getJson(route))
  }
  try {
    // PROMISE.ALL
    /*
    let results = await Promise.all(promises)
    for (const result of results) {
      console.log(`${result}`)
      */
    // FOR AWAIT 
    for await (const promise of promises) {
      console.log(`${promise}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}

main(routes)