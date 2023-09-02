import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'animate.css/animate.min.css';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import styles from './Style/GuidePreview.module.css'; // Import your module.css file

const GuidePreview = () => {
  const { guideName } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    async function fetchFirstLesson() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}guides/preview/${guideName}`);
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFirstLesson();
  }, [guideName]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const videoUrl = (() => {
    const videoIdMatch = lesson.video.match(/[?&]v=([^&]+)/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&start=0&end=180`;
    } else {
      return '';
    }
  })();

  return (
    <div className={styles.main}>
      <Card className={`animate__animated animate__fadeIn ${styles.card}`}>
        <iframe
        src={videoUrl} 
        title={lesson.subjects[0]}
        frameborder="0"
          allowfullscreen 
          className={styles.video}></iframe>
        <CardContent>
          <Typography variant="h5" component="div">
            Lesson Preview: {lesson.subjects[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Difficulty: {lesson.difficulty}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={`btn btn-primary ${styles.button}`}
            onClick={() => {
              // Handle any action when the button is clicked
            }}
          >
            Start Lesson
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidePreview;


