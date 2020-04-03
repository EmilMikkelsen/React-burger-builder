import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    return (
        <Aux>
            <div 
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
        </Aux>
    );
}

export default React.memo(Modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
    );