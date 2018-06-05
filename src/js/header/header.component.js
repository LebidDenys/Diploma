import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import HeaderItem from './header-item/header-item.component'

import styles from './styles.less'

class Header extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <HeaderItem
                    name='Map'
                    isActive={activeItem === 'Map'}
                    onItemClick={this.handleItemClick}
                />

                <HeaderItem
                    name='About'
                    isActive={activeItem === 'About'}
                    onItemClick={this.handleItemClick}
                />

                <HeaderItem
                    name='Contacts'
                    active={activeItem === 'Contacts'}
                    onItemClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}

export default Header
