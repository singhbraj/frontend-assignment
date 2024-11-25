import React, { useState } from "react";

const CustomTable = ({ columns = [], data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="table-container">
        <table className="custom-table" aria-label="Custom data table">
          <thead>
            <tr>
              {columns.map((item) => (
                <th key={item} scope="col">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan={columns.length} aria-live="polite">
                  Loading...
                </td>
              </tr>
            )}
            {currentRecords.map((row, index) => (
              <tr key={index}>
                <td>{row["s.no"]}</td>
                <td>{row["percentage.funded"]}</td>
                <td>{row["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="pagination-container" aria-label="Pagination navigation">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          aria-disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="page-numbers">
          {currentPage > 3 && (
            <button onClick={() => handlePageChange(1)} aria-label="Go to page 1">
              1
            </button>
          )}
          {currentPage > 4 && <span aria-hidden="true">...</span>}

          {[...Array(5)].map((_, index) => {
            const pageNum = currentPage - 2 + index;
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  className={currentPage === pageNum ? "active" : ""}
                  onClick={() => handlePageChange(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 3 && <span aria-hidden="true">...</span>}
          {currentPage < totalPages - 2 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              aria-label={`Go to last page (${totalPages})`}
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          aria-disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
