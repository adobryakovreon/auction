import { useParams } from 'react-router-dom';

const RoomPage = () => {
    const params = useParams();
    console.log();
    return (
        <>Room page {params.id}</>
    );
};

export default RoomPage;
