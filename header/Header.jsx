import './header.css';
import Icon from '../general/Icon';

const headerTypes = {
  standard: {
    className: 'standard-header',
    logoSrc: '/logo/brand/wit-blauw.png',
  },
  inline: {
    className: 'inline-header',
    logoSrc: '/logo/brand/wit-geen-text.png',
  },
}

export default function Header({ type = 'standard', menuOpenState, children }) {
  type = headerTypes[type]? type : 'standard';
  const headerType = headerTypes[type];

  const onOpenMenu = () => { menuOpenState[1](true) };

  return (
    <header className={headerType.className}>
      <div className='logo-container'>
        <img src={headerType.logoSrc} alt='Logo' className='logo' />
        <a href='/' className='logo-link' />
      </div>
      {children}
      <div className='btn' onClick={onOpenMenu}>
        <span>Menu</span>
        <Icon src='/assets/icons/hamburger.svg' />
      </div>
    </header>
  );
}