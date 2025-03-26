import React from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import Navbar from '../components/Navbar';
import './About.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <div className="about-container">
          <IonCard className="about-card">
            <IonCardHeader>
              <IonCardTitle>About Job Listings App</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Welcome to the Job Listings App! This is your one-stop platform for discovering
                and applying to exciting career opportunities. Our app simplifies your job search
                by providing a user-friendly interface to browse, search, and apply for jobs
                that match your interests and skills.
              </p>
              <h2>What You Can Do</h2>
              <ul>
                <li>Browse through a wide range of job opportunities from top companies</li>
                <li>Search and filter jobs to find exactly what you're looking for</li>
                <li>View comprehensive job details including salary, location, and requirements</li>
                <li>Apply to jobs directly through the platform with your profile</li>
                <li>Track all your job applications in one place</li>
                <li>Get real-time updates on your application status</li>
              </ul>
              <h2>Why Choose Us</h2>
              <ul>
                <li>Easy-to-use interface designed for the best user experience</li>
                <li>Comprehensive job listings updated regularly</li>
                <li>Secure and streamlined application process</li>
                <li>Mobile-friendly design for job searching on the go</li>
                <li>Organized tracking of all your job applications</li>
              </ul>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About; 