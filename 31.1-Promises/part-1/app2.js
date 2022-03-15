let $h2 = $("h2")

// $h2.text("cool")


// let fourNumberPromises = [];

let num1 = Math.floor(Math.random()*100)
// let num2 = Math.floor(Math.random()*100)
// let num3 = Math.floor(Math.random()*100)
// let num4 = Math.floor(Math.random()*100)
// let num5 = Math.floor(Math.random()*100)

// let answer = axios.get(`http://numbersapi.com/${num1},${num2},${num3},${num4},${num4}`)
// .then(p => { 
//     // console.log(JSON.parse(p));
//     // $("<p>").appendTo("h2").text(p.data);
//     console.log(p.data);
//     // for (let i = 1; i < 5; i++) {
//     //     console.log(typeOf p.data);
//     //     $("<p>").appendTo("h2").text(p.data[i]);
//     // }
// })

// for (let i = 1; i < 5; i++) {
//     $("<p>").appendTo("h2").text(JSON.parse(answer[i]));
// }

// All in one:
Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${"http://numbersapi.com"}/${num1}?json`);
    })
  ).then(answer => {
    answer.forEach(data => $("h2").append(`<p>${data.text}</p>`));
  });
  



// Old 1-2 questions:

// for (let i = 1; i < 5; i++) {
//     let num = Math.floor(Math.random()*100)

//     fourNumberPromises.push(
//     axios.get(`http://numbersapi.com/${num1}, ${num2}, ${num3}, ${num4}?json`)
//   );
// }

// Promise.all(fourNumberPromises)
//   .then(numArr => (
//     numArr.forEach(p => {
//         console.log(p.data);
//         $("<p>").appendTo("h2").text(p.data);   
//     })
//   ))
//   .catch(err => console.log(err));


// $("#changeThis").on("click", function(e) {
//     $("body").css("background-color", "rgb(" + $("input")[0].value + "," +$("input")[1].value + "," + $("input")[2].value +")")
//   })

// $("<li>").appendTo("ol").text("Whatever you want!")