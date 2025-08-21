import React from 'react';
import { Button } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useSelector } from 'react-redux';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';

const StartOrResumeCourseCard = () => {
  const intl = useIntl();
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    org,
  } = useModel('courseHomeMeta', courseId);

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  const {
    resumeCourse: {
      hasVisitedCourse,
      url: resumeCourseUrl,
    },
  } = useModel('outline', courseId);

  if (!resumeCourseUrl) {
    return null;
  }

  const logResumeCourseClick = () => {
    sendTrackingLogEvent('edx.course.home.resume_course.clicked', {
      ...eventProperties,
      event_type: hasVisitedCourse ? 'resume' : 'start',
      url: resumeCourseUrl,
    });
  };

  return (
    <div className="mb-3 p-3 bg-light rounded-3 w-100" data-testid="start-resume-card" style={{
      background: '#F5F5F7',
      borderRadius: '14px'
    }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1">
          <h5 className="mb-0 ml-2 fw-semibold" style={{
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>
            {hasVisitedCourse ? intl.formatMessage(messages.resumeBlurb) : intl.formatMessage(messages.startBlurb)}
          </h5>
        </div>
        <div className="ms-3">
          <Button
            variant="brand"
            className="d-flex align-items-center justify-content-center px-3 py-2"
            style={{
              background: 'linear-gradient(0deg, #0D81FF, #0D81FF), #303340',
              borderRadius: '8px',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '19px',
              color: '#FFFFFF',
              minWidth: '139px',
              height: '34px',
              border: 'none',
            }}
            href={resumeCourseUrl}
            onClick={() => logResumeCourseClick()}
          >
            {hasVisitedCourse ? intl.formatMessage(messages.resume) : intl.formatMessage(messages.start)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartOrResumeCourseCard;
