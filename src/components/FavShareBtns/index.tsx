import { useState, useEffect } from 'react';
import style from './FavShareBtns.module.css';
import shareIcon from '../../images/shareIcon.svg';
import blackheartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

type PropsType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};

function FavShareBtns({
  id, type, nationality, category, alcoholicOrNot, name, image,
}: PropsType) {
  const [isFavorite, setFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const URL = window.location.href;

  useEffect(() => {
    const initialFavorite = () => {
      const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const isInStorage = favoriteStorage.some((item: any) => {
        return item.id === id;
      });
      if (isInStorage) {
        setFavorite(true);
      }
    };
    initialFavorite();
  }, [id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFavorite = (prevState: boolean) => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isInStorage = favoriteStorage
      .some(({ id: itemId }: { id: string }) => itemId === id);
    if (!isInStorage) {
      favoriteStorage.push({
        id, type, nationality, category, alcoholicOrNot, name, image,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteStorage));
      setFavorite(!prevState);
    } else {
      const newFavorites = favoriteStorage
        .filter(({ id: itemId }: { id: string }) => itemId !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(!prevState);
    }
  };

  return (
    <div>
      <button
        onClick={ handleCopy }
        className={ style.ButtonSocial }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button
        onClick={ () => handleFavorite(isFavorite) }
        className={ style.ButtonSocial }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackheartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
      {isCopied && <p>Link copied!</p>}
    </div>
  );
}

export default FavShareBtns;
