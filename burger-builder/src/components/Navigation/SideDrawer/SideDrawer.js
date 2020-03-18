import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close'];
    if(props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo />
                <nav>
                    <NavigationsItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;