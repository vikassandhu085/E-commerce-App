
function start()
{
  var container = document.getElementsByClassName("itemContainer")[0]
  var products = container.children;
  console.log(products.length)
  for(var j = 0 ; j < products.length ; j++)
  {
    var deleteProductBtn = products[j].children[4]
    
    deleteProductBtn.addEventListener("click", deleteProduct)
          
    var updateProductBtn = products[j].children[5]

    updateProductBtn.addEventListener("click",updateProduct)
    
  }

  for(var j = 0 ; j < products.length ; j++)
  {
    var itemDescription = products[j].children[6].style.display = "none"
  }

  for(var j = 0 ; j < products.length ; j++)
  {
    
    var itemDescriptionBtn = products[j].children[3]
    
    itemDescriptionBtn.addEventListener("click",function(event)
    {
      
      var description = event.target.parentNode.children[6]
      
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

function deleteProduct (event)
{
  var id = event.target.id
     console.log(id) 
      var request = new XMLHttpRequest()
      request.open("post","/deleteProduct")
      request.setRequestHeader("Content-type","application/json")
      request.send(JSON.stringify({id:id}))

      request.addEventListener("load",function()
      {
        if(request.status === 404)
        {
          alert("Error occurred while deleting product");
          window.location.href="/"
        }
        else if(request.status === 200)
        {
          alert("Product has been deleted successfully!");
          window.location.href="/"
        }
        
      })

}

function updateProduct (event)
{
  var id = event.target.id
      console.log(id)
      var request = new XMLHttpRequest()
      request.open("post","/updateProductId")
      request.setRequestHeader("Content-type","application/json")
      request.send(JSON.stringify({id:id}))

      request.addEventListener("load",function()
      {
        if(request.status === 404)
        {
          alert("error occurred while updating product")
        }
        else if(request.status === 200)
        {
          window.location.href="/updateProduct"
        }
    
      })

}