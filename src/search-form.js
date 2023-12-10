export default function SearchFrom(props) {
    return(
      <div id="search-form-div">
          <form
          onSubmit={props.onSubmit}
          method='get'>
              <input
                 type='text'
                 id='search-box'
                 //  onKeyDown={props.onKeyDown}
                 defaultValue={props.keyword}
                 onChange={props.onChange}
               />
               <input type="submit" value="Submit"/>
          </form>
      </div>
    )
}