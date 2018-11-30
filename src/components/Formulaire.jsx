import React, { Component } from 'react'
import { FormInputDefault, FormSelect, FormRadio } from '.'
import validators from '../helpers/validators'

class Formulaire extends Component {
  state = {}

  _init = () => {
    this._initInputValue()
    this.setState({
      step: 0,
    })
  }

  componentWillMount() {
    this._init()
  }

  _initInputValue = () => {
    for (let step of this.props.steps) {
      const inputsName = Object.keys(step.inputs)
      for (let input of inputsName) {
        this.setState({
          [input]: '',
        })
      }
    }
  }

  _onChangeInput = event => {
    const name = event.target.name
    let value = event.target.value

    if (event.target.type === 'tel') {
      const tel = value.replace(/\s/g, '')
      value = tel.replace(/(.{2})/g, '$1 ').replace(/\s+$/, '')
    }

    this.setState({
      [name]: value,
    })
  }

  _constructStep = i => {
    if (i < this.props.steps.length && i >= 0) {
      const step = this.props.steps[i]
      return (
        <>
          <h1>{`${step.title} (${i + 1}/${this.props.steps.length})`}</h1>

          {Object.keys(step.inputs).map((key, i) => {
            const input = step.inputs[key]

            const props = {
              label: `${input.label}${input.required ? '*' : ''}`,
              name: key,
              value: this.state[key],
              onChange: this._onChangeInput,
              required: input.required,
              key: i,
              isError: this.state.miss && this.state.miss.indexOf(key) >= 0,
            }
            switch (input.type) {
              case 'text':
                return (
                  <FormInputDefault
                    {...props}
                    placeholder={input.placeholder}
                  />
                )
              case 'tel':
                // \+33 \d (\d\d ){4}
                return (
                  <FormInputDefault
                    {...props}
                    placeholder={input.placeholder}
                    type="tel"
                  />
                )
              case 'email':
                // [A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})
                return (
                  <FormInputDefault
                    {...props}
                    placeholder={input.placeholder}
                    type="email"
                  />
                )
              case 'select':
                return <FormSelect {...props} options={input.options} />
              case 'radio':
                return <FormRadio {...props} options={input.options} />
              default:
                return <div>Le type {input.type} n'a pas été trouvé</div>
            }
          })}
        </>
      )
    }
  }

  _recap = () => {
    return (
      <>
        <h1>Recap</h1>
        {this.props.steps.map((step, i) => {
          const inputsName = Object.keys(step.inputs)
          return (
            <div key={i}>
              <h2>{step.title}</h2>
              {inputsName.map((inputName, j) => {
                const input = step.inputs[inputName]
                const value = this.state[inputName]
                return (
                  <p key={j}>
                    <b>{input.label} :</b>
                    {input.type === 'radio'
                      ? ` ${input.options[value] || '/'}`
                      : ` ${value || '/'}`}
                  </p>
                )
              })}
            </div>
          )
        })}
        <button onClick={this._save}>enregistrer</button>
        <button onClick={this._cancel}>annuler</button>
      </>
    )
  }

  _checkStep = i => {
    const required = []
    const step = this.props.steps[i]

    const inputsName = Object.keys(step.inputs)

    for (let input of inputsName) {
      // console.log(step.inputs[input].type === 'email', this.state[input])
      if (
        (step.inputs[input].required && !this.state[input]) ||
        (step.inputs[input].type === 'email' &&
          this.state[input].length > 0 &&
          !validators.email(this.state[input])) ||
        (step.inputs[input].type === 'tel' &&
          this.state[input].length > 0 &&
          !validators.phone(this.state[input]))
      ) {
        required.push(input)
      }
    }

    if (required.length > 0) {
      this.setState({
        miss: required,
      })
      return true
    } else {
      this.setState({ error: false, miss: [] })
      return false
    }
  }

  _changeStep = (direction, e) => {
    if (e) e.preventDefault()

    if (direction === '+' && !this._checkStep(this.state.step)) {
      this.setState(prevState => {
        return {
          step: prevState.step + 1,
        }
      })
    } else if (direction === '-') {
      this.setState(prevState => {
        return {
          step: prevState.step - 1,
        }
      })
    }
  }

  _cancel = () => {
    this._init()
  }

  _save = () => {
    const user = {
      id: '',
    }

    for (let step of this.props.steps) {
      const inputsName = Object.keys(step.inputs)
      for (let input of inputsName) {
        user[input] = this.state[input] === '' ? null : this.state[input]
      }
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => {
        alert('sauvegarde effectuée')
        this._init()
      })
      .catch(error => {
        console.log(error)
        alert(`/!\\ une erreur est survenue lors de l'enregistrement`)
      })
  }

  render() {
    return (
      <main>
        <form
          action="POST"
          onSubmit={e => {
            e.preventDefault()
            this._changeStep('-')
          }}
        >
          {this.state.step > 0 && (
            <button
              onClick={e => {
                e.preventDefault()
                this._changeStep('-')
              }}
            >
              précédent
            </button>
          )}

          {this._constructStep(this.state.step)}

          <br />

          {this.state.step <= this.props.steps.length - 1 ? (
            <button
              onClick={e => {
                e.preventDefault()
                this._changeStep('+')
              }}
            >
              suivant
            </button>
          ) : (
            <>{this._recap()}</>
          )}
        </form>
      </main>
    )
  }
}

export default Formulaire
