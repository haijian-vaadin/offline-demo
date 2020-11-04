import { DeferredCallSubmitter } from '@vaadin/flow-frontend';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import { Flow } from '@vaadin/flow-frontend/Flow';
import { Router } from '@vaadin/router';
import client from './generated/connect-client.default';

import './global-styles';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  {
	path: '',
	component: 'main-view', 
	action: async () => { await import ('./views/main/main-view'); },
	children: [
		{
			path: '',
			component: 't-s-person-form-view', 
			action: async () => { await import ('./views/tspersonform/t-s-person-form-view'); }
		},
		{
			path: 'ts-person-form',
			component: 't-s-person-form-view', 
			action: async () => { await import ('./views/tspersonform/t-s-person-form-view'); }
		},
		{
			path: 'ts-master-detail',
			component: 't-s-master-detail-view', 
			action: async () => { await import ('./views/tsmasterdetail/t-s-master-detail-view'); }
		},
 		// for server-side, the next magic line sends all unmatched routes:
		...serverSideRoutes // IMPORTANT: this must be the last entry in the array
	]
},
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

client.deferredCallHandler = {
  async handleDeferredCallSubmission(deferredCallSubmitter: DeferredCallSubmitter){
    try{
      // Submit the deferred call and wait for it to finish
      await deferredCallSubmitter.submit();
       // Notify the user of successful result
			showNotification('Offline form submitted successfully.', {position: 'bottom-start'});
    }catch(error){
      // Notify the user of the error
      showNotification('Failed to submit offline form.', {position: 'bottom-start'});
      // The call will be removed from the deferred queue
      // when sent successfully or if the error is handled here.
      // To keep the call in the queue, call the 
      // keepDeferredCallInTheQueue() method.
      deferredCallSubmitter.keepDeferredCallInTheQueue();
    }
  }
}

// Send the deferred calls when application is opened in the browser. When
// the `deferredCallHandler` callback is used, make sure it is defined before this.
if (navigator.onLine) {
  client.submitDeferredCalls();
}