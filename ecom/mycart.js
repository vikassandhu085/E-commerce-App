
function start()
{
  var container = document.getElementsByClassName("itemContainer")[0]
  var products = container.children;
  console.log(products, 'my-cart-products');
  
  for(var j = 0 ; j < products.length ; j++)
  {
    var deleteBtn = products[j].children[1].children[1].children[1];
    var plusBtn = products[j].children[1].children[2].children[0];
    var minusBtn = products[j].children[1].children[2].children[2];
    
    minusBtn.addEventListener("click",minusQuantityOfItem)
    plusBtn.addEventListener("click",plusQuantityOfItem)
    deleteBtn.addEventListener("click",deleteItemFromCart)
  }
  if(products.length)
  {
  for(var j = 0 ; j < products.length ; j++)
  {
    var itemDescription = products[j].children[1].children[3].style.display = "none"
  }

  for(var j = 0 ; j < products.length ; j++)
  {
    
    var itemDescriptionBtn = products[j].children[1].children[1].children[0]
    
    itemDescriptionBtn.addEventListener("click",function(event)
    {
      console.log(event.target.parentNode, 'descbtn-target');
      var description = event.target.parentNode.parentNode.children[3]
      
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
}

function deleteItemFromCart(event)
{
  var id = event.target.id;
  var request = new XMLHttpRequest()
  request.open("post","/myCart")
  request.setRequestHeader("Content-type","application/json")
  request.send(JSON.stringify({id:id}))

  request.addEventListener("load",function()
    {
      if(request.status === 401)
      {
        alert("Error occurred ")
        window.location.href="/myCart"
      }
      else if(request.status === 200)
      {
        window.location.href="/myCart"
      }
        
    })
}

function plusQuantityOfItem(event)
{
  var id = event.target.id;
  var quantity = event.target.parentNode.children[1].children[0]
  console.log(quantity, 'quaqua')
  var request = new XMLHttpRequest()
  request.open("post","/plusQuantity")
  request.setRequestHeader("Content-type","application/json")
  request.send(JSON.stringify({id:id}))

  request.addEventListener("load",function()
  {
    if(request.status === 401)
    {
      alert("Error occurred ")
      window.location.href="/myCart"
    }
    else if(request.status === 200)
    {
      
      quantity.innerHTML=parseInt(quantity.innerHTML)+1;
    }
        
  })
}

function minusQuantityOfItem (event)
{
  var id = event.target.id;
  var quantity = event.target.parentNode.children[1].children[0]

  var request = new XMLHttpRequest()
  request.open("post","/minusQuantity")
  request.setRequestHeader("Content-type","application/json")
  request.send(JSON.stringify({id:id}))

  request.addEventListener("load",function()
  {
    if(request.status === 401)
    {
      alert("Error occurred ")
      window.location.href="/myCart"
    }
    else if(request.status === 200)
    {
      if(parseInt(quantity.innerHTML)>0)
      {
        quantity.innerHTML=parseInt(quantity.innerHTML)-1;
      }
      else if(request.status === 200)
      {
        alert("Cannot decrease quantity further");
      }
    }
        
  })
}

start();