export default function ProductList(props) {
    
    return (
      <ul className='product-list'>
        {props.products ? props.products.map(product => (
          <li key={product.id}
              onClick={null}>{product.product_name} {product.version} {product.company_name} {product.upload_date}</li>//id,company_name, product_name, file_name, version
        )) : null }
      </ul>
    );

}