const axios = require('axios')
const { JSDOM } = require('jsdom')
const fsPromises = require('fs/promises')

// check command
if (process.argv.length !== 3) {
  console.log('usage: node web-info.js url')
  process.exit(1)
}

// get info from url
const getInfo = async (url) => {
  try {

    const response = await axios.get(url)

    const dom = new JSDOM(response.data)
    const contentType = dom.window.document.contentType
    const contentLength = dom.window.document.querySelector('html').outerHTML.length
    const titleTag = dom.window.document.querySelector('title')
    const aTag = dom.window.document.querySelectorAll('a')
    const imgTag = dom.window.document.querySelectorAll('img')
    const info = { url: url, contentType: contentType, contentLength: contentLength, title: titleTag.textContent, nbUrls: aTag.length, nbImgs: imgTag.length }
    return info
  } catch (e) {
    throw new Error('cannot get info, check if url is valid')
  }
}

// generate json file
const createJson = async (info) => {
  try {
    // console.log(JSON.stringify(info, null, 4))
    const title = info.title.split(' ')[0]
    await fsPromises.appendFile(`./${title}.json`, JSON.stringify(info, null, 4))
  } catch (e) {
    throw new Error('json cannot be created')
  }
}


const main = async () => {
  try {
    const url = process.argv[2]
    const info = await getInfo(url)
    await createJson(info)
  } catch (e) {
    console.log(e.message)
  }
}

main()