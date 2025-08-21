import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { GetCourseExitNavigation } from '../../course-exit';

import { useSequenceNavigationMetadata } from './hooks';
import messages from './messages';
import PreviousButton from './generic/PreviousButton';
import NextButton from './generic/NextButton';
import { NextUnitTopNavTriggerSlot } from '../../../../plugin-slots/NextUnitTopNavTriggerSlot';

const UnitNavigation = ({
  sequenceId,
  unitId,
  onClickPrevious,
  onClickNext,
  isAtTop,
  courseId,
}) => {
  const intl = useIntl();
  const {
    isFirstUnit, isLastUnit, nextLink, previousLink,
  } = useSequenceNavigationMetadata(sequenceId, unitId);

  const renderPreviousButton = () => {
    const buttonStyle = `previous-button d-flex align-items-center justify-content-center px-4 py-3`;
    const buttonCustomStyle = {
      width: '126px',
      height: '45px',
      background: '#F5F5F7',
      borderRadius: '16px',
      padding: '16px 26px',
      border: 'none',
    };
    
    return (
      <PreviousButton
        isFirstUnit={isFirstUnit}
        variant="outline-secondary"
        buttonLabel={intl.formatMessage(messages.previousButton)}
        buttonStyle={buttonStyle}
        buttonCustomStyle={buttonCustomStyle}
        onClick={onClickPrevious}
        previousLink={previousLink}
        isAtTop={isAtTop}
      />
    );
  };

  const renderNextButton = () => {
    const { exitActive, exitText } = GetCourseExitNavigation(courseId, intl);
    const buttonText = (isLastUnit && exitText) ? exitText : intl.formatMessage(messages.nextButton);
    const disabled = isLastUnit && !exitActive;
    const variant = 'outline-primary';
    const buttonStyle = `next-button ${isAtTop ? 'text-white mr-3' : 'justify-content-center'} bg-dark text-white rounded`;
    const buttonCustomStyle = {
      borderRadius: '16px',
    }

    if (isAtTop) {
      return (
        <NextUnitTopNavTriggerSlot
          {...{
            variant,
            buttonStyle,
            buttonCustomStyle,
            buttonText,
            disabled,
            sequenceId,
            nextLink,
            onClickHandler: onClickNext,
            isAtTop,
          }}
        />
      );
    }

    return (
      <NextButton
        variant={variant}
        buttonStyle={buttonStyle}
        buttonCustomStyle={buttonCustomStyle}
        onClickHandler={onClickNext}
        disabled={disabled}
        buttonText={buttonText}
        nextLink={nextLink}
        hasEffortEstimate
      />
    );
  };

  return (
    <div className={classNames('d-flex', {
      'unit-navigation': !isAtTop,
      'top-unit-navigation': isAtTop,
    })}
    >
      {renderPreviousButton()}
      {renderNextButton()}
    </div>
  );
};

UnitNavigation.propTypes = {
  courseId: PropTypes.string.isRequired,
  sequenceId: PropTypes.string.isRequired,
  unitId: PropTypes.string,
  onClickPrevious: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  isAtTop: PropTypes.bool,
};

UnitNavigation.defaultProps = {
  unitId: null,
  isAtTop: false,
};

export default UnitNavigation;
