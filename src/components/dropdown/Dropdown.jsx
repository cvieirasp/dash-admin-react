import React, { useRef } from 'react';

import './dropdown.css';

const clickOutsideRef = (contentRef, toggleRef) => {
  document.addEventListener('mousedown', (e) => {
    // usuário clicou no toggle
    if (toggleRef.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle('active');
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove('active');
      }
    }
  });
}

const Dropdown = props => {
  const dropdownToggleElement = useRef(null);
  const dropdownContentElement = useRef(null);

  clickOutsideRef(dropdownContentElement, dropdownToggleElement);

  return (
    <div className='dropdown'>
      <button ref={dropdownToggleElement} className="dropdown__toggle">
        { props.icon ? <i className={props.icon}></i> : '' }
        { props.badge ? <span className="dropdown__toggle-badge">{props.badge}</span> : '' }
        { props.customToggle ? props.customToggle() : '' }
      </button>
      <div ref={dropdownContentElement} className='dropdown__content'>
        {
          props.contentData && props.renderItems ? 
            props.contentData.map(
              (item, index) => props.renderItems(item, index)
            ) : ''
        }
        {
          props.renderFooter ? (
            <div className="dropdown__footer">
              {props.renderFooter()}
            </div>
          ) : ''
        }
      </div>
    </div>
  );
};

export default Dropdown;
