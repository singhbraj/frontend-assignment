import React, { useState } from "react";

const AestheticTable = ({ columns = [], data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Calculate the indices for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / recordsPerPage);

  // Handle page click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle previous/next page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Table Container */}
      <div className="table-container">
        <table className="aesthetic-table">
          <thead>
            <tr>
              {columns.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
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
      <div className="pagination-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <div className="page-numbers">
          {currentPage > 3 && <button onClick={() => handlePageChange(1)}>1</button>}
          {currentPage > 4 && <span>...</span>}

          {[...Array(5)].map((_, index) => {
            const pageNum = currentPage - 2 + index;
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  className={currentPage === pageNum ? "active" : ""}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 3 && <span>...</span>}
          {currentPage < totalPages - 2 && (
            <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
          )}
        </div>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AestheticTable;
