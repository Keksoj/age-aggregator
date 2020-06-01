import React from 'react'

class PersonsList extends React.Component {
    constructor(props) {
        super(props)
        // this.delete = this.delete.bind(this)
        this.createListItem = this.createListItem.bind(this)
    }
    delete(key) {
        this.props.delete(key)
    }
    createListItem(item) {
        return (
            <li key={item.key}>
                {item.name}, {item.date}
                <button
                    onClick={() => {
                        this.delete(item.key)
                    }}
                >
                    x
                </button>
            </li>
        )
    }
    render() {
        const listOfPersons = this.props.persons.map(this.createListItem)
        return <ul className="ListOfPersons">{listOfPersons}</ul>
    }
}

export default PersonsList
