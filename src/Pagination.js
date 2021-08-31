import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div className="pagination">
      {goToPrevPage && <button onClick={goToPrevPage} className="pagination-btn bg-blue-500 font-bold py-2 px-4 rounded">← Prev</button>}
      {goToNextPage && <button onClick={goToNextPage} className="pagination-btn bg-blue-500 font-bold py-2 px-4 rounded">Next →</button>}
    </div>
  )
}
