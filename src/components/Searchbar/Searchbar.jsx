import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

export function Searchbar({ handleSearchInput }) {
  return (
    <Header>
      <Formik
        initialValues={{ input: '' }}
        onSubmit={({ input }, { resetForm }) => {
          if (input.trim() === '') {
            toast.error(
              'The search field must be filled. Try to enter something.'
            );
            return;
          }
          handleSearchInput(input);
          resetForm();
        }}
      >
        <SearchForm>
          <SearchButton type="submit">
            <BiSearchAlt />
          </SearchButton>
          <SearchInput
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></SearchInput>
        </SearchForm>
      </Formik>
    </Header>
  );
}

Searchbar.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
};
