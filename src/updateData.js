// Get URL 
const {URL} = require('./utils')
const fetch = require('node-fetch')
const fs = require('fs')

// CONSTANTS
const DATA_PATH = "./src/data/world.json"

// Fetch Functions 
async function fetchData(){
    try {
        const res = await fetch(URL)
        const data = await res.json()
        console.log(data)
        return data
    }  catch (error) {
        console.log(error)
    }
}

// Print function 
async function printHTML(){
    const data = await fetchData();
    console.log(data)
}

// Update function 
async function updateDataJSON(){
    const data = await fetchData();
    fs.writeFileSync(DATA_PATH, JSON.stringify(data))
    
}

updateDataJSON()