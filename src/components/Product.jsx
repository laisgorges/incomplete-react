import React, { useState } from 'react'

function Product(props) {

    const {
        product: { id, nome, preco, categoria, emStock },
        toggleStock,
        eliminarProduct,
        atualizarProduct
    } = props

    const [emEdicao, setEmEdicao] = useState(false);
    const [nomeEditado, setNomeEditado] = useState(nome);
    const [precoEditado, setPrecoEditado] = useState(preco);

    const editarProduct = () => {
        setEmEdicao(true);
    };

    const guardarProduct = () => {
        atualizarProduct(id, {
            nome: nomeEditado,
            preco: precoEditado
        });
        setEmEdicao(false);
    };

    return (
        <div
            className={`product ${emStock ? "in-stock" : "out-of-stock"} ${emEdicao ? "editing" : ""}`}>
            {emEdicao ? (
                <>
                    <input
                        type="text"
                        value={nomeEditado}
                        onChange={(e) => setNomeEditado(e.target.value)}
                    />
                    <input
                        type="number"
                        value={precoEditado}
                        onChange={(e) => setPrecoEditado(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h3 className='nome'>{nome}</h3>
                    <h3 className='preco'>{preco}</h3>
                </>
            )}
            <h3 className='categoria'>{categoria}</h3>

            <button onClick={() => toggleStock(id)}>
                {emStock ? "Em Stock" : "Fora de Stock"}
            </button>

            <button className='delete' onClick={() => eliminarProduct(id)}>
                Eliminar
            </button>

            <button className='edit' onClick={() => editarProduct(id)}>
                {emEdicao ? "Em edição" : "Editar"}
            </button>

            {emEdicao && (
                <button className='guardar' onClick={guardarProduct}>
                    Guardar
                </button>
            )}
        </div>
    )
}

export default Product
