import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '@nextui-org/react'; 
import '@/styles/pagination.css';

//@ts-ignore
const PaginationDots = ({ currentPage, totalPages, setCurrentPage, setIsAnimating, setDirection }) => {

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setIsAnimating(true);
      setDirection(newPage > currentPage ? 'right' : 'left'); // Determine animation direction
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsAnimating(false); // Reset animation state after transition
      }, 300); // Match this duration with your CSS animation duration
    }
  };

  return (
    <div className='pagination-dots flex items-center gap-1'>
      <Button
        isIconOnly
        variant='light'
        size='sm'
        onPress={() => handlePageChange(Math.max(currentPage - 1, 0))} // Prevent going below 0
        disabled={currentPage === 0} // Disable if on the first page
      >
        <FaChevronLeft />
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`dot ${currentPage === index ? 'active' : ''}`}
          onClick={() => handlePageChange(index)}
        />
      ))}
      <Button
        isIconOnly
        variant='light'
        size='sm'
        onPress={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))} // Prevent going above totalPages - 1
        disabled={currentPage === totalPages - 1} // Disable if on the last page
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

export default PaginationDots;
