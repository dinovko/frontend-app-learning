import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useSelector } from 'react-redux';
import { useModel } from '../../generic/model-store';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../../courseware/course/course-exit/messages';
import messages2 from '../../course-home/goal-unsubscribe/messages';

const Breadcrumbs = () => {
  const intl = useIntl();

  const LMS_BASE_URL = `${getConfig().LMS_BASE_URL}/dashboard`;

  const BASE_URL = `${window.location.protocol}//${window.location.host}`;

  const {
    courseId,
    proctoringPanelStatus,
  } = useSelector(state => state.courseHome);

  const {
    isSelfPaced,
    org,
    title,
  } = useModel('courseHomeMeta', courseId);
  
  const { courseId: courseId2 } = useSelector(state => state.courseware);
  const course = useSelector(state => state.models.courseHomeMeta);

  return (
    <div className="d-flex align-items-center justify-content-start gap-2 px-3"
      style={{ maxWidth: '1400px', width: '100%', paddingTop: '22px', paddingBottom: '22px', gap: '8px', margin: '0 auto' }}>
      <div className="d-flex align-items-center gap-2" style={{ gap: '8px' }}>
        <a href={LMS_BASE_URL} className="text-decoration-none fw-semibold"
          style={{
            color: '#969696',
            fontSize: '16px',
            lineHeight: '100%',
            // fontFamily: 'Inter, sans-serif'
          }}>
          {intl.formatMessage(messages2.goToDashboard)}
        </a>

        {/* Chevron separator */}
        <span className="fw-semibold"
          style={{
            color: '#969696',
            fontSize: '16px',
            lineHeight: '100%',
            // fontFamily: 'Inter, sans-serif'
          }}>
          &gt;
        </span>
        <a href={BASE_URL} className="text-decoration-none fw-semibold"
            style={{
              color: '#969696',
              fontSize: '16px',
              lineHeight: '100%',
              // fontFamily: 'Inter, sans-serif' 
            }}>
            {intl.formatMessage(messages.viewCoursesButton)}
        </a>
        <span className="fw-semibold"
          style={{
            color: '#969696',
            fontSize: '16px',
            lineHeight: '100%',
            // fontFamily: 'Inter, sans-serif' 
          }}>
          &gt;
        </span>
        <span className="fw-semibold"
          style={{
            color: 'rgba(0, 0, 0, 1)',
            fontSize: '16px',
            lineHeight: '100%',
            // fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
          }}>
          {course ? course[courseId2]?.title : title}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
