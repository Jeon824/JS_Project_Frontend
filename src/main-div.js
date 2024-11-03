import { useContext } from 'react'
import './product-list'
import ProductList from './product-list'

export default function MainDiv({used_method}){

    if(used_method == 'LOG'){
        return (
            <ProductList id='searched-list' products={this.state.productList}/>
        )
    }
    else if(used_method == 'POST'){
        

    }
    
}