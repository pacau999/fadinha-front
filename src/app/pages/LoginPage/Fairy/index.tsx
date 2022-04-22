import * as React from 'react';
import styles from './Fairy.module.css';
const fadeInWingsAfterLoad = async () => {
  const getPseudoElementBackgroungImgUrl = (
    parent: Element,
    pseudo: string,
  ) => {
    let img = getComputedStyle(parent, pseudo);
    let imgStr = img.backgroundImage || '';
    return imgStr.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
  };
  const waitImgLoad = url =>
    new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        resolve('loaded');
      };
      img.onerror = err => {
        reject(err);
      };
      img.src = url;
    });
  var wings = document.querySelector('.' + styles.wings);
  const wingLeftImgUrl = getPseudoElementBackgroungImgUrl(wings, ':after');
  const wingRightImgUrl = getPseudoElementBackgroungImgUrl(wings, ':before');
  try {
    await waitImgLoad(wingLeftImgUrl);
    await waitImgLoad(wingRightImgUrl);
    let wingsHTML = wings as HTMLElement;
    wingsHTML.style.opacity = '1';
  } catch (err) {
    console.log("can't load wings: ", err);
  }
};

export const Fairy = props => {
  const { noAnimation } = props;

  React.useEffect(() => {
    fadeInWingsAfterLoad();
  }, []);
  return (
    <div
      className={styles.fairy + (noAnimation ? ' ' + styles.noAnimation : '')}
    >
      <div className={styles.wings} style={{ opacity: 0 }} />
      <div className={styles.glow}>
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
      </div>
    </div>
  );
};
