import React from 'react';

import { Input, Menu, Icon } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  state = { activeItem: 'books' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fixed="top" size="large">
        <Menu.Item as='a' header>
          Favorite Books
        </Menu.Item>
        <Menu.Item name='books' active={activeItem === 'books'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
