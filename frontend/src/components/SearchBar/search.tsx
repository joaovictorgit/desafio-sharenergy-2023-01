import "./search-style.css";
import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = (props: any) => {
  const { setSearch, onSearch } = props;
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  return (
    <div className="container-search">
      <form onSubmit={onSearch} ref={formRef} className="form-search">
        <AiOutlineSearch
          size={12}
          style={{ position: "absolute" }}
          className="icon-search"
        />
        <input
          type="text"
          className="text-search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default Search;
