
function start()
{
  var container = document.getElementsByClassName("itemContainer")[0]
  var products = container.children;
  console.log(products, 'item');
  for(var j = 0 ; j < products.length ; j++)
  {
    var addToCartBtn = products[j].children[1].children[1].children[1];
    addToCartBtn.addEventListener("click",function(event)
    {
      var id = event.target.id
      console.log(id)
      var request = new XMLHttpRequest()
      request.open("post","/addToCart")
      request.setRequestHeader("Content-type","application/json")
      request.send(JSON.stringify({id:id}))

      request.addEventListener("load",function()
      {
        if(request.status === 401)
        {
          alert("please login to add product in your cart")
          console.log("error occurred while adding item in cart")
        }
        else if(request.status === 200)
        {
          window.location.href="/guest"
        }
        else if(request.status === 402)
        {
          alert("This product already added in your cart")
        }
        
      })
      

    })
  }

  for(var j = 0 ; j < products.length ; j++)
  {
    var itemDescription = products[j].children[1].children[2].style.display = "none"
  }

  for(var j = 0 ; j < products.length ; j++)
  {
    
    var itemDescriptionBtn = products[j].children[1].children[1].children[0];
    
    itemDescriptionBtn.addEventListener("click",function(event)
    {
      
      var description = event.target.parentNode.parentNode.children[2];
      console.log(event.target.parentNode.parentNode.children[2], 'targetBtn');
      
      if(description.style.display === "none")
      {
        description.style.display = "block"
      }
      else
      {
        description.style.display = "none"
      }

    })
  }


}

start();