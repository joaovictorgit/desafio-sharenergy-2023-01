import "./pagination-style.css";

const Pagination = (props: any) => {
  const { page, totalPages, handleClick } = props;
  const pages = [...Array.from(Array(totalPages).keys())].map(
    (number) => number + 1
  );

  return (
    <div className="container-pagination">
      <div className="pagination">
        {pages.map((number: number, index: number) => (
          <div className="link-pagination" key={index}>
            <a
              id="number-pagination"
              href={`/home/#`}
              onClick={() => handleClick(number)}
              className={`${page === number && "active"}`}
            >
              {number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
