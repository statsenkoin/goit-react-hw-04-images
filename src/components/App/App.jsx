import React, { Component } from 'react';
import fetchPixabay from 'services/fetchPixabay';
import { pixabayConstants } from 'constants';
// import { toast } from 'react-toastify';

import { Layout } from './App.styled';
import {
  Searchbar,
  ImageGallery,
  Tostify,
  LoadMoreButton,
  Loader,
  WarningPage,
  Modal,
} from 'components';

class App extends Component {
  state = {
    input: '',
    gallery: [],
    page: 1,
    isEmpty: false,
    isLastPage: true,
    isLoading: false,
    selectedImageUrl: null,
    selectedImageTags: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, gallery, input } = this.state;
    const {
      input: prevInput,
      page: prevPage,
      gallery: prevGallery,
    } = prevState;

    if (prevInput !== input) this.resetState();

    if (prevInput !== input || prevPage !== page) this.getImageSet();

    if (gallery !== prevGallery && page > 1)
      window.scrollBy(0, window.innerHeight / 2);
  }

  resetState = () => {
    this.setState({
      gallery: [],
      page: 1,
      error: null,
      isLastPage: true,
      isLoading: false,
      isModalShown: false,
    });
  };

  getImageSet = async () => {
    const { input, page } = this.state;

    this.setState({ isLoading: true });
    try {
      // data = {total: 1159760, totalHits: 500, hits: Array(12)}
      const { hits, total } = await fetchPixabay(input, page);

      if (hits.length === 0) {
        // return toast.error('Not valid search query. Try another request.');
        return this.setState({ isEmpty: true });
      }

      const pages = this.calculateTotalPages(total);
      this.setState(prev => ({
        gallery: [...prev.gallery, ...hits],
        isLastPage: page < pages ? false : true,
        error: null,
        isEmpty: false,
      }));
    } catch (error) {
      console.log('error :>> ', error);
      this.setState({ error: error.message });
      // toast.error('Something went wrong. Try again later.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  calculateTotalPages = total => {
    const { PER_PAGE } = pixabayConstants;
    return Math.ceil(total / PER_PAGE);
  };

  handleSearchInput = userInput => {
    const { input } = this.state;
    if (input !== userInput) this.setState({ input: userInput });
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  selectModalImage = (link, tags) => {
    this.setState({ selectedImageUrl: link, selectedImageTags: tags });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({
      isModalShown: !isModalShown,
    }));
  };

  render() {
    const {
      selectedImageUrl,
      selectedImageTags,
      isModalShown,
      isLoading,
      isLastPage,
      isEmpty,
      error,
      gallery,
    } = this.state;
    return (
      <Layout>
        {isLoading && <Loader />}

        <Searchbar handleSearchInput={this.handleSearchInput}></Searchbar>

        {gallery && (
          <>
            <ImageGallery
              onSelectModalImage={this.selectModalImage}
              gallery={gallery}
            ></ImageGallery>
            {!isLastPage && <LoadMoreButton onClick={this.onLoadMoreClick} />}
          </>
        )}

        {isEmpty && <WarningPage text={'There is nothing to show.'} />}
        {error && (
          <WarningPage text={`Something went wrong.\n Try again later.`} />
          // <WarningPage text={error} />
        )}

        <Tostify />

        {isModalShown && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImageUrl} alt={selectedImageTags} />
          </Modal>
        )}
      </Layout>
    );
  }
}

export { App };
