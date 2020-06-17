import React from 'react';
import ReactDOM from 'react-dom';


const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

// e.stopPropagation will make use that it will not propate to other pages
// here when we are clicking on first div we are going to main page.
// but when we click on the main box, we should not we should not go to previous page. therefore we use this
// this is like prvent default


export default Modal;