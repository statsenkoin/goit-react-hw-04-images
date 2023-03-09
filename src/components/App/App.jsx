import { useEffect, useState } from 'react';

import fetchPixabay from 'services/fetchPixabay';
import { pixabayConstants } from 'constants';

import { Layout } from './App.styled';
import {
  Searchbar,
  ImageGallery,
  LoadMoreButton,
  Loader,
  WarningPage,
  Modal,
} from 'components';

export function App() {
  const [input, setInput] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isResponseEmpty, setIsResponseEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageTags, setSelectedImageTags] = useState(null);

  useEffect(() => {
    setGallery([]);
    setPage(1);
    setIsResponseEmpty(false);
    setError(null);
    setIsLastPage(true);
    setIsLoading(false);
    setIsModalShown(false);
  }, [input]);

  useEffect(() => {
    if (input === '') return;

    async function getImageSet() {
      setIsLoading(true);
      try {
        const { hits, total } = await fetchPixabay(input, page);

        if (hits.length === 0) return setIsResponseEmpty(true);

        const pages = calculateTotalPages(total);
        setGallery(prevGallery => [...prevGallery, ...hits]);
        setIsLastPage(page < pages ? false : true);
        setError(null);
        setIsResponseEmpty(false);
      } catch (error) {
        console.log('error :>> ', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImageSet();
  }, [input, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollBy(0, window.innerHeight / 2);
    }
  }, [gallery, page]);

  const handleSearchInput = newInput => {
    if (input !== newInput) setInput(newInput);
  };

  const calculateTotalPages = total => {
    const { PER_PAGE } = pixabayConstants;
    return Math.ceil(total / PER_PAGE);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const selectModalImage = (link, tags) => {
    setSelectedImageUrl(link);
    setSelectedImageTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalShown(isModalShown => !isModalShown);
  };

  return (
    <Layout>
      {isLoading && <Loader />}

      <Searchbar handleSearchInput={handleSearchInput}></Searchbar>

      {gallery && (
        <>
          <ImageGallery
            onSelectModalImage={selectModalImage}
            gallery={gallery}
          ></ImageGallery>
          {!isLastPage && <LoadMoreButton onClick={onLoadMoreClick} />}
        </>
      )}

      {isResponseEmpty && <WarningPage text={'There is nothing to show.'} />}
      {error && (
        <WarningPage text={`Something went wrong.\n Try again later.`} />
      )}

      {isModalShown && (
        <Modal onToggleModal={toggleModal}>
          <img src={selectedImageUrl} alt={selectedImageTags} />
        </Modal>
      )}
    </Layout>
  );
}
