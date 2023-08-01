// Ex 3 - write out all items with their stock number
// provide a button and use onClick={moveToCart} to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart.
// use React.useState to keep track of Stock items
// list out the Cart items in another column
function NavBar({ stockitems, minstock }) {
  const [cart, setCart] = React.useState([]);
  const [stock, setStock] = React.useState(stockitems);
  const { Button } = ReactBootstrap;
  console.log(cart);

  // event apple:2
  const moveToCart = e => {
   let [name, num] = e.target.innerHTML.split(":"); // innerHTML should be format name:3
    // use newStock = stock.map to find "name" and decrease number in stock by 1
    // only if instock is >=  do we move item to Cart and update stock

    if (num <= 0) return;

    let newStock = stock.map(item => {
      if (item.name == name) 
        item.instock--;
        return item;
      
    });

    setStock([...newStock]);

    let newList = stock.filter(item => item.instock > minstock);
    setStock([...newList]);

    let theItem = stock.filter(item => {
      if (item.name == name) {
        return item;
      }
    });
    setCart([...cart, ...theItem]);
  };

  const updatedList = stock.map((item, index) => {
    return (
      <Button onClick={moveToCart} key={index}>
        {item.name}:{item.instock}
      </Button>
    );
  });
  
  const newCart = cart.map((item, index) => {
    return (
      <Button key={index}>
        {item.name}
      </Button>
    )
  });


  // note that React needs to have a single Parent
  return (
    <>
      <ul style={{ listStyleType: "none" }}>{updatedList}</ul>
      <h1>Shopping Cart</h1>
      <ul style={{ listStyleType: "none" }}>{newCart}</ul>
    </>
  );
}

const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear", instock: 3 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 },
  { name: "grapes", instock: 4 }
];
ReactDOM.render(
  <NavBar stockitems={menuItems} minstock={0}/>,
  document.getElementById("root")
);
