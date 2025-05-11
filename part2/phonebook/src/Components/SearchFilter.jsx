const SearchFilter = (props) => {
    return (
      <>
        <h3>{props.header}</h3>
        <div>
          {props.text} <input value={props.value} onChange={props.onChange} />
        </div>    
      </>
    )
  }

  export default SearchFilter