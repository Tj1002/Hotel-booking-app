import { useEffect, useState } from "react";
import SearchResultsCard from "../components/SearchResult/SearchResultCard";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import PriceFilter from "../components/PriceFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";

const Search = () => {
  const search = useSelector((state) => state.search);

  const [hotelData, setHotelData] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search.destination,
    checkIn:
      search.checkIn instanceof Date && !isNaN(search.checkIn)
        ? search.checkIn.toISOString()
        : null,
    checkOut:
      search.checkIn instanceof Date && !isNaN(search.checkOut)
        ? search.checkIn.toISOString()
        : null,
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  useEffect(() => {
    const getAllHotel = async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("destination", searchParams.destination || "");
      queryParams.append("checkIn", searchParams.checkIn || "");
      queryParams.append("checkOut", searchParams.checkOut || "");
      queryParams.append("adultCount", searchParams.adultCount || "");
      queryParams.append("childCount", searchParams.childCount || "");
      queryParams.append("page", searchParams.page || "");

      queryParams.append("maxPrice", searchParams.maxPrice || "");
      queryParams.append("sortOption", searchParams.sortOption || "");

      searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
      );

      searchParams.types?.forEach((type) => queryParams.append("types", type));
      searchParams.stars?.forEach((star) => queryParams.append("stars", star));
      try {
        const response = await fetch(`/api/v1/hotels/search?${queryParams}`);
        const result = await response.json();

        setHotelData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllHotel();
  }, [
    searchParams.destination,
    searchParams.checkIn,
    searchParams.checkOut,
    searchParams.adultCount,
    searchParams.childCount,
    searchParams.page,
    searchParams.maxPrice,
    searchParams.sortOption,
    searchParams.facilities,
    searchParams.types,
    searchParams.stars,
  ]);

  const handleStarsChange = (e) => {
    const starRating = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (e) => {
    const hotelType = e.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      e.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (e) => {
    const facility = e.target.value;
    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        {console.log(search)}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData && hotelData.pagination && hotelData.pagination.total
              ? hotelData.pagination.total
              : 0}
            Hotels found
            {/* Render search destination here if needed */}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData && hotelData.data && hotelData.data.length > 0 ? (
          hotelData.data.map((hotel) => (
            <SearchResultsCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels found.</p>
        )}
        <div>
          <Pagination
            page={
              hotelData && hotelData.pagination
                ? hotelData.pagination.page || 1
                : 1
            }
            pages={
              hotelData && hotelData.pagination
                ? hotelData.pagination.pages || 1
                : 1
            }
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
