const PersonForm = (props) => {
    return (
      <>
        <h3>{props.header}</h3>
        <form onSubmit={props.onSubmit}>
            <div>
              name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
              number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
      </>
    )
  }

export default PersonForm