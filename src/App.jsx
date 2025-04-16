import { useState } from 'react'
import './App.css'
import productsJson from './assets/products.json'
import Product from './components/Product'
import ProductEdit from './components/ProductEdit'

function App() {

  const [products, setProducts] = useState(productsJson)
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [categoria, setCategoria] = useState("")
  const [message, setMessage] = useState("")
  const [edit, setEdit] = useState(false)
  const [editProdId, setEditProdId] = useState(0)

  const eliminarProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const editProduct = (productId) => {
    setEdit(true);
    setEditProdId(productId);
  }

  const updateProduct = (productId) => {
    products.map((product) => {
      if(product.id === productId){
        product.nome = nome;
        product.preco = preco;
        product.categoria = categoria;
        product.message = message;
      }
    })
  }

  const onChangeName = (e) => setNome(e.target.value)
  const onChangePreco = (e) => setPreco(e.target.value)
  const onChangeCategoria = (e) => setCategoria(e.target.value)

  const toggleStock = (productId) => {

    const productsCopy = [...products]

    // Encontrar o product com o id que queremos alterar
    const productToToggle = productsCopy.find(product => product.id === productId)
    productToToggle.emStock = !productToToggle.emStock

    setProducts(productsCopy)

  }

  const addProduct = (nome, preco, categoria) => {
    // adiciona um botão com dados dummy

    const newProduct = {
      id: Date.now(),
      nome,
      preco,
      categoria,
      emStock: true
    }

    setProducts([newProduct, ...products])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nome || !preco || !categoria) {
      setMessage("Please fill all the fields.")
      return
    }

    const form = e.target
    addProduct(form.nome.value, form.preco.value, form.categoria.value)
    setNome("")
    setPreco("")
    setCategoria("")

    setMessage("Product Inserted.")
  }

  return (<div className='App'>

    <h1>Adicionar Produto</h1>

    <form onSubmit={handleSubmit} className='add-product'>
      <div className='form-control'>
        <label htmlFor="nome">Nome</label>
        <input onChange={(e) => setNome(e.target.value)} value={nome} name='nome' type="text" />
      </div>
      <div className='form-control'>
        <label htmlFor="preco">Preço</label>
        <input onChange={(e) => setPreco(e.target.value)} value={preco} name='preco' type="number" />
      </div>
      <div className='form-control'>
        <label htmlFor="categoria">Categoria</label>
        <input onChange={(e) => setCategoria(e.target.value)} value={categoria} name='categoria' type="text" />
      </div>

      <div>
        {message}
      </div>

      <button type='submit' className='add'> Adicionar </button>
    </form>



    <div className='products'>
      {products.map(product => {
        if(edit && product.id === editProdId){
          <ProductEdit 
            key={product.id}
            updateProduct={updateProduct}
            onChangeName={onChangeName}
            onChangePreco={onChangePreco}
            onChangeCategoria={onChangeCategoria}
          />
        } else {
          <Product
            key={product.id}
            product={product}
            toggleStock={toggleStock}
            eliminarProduct={eliminarProduct}
            editProduct={editProduct}
          />
        }
      }
        )}
    </div>
  </div>
  )
}

export default App
