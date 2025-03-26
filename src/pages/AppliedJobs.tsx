import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonText,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { locationOutline, businessOutline, timeOutline, calendarOutline } from 'ionicons/icons';
import { getAppliedJobs, AppliedJob } from '../services/localStorage';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import './AppliedJobs.css';

const AppliedJobs: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  const loadAppliedJobs = () => {
    const jobs = getAppliedJobs();
    setAppliedJobs(jobs);
  };

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  const handleRefresh = (event: CustomEvent) => {
    loadAppliedJobs();
    event.detail.complete();
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="applied-jobs-container">
          {appliedJobs.length === 0 ? (
            <div className="no-jobs-container">
              <h2>No Applied Jobs</h2>
              <p>You haven't applied to any jobs yet.</p>
            </div>
          ) : (
            appliedJobs.map(job => (
              <IonCard key={job.id} className="job-card">
                <IonCardHeader>
                  <IonCardTitle className="job-title">{job.title}</IonCardTitle>
                  <IonCardSubtitle className="company-name">
                    <IonIcon icon={businessOutline} />
                    {job.company}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="job-details">
                    <div className="detail-item">
                      <IonIcon icon={calendarOutline} />
                      <IonText>Applied on {format(new Date(job.applicationDate), 'MMM dd, yyyy')}</IonText>
                    </div>
                    <div className="detail-item">
                      <IonIcon icon={locationOutline} />
                      <IonText>{job.location}</IonText>
                    </div>
                    <div className="detail-item">
                      <IonIcon icon={timeOutline} />
                      <IonText>{job.type}</IonText>
                    </div>
                  </div>
                  {job.status && (
                    <IonChip color={job.status === 'Pending' ? 'warning' : 'success'}>
                      {job.status}
                    </IonChip>
                  )}
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AppliedJobs; 