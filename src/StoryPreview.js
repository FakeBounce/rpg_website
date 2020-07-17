import React, { useState, useEffect } from 'react';
import './StoryPreview.css';

const StoryPreview = () => {
  const [animatedClass, setAnimatedClass] = useState('animatedPreviewStart');

  useEffect(() => {
    setTimeout(() => {
      setAnimatedClass('animatedPreviewFinished');
    }, 2000);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(../common/dravos.jpg)`,
        display: 'flex',
        flex: 1,
        height: '-webkit-fill-available',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={'../quests/empty_notice_header.png'}
        style={{
          width: 250 * 1.5,
          height: 40 * 1.5,
        }}
      />
      <img
        src={'../quests/empty_notice.png'}
        className={animatedClass}
        style={{
          width: 250 * 1.5,
          height: 265 * 1.5,
        }}
      />
      <img
        src={'../quests/empty_notice_footer.png'}
        style={{
          width: 250 * 1.5,
          height: 42 * 1.5,
        }}
      />
    </div>
  );
};

export default StoryPreview;
