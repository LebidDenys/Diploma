import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './styles.less'

const HeaderItem = ({ name, isActive, onItemClick }) => {
    const url = '/' + name;
    return (
        <Menu.Item
            name={name}
            active={isActive}
            onClick={onItemClick}
            className={styles.link}
        >
            <Link to={url}>{name}</Link>
        </Menu.Item>
    )
}

HeaderItem.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default HeaderItem
