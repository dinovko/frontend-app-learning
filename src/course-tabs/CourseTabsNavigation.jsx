import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import messages from './messages';
import Tabs from '../generic/tabs/Tabs';
import { CoursewareSearch, CoursewareSearchToggle } from '../course-home/courseware-search';
import { useCoursewareSearchState } from '../course-home/courseware-search/hooks';

const CourseTabsNavigation = ({
  activeTabSlug, className, tabs,
}) => {
  const intl = useIntl();
  const { show } = useCoursewareSearchState();

  const getLocalizedTabTitle = (slug, fallbackTitle) => {
    switch (slug) {
      case 'outline':
        return intl.formatMessage(messages.tabOutline);
      case 'progress':
        return intl.formatMessage(messages.tabProgress);
      case 'dates':
        return intl.formatMessage(messages.tabDates);
      case 'teams':
        return intl.formatMessage(messages.tabTeams);
      default:
        return fallbackTitle;
    }
  };

  return (
    <div id="courseTabsNavigation" className={classNames('course-tabs-navigation', className)}>
      <div className="container-xl">
        <div className="nav-bar">
          <div className="nav-menu">
            <Tabs
              className="nav-underline-tabs"
              aria-label={intl.formatMessage(messages.courseMaterial)}
            >
              {tabs.map(({ url, title, slug }) => (
                <a
                  key={slug}
                  className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === activeTabSlug })}
                  href={url}
                >
                  {getLocalizedTabTitle(slug, title)}
                </a>
              ))}
            </Tabs>
          </div>
          <div className="search-toggle">
            <CoursewareSearchToggle />
          </div>
        </div>
      </div>
      {show && <CoursewareSearch />}
    </div>
  );
};

CourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null,
};

export default CourseTabsNavigation;
