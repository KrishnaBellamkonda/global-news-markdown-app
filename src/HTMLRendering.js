function getObject(apiRes){
    const obj = {}
    obj["title"] = apiRes["title"] || "No-title"
    obj["url"] = apiRes["url"] || "No-url"
    obj["img"] = apiRes["multimedia"][0]["url"]  || "No-img"
    obj["abstract"] = apiRes["abstract"] || "No-abstract"
    obj["byline"] = apiRes["byline"] || "No-Byline"
    return obj
}

function createHTMLResponse(obj_1, obj_2){


    // Array 1
    const link_1 = obj_1["url"]
    const img_1 = obj_1["img"]
    const abstract_1 = obj_1["abstract"]
    const byline_1 = obj_1["byline"]
    const title_1 = obj_1["title"]
    
    // Array 2
    const link_2 = obj_2["url"]
    const img_2 = obj_2["img"]
    const abstract_2= obj_2["abstract"]
    const byline_2 = obj_2["byline"]
    const title_2 = obj_2["title"]


    // HTML rendering 
    const newsSection = `
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' width='100vw' height='70vh'>
    <style>
            * {
            font-family: 'Poppins', sans-serif;
            padding: 0;
            margin: 0;
        }
        .container {
            max-width: clamp(200px, 70%, 700px);
            margin: 0 auto;
        }
        img {
            width: 100%;
            max-height: clamp(250px, 30%, 400px);
        }
        h2 {
            font-size: 1.6rem;
            line-height: 1.2em;
            margin-block-end: 1rem;
        }
        a {
            text-decoration:none;
            color:rgb(30, 5, 141);
        }
        .articles {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-block-start: 1rem;
            margin-block-end: 1rem;
        }
        section {
            display: flex;
            flex-direction: column;
        }
        article {
            font-size: 1rem;
            line-height: 1.6em;
            margin-block-start: 1rem;
        }
        section {
            border-inline: 1px solid rgb(218, 218, 218);
            padding-inline: 2rem;
        }
    </style>
    <foreignObject width='100%' height='100%'>
        <div class='articles' xmlns='http://www.w3.org/1999/xhtml'>
            <section class='container' >
                <a href='${link_1}' xmlns='https://www.w3.org/1999/xlink'><h2>${title_1}</h2></a>
                <a href='${link_1}' xmlns='https://www.w3.org/1999/xlinkk'><img src='${img_1}' alt='article1' ></a>
                <article>
                ${abstract_1}
                </article>
                <p>${byline_1}</p>
            </section>
            <section class='container'>         
                <a href='${link_2}' xmlns='https://www.w3.org/1999/xlink'><h2>${title_2}</h2></a>
                <a href='${link_2}' xmlns='https://www.w3.org/1999/xlink'>
                    <img src='${img_2}' alt='article2'>
                </a>
                <article>
                ${abstract_2}
                </article>
                <p>${byline_2}</p>
            </section>
        </div>
    </foreignObject>    
</svg>



    `
    return newsSection

}

function htmlWorkflow(articles){
    let [obj1, obj2] = articles.map(item=>{
    if(!(typeof item === "undefined"))   
        return getObject(item)
    })
    let html = createHTMLResponse(obj1, obj2)
    return html
}

function getRandomIndices(max, n_indices = 2){
    var arr = [];
    while(arr.length < n_indices){
        var r = Math.floor(Math.random() * max) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return (arr);
}

function getRadnomizedArticles(n_indices=2){
    let data = require('./data/world.json')
    let results = data["results"]
    let length = results.length
    let randomIndices = getRandomIndices(length, n_indices)
    let reqArticles = randomIndices.map((index)=> results[index])
    return reqArticles
}

exports.createHTMLResponse = createHTMLResponse
exports.getObject = getObject
exports.htmlWorkflow = htmlWorkflow
