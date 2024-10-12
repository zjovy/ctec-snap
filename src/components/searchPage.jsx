import { useState } from 'react'
import Select from 'react-select'

const SearchPage = () => {
    // Options for both dropdowns
  const majors = [
    { value: 'COMP_SCI', label: 'Computer Science' },
    { value: 'COMP_ENG', label: 'Computer Engineering' },
    { value: 'COG_SCI', label : 'Cognitive Science' },
    { value: 'PHIL', label: 'Philosophy' },
  ];

  const courseNumbers = [
    { value: '111', label : '111'}, 
    { value: '150', label : '150'}, 
    { value: '211', label : '211'}, 
    { value: '212', label : '212'}, 
    { value: '214', label : '214'}, 
    { value: '310', label : '310'}, 
  ]

  const professors = [
    { value: 'brennaArgall', label: 'Brenna Argall' },
    { value: 'niveditaArora', label: 'Nivedita Arora' },
    { value: 'dmitriiAvdiukhin', label: 'Dmitrii Avdiukhin' },
    { value: 'connorBain', label: 'Connor Bain' },
    { value: 'amartyaBanerjee', label: 'Amartya Banerjee' },
    { value: 'srutiBhagavatula', label: 'Sruti Bhagavatula' },
  ]



  // State to manage the selected value for both dropdowns
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedCourseNumber, setSelectedCourseNumber] = useState(null);
  const [selectedProffesor, setSelectedProffesor] = useState(null);


  return (
    <div class="flex justify-center items-center h-screen font-mono text-lg">
        <div class="flex flex-col">
            <div class="flex flex-row">
                <h1 class="text-6xl text-[#d5d9ee] mr-2 my-custom-style">CTEC</h1>
                <h1 class="text-6xl text-[#f172ac] ml-2">SNAP</h1>
            </div>
            <label class="mt-6 mb-2">Insights on your favorite classes </label>
            {/* Searchable Dropdown */}
            <div class="flex flex-row">
            <div class="mr-2 w-64">
                    <Select
                        options={professors}
                        value={selectedProffesor}
                        onChange={setSelectedProffesor}
                        placeholder="Professor..."
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              width: '100%', // Fill the parent width
                              height: '100%', // Fill the parent height
                            }),
                          }}
                    />
                </div>
                <div class="mr-2 w-64">
                    <Select
                        options={majors}
                        value={selectedMajor}
                        onChange={setSelectedMajor}
                        isSearchable
                        placeholder="Major..."
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              width: '100%', // Fill the parent width
                              height: '100%', // Fill the parent height
                            }),
                          }}
                    />
                </div>
                <div class="mr-2 w-35">
                    <Select
                        options={courseNumbers}
                        value={selectedCourseNumber}
                        onChange={setSelectedCourseNumber}
                        placeholder="Course Number..."
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              width: '100%', // Fill the parent width
                              height: '100%', // Fill the parent height
                            }),
                          }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}

export default SearchPage