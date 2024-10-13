import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = 5; // Number of pages to display at a time

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    let pages = [];

    // Determine start and end page numbers to show
    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = Math.min(startPage + pageRange - 1, totalPages);

    // Adjust if the end page is less than the range
    if (endPage - startPage + 1 < pageRange && totalPages >= pageRange) {
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    // Render page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          } rounded hover:bg-blue-500 transition duration-200`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="mt-4 flex justify-start items-center space-x-2 mb-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <i className="fa fa-chevron-left mr-2"></i> Prev
      </button>

      {/* Render page numbers */}
      <div className="flex space-x-1">
        {currentPage > pageRange && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-blue-500 transition duration-200"
            >
              1
            </button>
            <span className="px-2">...</span>
          </>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages - pageRange + 1 && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-blue-500 transition duration-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next <i className="fa fa-chevron-right ml-2"></i>
      </button>
    </div>
  );
};

export default Pagination;
