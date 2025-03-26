import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { homeOutline, briefcaseOutline, informationCircleOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <IonHeader className="main-header">
      <IonToolbar>
        <IonTitle className="ion-text-left" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          JobHunt
        </IonTitle>
        <IonButtons slot="end">
          <IonButton 
            fill={isActive('/') ? 'solid' : 'clear'}
            onClick={() => history.push('/')}
          >
            <IonIcon icon={homeOutline} />
            Home
          </IonButton>
          <IonButton 
            fill={isActive('/applied') ? 'solid' : 'clear'}
            onClick={() => history.push('/applied')}
          >
            <IonIcon icon={briefcaseOutline} />
            Applied Jobs
          </IonButton>
          <IonButton 
            fill={isActive('/about') ? 'solid' : 'clear'}
            onClick={() => history.push('/about')}
          >
            <IonIcon icon={informationCircleOutline} />
            About
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar; 