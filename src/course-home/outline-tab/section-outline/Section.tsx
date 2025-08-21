import React, { useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { IconButton } from '@openedx/paragon';
import { Minus, Plus } from '@openedx/paragon/icons';

import { useModel } from '../../../generic/model-store';
import genericMessages from '../../../generic/messages';
import { useContextId } from '../../../data/hooks';
import messages from '../messages';
import SectionTitle from './SectionTitle';
import SequenceLink from './SequenceLink';

interface Props {
  defaultOpen: boolean;
  expand: boolean;
  section: {
    complete: boolean;
    sequenceIds: string[];
    title: string;
    hideFromTOC: boolean;
  };
}

const Section: React.FC<Props> = ({
  defaultOpen,
  expand,
  section,
}) => {
  const intl = useIntl();
  const courseId = useContextId();
  const {
    complete,
    sequenceIds,
    title,
    hideFromTOC,
  } = section;
  const {
    courseBlocks: {
      sequences,
    },
  } = useModel('outline', courseId);

  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  useEffect(() => {
    setOpen(defaultOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <div 
        className="mb-2 bg-white border rounded-3 p-3 position-relative"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E8E8',
          borderRadius: '8px'
        }}
      >
        {/* Left Blue Accent Bar */}
        <div 
          className="position-absolute h-100"
          style={{
            left: 0,
            top: 0,
            width: '4px',
            background: '#0D81FF',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px'
          }}
        ></div>
        
        {/* Content Container with Left Padding for Accent Bar */}
        <div className="d-flex align-items-center" style={{ paddingLeft: '16px' }}>
          {/* Circular Icon with Checkmark */}
          
          {/* Section Title */}
          <div className="flex-grow-1">
            <SectionTitle {...{ complete, hideFromTOC, title }} />
          </div>
          
          {/* Right Plus Icon */}
          <IconButton
            alt={open ? intl.formatMessage(genericMessages.close) : intl.formatMessage(messages.openSection)}
            iconAs={open ? Minus : Plus}
            onClick={() => { setOpen(!open); }}
            size="sm"
            style={{
              color: 'rgba(13, 129, 255, 1)'
            }}
          />
        </div>
        
        {/* Section Content */}
        {open && (
          <div className="mt-3" style={{ paddingLeft: '16px' }}>
            <ol className="list-unstyled">
              {sequenceIds.map((sequenceId, index) => (
                <SequenceLink
                  key={sequenceId}
                  id={sequenceId}
                  sequence={sequences[sequenceId]}
                  first={index === 0}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    </li>
  );
};

export default Section;
