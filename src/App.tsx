import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, partlySunnyOutline, personCircleOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import BiodataPage from './pages/Biodata/BiodataPage';
import HomePage from './pages/Home/HomePage';
import TablePage from './pages/Table/TablePage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/ringkasan" component={HomePage} />
          <Route exact path="/tabel" component={TablePage} />
          <Route exact path="/biodata" component={BiodataPage} />
          <Route exact path="/">
            <Redirect to="/ringkasan" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="ringkasan" href="/ringkasan">
            <IonIcon icon={partlySunnyOutline} />
            <IonLabel>Ringkasan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tabel" href="/tabel">
            <IonIcon icon={listOutline} />
            <IonLabel>Tabel</IonLabel>
          </IonTabButton>
          <IonTabButton tab="biodata" href="/biodata">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Biodata</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
