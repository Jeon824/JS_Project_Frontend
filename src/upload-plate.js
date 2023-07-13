import {Component} from "react";

const WAS_ADDRESS = "http://localhost:8080/product/upload" //Domain name which is hosted

export default class UploadPlate extends Component{

    constructor(props){
        super(props);
        this.state = {
            file: null,
            company_name: null,
            product_name: null,
            file_name: null,
            version: null
        }
    }
    dragOver_Enter(e) {
        e.preventDefault();
        e.target.style.backgroundColor = 'red';
    }
   
    dragOver_handler(e) {
        e.preventDefault();
        e.target.style.backgroundColor = 'red';
    }
    drop_handler(e) {
        e.preventDefault();
        const files = e.dataTransfer?.files;
       
    }

    dragOver_Enter(e) {
        e.preventDefault();
        e.target.style.backgroundColor = 'red';
    }
    uploadHandler(e) {
     e.preventDefault();
     console.log('upload requested');
     const company_name = e.target.children[0].children[1].value;
     const product_name = e.target.children[1].children[1].value;
     const file_name = e.target.children[2].children[1].value;
     const version = e.target.children[3].children[1].value;
     console.log(company_name, product_name, file_name, version);
     const sendingData = {
       company_name : company_name,
       product_name : product_name,
       file_name : file_name,
       version : version
     }

    
     const payload = JSON.stringify(sendingData);

     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json','Accept':'application/json' },
       body: payload,
       redirect: 'follow'
   };

     const dataFetch = async () => {fetch(WAS_ADDRESS,requestOptions/*{//post to nginx
       method:'POST',
       body:JSON.stringify({
         'file': null,
         'company': company_name,
         'product_name' : product_name,
         'file_name' : file_name,
         'version' : version
       }),
       header:{
           "Content-type" : "application/json; charset=UTF-8"
       }
   }*/).then((response) => console.log(response));
    }

    dataFetch();
   
   }
   
    componentDidMount(){
        const dropBox = document.getElementById('drop-box');
        const uploadBtn = document.getElementById('file-upload-btn');
        dropBox.addEventListener('dragover', this.dragOver_handler);
        dropBox.addEventListener('drop',this.drop_handler);
    }

    componentWillUnmount(){

    }
    componentDidUpdate(){

    }
   
    render(){
        return(
        <div id='upload-frame'>
            <div id='drop-box'></div>
            <div>
                <form method='post' onSubmit={(e)=> this.uploadHandler(e)}>
                   <div>
                     <label>Company-name</label>
                     <input className='product-info' id='company-name'/>
                   </div>
                   <div>
                     <label>Product-name</label>
                     <input className='product-info' id='product-name'/>
                   </div>
                   <div>
                     <label>File_name</label>
                     <input className='product-info' id='file_name'/>
                   </div>
                   <div>
                     <label>Product-version</label>
                     <input className='product-info' id='product-vesion'/>
                   </div>
                   {/* <input className='product-info' id='product-type'/> */}
                   <input type='submit'/>
                </form>
            </div>
        </div>
        )
       
    }
}