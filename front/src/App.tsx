import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonIcon,
  IonItem,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './example/pages/Home';
import ViewMessage from './example/pages/ViewMessage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './shared/ui/theme/variables.css';
import { AuthForm } from './example/features/auth/ui/AuthForm/AuthForm';
import { ButtonUI } from './shared/ui';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path='/' exact={true}>
          <Redirect to='/home' />
        </Route>
        <Route path='/home' exact={true}>
          <Home />
        </Route>
        {/* <Route path='/message/:id'>
          <ViewMessage />
        </Route> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
