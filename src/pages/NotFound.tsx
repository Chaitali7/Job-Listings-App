import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { homeOutline } from 'ionicons/icons';
import './NotFound.css';

const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="not-found-container">
          <IonCard className="not-found-card">
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <h1 className="error-code">404</h1>
                <h2>Page Not Found</h2>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="error-message ion-text-center">
                <p>
                  The page you are looking for might have been removed, had its name
                  changed, or is temporarily unavailable.
                </p>
                <IonButton
                  expand="block"
                  onClick={() => history.push('/')}
                  className="home-button"
                >
                  <IonIcon icon={homeOutline} slot="start" />
                  Go to Home
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound; 