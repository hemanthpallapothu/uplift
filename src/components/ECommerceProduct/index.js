import './index.css'

const ECommerceProduct=(props)=>{
    const {productDetails}=props
    const {name,price,category,stock}=productDetails
    return <li className='card-container'>
        <p className='product-name'>{name}</p>
        <h1 className='product-price'>{price}</h1>
        <p className='product-category'>Category: {category}</p>
        <p className='product-stock'>Availabe Stock: {stock}</p>
    </li>
}

export default ECommerceProduct