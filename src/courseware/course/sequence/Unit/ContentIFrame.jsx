import PropTypes from 'prop-types';

import { ErrorPage } from '@edx/frontend-platform/react';
import { ModalDialog } from '@openedx/paragon';
import { ContentIFrameLoaderSlot } from '../../../../plugin-slots/ContentIFrameLoaderSlot';

import * as hooks from './hooks';
import './ContentIFrame.scss';
import React from 'react';

/**
 * Feature policy for iframe, allowing access to certain courseware-related media.
 *
 * We must use the wildcard (*) origin for each feature, as courseware content
 * may be embedded in external iframes. Notably, xblock-lti-consumer is a popular
 * block that iframes external course content.

 * This policy was selected in conference with the edX Security Working Group.
 * Changes to it should be vetted by them (security@edx.org).
 */
export const IFRAME_FEATURE_POLICY = (
  'microphone *; camera *; midi *; geolocation *; encrypted-media *; clipboard-write *; autoplay *'
);

export const testIDs = {
  contentIFrame: 'content-iframe-test-id',
  modalIFrame: 'modal-iframe-test-id',
};

const ContentIFrame = ({
  iframeUrl,
  shouldShowContent,
  loadingMessage,
  id,
  elementId,
  onLoaded,
  title,
  courseId,
}) => {
  const {
    handleIFrameLoad,
    hasLoaded,
    iframeHeight,
    showError,
  } = hooks.useIFrameBehavior({
    elementId,
    id,
    iframeUrl,
    onLoaded,
  });

  const {
    modalOptions,
    handleModalClose,
  } = hooks.useModalIFrameData();

  const contentIFrameProps = {
    id: elementId,
    src: iframeUrl,
    allow: IFRAME_FEATURE_POLICY,
    allowFullScreen: true,
    height: iframeHeight,
    scrolling: 'no',
    referrerPolicy: 'origin',
    onLoad: handleIFrameLoad,
  };

  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {
          console.log('✅ Доступ к iframe получен!');
          console.log('Document title:', iframeDoc.title);
          console.log('Available elements:', iframeDoc.querySelectorAll('*').length);

          // Находим все элементы с классом .field
          const fieldElements = iframeDoc.querySelectorAll('.field');
          console.log('Found .field elements:', fieldElements.length);

          // Применяем стили к каждому найденному элементу
          fieldElements.forEach(element => {
            element.style.backgroundColor = 'red';
            element.style.border = '2px solid #000';
            console.log('✅ Стили применены к элементу:', element);
          });

          // Добавляем CSS через style элемент
          const style = iframeDoc.createElement('style');
          style.textContent = `
            .field {
              background-color: red !important;
              border: 2px solid #000 !important;
            }
            .field input[type="radio"] {
              border: 2px solid #000 !important;
            }
          `;

          iframeDoc.head.appendChild(style);
          console.log('✅ CSS добавлен в iframe');
        }
      } catch (error) {
        console.log('❌ Ошибка доступа к iframe:', error.message);
        console.log('Это означает, что iframe находится на другом домене');
      }
    }
  }, [iframeRef]);

  return (
    <>
      {(shouldShowContent && !hasLoaded) && (
        showError ? <ErrorPage /> : <ContentIFrameLoaderSlot courseId={courseId} loadingMessage={loadingMessage} />
      )}
      {shouldShowContent && (
        <div className="unit-iframe-wrapper">
          <iframe title={title} {...contentIFrameProps} data-testid={testIDs.contentIFrame} ref={iframeRef} />
        </div>
      )}
      {modalOptions.isOpen
        && (
          <ModalDialog
            dialogClassName="modal-lti"
            onClose={handleModalClose}
            size={modalOptions.isFullscreen ? 'fullscreen' : 'md'}
            isOpen
            hasCloseButton={false}
          >
            <ModalDialog.Body className={modalOptions.modalBodyClassName}>
              {modalOptions.body
                ? <div className="unit-modal">{modalOptions.body}</div>
                : (
                  <iframe
                    title={modalOptions.title}
                    allow={IFRAME_FEATURE_POLICY}
                    frameBorder="0"
                    src={modalOptions.url}
                    style={{ width: '100%', height: modalOptions.height }}
                  />
                )}
            </ModalDialog.Body>
          </ModalDialog>
        )}
    </>
  );
};

ContentIFrame.propTypes = {
  iframeUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  shouldShowContent: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.node.isRequired,
  elementId: PropTypes.string.isRequired,
  onLoaded: PropTypes.func,
  title: PropTypes.node.isRequired,
  courseId: PropTypes.string,
};

ContentIFrame.defaultProps = {
  iframeUrl: null,
  onLoaded: () => ({}),
  courseId: '',
};

export default ContentIFrame;
