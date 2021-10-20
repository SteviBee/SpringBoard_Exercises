// // NOTE - can't figure out how to list params in object and pass on so just doing clunckly way below
// async function getGif(input) {
//     let url = "api.giphy.com/v1/gifs/search"
//     let params = {
//         q: input,
//         api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
//     }
//     console.log("url is", url. params)
//     const res = await axios.get(url, { params })
//     console.log("getGif Function RAN, and res is", res)
// }

$("#searchForm").on("submit", function (e) {
    e.preventDefault()

    let input = $("#search").val()
    getInput(input)
});

async function getInput(input) {

    const res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`)
    // Could replace .css with addclass("something with bootstrap for pics")
    
    // console.log("clilcked! res", res.data)
    
    let randNum = Math.floor((Math.random() * 50));
    let src = res.data.data[randNum].images.original.url
    $("#list").append($("<img>").attr("src", `${src}`))   

    console.log("source: ", src)
    return src;
}



function removeAll() {
    $("#removeBtn").on("click", function () {
        $("ul").empty();
    })
}

removeAll();

// http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym


