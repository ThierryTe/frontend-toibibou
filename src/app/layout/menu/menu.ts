import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'ADMIN_NAV.USERS', '/users', null, 'group_add', null, false, 0), 
    new Menu (3, 'ADMIN_NAV.VILLES', '/villes', null, 'location_on', null, false, 0), 
    new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]