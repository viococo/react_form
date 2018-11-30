import React, { Component } from 'react'
import { Formulaire } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Formulaire
          steps={[
            {
              title: 'Step 1',
              inputs: {
                civilite: {
                  label: 'Civilité',
                  type: 'select',
                  options: ['Femme', 'Homme', 'Non binaire'],
                },
                firstName: {
                  label: 'Prénom',
                  type: 'text',
                  placeholder: 'River',
                  required: true,
                },
                lastName: {
                  label: 'Nom',
                  type: 'text',
                  placeholder: 'Song',
                  required: true,
                },
                email: {
                  label: 'E-mail',
                  type: 'email',
                  placeholder: 'river.song@tardis.io',
                  required: true,
                },
                phone: {
                  label: 'Téléphone',
                  type: 'tel',
                  placeholder: '06 23 45 67 89',
                },
              },
            },
            {
              title: 'Step 2',
              inputs: {
                framework: {
                  label: 'Framework Favori',
                  type: 'radio',
                  options: ['VueJS', 'ReactJS', 'NodeJS'],
                },
                ohter: {
                  label: 'Autre',
                  type: 'text',
                },
              },
            },
          ]}
        />
      </div>
    )
  }
}

export default App
