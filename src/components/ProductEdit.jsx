/* eslint-disable react/prop-types */
function ProductEdit(props) {

    const {
        product: { id, nome, preco, categoria, emStock },
        onChangeName,
        onChangePreco,
        onChangeCategoria,
        updateProduct
    } = props

    // (e) => setNome(e.target.value)
    // (e) => setPreco(e.target.value)
    // (e) => setCategoria(e.target.value)

    return (
        <div
            className={`product ${emStock ? "in-stock" : "out-of-stock"}`}>
            <input className='nome' onChange={(e) => onChangeName(e)} value={nome}></input> 
            <input className='preco' onChange={(e) => onChangePreco(e)} value={preco}></input>
            <input className='categoria' onChange={(e) => onChangeCategoria(e)} value={categoria}></input>

            <button onClick={() => updateProduct(id)}>
                Update Product
            </button>

        </div>
    )
}

export default ProductEdit
