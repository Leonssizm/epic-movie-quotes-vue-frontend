import router from '@/router/index.js'
import { checkIfUserIsAuthenticated } from '@/services/api.js'


router.beforeEach(async (to, from, next) => {
    if (to.path === '/home') {
      try {
        const response = await checkIfUserIsAuthenticated();
        if (response.status === 200) {
          next();
        } else {
          next({ name: 'forbidden' });
        }
      } catch (error) {
        next({ name: 'forbidden' });
      }
    } else {
      next();
    }
  });