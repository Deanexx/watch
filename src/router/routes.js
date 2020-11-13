

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "main", component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/cart',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "cart", component: () => import('pages/Cart.vue') }
    ]
  },
  {
    path: '/login',
    component: () =>  import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "login", component: () => import('pages/Login.vue') }
    ]
  },

  {
    path: '/register',
    component: () =>  import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "register", component: () => import('pages/Register.vue') }
    ]
  },

  {
    path: '/checkout',
    component: () =>  import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "checkout", component: () => import('pages/Checkout.vue') }
    ]
  },

  {
    path: '/contact',
    component: () =>  import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "contact", component: () => import('pages/Contact.vue') }
    ]
  },
  {
    path: '/office',
    meta: { auth: true },
    component: () =>  import('layouts/MainLayout.vue'),
    children: [
      { path: 'orders', name: "orders", component: () => import('pages/Office/Orders.vue') },
      { path: 'changePassword', name: "changePassword", component: () => import('pages/Office/ChangePassword.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
