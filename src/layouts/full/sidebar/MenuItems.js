import {

  IconLayoutDashboard,

  IconUserPlus,
  IconBinaryTree,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/pages/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Enrollment',
    icon: IconUserPlus,
    href: '/pages/enrollment',
  },
  {
    id: uniqueId(),
    title: 'Genealogy',
    icon: IconBinaryTree,
    href: '/pages/genealogy',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconBinaryTree,
    href: '/pages/profile',
  },
];

export default Menuitems;
