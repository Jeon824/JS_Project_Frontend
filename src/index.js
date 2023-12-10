import {Component} from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import mainLogo from './img/logo512.png';
import barLogo from './img/favicon.ico';
import SearchFrom from './search-form';
import UploadPlate from './upload-plate';
import ProductList from './product-list';


const WAS_ADDRESS = "http://localhost:8080/product/" //Domain name which is hosted
 
class MainPlate extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginCode : null,
            languageStatus : 0, //default English
            location: '',
            keyword: false,
            company: null,
            productList: null,
            user_method: 'GET'
        }
    }

    // shouldComponentUpdate(nextProps,nextState) {
    //     if(this.state.keyword){
    //         return false;
    //     }

    //     return true;
    // }

    searchByKeyword(e){//handle keyword between user - client
        console.log('search by keyword');
        e.preventDefault();
        const inputKeyword = e.target.children[0].value;

        console.log('typed keyword is',inputKeyword);
        this.setState({
          keyword : inputKeyword,
          page : 1,
          user_method: 'GET'
        })
        
        this.handleSearch(inputKeyword);
                
    }

    handleChange(e){
        
    }

    handleSearch(keyword) {//handle keyword between client - WAS
      console.log('handle search');

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Accept':'application/json' },
        redirect: 'follow'
    };

    const ReqAddr = WAS_ADDRESS + keyword

    const dataRequest = async () => {fetch(ReqAddr,requestOptions).then((response) => { console.log(response);this.setState({productList : response})});
    }

    dataRequest();
        
    }

    productGetRequest(pid){
      
    }

    toLogin(e){
      e.preventDefault();
      this.setState({
        user_method:'LOG'
      })
    }

    toUpload(e){
      e.preventDefault();
      this.setState({
        user_method:'POST'
      })
      
    }

    componentDidCatch(error, info){
      console.log(error);
      console.log(info);

    }
  

    render(){
        if(this.state.keyword){
          return(
            <div>
              <header>
              <nav id='top-navbar'>
                  <ul id='top-nav'>
                    <li><img id='bar-logo' src={barLogo}/></li>
                    <li><SearchFrom
                    // onKeyDown={e => this.searchByKeyword(e)}
                    onSubmit={e => this.searchByKeyword(e)}
                    onChange={e => this.handleChange(e)}
                    keyword={this.state.keyword}
                    /></li>
                    <li className='float-right'><a value='Login' onClick={e=>this.setState({user_method:'LOG'})}/>Login</li>
                    <li className='float-right'><a value='Upload' onClick={e=>this.setState({user_method:'POST'})}>Upload</a></li>
                  </ul>
                </nav>
              </header>
              <main>
                <div id='method-plate'>
                    {this.state.user_method==='GET'?
                    <ProductList id='searched-list' products={this.state.productList}/>:
                    <UploadPlate/>}
                </div>
              </main>
            </div>)
        }
          return(
          <div>
              <header>
                <nav id='top-navbar'>
                  <ul id='top-nav'>
                    <a className='float-right' value='Login' onClick={e=>this.setState({user_method:'LOG'})}>Login</a>
                    <a className='float-right' value='Upload' onClick={e=>this.setState({user_method:'POST'})}>Upload</a>
                  </ul>
                </nav>
              </header>
              <main id="main">
                  <img id='main-logo' src={mainLogo}/>
                  <SearchFrom
                  onSubmit={e => this.searchByKeyword(e)}
                  onChange={e => this.handleChange(e)}
                  toLogin={e => this.toLogin(e)}
                  toUpload={e => this.toUpload(e)}
                  // onKeyDown={e => this.searchByKeyword(e)}
                  />
              </main> 
          </div>)
  }
}
 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<MainPlate/>);