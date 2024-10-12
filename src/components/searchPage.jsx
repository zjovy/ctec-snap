import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { fetchMajorsAndCourses, fetchProfessors } from '../../server/database/firebasefuncs';

const SearchPage = () => {
  const navigate = useNavigate();
  
  const [majors, setMajors] = useState([]);
  const [coursesByMajor, setCoursesByMajor] = useState({}); // Store courses by major
  const [courseNumbers, setCourseNumbers] = useState([]);    // Store course numbers for selected major
  const [professors, setProfessors] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedCourseNumber, setSelectedCourseNumber] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Fetch majors and courses on mount
  useEffect(() => {
    const fetchData = async () => {
      const { majors, coursesByMajor } = await fetchMajorsAndCourses();
      setMajors(majors.map(major => ({ value: major, label: major })));
      setCoursesByMajor(coursesByMajor);  // Store courses by major in state
    };
    fetchData();
  }, []);

  // When a major is selected, update the course numbers dropdown
  useEffect(() => {
    if (selectedMajor) {
      const courseNumbersForMajor = coursesByMajor[selectedMajor.value] || [];
      setCourseNumbers(courseNumbersForMajor.map(course => ({ value: course, label: course })));
      setSelectedCourseNumber(null); // Reset selected course number when major changes
    }
  }, [selectedMajor, coursesByMajor]);

  // Fetch professors when both major and course number are selected
  useEffect(() => {
    if (selectedMajor && selectedCourseNumber) {
      const fetchProf = async () => {
        const professors = await fetchProfessors(selectedMajor.value, selectedCourseNumber.value);
        setProfessors(professors.map(prof => ({ value: prof, label: prof })));
      };
      fetchProf();
    }
  }, [selectedMajor, selectedCourseNumber]);


  const searchButtonClick = () => {
    // Define the variables to pass
    navigate(`/search?professor=${encodeURIComponent(selectedProfessor.value)}&major=${encodeURIComponent(selectedMajor.value)}&number=${encodeURIComponent(selectedCourseNumber.value)}`);
  };

  return (
    <div className="flex justify-center items-center h-screen font-mono text-lg">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h1 className="text-6xl text-[#d5d9ee] mr-2 my-custom-style">CTEC</h1>
          <h1 className="text-6xl text-[#f172ac] ml-2">SNAP</h1>
        </div>
        <label className="mt-6 mb-2">Insights on your favorite classes</label>

        <div className="flex flex-row">
          {/* Dropdown for Majors */}
          <div className="mr-2 w-64">
            <Select
              options={majors}
              value={selectedMajor}
              onChange={(selected) => {
                setSelectedMajor(selected);
                setProfessors([]);              // Clear professors when major or course changes
              }}
              placeholder="Major..."
            />
          </div>

          {/* Dropdown for Course Numbers */}
          <div className="mr-2 w-64">
            <Select
              options={courseNumbers}
              value={selectedCourseNumber}
              onChange={setSelectedCourseNumber}
              placeholder="Course Number..."
              isDisabled={!selectedMajor} // Disable if no major is selected
            />
          </div>

          {/* Dropdown for Professors */}
          <div className="mr-2 w-64">
            <Select
              options={professors}
              value={selectedProfessor}
              onChange={setSelectedProfessor}
              placeholder="Professor..."
              isDisabled={!selectedCourseNumber} // Disable if no course number is selected
            />
          </div>
        </div>
        <div>
          <button 
            class="bg-[#f172ac] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#fbbee6] transition mt-3"
            disabled={!selectedCourseNumber || !selectedMajor || !selectedProfessor}
            onClick={searchButtonClick}>
                Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;