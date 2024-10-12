import { useState } from 'react'
import Select from 'react-select'

const SearchPage = () => {
    // Options for both dropdowns
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // State to manage the selected value for both dropdowns
  const [selectedSearchableOption, setSelectedSearchableOption] = useState(null);
  const [selectedStandardOption, setSelectedStandardOption] = useState('');

  // Handler for non-searchable dropdown
  const handleStandardChange = (event) => {
    setSelectedStandardOption(event.target.value);
  };

  return (
    <div class="flex flex-column min-h-screen justify-center items-center">
        <h1>CTEC Snap</h1>
        <div class="flex flex-row min-h-screen justify-center items-center">
            {/* Searchable Dropdown */}
            <div class="marginBottom: 20px">
                <label>Insights on your favorite classes: </label>
                <Select
                options={options}
                value={selectedSearchableOption}
                onChange={setSelectedSearchableOption}
                isSearchable
                placeholder="Select or type..."
                />
            </div>
        </div>
    </div>
  );
}

export default SearchPage