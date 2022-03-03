import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import ThemeAction from '../../redux/actions/ThemeAction';
import './themeMenu.css';

const modeSettings = [{
  id: 'light',
  name: 'Claro',
  background: 'light-background',
  class: 'theme-mode-light'
}, {
  id: 'dark',
  name: 'Escuro',
  background: 'dark-background',
  class: 'theme-mode-dark'
}];

const colorSettings = [{
  id: 'blue',
  name: 'Azul',
  background: 'blue-color',
  class: 'theme-color-blue'
}, {
  id: 'red',
  name: 'Vermelho',
  background: 'red-color',
  class: 'theme-color-red'
}, {
  id: 'cyan',
  name: 'Ciano',
  background: 'cyan-color',
  class: 'theme-color-cyan'
}, {
  id: 'green',
  name: 'Verde',
  background: 'green-color',
  class: 'theme-color-green'
}, {
  id: 'orange',
  name: 'Laranja',
  background: 'orange-color',
  class: 'theme-color-orange'
}];

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

const ThemeMenu = () => {
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  const [currentMode, setCurrentMode] = useState('light');
  const [currentColor, setCurrentColor] = useState('blue');

  const dispatch = useDispatch();

  clickOutsideRef(menuRef, menuToggleRef);

  const showMenu = () => menuRef.current.classList.add('active');
  const closeMenu = () => menuRef.current.classList.remove('active');

  const setMode = mode => {
    setCurrentMode(mode.id);
    localStorage.setItem('themeMode', mode.class);
    dispatch(ThemeAction.setMode(mode.class));
  }

  const setColor = color => {
    setCurrentColor(color.id);
    localStorage.setItem('colorMode', color.class);
    dispatch(ThemeAction.setColor(color.class));
  }

  useEffect(() => {
    const themeClass = modeSettings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light'));
    const colorClass = colorSettings.find(e => e.class === localStorage.getItem('colorMode', 'theme-color-blue'));

    if (themeClass) setCurrentMode(themeClass.id);
    if (colorClass) setCurrentColor(colorClass.id);

  }, []);

  return (
    <div>
      <button 
        className='dropdown__toggle'
        ref={menuToggleRef}
        onClick={() => showMenu()}
      >
        <i className='bx bx-palette'></i>
      </button>
      <div className="theme-menu" ref={menuRef}>
        <h4>Configurações de Tema</h4>
        <button 
          className="theme-menu__close"
          onClick={() => closeMenu()}
        >
          <i className='bx bx-x'></i>
        </button>
        <div className="theme-menu__select">
          <span>Selecione o Modo</span>
          <ul className="mode-list">
            {
              modeSettings.map((item, index) => (
                <li key={index} onClick={() => setMode(item)}>
                  <div className={`mode-list__color ${item.background} ${item.id === currentMode ? 'active' : ''}`}>
                    < i className='bx bx-check'></i>
                  </div>
                  <span>{item.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="theme-menu__select">
          <span>Selecione a Cor</span>
          <ul className="mode-list">
            {
              colorSettings.map((item, index) => (
                <li key={index} onClick={() => setColor(item)}>
                  <div className={`mode-list__color ${item.background} ${item.id === currentColor ? 'active' : ''}`}>
                    < i className='bx bx-check'></i>
                  </div>
                  <span>{item.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
