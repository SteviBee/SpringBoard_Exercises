// 1.
let baseURL = "http://numbersapi.com";
let favNum = "34";

async function favNumCall() {
    let ans = await $.getJSON(`${baseURL}/${favNum}?json`)
    console.log(ans.text)
}

favNumCall()

// 2

let otherNum = "33";

async function favNumCall2() {
    let { 33:ans1, 34:ans2 } = await $.getJSON(`${baseURL}/${favNum},${otherNum}?json`)
    // let ans = await $.getJSON(`${baseURL}/${favNum},${otherNum}?json`)
    console.log(ans1)
    console.log(ans2)
    // console.log(ans)

    $("h2").append(`<p>${ans1}</p>`);
    $("h2").append(`<p>${ans2}</p>`);


}

favNumCall2()

// 3
// All in one:

async function getFourFacts() {
    
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => {

            return $.getJSON(`${"http://numbersapi.com"}/${favNum}?json`);
        })
        ).then(answer => {
    
            answer.forEach(data => $("h2").append(`<p>${data.text}</p>`));
          });
    }

getFourFacts()
