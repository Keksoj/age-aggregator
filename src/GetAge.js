import React from 'react'

function formatTimeToYears(timeInMillis) {
    var seconds = timeInMillis / 1000
    const secondsIn = [
        ['year', 31557600],
        ['month', 2629800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1],
    ]
    var formattedTime = {}
    for (var i = 0; i < secondsIn.length; i++) {
        const period = secondsIn[i][0]
        const numberOfPeriods = Math.floor(seconds / secondsIn[i][1])
        seconds = seconds % secondsIn[i][1]

        formattedTime[period] = numberOfPeriods
    }
    return formattedTime
}

class GetAge extends React.Component {
    constructor(props) {
        super(props)
        this.state = { time: new Date() }
    }

    getAgeInMillis(persons) {
        const listOfBirthDates = persons.map((person) => person.posixDate)
        const averageBirthDate =
            listOfBirthDates.reduce((a, b) => a + b, 0) / persons.length

        const collectiveAge =
            (this.state.time - averageBirthDate) * persons.length
        return collectiveAge // milliseconds
    }

    render() {
        const ageInMillis = this.getAgeInMillis(this.props.persons)
        const formattedAge = formatTimeToYears(ageInMillis)

        return (
            <div className="AgeDisplay">
                {/* <p>The age in milliseconds: {ageInMillis}</p> */}
                The {this.props.persons.length} of you are:
                <ul>
                    <li>{formattedAge.year} years</li>
                    <li>{formattedAge.month} months</li>
                    <li>{formattedAge.day} days</li>
                    <li>{formattedAge.hour} hours</li>
                    <li>{formattedAge.minute} minutes</li>
                    <li>and {formattedAge.second} seconds old.</li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }
    tick() {
        this.setState({
            time: new Date(),
        })
    }
    componentDidUmount() {
        clearInterval(this.interval)
    }
}

export default GetAge
