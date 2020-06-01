import React from 'react'
import GetAge from './GetAge'
import PersonsList from './PersonsList'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
        }
        this.addPerson = this.addPerson.bind(this)
        this.deletePerson = this.deletePerson.bind(this)
    }

    addPerson(event) {
        if (this._inputDate !== '' && this._inputName !== '') {
            var newPerson = {
                name: this._inputName.value,
                date: this._inputDate.value,
                posixDate: Date.parse(this._inputDate.value) + 43200000,
                key: Date.now(),
            }
            this.setState((prevState) => {
                return {
                    persons: prevState.persons.concat(newPerson),
                }
            })
            this._inputName.value = ''
            this._inputDate.value = ''
        }
        console.log(newPerson)
        console.log(this.state.persons)
        event.preventDefault()
    }
    deletePerson(key) {
        var filteredPersons = this.state.persons.filter((person) => {
            return person.key !== key
        })
        this.setState({
            persons: filteredPersons,
        })
    }

    render() {
        return (
            <div className="appMain">
                <div className="header">
                    <form onSubmit={this.addPerson}>
                        <input
                            type="text"
                            placeholder="enter a name"
                            ref={(name) => (this._inputName = name)}
                        />
                        <input
                            type="date"
                            ref={(date) => (this._inputDate = date)}
                        />
                        <button type="submit">add</button>
                    </form>
                </div>
                <div className="list">
                    <PersonsList
                        persons={this.state.persons}
                        delete={this.deletePerson}
                    />
                </div>
                <div className="AgeDisplay">
                    <GetAge persons={this.state.persons} />
                </div>
            </div>
        )
    }
}

export default App
