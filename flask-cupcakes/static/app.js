// $('.delete-todo').click(deleteTodo)

// async function deleteTodo() {
//   const id = $(this).data('id')
//   await axios.delete(`/api/todos/${id}`)
//   $(this).parent().remove()
// }

// $(".add-cupcakes").on("load", addCupcakes)

// async function addCupcakes() {
//     alert("this worked!")
// }

$(window).on("load", addCupcakes)

async function addCupcakes() {
    let cupcakes = await axios.get("/api/cupcakes");
    console.log("cupcakes is", cupcakes.data.cupcakes);

    let $list = $("#add-cupcakes")
    let data = cupcakes.data.cupcakes


    for (const item of data) {
        console.log("obj is", item)
        let $li = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center").text(`Info: ${item.flavor},  ${item.size}, rating: ${item.rating}`)
        let $img = $("<img>").attr("src", `${item.image}`)

        // 1/12/22 - LEFT because cannot figure out how to add img
        $($list).append($li)
        $($list).append($img)
    }

}

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();
  
    const newCupcakeResponse = await axios.post(`api/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });

    // let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    // $("#cupcakes-list").append(newCupcake);
    // $("#new-cupcake-form").trigger("reset");   
    window.location.reload(true)

});


