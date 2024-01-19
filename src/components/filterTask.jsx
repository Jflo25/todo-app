import React, { useState } from 'react';

const FilterTask = ({ tags, onFilterSelect }) => {
   const [selectedTag, setSelectedTag] = useState('');
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleTagSelect = (tag) => {
      setSelectedTag(tag);
      onFilterSelect(tag);
      setDropdownOpen(false);
   };

   const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
   };

   return (
      <div className="relative inline-block text-left">
         <button
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center w-48 bg-gray-300 h-12 px-4 rounded-full text-gray-700 text-lg font-medium"
         >
            Filter
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
         </button>

         {dropdownOpen && (
            <ul className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
               {tags.map(tag => (
                  <li key={tag}
                     className={`dropdown-option ${selectedTag === tag ? 'bg-gray-200' : ''}`}
                     onClick={() => handleTagSelect(tag)}>
                     {tag}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default FilterTask;
