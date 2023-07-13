export default function SearchFrom(props) {
    return(
      <div>
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
               <button type='submit'>Search</button>
          </form>
      </div>
    )
}