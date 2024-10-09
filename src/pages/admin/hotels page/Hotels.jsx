import React from 'react';

function Hotels(props) {
    return (
        <div>
                <header className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 flex items-center text-2xl">
          List Location
        </div>
        <div className="col-span-6 flex">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..."
          />
          <button className="p-2 bg-emerald-600 text-white rounded-r-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-span-3 flex justify-end">
          <Button variant="contained" color="success" onClick={clearLocation}>
            Add Location
          </Button>
        </div>
      </header>
        </div>
    );
}

export default Hotels;