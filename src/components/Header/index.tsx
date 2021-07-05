import React from 'react';
import './Header.css';

function Header({ headerText = 'Bench Test' }: { headerText?: string }) {
  return (
    <div className='header'>
      <h1 className='header-text'>{headerText}</h1>
    </div>
  );
}

export default Header;
