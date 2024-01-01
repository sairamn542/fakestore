import React, { useEffect, useState } from 'react'

function FakestoreApi() {
  const[categories, setCategories] = useState([])
  const[products,setProducts] = useState([{id : 0,title : '',price : 0,description : '',category : '',image : '',rating : {rate : 0,count : 0}}])
  const[cartCount,setCartCount] = useState(0);
  const[cartItem,setCartItem] = useState([])

  function LoadCategories() {
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
      categories.unshift('all')
      setCategories(categories)
    })
  }
  function LoadProduct(url) {
    fetch(url)
    .then(res=>res.json())
    .then(products=>{
      setProducts(products)
    })
  }
  function HandleSelectChange(e) {
    if(e.target.value == 'all') {
      LoadProduct(`https://fakestoreapi.com/products`)
    } else {
      LoadProduct(`https://fakestoreapi.com/products/category/${e.target.value}`)
    }
  }
  function handleAddtoCart(e) {
    fetch(`http://fakestoreapi.com/products/${e.target.value}`)
    .then(res=>res.json())
    .then(product=>{
      cartItem.push(product)
      setCartCount(cartItem.length)
      alert(`${product.title}\n added to cart`)
    })
  }
  useEffect(()=>{
    LoadCategories();
    LoadProduct('https://fakestoreapi.com/products')
  },[])
  return (
    <div>
        <header className='d-flex justify-content-between p-3 bg-dark text-white'>
          <div>
            <h3>Shopper.</h3>
          </div>
          <div>
            <span className='me-4'>Home</span>
            <span className='me-4'>Electronic</span>
            <span className='me-4'>Jewellery</span>
            <span className='me-4'>Men's fashion</span>
            <span>Womens Fashion</span>
          </div>
          <div>
            <button className='btn position-relative bg-light'>
              <span className='bi bi-cart4'></span>Your cart
              <span className='badge bg-danger rounded-circle position-absolute top-0 right-0'>{cartCount}</span>
            </button>
          </div>
        </header>
        <section className='row'>
          <nav className='col-2'>
            <div>
            <label className='form-label fw-bold'>Select category</label>
            <div>
              <select className='form-select' onChange={HandleSelectChange}>
                {
                  categories.map((ele)=>(
                    <option key={ele} value={ele}>{ele.toUpperCase()}</option>
                  ))
                }
              </select>
            </div>
            </div>
          </nav>
          <main className='col-8'>
            <div className=' d-flex flex-wrap overflow-auto' style={{height : '550px'}}>
              {
                products.map((product)=>(
                  <div className='card p-2 m-2 ' style={{width : '180px'}}>
                    <img src={product.image} className='card-img-top' height='140' />
                    <div className='card-header overflow-auto' style={{height : '100px'}}>
                      {product.title}
                    </div>
                    <div className='card-body'>
                      <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                      </dl>
                    </div>
                    <div className='card-footer'>
                      <button className='btn btn-danger' value={product.id} onClick={handleAddtoCart}>
                        <span className='bi bi-cart3'></span>Add to cart
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </main>
          <aside className='col-2'>
            <table className='table table-hover caption-top'>
              <caption>Your cart summary</caption>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItem.map((cart)=>(
                    <tr>
                      <td>{cart.title}</td>
                      <td>
                        <img src={cart.image} width='50' height='50'/>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </aside>
        </section>
    </div>
  )
}

export default FakestoreApi