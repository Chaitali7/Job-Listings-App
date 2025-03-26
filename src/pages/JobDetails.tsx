import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonChip,
  IonIcon,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import {
  locationOutline,
  businessOutline,
  timeOutline,
  cashOutline,
  calendarOutline,
  briefcaseOutline,
} from 'ionicons/icons';
import './JobDetails.css';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding ion-text-center">
            <h2>Job not found</h2>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="job-details-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{job.title}</IonCardTitle>
              <IonCardSubtitle>
                <IonIcon icon={businessOutline} /> {job.company}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="details-grid">
                <div className="detail-item">
                  <IonIcon icon={locationOutline} />
                  <IonText>{job.location}</IonText>
                </div>
                <div className="detail-item">
                  <IonIcon icon={timeOutline} />
                  <IonText>{job.type}</IonText>
                </div>
                <div className="detail-item">
                  <IonIcon icon={cashOutline} />
                  <IonText>{job.salary}</IonText>
                </div>
                <div className="detail-item">
                  <IonIcon icon={calendarOutline} />
                  <IonText>Posted 2 days ago</IonText>
                </div>
              </div>

              <div className="section">
                <h3>Job Description</h3>
                <p>
                  {job.company} is looking for an experienced {job.title} to join our growing team. 
                  You will be responsible for developing innovative solutions, collaborating with cross-functional teams, 
                  and contributing to the success of our products. This is an exciting opportunity to work with 
                  cutting-edge technologies in a dynamic environment.
                </p>
              </div>

              <div className="section">
                <h3>Requirements</h3>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={briefcaseOutline} slot="start" />
                    <IonLabel>3+ years of relevant experience</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={briefcaseOutline} slot="start" />
                    <IonLabel>Bachelor's degree in Computer Science or related field</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={briefcaseOutline} slot="start" />
                    <IonLabel>Strong problem-solving abilities</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={briefcaseOutline} slot="start" />
                    <IonLabel>Excellent communication skills</IonLabel>
                  </IonItem>
                </IonList>
              </div>

              <div className="section">
                <h3>Benefits</h3>
                <div className="benefits-grid">
                  <IonChip color="primary">Competitive salary</IonChip>
                  <IonChip color="primary">Health insurance</IonChip>
                  <IonChip color="primary">401(k) matching</IonChip>
                  <IonChip color="primary">Remote work options</IonChip>
                  <IonChip color="primary">Professional development</IonChip>
                  <IonChip color="primary">Paid time off</IonChip>
                </div>
              </div>

              <IonButton expand="block" className="apply-button" routerLink={`/apply/${id}`}>
                Apply Now
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JobDetails; 