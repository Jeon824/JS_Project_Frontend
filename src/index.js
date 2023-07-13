import {Component} from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import mainLogo from './img/logo512.png';
import barLogo from './img/favicon.ico';
import SearchFrom from './search-form';
import UploadPlate from './upload-plate';
import ProductList from './product-list';


const WAS_ADDRESS = "http://localhost:8080/product/upload" //Domain name which is hosted
 
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

    async searchByKeyword(e){
        e.preventDefault();
        const keyName = e.key;
        const inputKeyword = e.target.children[0].value;

        console.log('typed keyword is',inputKeyword);
        this.setState({
          keyword : inputKeyword,
          page : 1,
          user_method: 'GET'
        })
        
        this.handleSearch(this.keyword);
                
    }

    handleChange(e){
        
    }

    handleSearch(keyword) {
        const xhr = new XMLHttpRequest();
        const method = 'GET';
        const explorer = {
          keyword : keyword
        }
        /*
        const url = WAS_ADDRESS +'/product';//nginx server domain name
        xhr.setRequestHeader('Content-Type','')
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = (e) => {
          const { target } = e
        }

        if (target.readyState === XMLHttpRequest.DONE) {
          const { status } = target;
  
          if (status === 0 || (status >= 200 && status < 400)) {
              // 요청이 정상적으로 처리 된 경우

          } else {
              // 에러가 발생한 경우
            
          }
      }*/
    }

    productGetRequest(pid){
      
    }

    uploadHandler(e) {
      e.preventDefault();
      
      const company_name = e.target.children[0].value;
      const product_name = e.target.children[1].value;
      const file_name = e.target.children[2].value;
      const version = e.target.children[3].value;
      fetch(WAS_ADDRESS,{//post to nginx
        method:'POST',
        body:JSON.stringify({
          file: null,
          company: company_name,
          product_name : product_name,
          file_name : file_name,
          version : version
        }),
        header:{
            "Content-type" : "application/json; charset=UTF-8"
        }
      }).then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
      console.log('upload requested')
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
                    productList={this.state.productList}
                    /></li>
                    <li float='right'><a value='Upload' onClick={e=>this.setState({user_method:'POST'})}>Upload</a></li>
                    <li float='right'><a value='Login' onClick={e=>this.setState({user_method:'LOG'})}/>Login</li>
                  </ul>
                </nav>
              </header>
              <main>
                <div id='method-plate'>
                    {this.state.user_method==='GET'?
                    <ProductList products={this.state.productList}/>:
                    <UploadPlate/>}
                </div>
              </main>
            </div>)
        }
          return(
          <div>
              <header>
                <nav className='top-navbar'>
                  <ul>
                    <button id='upload-page' className='' value='Upload' onClick={e=>this.setState({user_method:'POST'})}/>
                    <button className='' value='Login' onClick={e=>this.setState({user_method:'LOG'})}/>
                  </ul>
                </nav>
              </header>
              <main>
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