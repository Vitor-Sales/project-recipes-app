import { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import blackheartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import style from './FavShareBtns.module.css';

function FavShareBtns() {
  const [isFavorite, setFavorite] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const URL = window.location.href;

  console.log(URL);

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      console.log('Content copied to clipboard');
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <button
        className={ style.shareBtn }
        onClick={ copyContent }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button data-testid="favorite-btn">
        <img src={ isFavorite ? blackheartIcon : whiteHeartIcon } alt="" />
      </button>
      {isCopied && <p>Link copied!</p>}
    </div>
  );
}

export default FavShareBtns;
