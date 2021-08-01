// Imports 
const fetch = require('node-fetch')
const {getObject, createHTMLResponse, htmlWorkflow} = require('../src/HTMLRendering')

// Fetch Functions 
async function getData(url=URL){
    const data = await require('../src/data/world.json')
    return data


}

async function completeAPI(bgColor, textColor, headingColor, borderColor){
    const data = await getData();
    const random = getRadnomizedArticles(data['results'])
    const html = htmlWorkflow(random, bgColor, textColor, headingColor, borderColor)
    return html
}

// Sometimes not returning items

// Utility function

function getRandomIndices(max, n_indices = 2, arr=[]){
    while(arr.length < n_indices){
        var r = Math.floor(Math.random() * max) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return (arr);
}

function getRadnomizedArticles(results, n_indices=2){
    // let data = require('./data/world.json')
    // let results = data["results"]
    let length = results.length
    let randomIndices = getRandomIndices(length, n_indices)
    let reqArticles = randomIndices.map((index)=> {
        if(!(typeof results[index] ==="undefined"))  return results[index]
        else {
            console.log("Error handled")
            let index = getRandomIndices(length, 1, randomIndices)[0]
            return results[index]
        }
    })
    return reqArticles
}

module.exports = async (req, res)=>{
    
    // Get the colors from request 
    const body = req.body 
    
    const bgColor = body.bgColor || "white"
    const textColor = body.textColor || "black"
    const headingColor = body.headingColor || "rgb(30, 5, 141)"
    const borderColor = body.borderColor || "rgb(218, 218, 218)"
    
    const articles = await completeAPI(bgColor, textColor, headingColor, borderColor)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(articles)

}
