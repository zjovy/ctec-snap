import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();

    const getUrlParams = () => {
        const params = new URLSearchParams(location.search);
        const professor = params.get('professor');
        const major = decodeURIComponent(params.get('major'));
        const number = params.get('number');
        return { professor, major, number };
    };

    const { professor, major, number } = getUrlParams();

    return (
        <div>
             
        </div>
    )
}

export default ResultsPage