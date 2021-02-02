import { 
  DashboardOutlined, BookOutlined
} from '@ant-design/icons';

const dashBoardNavTree = [
  {
    key: 'home',
    path: '/app/home',
    title: 'Home',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'courses',
    path: '/app/courses',
    title: 'Courses',
    icon: BookOutlined,
    breadcrumb: false,
    submenu: []
  },
]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
