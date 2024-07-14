import React, { useContext } from 'react';
import MyContext from '../../hooks/MyContext';

const SearchIcon = () => {
  const { theme } = useContext(MyContext);

  return (
    <>
      <svg
        className="absolute top-3 right-3"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 9.75C19.5 11.9062 18.7969 13.9219 17.625 15.5156L23.5312 21.4688C24.1406 22.0312 24.1406 23.0156 23.5312 23.5781C22.9688 24.1875 21.9844 24.1875 21.4219 23.5781L15.4688 17.625C13.875 18.8438 11.8594 19.5 9.75 19.5C4.35938 19.5 0 15.1406 0 9.75C0 4.40625 4.35938 0 9.75 0C15.0938 0 19.5 4.40625 19.5 9.75ZM9.75 16.5C12.1406 16.5 14.3438 15.2344 15.5625 13.125C16.7812 11.0625 16.7812 8.48438 15.5625 6.375C14.3438 4.3125 12.1406 3 9.75 3C7.3125 3 5.10938 4.3125 3.89062 6.375C2.67188 8.48438 2.67188 11.0625 3.89062 13.125C5.10938 15.2344 7.3125 16.5 9.75 16.5Z"
          fill={`${theme === 'dark' ? 'white' : 'black'} `}
        />
      </svg>
    </>
  );
};

export default SearchIcon;
