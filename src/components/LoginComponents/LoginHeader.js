import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const LoginHeader = () => (
  <Header as='h1' id='loginHeader'>
    <Icon name='globe' id='loginIcon'/>
    <Header.Content>
      GEOTUNES
    <Header.Subheader id='loginSubHeader'>Login for geo playlists</Header.Subheader>
    </Header.Content>
  </Header>
)

export default LoginHeader